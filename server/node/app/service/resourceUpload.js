const Response = require('../util/response.js');
const Tools = require('../util/tools.js');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;
const exec = require('child_process').exec;
const setting = require('../conf/setting.js')

module.exports = app => {
    return class resourceUpload extends app.Service {

        * resourceUpload(ctx,fileType) {
            try {
                const id = uuid();
                const parts = this.ctx.multipart();
                let stream
                let type
                let filePath = ''
                let errorCode
                if(fileType ==='picture'){
                    filePath = setting.uploadResourcePath.imgPath
                    errorCode = 90
                }
                if(fileType ==='music'){
                    filePath = setting.uploadResourcePath.musicPath
                    errorCode = 91
                }
                if(fileType ==='video'){
                    filePath = setting.uploadResourcePath.videoPath
                    errorCode = 92
                }
                if(fileType ==='file'){
                    filePath = setting.uploadResourcePath.filePath
                    errorCode = 93
                }
                while ((stream = yield parts()) != null) {
                    type=stream.filename.split('.')[1];
                    const target = path.join(filePath,`${id}.${type}`);
                    const writeStream = fs.createWriteStream(target);
                    try {
                        awaitWriteStream(stream.pipe(writeStream));
                    } catch (e) {
                        sendToWormhole(stream);
                        Response.fail(errorCode, e)
                    }
                }
                if(setting.zipImg.enable == true && type=='picture'){
                    const convert = yield Tools.convertImgCmd(`${setting.uploadResourcePath.imgPath}/${id}.${type}`,`${setting.zipImg.thumbImgPath}/${id}.${type}`,setting.zipImg.size);
                }
                return Response.success({
                    data:id+'.'+ type
                })
            } catch(e) {
                if(e.status != undefined){
                    return Response.fail(94)
                }else{
                    return Response.fail(errorCode, e)
                }
            }
        }
    }
};