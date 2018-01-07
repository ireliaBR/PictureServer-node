import Router from 'koa-router'
import Upload from './controller/upload'

const router = Router()

const upload = new Upload()

router.get('/', async (ctx) => {
    ctx.body = 'welcome picture server'
})

router.post('/upload', upload.picture)

export default router
