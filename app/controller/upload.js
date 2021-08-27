'use strict';

const fs = require('fs');
const path = require('path');
const mfs = require('mz/fs');

const Controller = require('egg').Controller;

// 用于上传文件

class FileController extends Controller {
    async upload() {
        const { ctx, service } = this;
        // ctx.set('access-control-allow-origin', '*');
        const info = ctx.request.body;
        const file = ctx.request.files[0];
        ctx.set('access-control-allow-origin', '*');
        // // 文件名称
        const filename = file.filename;
        // // 创建读入流
        const render = fs.createReadStream(file.filepath);
        let filepath = path.join(__dirname, '../public/upload/', filename);
        try {
            // 创建写入流,创建文件
            const upStream = fs.createWriteStream(filepath);
            render.pipe(upStream);
            // let address = os.networkInterfaces();
            // 修改数据库里面的url
            const url = `http://47.99.199.187/light_note/${filename}`
            await this.app.mysql.update('users', {
                "avatarUrl": url
            }, {
                where: {
                    "id": info.userid
                }
            })
            const result = await this.app.mysql.get('users', {
                id: info.userid
            })
            ctx.body =
            {
                status: "success",
                data: result
            };
        } catch (error) {
            console.log(error);
            ctx.body = {
                status: "fail",
                data: "上传失败，请稍后再试"
            }
        } finally {
            // 删除临时文件
            await mfs.unlink(file.filepath);
        }
    }
}

module.exports = FileController;
