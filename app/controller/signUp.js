'use strict';

const Controller = require('egg').Controller;

class SignUpController extends Controller {

    async signUp() {
        const { ctx, service } = this;
        const result = await ctx.service.user.signUp();
        ctx.body = result;
    }
}

module.exports = SignUpController;
