import Router from 'koa-router'
import Upload from './controller/upload'
import Resource from './controller/resource'

const router = Router()

const upload = new Upload()
const resource = new Resource()

router.get('/', async (ctx) => {
    ctx.body = 'welcome picture server'
})

router.post('/upload', upload.picture.bind(upload))
router.get('/resource/:filename', resource.picture.bind(resource))

export default router
