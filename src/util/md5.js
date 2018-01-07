import crypto from 'crypto'
import fs from 'fs'
class md5 {

    /**
     * 通过stream生成md5签名
     * @param stream 例：let stream = fs.createReadStream(path)
     * @returns {Promise.<void>} md5签名
     */
    static async picture(stream) {
        if (!stream) return ''
        let md5sum = crypto.createHash('md5')


        let promise = new Promise((resolve, reject) => {
            stream.on('data', (chunk) => {
                md5sum.update(chunk)
            })
            stream.on('end', () => {
                let str = md5sum.digest('hex').toUpperCase()
                resolve(str)
            })
        })
        return promise
    }
}

export default md5
