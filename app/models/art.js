const { Movie, Music, Sentence } = require('./classic')


class Art {
    static async getData(artId, type) {
        let art = null 
        switch (type) {
            case 100:
                art = await Movie.findOne({ where: { id: artId }})
                break
            case 200:
                art = await Music.findOne({ where: { id: artId }})
                break
            case 300:
                art = await Sentence.findOne({ where: { id: artId }})
                break
            default:
                break
        }
        return art
    }
}

module.exports = { Art }