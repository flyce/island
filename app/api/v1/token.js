const Router = require('koa-router')

const { TokenValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const { generateToken } = require('../../../core/util')
const { Auth } = require('../../../middlewares/auth')
const { WXManager } = require('../../services/wx')

const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async (ctx) => {
    // 业务逻辑
    // 1. 在API接口编写
    // 2. Model 分层

    // 业务分成 Model Service
    const v = await new TokenValidator().validate(ctx)
    let token

    switch(v.get('body.type')) {
        case LoginType.USER_EMAIL: 
            token = await emailLogin(v.get('body.account'), v.get('body.secret'))
            break
        case LoginType.USER_MINI_PROGRAM: 
            token = await WXManager.codeToToken(v.get('body.account'))
            break
        default: 
            throw new global.errs.ParameterException('没有相应的处理函数')
    }
    ctx.body = {
        token
    }
})

// 用户权限分级 Auth.USER Auth.ADMIN, 生成token需根据对应的权限来赋值给第二个变量
async function emailLogin(account, secret) {
    const user = await User.verifyEmailPassword(account, secret)
    return generateToken(user.id, Auth.USER)
}

module.exports = router