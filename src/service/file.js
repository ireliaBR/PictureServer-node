import fs from 'fs'
import config from '../config'
import wrapper from '../util/wrapper'
import path from 'path'

class file {
    /**
     * 通过图片的md5签名创建文件夹
     * 例：C7EE91B33FAE5EFAE45AF58088297E60 将在图片根目录下创建 C7/EE/91/B33FAE5EFAE45AF58088297E60的多层目录结构
     * @param pictureMd5str 图片的md5签名
     * @returns {Promise.<void>} 返回目录地址
     */
    static async createDirectory(pictureMd5str) {
        if (pictureMd5str.length != 32) throw new Error('图片md5签名格式不正确')
        const dirOne = pictureMd5str.substring(0, 2)
        const dirTwo = pictureMd5str.substring(2, 4)
        const dirThree = pictureMd5str.substring(4, 6)
        const dirFour = pictureMd5str.substring(6, pictureMd5str.length)

        await this.createDir(path.join(config.fileRootPath, dirOne))
        await this.createDir(path.join(config.fileRootPath, dirOne, dirTwo))
        await this.createDir(path.join(config.fileRootPath, dirOne, dirTwo, dirThree))
        await this.createDir(path.join(config.fileRootPath, dirOne, dirTwo, dirThree, dirFour))
        return path.join(config.fileRootPath, dirOne, dirTwo, dirThree, dirFour)
    }

    /**
     * 解析路径
     * @param pictureMd5str
     * @returns {Promise.<void>}
     */
    static parserDirector(pictureMd5str) {
        const dirOne = pictureMd5str.substring(0, 2)
        const dirTwo = pictureMd5str.substring(2, 4)
        const dirThree = pictureMd5str.substring(4, 6)
        const dirFour = pictureMd5str.substring(6, pictureMd5str.length)
        return path.join(config.fileRootPath, dirOne, dirTwo, dirThree, dirFour)
    }

    static async fileIsExists(picturePath) {
        let exists = null
        try {
            exists = await wrapper.promise(fs.stat)(picturePath)
        } catch (err) {
            return false
        }
        if (!exists) return false
        return exists.isFile()
    }

    /**
     * 通过path创建文件夹
     * @param dirPath
     * @returns {Promise.<void>}
     */
    static async createDir(dirPath) {
        const oneExists = await wrapper.promiseOneResult(fs.exists)(dirPath)
        if (!oneExists) {
            await wrapper.promise(fs.mkdir)(dirPath)
        }
    }
}

export default file


