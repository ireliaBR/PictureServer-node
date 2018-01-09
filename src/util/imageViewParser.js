/**
 * 提取格式
 * imageView2/<mode>/w/<LongEdge>
 * /h/<ShortEdge>
 * /format/<Format>
 * /interlace/<Interlace>
 * /q/<Quality>
 * /ignore-error/<ignoreError>
 */
export default class {
    /**
     * 模式提取
     * 0:限定缩略图的长边最多为<LongEdge>，短边最多为<ShortEdge>，进行等比缩放，不裁剪。如果只指定 w 参数则表示限定长边（短边自适应），只指定 h 参数则表示限定短边（长边自适应）。
     * 1:限定缩略图的宽最少为<Width>，高最少为<Height>，进行等比缩放，居中裁剪。转后的缩略图通常恰好是 <Width>x<Height> 的大小（有一个边缩放的时候会因为超出矩形框而被裁剪掉多余部分）。如果只指定 w 参数或只指定 h 参数，代表限定为长宽相等的正方图。
     * 2:限定缩略图的宽最多为<Width>，高最多为<Height>，进行等比缩放，不裁剪。如果只指定 w 参数则表示限定宽（长自适应），只指定 h 参数则表示限定长（宽自适应）。它和模式0类似，区别只是限定宽和高，不是限定长边和短边。从应用场景来说，模式0适合移动设备上做缩略图，模式2适合PC上做缩略图。
     * 3:限定缩略图的宽最少为<Width>，高最少为<Height>，进行等比缩放，不裁剪。如果只指定 w 参数或只指定 h 参数，代表长宽限定为同样的值。你可以理解为模式1是模式3的结果再做居中裁剪得到的。
     * 4:限定缩略图的长边最少为<LongEdge>，短边最少为<ShortEdge>，进行等比缩放，不裁剪。如果只指定 w 参数或只指定 h 参数，表示长边短边限定为同样的值。这个模式很适合在手持设备做图片的全屏查看（把这里的长边短边分别设为手机屏幕的分辨率即可），生成的图片尺寸刚好充满整个屏幕（某一个边可能会超出屏幕）。
     * 5:	限定缩略图的长边最少为<LongEdge>，短边最少为<ShortEdge>，进行等比缩放，居中裁剪。如果只指定 w 参数或只指定 h 参数，表示长边短边限定为同样的值。同上模式4，但超出限定的矩形部分会被裁剪。
     * @param str
     * @returns {Object.<path, pathAndMethod>|Boolean|Array|{index: number, input: string}|*}
     */
    static imageView2Parser(str) {
        return str.match(/imageView2\/[0-5]{1}(\/|$)/)
    }

    /**
     * 宽度提取
     * @param str
     * @returns {Object.<path, pathAndMethod>|Boolean|Array|{index: number, input: string}|*}
     */
    static widthParser(str) {
        return str.match(/w\/[0-9]{1,4}(\/|$)/)
    }

    /**
     * 高度提取
     * @param str
     * @returns {Object.<path, pathAndMethod>|Boolean|Array|{index: number, input: string}|*}
     */
    static heightParser(str) {
        return str.match(/h\/[0-9]{1,4}(\/|$)/)
    }

    /**
     * 输出图片格式
     * @param str
     * @returns {Object.<path, pathAndMethod>|Boolean|Array|{index: number, input: string}|*}
     */
    static formatParser(str) {
        return str.match(/format\/(png|jpg|jpeg)(\/|$)/)
    }

    /**
     * 是否支持渐进显示
     * @param str
     * @returns {Object.<path, pathAndMethod>|Boolean|Array|{index: number, input: string}|*}
     */
    static interlaceParser(str) {
        return str.match(/interlace\/[01]{1}(\/|$)/)
    }

    /**
     * 	新图的图片质量
     取值范围是[1, 100]，默认75。
     * @param str
     * @returns {Object.<path, pathAndMethod>|Boolean|Array|{index: number, input: string}|*}
     */
    static qualityParser(str) {
        return str.match(/q\/(100||[0-9]{1,2})(\/|$)/)
    }

    /**
     * 可选
     取值：1
     ● 未设置此参数时，正常返回处理结果。
     ● 设置了此参数时，若图像处理的结果失败，则返回原图。
     ● 设置了此参数时，若图像处理的结果成功，则正常返回处理结果。
     * @param str
     * @returns {Object.<path, pathAndMethod>|Boolean|Array|{index: number, input: string}|*}
     */
    static ignoreErrorParser(str) {
        return str.match(/ignore-error\/1(\/|$)/)
    }

}