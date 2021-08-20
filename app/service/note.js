const Service = require('egg').Service;

class UserService extends Service {
    // 添加
    async addNoteBook() {
        const { ctx } = this;
        const newBook = ctx.request.body;
        try {
            this.app.mysql.insert('notebook', { ...newBook });
            return {
                status: "success",
                data: "添加成功"
            }
        } catch (error) {
            return {
                status: "fail",
                data: "添加失败"
            }
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
}
module.exports = UserService;