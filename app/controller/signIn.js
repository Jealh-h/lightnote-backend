'use strict';

const Controller = require('egg').Controller;

class SignInController extends Controller {

    async verify() {
        // 获取context对象，this.ctx,ctx封装有本次请求的参数或者设置响应信息
        const { ctx, service } = this;
        const users = await ctx.service.user.signin();
        ctx.body = users;
        ctx.helper.sendMMail("1620175472@qq.com");
    }
    async signIn() {
        const { ctx, service } = this;
        ctx.body = ctx.request.body;
        const result = await ctx.service.user.signin();
        ctx.body = result;
    }
    async show() {
        const { ctx, service } = this;
        ctx.body = ctx.params.id;
    }
}

module.exports = SignInController;
