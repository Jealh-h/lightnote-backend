const isJSON = require('koa-is-json');
const zlib = require('zlib');

/**
 * options: 中间件的配置项，框架会将 app.config[${middlewareName}] 传递进来。
 * app: 当前应用 Application 的实例。
 */
module.exports = (options, app) => {
    return async function gzip(ctx, next) {
        await next();
        let body = ctx.body;
        if (!body) return;
        if (isJSON(body)) body = JSON.stringify(body);

        // 设置gzip body修正响应头
        const stream = zlib.createGzip();
        stream.end(body);
        ctx.body = stream;
        ctx.set('content-encoding', 'gzip');
    }
}