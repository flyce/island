const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')
const { Art } = require('../models/art')

class Favor extends Model {
    static async like(artId, type, uid) {
        // 添加记录 classic favNums同时变化 利用数据库事务
        const favor = await Favor.findOne({
            artId,
            type,
            uid
        })
        if(favor) {
            throw new global.errs.LikeError()
        }
        // 事务 必须有return 否则不能成功
        return sequelize.transaction(async t => {
            await Favor.create({
                artId,
                type,
                uid
            }, {transaction: t})

            const art = await Art.getData(artId, type)
            await art.increment('favNums', {by: 1, transaction: t})
        })
    }

    static async dislike(artId, type, uid) {
        const favor = await Favor.findOne({
            artId,
            type,
            uid
        })
        if(!favor) {
            throw new global.errs.DisLikeError()
        }
        return sequelize.transaction(async t => {
            // 注意 transaction 位置
            await favor.destroy({
              force: false,
              transaction: t
            })

            const art = await Art.getData(artId, type)
            await art.decrement('favNums', {by: 1, transaction: t})
        })
    }

}

Favor.init({
    uid: Sequelize.INTEGER,
    artId: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize,
    tableName: 'favors'
})

module.exports = { Favor }