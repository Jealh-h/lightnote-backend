const uuid = require('uuid');
const nodemailer = require('nodemailer');
// 这里使用的是我自己的邮箱，你可以替换成你的，pass是开启smtp服务的授权码
const user = "ApFacTes@163.com", pass = "PMBXJNFNJOSXJZFH";

const smtpTransport = nodemailer.createTransport({
    host: 'smtp.163.com',
    service: "163",
    port: 465,
    auth: {
        user: user,
        pass: pass
    }
});

module.exports = {
    /**
     * 
     * @returns 返回一个基于事件戳生成的唯一标识符
     */
    getUUID() {
        return uuid.v1();
    },

    /**
     * 使用nodemailer发送邮件
     */
    sendMMail(targetUserMail) {
        var options = {
            from: "lightNote官方<ApFacTes@163.com>",
            to: `${targetUserMail}`,
            subject: "[LightNote 邮箱验证]",
            text: "你的邮箱验证码为：xxxx <br>15分钟内有效",
        }
        smtpTransport.sendMail(options, function (err, res) {
            if (err)
                console.log(err);
            else
                console.log(res);
        })
    },

    cryptoPassWord() {

    }
}