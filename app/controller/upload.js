'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const mfs = require('mz/fs');

const Controller = require('egg').Controller;

// 用于上传文件

class FileController extends Controller {
    async upload() {
        const { ctx, service } = this;
        // ctx.set('access-control-allow-origin', '*');
        console.log("请求携带的数据：", ctx.request.files);
        const file = ctx.request.files[0];
        // 文件名称
        const filename = file.filename;
        // 创建读入流
        const render = fs.createReadStream(file.filepath);
        let filepath = path.join(__dirname, '../public/upload/', filename);
        try {
            // 创建写入流,创建文件
            const upStream = fs.createWriteStream(filepath);
            render.pipe(upStream);
        } catch (error) {
            console.log(error);
        } finally {
            // 删除临时文件
            await mfs.unlink(file.filepath);
        }
        // let address = os.networkInterfaces();
        // 修改数据库里面的url
        ctx.body = filepath; // 后续转换成url
        // console.log("当前数据", this);
    }
}

module.exports = FileController;
