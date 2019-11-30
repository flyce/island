const Router = require('koa-router')

const { RegisterValidator } = require('../../validators/validator')
const { User } = require('../../models/user');
const { success } = require('../../lib/helper')

const router = new Router({
    prefix: '/v1/user'
})

router.post('/register', async (ctx) => {
    // 参数 email uasename pasword
    const v = await new RegisterValidator().validate(ctx)
  
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password'),
        nickname: v.get('body.nickname')
    }
    const r = await User.create(user)
    success()
})

router.get('/hello', ctx => {
    ctx.body = {success: true}
})

module.exports = router