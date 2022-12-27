<template>
    <component
        :is="componentType"
        v-bind="$attrs"
        v-on="$listeners"
        v-model="_value"
        :type="fieldType"
    ></component>
</template>

<script>
import Select from '../Select/index.vue'
import Radio from '../Radio/index.vue'
import Checkbox from '../Checkbox/index.vue'

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
}

export default {
    name: 'ProFormItem',

    components: {
        Select,
        Radio,
        Checkbox,
    },

    model: {
        prop: 'value',
        event: 'update:value',
    },

    props: {
        fieldType: {
            validator(val) {
                return Object.keys(FieldTypeToComponentMap).includes(val)
            },
            required: true,
        },

        value: {
            type: [String, Number, Boolean, Date, Array],
        },
    },

    computed: {
        componentType() {
            return FieldTypeToComponentMap[this.fieldType]
        },

        _value: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('update:value', val)
            },
        },
    },
}
</script>
