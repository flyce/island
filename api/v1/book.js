const Router = require('koa-router')
const router = new Router()

router.get('/v1/book/latest', ctx => {
    ctx.body = {
        success: true
    }
})

module.exports = router;