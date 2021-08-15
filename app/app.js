module.exports = app => {
    app.once('server', server => {
        // WebSocket    // 
    });
    app.once('eror', (err, ctx) => {
        // err
    });
    app.once('request', ctx => {
        // log receive request
    });
    app.once('response', ctx => {
        const used = Date.now() - ctx.starttime;
        // log total cost
    });
};