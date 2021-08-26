'use strict';

const fs = require('fs');
const path = require('path');
const mfs = require('mz/fs');

const Controller = require('egg').Controller;

class NoteController extends Controller {
    // 添加笔记本
    async addNoteBook() {
        const { ctx, service } = this;
        console.log(ctx.request.body);
        const result = await ctx.service.note.addNoteBook();
        ctx.body = result;

    }
    // 查询笔记本列表
    async getNoteBook() {
        const { ctx } = this;
        const result = await ctx.service.note.getNoteBook();
        ctx.body = result;
    }
    // 删除笔记本
    async deleteNotebook() {
        const { ctx } = this;
        const result = await ctx.service.note.deleteNotebook();
        ctx.body = result;
    }
    // 查询对应笔记本的笔记
    async getNoteList() {
        const { ctx } = this;
        try {
            const { userid, bid } = ctx.request.body;
            const result = await this.app.mysql.select('note', {
                where: {
                    userid: userid,
                    bid: bid
                }
            })
            ctx.body = {
                status: "success",
                data: result
            }
        } catch (error) {
            console.log(error);
            ctx.body = {
                status: "fail",
                data: "查询笔记列表失败，请稍后再试"
            }
        }
    }
    // 添加笔记
    async addNote() {
        const { ctx, service } = this;
        const info = ctx.request.body;
        console.log("body:", ctx.request.body);
        console.log("files:", ctx.request.files);
        const file = ctx.request.files[0];
        // // 文件名称
        const filename = file.filename;
        // // 创建读入流
        const render = fs.createReadStream(file.filepath);
        let filepath = path.join(__dirname, '../public/upload/', filename);
        try {
            // 创建写入流,创建文件
            const upStream = fs.createWriteStream(filepath);
            render.pipe(upStream);
            // TODO 修改数据库里面的url
            // const fileUrl = `http://47.99.199.187/light_note/${filename}`;
            const fileUrl = `http://47.99.199.187/light_note/IMG_3660.JPG`;
            // 添加笔记
            if (info.opr == "add") {
                await this.app.mysql.insert('note', {
                    title: info.title,
                    bid: info.bid,
                    imageUrl: fileUrl,
                    userid: info.userid,
                    time: Date.now().toLocaleString()
                });

            }
            // 修改笔记
            else if (info.opr == "modify") {
                await this.app.mysql.update('note', {
                    title: info.title,
                    imageUrl: fileUrl,
                    time: Date.now().toLocaleString()
                }, {
                    where: {
                        bid: info.bid,
                        userid: info.userid,
                    }
                });
            }
            ctx.set('access-control-allow-origin', '*');
            ctx.body =
            {
                status: "success",
                data: fileUrl,
            };
        } catch (error) {
            console.log(error);
            ctx.body = {
                status: "fail",
                data: "保存失败，请稍后再试"
            }
        } finally {
            // 删除临时文件
            await mfs.unlink(file.filepath);
        }
    }
}

module.exports = NoteController;
