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
                password: this.ctx.helper.cryptoPassWord(password),
                signature: "这个人很懒，还没有留下任何东西"
            });
            result.status = "success";
            result.data = "注册成功";
            return result;
        }
    }
    async modifyPassword() {
        const { ctx } = this;
        const { uuid, Vcode, email, password } = ctx.request.body;
        const searchRes = await this.app.redis.get(uuid);
        console.log(uuid);
        console.log(searchRes);
        console.log(Vcode === searchRes);
        if (searchRes === null) {
            return {
                status: "fail",
                data: "验证码无效"
            };
        } else if (searchRes != Vcode) {
            return {
                status: "fail",
                data: "验证码错误",
            };
        } else {
            // TODO 清除验证码
            // 验证码通过，更改密码
            try {
                const upRes = await this.app.mysql.update('users', {
                    password: this.ctx.helper.cryptoPassWord(password)
                }, {
                    where: {
                        email: email
                    }
                });
                console.log(upRes);
                if (upRes.affectedRows === 1) {
                    return {
                        status: "success",
                        data: "修改成功"
                    };
                } else {
                    return {
                        status: "fail",
                        data: "修改失败，请稍后重试"
                    };
                }
            } catch (error) {
                return {
                    status: "fail",
                    data: "修改失败，请稍后重试"
                };
            }
        }
    }
    async changeUserInfo() {
        const { ctx } = this;
        const { userid, username, signature } = ctx.request.body;
        await this.app.mysql.update('users', {
            username: username,
            signature: signature
        }, {
            where: {
                id: userid
            }
        });
        const result = await this.app.mysql.get('users', {
            id: userid
        })
        return result;
    }
}
module.exports = UserService;