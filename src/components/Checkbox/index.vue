<template>
    <el-checkbox-group v-bind="$attrs" v-on="$listeners" v-model="_value">
        <component
            :is="_type"
            v-for="o in _options"
            v-bind="o"
            :key="o.value"
            :label="o.value"
        >
            {{ o.label }}
        </component>
    </el-checkbox-group>
</template>

<script>
const CheckboxTypeMap = {
    checkbox: 'el-checkbox',
    checkboxbutton: 'el-checkbox-button',
}

export default {
    name: 'Checkbox',

    model: {
        prop: 'value',
        event: 'update:value',
    },

    props: {
        type: {
            validator(val) {
                return ['checkbox', 'checkboxbutton'].includes(val)
            },
            default: 'checkbox',
        },

        value: {
            type: Array,
        },

        options: {
            type: Array,
            default() {
                return []
            },
        },

        fieldMap: {
            type: Object,
            default: () => ({}),
        },
    },

    computed: {
        _type() {
            return CheckboxTypeMap[this.type]
        },

        _value: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('update:value', val)
            },
        },

        _options() {
            const _fieldMap = {
                value: this.fieldMap.value || 'value',
                label: this.fieldMap.label || 'label',
                disabled: this.fieldMap.disabled || 'disabled',
            }
            return this.options.map((o) => ({
                ...o,
                value: o[_fieldMap.value],
                label: o[_fieldMap.label],
                disabled: o[_fieldMap.disabled],
            }))
        },
    },
}
</script>
