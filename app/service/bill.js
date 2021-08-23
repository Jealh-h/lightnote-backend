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
    async getWeekData() {
        const { ctx } = this;
        const lastweek = await ctx.helper.getDay();
        console.log(lastweek);
        const dataArr = [];
        for (let i = 0; i < 7; i++) {
            let totalIn = 0, totalOut = 0; //那一天的收入支出
            // 查询一天
            let data = await this.app.mysql.select('bill', {
                where: {
                    year: lastweek[i].year,
                    month: lastweek[i].month,
                    day: lastweek[i].day
                }
            });
            // 有数据
            if (data.length > 0) {
                let curData = data[0];
                // 遍历这一天
                for (let item of data) {
                    // 收入
                    if (item.value > 0) {
                        totalIn += Number(item.value);
                    } else {
                        // 支出
                        totalOut += Number.parseFloat(item.value);
                    }
                }
            }
            dataArr.push(
                { ...lastweek[i], totalIn: totalIn, totalOut: totalOut }, // 日期，数据
            );
        }
        return dataArr;
    }
    async getYearData() {
        const { ctx } = this;
        const { year, month } = ctx.request.body;
        let income = [], outcome = [];
        for (let i = 1; i <= month; i++) {
            let totalIn = 0, totalOut = 0;
            // 查询一个月
            let result = await this.app.mysql.select('bill', {
                where: {
                    year: year,
                    month: i
                }
            });
            // 获取每一个月的收入与支出
            if (result.length > 0) {
                for (let j = 0; j < result.length; j++) {
                    if (result[j].value > 0) {
                        totalIn += Math.abs(Number.parseFloat(result[j].value));
                    } else {
                        totalOut += Math.abs(Number.parseFloat(result[j].value));
                    }
                }
            }
            income.push({
                "month": i,
                "value": totalIn
            })
            outcome.push({
                "month": i,
                "value": totalOut

            })
        }
        return {
            "income": income,
            "outcome": outcome
        }
    }
    async getCircleData() {
        const { ctx } = this;
        const { year } = ctx.request.body;
        let resultObj = {};
        let resultArr = [];
        for (let i = 0; i < 4; i++) {
            let money = 0;
            let result = {};
            let data = await this.app.mysql.select('bill', {
                where: {
                    year: year,
                    type: i
                }
            })
            // 该类型金额
            for (let j = 0; j < data.length; j++) {
                if (data[j].value < 0) {
                    money += Number(data[j].value);
                }
            }
            result.type = i; // 类型
            result.totalOut = Math.abs(money); // 消费总金额
            result.count = data.length; // 消费笔数
            resultArr.push(result);
        }
        let sumMoney = 0;
        let maxIndex = 0;
        let totalCount = 0;
        resultArr.forEach((e, index) => {
            sumMoney += e.totalOut;
            totalCount += e.count;
            if (e.totalOut > resultArr[maxIndex]) {
                maxIndex = index;
            }
        })
        return resultObj = {
            maxOut: resultArr[maxIndex].totalOut,
            maxType: resultArr[maxIndex].type,
            percent: (resultArr[maxIndex].totalOut * 100 / sumMoney).toFixed(2),
            totalCount: totalCount,
            data: resultArr
        }
    }
}
module.exports = BillService;