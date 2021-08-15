'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, service } = this;
    // ctx.set('access-control-allow-origin', '*');
    ctx.body = 'hi, egg';
    // console.log("当前数据", this);
    console.log(ctx.app.config);
    console.log(ctx.app.middleware);
  }
}

module.exports = HomeController;
