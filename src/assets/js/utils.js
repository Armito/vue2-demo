/*
 * @Author: Armito
 * @Date: 2021-04-25 15:29:45
 * @LastEditTime: 2021-06-21 11:30:48
 * @LastEditors: Please set LastEditors
 * @Description: 工具函数库
 * @FilePath: \vue-demo\src\assets\js\utils.js
 */

/**
 * @description: 防抖
 * @param {Function} fn
 * @param {Number} delay
 * @return {Function}
 */
export const debounce = (fn, delay = 500) => {
    let then = new Date().getTime()
    let timer = null
    return (...val) => {
        let now = new Date().getTime()
        if (now - then < delay) {
            timer && clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(fn.bind(null, ...val), delay) 
        then = now
    }
}

/**
 * @description: 节流
 * @param {Function} fn
 * @param {Number} interval
 * @return {Function}
 */
export const throttle = (fn, interval = 500) => {
    let run = true
    return (...val) => {
        if (!run) return
        run = false
        setTimeout(() => {
            fn.call(null, ...val)
            run = true
        }, interval)
    }
}

export const Browser = {
    CHROME: 1,
    IE: 2,
    OPERA: 3,
    FIREFOX: 4,
    SAFARI: 5,
    EDGE: 6
}

/**
 * @description: 浏览器类型鉴别
 * @param {*}
 * @return {Browser}
 */
export const checkBrowser = () => {
    const userAgent = navigator.userAgent

    if (userAgent.indexOf('Opera') > -1) {
        return Browser.OPERA
    }

    if (
        userAgent.indexOf('compatible') > -1 &&
        userAgent.indexOf('MSIE') > -1 &&
        userAgent.indexOf('Opera') === -1
    ) {
        return Browser.IE
    }

    if (userAgent.indexOf('Edge') > -1) {
        return Browser.EDGE
    }

    if (userAgent.indexOf('Firefox') > -1) {
        return Browser.FIREFOX
    }

    if (
        userAgent.indexOf("Safari") > -1 &&
        userAgent.indexOf("Chrome") === -1
    ) {
        return Browser.SAFARI
    }

    if (
        userAgent.indexOf("Chrome") > -1 &&
        userAgent.indexOf("Safari") > -1
    ) {
        return Browser.CHROME
    }
}

export const readFile = (file) => {
    const fileReader = new FileReader()
    const task = new Promise((resolve, reject) => {
        fileReader.onload = (res) => {
            resolve(res.target.result)
        }
        fileReader.onerror = (err) => {
            reject(err)
        }
    })

    return {
        text() {
            fileReader.readAsText(file)
            return task
        },
        dataURL() {
            fileReader.readAsDataURL(file)
            return task
        },
        arrayBuffer() {
            fileReader.readAsArrayBuffer(file)
            return task
        },
        binaryString() {
            fileReader.readAsBinaryString(file)
            return task
        }
    }
}