import fs from 'fs'
import config from '../config'
import path from 'path'
import md5 from '../util/md5'
import imageinfo from 'imageinfo'
import file from '../service/file'

export default class {
    async picture(ctx) {
        //读取文件信息
        const avatar = ctx.request.body.files.avatar
        const fileData = fs.readFileSync(avatar.path)
        const info = imageinfo(fileData)
        let reader = fs.createReadStream(avatar.path)
        const md5str = await md5.picture(reader)
        reader = fs.createReadStream(avatar.path)

        //创建文件夹
        let picPath = await file.createDirectory(md5str)
        picPath = path.join(picPath, 'origin')
        //保存图片
        const picIsExist = await file.fileIsExists(picPath)
        if (!picIsExist) {
            const stream = fs.createWriteStream(picPath)
            reader.pipe(stream)
            console.log('uploading %s -> %s', file.name, stream.path)
        }

        ctx.body = {
            message: 'success'
        }
    }
}