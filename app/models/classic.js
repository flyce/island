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
    tableName: 'movie'
})

class Music extends Model {

}

const musicField = Object.assign({url: Sequelize.STRING}, classicField)

Music.init(musicField, {
    sequelize,
    tableName: 'music'
})

class Sentence extends {

}

Sentence.init(classicField, {
    sequelize,
    tableName: 'sentence'
})

module.exports = {
    Movie,
    Music,
    Sentence
}