module.exports = {
    environment: 'dev',
    database: {
        dbName: 'island',
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'WuYa8622'
    },
    security: {
        secretKey: "abcdefg",
        expiresIn: 60 * 60 * 24 * 30
    },
    wx: {
        appId: 'wxc7f69d578fd1526a',
        appSecret: '621947d2c94e74314c760c8f5a1d505e',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}