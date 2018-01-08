import file from '../service/file'
import path from 'path'
import wrapper from '../util/wrapper'
import fs from 'fs'
import imageinfo from 'imageinfo'

export default class {
    /**
     * 获取图片
     * @param ctx
     * @returns {Promise.<void>}
     */
    async picture(ctx) {
        //校验
        const filename = ctx.params.filename
        if (/^[A-F0-9]{32}\.*?(png|jpg)$/.test(filename) === false) {
            ctx.throw(400, 'picture invalid syntax')
            return
        }

        //解析
        const split = filename.split('.')
        const md5str = split[0]
        const type = split[1]
        const dirpath = file.parserDirector(md5str)
        const originPath = path.join(dirpath, `origin.${type}`)
        const isExist = await file.fileIsExists(originPath)
        if (!isExist) {
            ctx.throw(404, 'picture not found')
            return
        }
        const fileData = await wrapper.promise(fs.readFile)(originPath)
        const info = imageinfo(fileData)
        const pic = fileData.toString('binary', 0, fileData.length)
        ctx.res.writeHead(200, {'content-type': info.mimeType})
        ctx.res.end(pic, 'binary')
    }
}