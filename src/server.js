import Koa from 'koa'
import koaBody from 'koa-body'
import router from './router'
import config from './config'

const app = new Koa()

app.use(koaBody({multipart: true}))
app.use(router.routes())

if (!module.parent) app.listen(config.port)

export default app

