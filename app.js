const Koa = require('koa')

const InitManager = require('./core/init')

const app = new Koa()

InitManager.initCore(app)
process.cwd()

app.listen(3000, () => {
    console.log('koa running on port 3000')
})