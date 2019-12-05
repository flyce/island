const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')

const classicField = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubDate: Sequelize.DATEONLY,
    favNums: Sequelize.INTEGER,
    title: Sequelize.STRING,
    type: Sequelize.TINYINT
}

class Movie extends Model {

}

Movie.init(classicField, {
    sequelize,
    tableName: 'movies'
})

class Music extends Model {

}

const musicField = Object.assign({url: Sequelize.STRING}, classicField)

Music.init(musicField, {
    sequelize,
    tableName: 'musics'
})

class Sentence extends Model {

}

Sentence.init(classicField, {
    sequelize,
    tableName: 'sentences'
})

module.exports = {
    Movie,
    Music,
    Sentence
}