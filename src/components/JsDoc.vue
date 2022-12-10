<template>
    <div>{{ name1 }}{{ name2 }}</div>
</template>

<script>
import { getBookList } from '@/api'

export default {
    data() {
        return {
            name1: '',
            name2: '',
        }
    },

    mounted() {
        this.name1 = this.genFullNameByStr('Armito', 'Zeng')
        this.name2 = this.genFullNameByObj({
            firstName: 'Armito',
            lastName: 'Zeng',
        })
    },

    methods: {
        /**
         * @description 通过字符串生成全名
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
         * @param {NameObj} nameObj
         * @return {string}
         */
        genFullNameByObj({ firstName, middleName = '', lastName = '' }) {
            return firstName + middleName + lastName
        },
    },
}
</script>
