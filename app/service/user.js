const Service = require('egg').Service;

/**
 * {
 *    status: success / faild
 *    data: Json / "err message"
 * }
 */

class UserService extends Service {
    async signin() {
        // const user = await this.app.mysql.get('users')
        // 查询所有
        // const results = await this.app.mysql.select('users');
        // 查询一条
        // const results = await this.app.mysql.get('users', { id: 1 });
        // return results;
        var result = {};
        const { username, password } = this.ctx.request.body;
        const searchRes = await this.app.mysql.get('users', { username: username, password: this.ctx.helper.cryptoPassWord(password) });
        if (!searchRes) {
            result.status = "fail";
            result.data = "用户名或密码有误";
            return result;
        } else {
            result.status = "success";
            result.data = searchRes;
            return result;
        }
    }
    async signUp() {
        var result = {};
        const { username, password, email } = this.ctx.request.body;
        // 判断邮箱是否存在
        const searchRes = await this.app.mysql.get('users', { email: email });
        console.log(searchRes);
        console.log(email);
        if (searchRes) {
            result.status = "fail";
            result.data = "邮箱已被注册";
            return result;
        } else {
            await this.app.mysql.insert('users', {
                avatarUrl: "http://47.99.199.187/images/default_avatar.jpg",
                email: email,
                username: username,
                password: this.ctx.helper.cryptoPassWord(password)
            });
            result.status = "success";
            result.data = "注册成功";
            return result;
        }
    }
}
module.exports = UserService;