const Service = require('egg').Service;

/**
 * {
 *    status: success / faild
 *    data: Json / "err message"
 * }
 */

class UserService extends Service {
    async signin() {
        // const user = await this.app.mysql.get('users')
        // 查询所有
        // const results = await this.app.mysql.select('users');
        // 查询一条
        const results = await this.app.mysql.get('users', { id: 1 });
        return results;
    }
}
module.exports = UserService;