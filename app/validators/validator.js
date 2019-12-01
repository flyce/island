const { Validator, Rule } = require('../../core/validator')
const { User } = require('../models/user')
const { LoginType } = require('../lib/enum')

class PositiveIntegerValidator extends Validator {
    constructor() {
      super()
      this.id = [
        // Rule定义校验规则，三个参数：校验规则，提示信息，可选的附加约束
        new Rule('isInt', '需要是正整数', { min: 1 })
      ]
    }
}

class RegisterValidator extends Validator {
    constructor() {
        super()
        this.email = [
            new Rule('isEmail', '不符合Email地址规范', )
        ]
        this.password = [
            new Rule('isLength', '密码至少6个字符，最多32个字符', {
                min: 6,
                max: 32
            }),
            new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ]
        this.nickname = [
            new Rule('isLength', '昵称长度为4-32', {
                min: 4,
                max: 16
            })
        ]
    }

    validatePassword(vals) {
        const { password, repeatPassword } = vals.body
        if(password != repeatPassword) {
            // 直接抛出Error 由 core/validator 处理
            throw new Error('两个密码必须相同')
        }
    }

    async validateEmail(vals) {
        const { email } = vals.body
        const user = await User.findOne({
            where: {
                email
            }
        })

        if(user) {
            throw new Error('email 已存在')
        }
    }
}

class TokenValidator extends Validator {
    constructor() {
        super()
        this.account = [
            new Rule('isLength', '不符合账号规则', {
                min: 4,
                max: 32
            })
        ]
        this.secret = [
            new Rule('isOptional'),
            new Rule('isLength', '至少六个字符', {
                mix: 6,
                max: 128
            })
        ]
    }

    validateLoginType(val) {
        if(!val.body.type) {
            throw new Error('type 是必须参数')
        }
        
        if(!LoginType.isThisType(val.body.type)) {
            throw new Error('type 参数不合法')
        }
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator
}