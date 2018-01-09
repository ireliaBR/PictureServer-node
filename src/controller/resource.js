import file from '../service/file'
import path from 'path'
import wrapper from '../util/wrapper'
import fs from 'fs'
import imageinfo from 'imageinfo'
import im from 'imagemagick'
import ParserModel from '../model/parserModel'

export default class {
    /**
     * 获取图片
     * @param ctx
     * @returns {Promise.<void>}
     */
    async picture(ctx) {
        //校验
        const filename = ctx.params.filename
        if (/^[a-f0-9]{32}$/.test(filename) === false) {
            ctx.throw(400, 'picture invalid syntax')
            return
        }

        //解析
        const dirpath = file.parserDirector(filename)
        const originPath = path.join(dirpath, 'origin')
        const isExist = await file.fileIsExists(originPath)
        if (!isExist) {
            ctx.throw(404, 'picture not found')
            return
        }

        let parser = null
        let parserModel = new ParserModel(ctx.originalUrl)
        switch (parserModel.mode) {
            default:
                parser = await this.parserOrigin(originPath)
                break
            case 0:
                parser = await this.parserMode0(originPath, parserModel)
                break
        }
        
        if (!parser) {
            ctx.throw(500, 'server error')
            return
        }

        const {pic, info} = parser
        ctx.res.writeHead(200, {'content-type': info.mimeType})
        ctx.res.end(pic, 'binary')
    }

    async parserOrigin(filepath) {
        const fileData = await wrapper.promise(fs.readFile)(filepath)
        const pic = fileData.toString('binary', 0, fileData.length)
        const info = imageinfo(fileData)
        return {pic, info}
    }

    async parserMode0(filepath, parserModel) {
        Object.assign(parserModel, {
            srcPath: filepath
        })
        const fileData = await wrapper.promise(im.resize)(parserModel)
        const pic = fileData.toString('binary', 0, fileData.length)
        const info = imageinfo(fileData)
        return {pic, info}
    }
}