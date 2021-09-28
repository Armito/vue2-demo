/*
 * @Author: your name
 * @Date: 2021-05-29 10:07:39
 * @LastEditTime: 2021-05-29 10:21:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-demo\src\assets\js\polyfill.js
 */
export const fromEntries = arrArg => {
    // Map
    if (Object.prototype.toString.call(arrArg) === '[object Map]') {
        const resMap = {}
        for (const key of arrArg.keys()) {
            resMap[key] = arrArg.get(key)
        }
        return resMap;
    }
    // array
    if (Array.isArray(arrArg)) {
        const resArr = {}
        arrArg.map(([key,value])=>{
            resArr[key] =  value
        })
        return resArr
    }
    throw 'Uncaught TypeError: argument is not iterable'
}

if (!Object.fromEntries) Object.fromEntries = fromEntries