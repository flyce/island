const Router = require('koa-router')

const { Auth } = require('../../../middlewares/auth')
const { Flow } = require('../../models/flow')
const { Art } = require('../../models/art')

const router = new Router({
    prefix: '/v1/classic'
})

const { PositiveIntegerValidator } = require('../../validators/validator')

router.get('/latest',new Auth(8).m, async (ctx, next) => {
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })
    const art = await Art.getData(flow.artId, flow.type)
    art.setDataValue('index', flow.index)
    ctx.body = art
})

module.exports = router;