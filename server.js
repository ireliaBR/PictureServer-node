import Koa from 'koa'
import restc from 'restc'

const app = new Koa()

app.use(restc.koa2())

app.use(async ctx => {
    ctx.body = {
        user: 'asdf'
    }
})

app.listen(3000)

