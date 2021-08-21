const Service = require('egg').Service;

class UserService extends Service {
    // 添加
    async addNoteBook() {
        const { ctx } = this;
        const newBook = ctx.request.body;
        const { opr } = newBook;
        console.log("opr:", opr);
        try {
            delete newBook.opr;
            if (opr == "new") {
                await this.app.mysql.insert('notebook', { ...newBook });
                return {
                    status: "success",
                    data: "添加成功"
                }
            } else if (opr == "edit") {
                await this.app.mysql.update('notebook', { ...newBook }, {
                    where: {
                        bid: newBook.bid
                    }
                })
                return {
                    status: "success",
                    data: "修改成功"
                }
            }
        } catch (error) {
            console.log("err:", error);
            return {
                status: "fail",
                data: "后端报错"
            }
        }
        return {
            "status": "fail",
            "data": "失败"
        }
    }
    // 查询
    async getNoteBook() {
        const { ctx } = this;
        const { userid } = ctx.request.body;
        console.log(userid);
        try {
            const result = await this.app.mysql.select('notebook', {
                where: {
                    userid: userid
                }
            });
            console.log(result);
            return {
                status: "success",
                data: result
            }
        } catch (err) {
            return {
                status: "fail",
                data: "查询失败"
            }
        }
    }
    // 删除
    async deleteNotebook() {

        // 删除书表
        try {
            const { ctx } = this;
            const { bid, userid } = ctx.request.body;
            await this.app.mysql.delete("notebook", {
                "bid": bid,
                "userid": userid
            })
            return {
                status: "success",
                data: "删除成功"
            }
        } catch (error) {
            return {
                status: "fail",
                data: "后端报错"
            }
        }
        // 删除关联的笔记表
        // await this.app.ContextCookiesmysql.delete('note', {
        //     "bid": bid,
        //     "userid":userid
        // })
    }
}
module.exports = UserService;