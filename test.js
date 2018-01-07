

const Koa = require('koa')
const router = require('koa-router')()

const app = new Koa()

const multer = require('koa-multer')//加载koa-multer模块
//文件上传  
//配置  
let storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split('.')
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
})
//加载配置  
let upload = multer({dest: __dirname + '/public'})
//路由  
router.post('/upload', upload.single('file'), async (ctx, next) => {
    ctx.body = {
        filename: ctx.req.file.filename//返回文件名
    }
})

app.use(router.routes())
app.listen(3000)