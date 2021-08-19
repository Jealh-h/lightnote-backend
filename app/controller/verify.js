'use strict';

const Controller = require('egg').Controller;

// 验证码处理类

class VerifyController extends Controller {
    // 发送验证码
    async sendVcode() {
        const { ctx, service } = this;
        // 获取验证码
        const code = ctx.helper.getVerifyCode();
        // 获取uuid
        const uuid = ctx.helper.getUUID();
        const { email } = ctx.request.body;
        /**
         *  ex ：为键设置秒级过期时间。等同于setex
         *  px ：为键设置毫秒级过期时间。
         *  setMode（模式设置）：
         *  nx：键不存在，才可以设置成功，用于添加。等同于setnx
         *  xx：键存在，才可以设置成功，用于更新。
         */
        // 存储在redis里面--过期时间 15minutes
        await this.app.redis.set(uuid, code, 'EX', 900);

        // 发送邮件
        // ctx.helper.sendMMail(email, code);
        // 返回 uuid
        ctx.body = {
            status: "success",
            data: {
                "uuid": uuid
            }
        };
    }
    // 校验验证码
    async verifyCode() {
        const { ctx } = this;
        const { uuid, Vcode } = ctx.request.body;
        const searchRes = await this.app.redis.get(uuid);
        if (searchRes === null) {
            ctx.body = {
                status: "faild",
                data: "验证码无效"
            }
            return;
        } else if (searchRes != Vcode) {
            ctx.body = {
                status: "faild",
                data: "验证码错误",
            }
            return;
        } else {
            ctx.body = {
                status: "success",
                data: "验证通过"
            }
            return;
        }
    }
}

module.exports = VerifyController;
