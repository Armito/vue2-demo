/*
 * @Author: Armito
 * @Date: 2021-06-30 15:39:58
 * @LastEditTime: 2021-07-20 14:28:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-demo\eslintrec.js
 */
module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:vue/essential', '@vue/prettier'],
    parserOptions: {
        parser: 'babel-eslint',
    },
    plugins: ['vue'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['error', 4, { SwitchCase: 1 }],
        'prettier/prettier': 'off',
        'no-unused-vars': 'off',
        'vue/no-unused-vars': 'off',
    },
}
