<template>
    <div>{{ name1 }}{{ name2 }}</div>
</template>

<script>
import { getBookList } from '@/api'

/**
 * @module components/JsDoc
 * @vue-data {String} name1
 * @vue-data {String} name2
 * @vue-event {genFullNameByStr} genFullNameByStr
 * @vue-event {genFullNameByObj} genFullNameByObj
 */
export default {
    data() {
        return {
            /**
             * @type {string}
             */
            name1: '',
            name2: '',
        }
    },

    methods: {
        /**
         * @description 通过字符串生成全名
         * @function genFullNameByStr
         * @param {string} firstName
         * @param {string} [middleName='']
         * @param {string} [lastName='']
         * @return {string}
         */
        genFullNameByStr(firstName, middleName = '', lastName = '') {
            return firstName + middleName + lastName
        },

        /**
         * @typedef {object} NameObj
         * @property {string} firstName
         * @property {string} [middleName]
         * @property {string} [lastName]
         */

        /**
         * @description 通过对象生成全名
         * @function genFullNameByObj
         * @param {NameObj} nameObj
         * @return {string}
         */
        genFullNameByObj({ firstName, middleName = '', lastName = '' }) {
            return firstName + middleName + lastName
        },
    },

    mounted() {
        this.name1 = this.genFullNameByStr('Armito', 'Zeng')
        this.name2 = this.genFullNameByObj({
            firstName: 'Armito',
            lastName: 'Zeng',
        })
    },
}
</script>
