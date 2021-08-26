'use strict';

const Controller = require('egg').Controller;

class SignUpController extends Controller {

    async signUp() {
        const { ctx, service } = this;
        const result = await ctx.service.user.signUp();
        ctx.body = result;
    }
    async changeUserInfo() {
        try {
            const result = await this.ctx.service.user.changeUserInfo();
            this.ctx.body = {
                status: "success",
                data: result
            }
        } catch (error) {
            console.log(error);
            this.ctx.body = {
                status: "fail",
                data: "修改失败，请稍后再试"
            }
        }

    }
}

module.exports = SignUpController;
