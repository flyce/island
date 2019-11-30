const Router = require('koa-router')
const router = new Router()

const { PositiveIntegerValidator } = require('../../validators/validator')

router.get('/v1/:id/classic/latest', async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx)
    ctx.body = {
        success: true
    }
})

module.exports = router;