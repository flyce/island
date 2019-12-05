const { Movie, Music, Sentence } = require('./art')


class Art {
    static async getData(artId, type) {
        let art = null
        const finder = { where: { id: artId }}
        switch (type) {
            case 100:
                art = await Movie.findOne(finder)
                break
            case 200:
                art = await Music.findOne(finder)
                break
            case 300:
                art = await Sentence.findOne(finder)
                break
            default:
                break
        }
    }
}

module.exports = { Art }