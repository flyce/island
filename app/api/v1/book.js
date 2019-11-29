const Router = require('koa-router')
const router = new Router()

const { HttpException } = require('../../../core/httpException')

router.get('/v1/book/latest', ctx => {
    const path = ctx.params
    const query = ctx.request.query
    const header = ctx.request.header
    const body = ctx.request.body

    if(true) {
        throw new Error()
    }
})

module.exports = router;