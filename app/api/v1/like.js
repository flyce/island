const Router = require('koa-router')

const { Auth } = require('../../../middlewares/auth')
const { LikeValidator } = require('../../validators/validator')
const { Favor } = require('../../models/favor')
const { success } = require('../../lib/helper')

const router = new Router({
    prefix: '/v1/like'
})

router.post('/', new Auth().m, async ctx => {
    const v = await new LikeValidator().validate(ctx, {id: 'artId'})
    await Favor.like(v.get('body.artId'), v.get('body.type'), ctx.auth.uid)
    success()
})

router.post('/cancel', new Auth().m, async ctx => {
    const v = await new LikeValidator().validate(ctx, {id: 'artId'})
    await Favor.dislike(v.get('body.artId'), v.get('body.type'), ctx.auth.uid)
    success()
})

module.exports = router