<template>
    <component
        v-bind="$attrs"
        v-on="$listeners"
        v-model="innerValue"
        :is="componentType"
        :type="fieldType"
    ></component>
</template>

<script>
import Base from '../Base/index.vue'
import Select from '../Select/index.vue'
import Radio from '../Radio/index.vue'
import Checkbox from '../Checkbox/index.vue'
import Transfer from '../Transfer/index.vue'

// 注册字段类型到组件的映射
export const FieldTypeToComponentMap = {
    text: 'el-input',
    textarea: 'el-input',
    number: 'el-input-number',
    select: 'Select',
    radio: 'Radio',
    radiobutton: 'Radio',
    checkbox: 'Checkbox',
    checkboxbutton: 'Checkbox',
    switch: 'el-switch',
    date: 'el-date-picker',
    datetime: 'el-date-picker',
    year: 'el-date-picker',
    rate: 'el-rate',
    transfer: 'Transfer',
}

export default {
    name: 'Field',

    extends: Base,

    components: {
        Select,
        Radio,
        Checkbox,
        Transfer,
    },

    props: {
        fieldType: {
            validator(val) {
                return Object.keys(FieldTypeToComponentMap).includes(val)
            },
            default: 'text',
        },
    },

    computed: {
        componentType() {
            return FieldTypeToComponentMap[this.fieldType]
        },
    },
}
</script>
