const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
    static initCore(app) {
        // 入口方法
        InitManager.app = app
        InitManager.initLoadRouters(app)
        InitManager.loadHttpExecption() // 全局导入异常处理类
    }

    static initLoadRouters() {
        const apiDirectory = `${process.cwd()}/app/api`

        requireDirectory(module, apiDirectory, {visit: whenLoadModule})

        function whenLoadModule(obj) {
            if(obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }

    // 全局导入异常处理类 not recommend
    static loadHttpExecption() {
        const errors = require('./httpException')
        global.errs = errors
    }
}

module.exports = InitManager;