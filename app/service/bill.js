const Service = require('egg').Service;

class BillService extends Service {
    async getBill() {
        const { ctx } = this;
        try {
            const { userid, year, month } = ctx.request.body;
            var newDate = new Date(year, month, 0);
            const maxDay = newDate.getDate();
            let income = 0, expenditure = 0;
            let comsumptionNum = 0;
            var data = [];
            for (let i = maxDay; i >= 1; i--) {
                let totalIn = 0, totalOut = 0;
                let result = await this.app.mysql.select('bill', {
                    where: {
                        userid: userid,
                        year: year,
                        month: month,
                        day: i
                    }
                });
                if (result.length > 0) {
                    for (let item of result) {
                        if (item.value > 0) {
                            totalIn += Number(item.value);
                            income += Number(item.value)
                        } else {
                            totalOut += Number.parseFloat(item.value);
                            expenditure += Number.parseFloat(item.value);
                        }
                        comsumptionNum++;
                    }
                    data.push({
                        "day": month + "月" + i + '日',
                        "total-in": totalIn,
                        "total-out": totalOut,
                        data: result
                    });
                }
            }
            console.log("data:", data);
            return {
                status: "success",
                income: income,
                expenditure: expenditure,
                count: comsumptionNum,
                data: data
            }

        } catch (error) {
            console.log(error);
            return {
                status: "fail",
                data: "后端报错"
            }
        }
    }
}
module.exports = BillService;