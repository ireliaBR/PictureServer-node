
class wrapper {
    /**
     * 将callback的函数 转换成 promise函数
     * @param func
     * @returns {function(...[*])}
     */
    static promise(func) {
        return (...args) => {
            return new Promise((resolve, reject) => {
                func(...args, (err, ...result) => {
                    if (err) reject(err)
                    resolve(...result)
                })
            })
        }
    }

    /**
     * 当callback只会正确结果时用这个 例如：fs.exists()
     * @param func
     * @returns {function(...[*])}
     */
    static promiseOneResult(func) {
        return (...args) => {
            return new Promise((resolve, reject) => {
                func(...args, (...result) => {
                    resolve(...result)
                })
            })
        }
    }
}

export default wrapper