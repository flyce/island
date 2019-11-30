const bcrypt = require('bcryptjs')

const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

class User extends Model {

}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        // 设计模式 观察者模式
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue('password', psw)
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
}, {
    sequelize,
    tableName: 'users'
})

module.exports = { User }