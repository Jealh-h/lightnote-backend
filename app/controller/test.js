'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
    async test() {
        const { ctx, service } = this;
        const result = await this.app.mysql.update('users', {
            password: "123456"
        }, {
            where: {
                email: "1620175472@qq.com"
            }
        });
        const search = await this.app.mysql.select(
            'users', {
            where: {
                // username: "测试1",
                email: "1620175472＠qq.com"
            }
        }
        );
        console.log("search:", search);
        console.log("更改：", result);
        ctx.body = result;
    }
}

module.exports = TestController;
