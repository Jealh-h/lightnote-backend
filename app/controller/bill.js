'use strict';

const Controller = require('egg').Controller;

class BillController extends Controller {
    async addbill() {
        const { ctx } = this;
        try {
            const bill = ctx.request.body;
            console.log(bill);
            const result = await this.app.mysql.insert('bill', {
                ...bill
            })
            ctx.body = {
                status: "success",
                data: "添加成功"
            }
        } catch (error) {
            ctx.body = {
                status: "fail",
                data: "添加失败"
            }
        }
    }
    async deleteBill() {
        try {
            const { ctx } = this;
            const { userid, id } = ctx.body;
            const result = await this.app.mysql.detele('bill', {
                userid: userid,
                id: id
            })
            console.log(result);
            ctx.body = {
                status: "success",
                data: "删除成功"
            }
        } catch (error) {
            this.ctx.body = {
                status: "fail",
                data: "后端报错"
            }
        }
    }
    async getbill() {
        const { ctx } = this;
        const result = await ctx.service.bill.getBill();
        ctx.body = result;

    }
    async getWeekData() {
        const { ctx } = this;
        try {
            const result = await this.service.bill.getWeekData();
            ctx.body = {
                status: "success",
                data: result
            }
        } catch (e) {
            console.log(e);
            ctx.body = {
                status: "fail",
                data: "后端报错"
            }
        }

    }
    async getYearData() {
        const { ctx } = this;
        try {
            const result = await this.ctx.service.bill.getYearData();
            ctx.body = {
                status: "success",
                data: result
            }
        } catch (error) {
            console.log(error);
            ctx.body = {
                status: "fail",
                data: "后端报错"
            }
        }
    }
    async getCircleData() {
        const { ctx } = this;
        try {
            const result = await ctx.service.bill.getCircleData();
            ctx.body = {
                status: "success",
                data: result
            }
        } catch (error) {
            console.log(error);
            ctx.body = {
                status: "fail",
                data: "后端报错"
            }
        }
    }
}
module.exports = BillController;