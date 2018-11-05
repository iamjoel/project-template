const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;

class UploadService extends Service {
  async uploadImg(stream) {
    const { app, ctx, config } = this;

    const id = ctx.helper.uuid();
    const fileType = stream.filename.split('.')[1];
    const distPath = path.join(config.uploadResourcePath.img, `${id}.${fileType}`);

    const writeStream = fs.createWriteStream(distPath);
    await awaitWriteStream(stream.pipe(writeStream));

    return {
      data: `${id}.${fileType}`,
    };

  }
}

module.exports = UploadService;

