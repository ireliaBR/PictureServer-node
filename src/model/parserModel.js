import imageViewParser from '../util/imageViewParser'

class ParserModel {
    /**
     * 解析字符串
     * @param str
     */
    constructor(str) {
        let obj = {}
        const mode = imageViewParser.imageView2Parser(str)
        const width = imageViewParser.widthParser(str)
        const height = imageViewParser.heightParser(str)
        const format = imageViewParser.formatParser(str)
        const interlace = imageViewParser.interlaceParser(str)
        const quality = imageViewParser.qualityParser(str)
        const ignoreError = imageViewParser.ignoreErrorParser(str)
        if (mode) obj['mode'] = parseInt(mode[0].split('/')[1])
        if (width) obj['width'] = parseInt(width[0].split('/')[1])
        if (height) obj['height'] = parseInt(height[0].split('/')[1])
        if (format) obj['format'] = format[0].split('/')[1]
        if (interlace) obj['interlace'] = parseInt(interlace[0].split('/')[1])
        if (quality) obj['quality'] = parseInt(quality[0].split('/')[1])/100.0
        if (ignoreError) obj['ignoreError'] = parseInt(ignoreError[0].split('/')[1])

        if (obj.width && !obj.height) {
            obj.height = obj.width
        }
        if (!obj.width && obj.height) {
            obj.width = obj.height
        }

        Object.assign(this, obj)
    }

}

export default ParserModel

