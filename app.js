const Koa = require('koa')
const classic = require('./api/v1/classic')
const book = require('./api/v1/book')

const app = new Koa()

app.use(book.routes())
app.use(classic.routes())

app.listen(3000, () => {
    console.log('koa running on port 3000')
})