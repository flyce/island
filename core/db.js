const Sequelize = require('sequelize')
const { dbName, user, password, host, port } = require('../config/env').database;

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: console.log,
    timezone: '+08:00',
    define: {
        timestamps: true,
        // paranoid: true,
        freezeTableName: true,
        scopes: {
            bh: {
                attributes: {
                    exclude: ['updatedAt', 'createdAt']
                }
            }
        }
    }
})

sequelize.sync({
    force: false
})

module.exports = {
    sequelize
}