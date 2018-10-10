const Response = require('../../util/response.js');
const Tools = require('../../util/tools.js');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;
const setting = require('../../conf/setting.js')
var qiniu = require("qiniu");
const moment =  require('moment')

module.exports = app => {
    return class resourceUpload extends app.Service {

        * resourceUpload(ctx,fileType) {
            try {
                const id = uuid();
                const parts = ctx.multipart();
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
                        yield awaitWriteStream(stream.pipe(writeStream));
                        //是否使用七牛oss
                        if(setting.qiniuOss.enable){
                            const qiniuUploadFileResult = yield qiniuUploadFile(id,type,target)
                            if(qiniuUploadFileResult.errorCode!=0){
                                return Response.fail(95)
                            }
                            if(!setting.qiniuOss.isSaveOnLocal){
                                const deleteLocalFileResult =  yield deleteLocalFile(target)
                                if(deleteLocalFileResult.errorCode!=0){
                                    return Response.fail(96)
                                }
                            }
                        }

                    } catch (e) {
                        sendToWormhole(stream);
                        return Response.fail(errorCode, e)
                    }
                }
                
   
                let res = {}
                if(setting.qiniuOss.enable&&setting.qiniuOss.isSaveOnLocal){
                    res = {
                        data:`${id}.${type}`,
                        url:`${setting.qiniuOss.url}/${id}.${type}`
                    }
                }else if(setting.qiniuOss.enable&&!setting.qiniuOss.isSaveOnLocal){
                    res = {
                        url:`${setting.qiniuOss.url}/${id}.${type}`
                    }
                }else{
                    res = {
                        data:`${id}.${type}`,
                    }
                }

                return Response.success(res)
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


const qiniuUploadFile = function(id,type,target) {
    return new Promise((resolve, reject)=> {
        //七牛oss的key
        qiniu.conf.ACCESS_KEY = setting.qiniuOss.accessKey
        qiniu.conf.SECRET_KEY = setting.qiniuOss.secretKey
        const mac = new qiniu.auth.digest.Mac(setting.qiniuOss.accessKey, setting.qiniuOss.secretKey);
        //空间名
        let bucket = setting.qiniuOss.bucket
        //上传到七牛后保存的文件名
        let key = `${id}.${type}`
    
        const options = {
            "scope":`${bucket}:${key}`,
            "isPrefixalScope":1,
            "deadline":moment().add(3600,'s').unix(),
            "insertOnly": 0,
            "endUser":"www.zhixingclub.com",
            "fsizeMin": 0,
            "fsizeLimit":10*1024*1024,
            "detectMime":0,
            // "mimeLimit":"image/*",
            "fileType":0
        }
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken=putPolicy.uploadToken(mac);

        var config = new qiniu.conf.Config();
        // 空间对应的机房
        config.zone = qiniu.zone.Zone_z0
        var formUploader = new qiniu.form_up.FormUploader(config);
        var putExtra = new qiniu.form_up.PutExtra();

        formUploader.putFile(uploadToken, key, target, putExtra, function(respErr,respBody, respInfo) {
            if (respErr) {
                resolve({
                    errorCode:-1,
                    data:respErr
                })
            }
            if (respInfo.statusCode == 200) {
                resolve({
                    errorCode:0,
                    data:respInfo
                })
            } else {
                resolve({
                    errorCode:-1,
                    data:respBody
                })
            }
        });
    })
}

const deleteLocalFile = function(target){
    return new Promise((resolve, reject)=> {
        fs.unlink(target, function(err) {
            if(err) {
                resolve({
                    errorCode:-1,
                    data:err
                })
            }else{
                resolve({
                    errorCode:0,
                    data:''
                })
            } 
        })
    })
}