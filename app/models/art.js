const { Op } = require('sequelize')
const { flatten } = require('lodash')

const { Movie, Music, Sentence } = require('./classic')

class Art {
    static async getList(artInfoList) {
        // artInfoList 有三种类型ART 3次in查询从身体
        const artInfoObj = {
            100: [],
            200: [],
            300: []

        }
        // for in && for of的区别
        for(let artInfo of artInfoList) {
            // artInfo.type artInfo.artId
            artInfoObj[artInfo.type].push(artInfo.artId)
        }
        const arts = []
        for(let key in artInfoObj) {
            const ids = artInfoObj[key]
            if(ids.length === 0) {
                continue
            }
            key = parseInt(key)
            arts.push(await Art._getListByType(ids, key))
        }
        // 二维数组 [[], [], []]
        return flatten(arts)
    }

    static async _getListByType(ids, type) {
        let arts = null
        const finder = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        }
        const scope = 'bh'
        switch (type) {
            case 100:
                arts = await Movie.scope(scope).findOne(finder)
                break
            case 200:
                arts = await Music.scope(scope).findOne(finder)
                break
            case 300:
                arts = await Sentence.scope(scope).findOne(finder)
                break
            default:
                break
        }
        return arts
    }

    static async getData(artId, type, userScope = true) {
        let art = null
        const scope = userScope ? 'bh' : null
        switch (type) {
            case 100:
                art = await Movie.scope(scope).findOne({ where: { id: artId }})
                break
            case 200:
                art = await Music.scope(scope).findOne({ where: { id: artId }})
                break
            case 300:
                art = await Sentence.scope(scope).findOne({ where: { id: artId }})
                break
            default:
                break
        }
        return art
    }
}

module.exports = { Art }