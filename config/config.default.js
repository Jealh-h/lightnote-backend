/* eslint valid-jsdoc: "off" */
// config.default.js 为默认的配置文件，所有环境都会加载这个配置文件，一般也会作为开发环境的默认配置文件
'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1628930203907_8475';

  // add your middleware config here
  // 全局中间件，所有请求都会经过
  config.middleware = ['gzip'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',

    // 设置multipart用于formdata上传文件
    multipart: {
      mode: 'file',
    },
    // 跨域
    cors: {
      orgin: "*",
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    },
    gzip: {
      threshold: 1024
    },
    mysql: {
      client: {
        host: "47.99.199.187",
        port: "3306",
        user: "root",
        password: "hhd1620175472",
        database: "lightnote_db",
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    redis: {
      client: {
        port: 6379,
        host: '47.99.199.187',
        password: 'hhd1620175472',
        db: 0
      }
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
