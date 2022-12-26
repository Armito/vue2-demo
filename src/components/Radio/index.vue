<template>
    <el-radio-group v-bind="$attrs" v-on="$listeners" v-model="_value">
        <component
            :is="_type"
            v-for="o in _options"
            v-bind="o"
            :key="o.value"
            :label="o.value"
        >
            {{ o.label }}
        </component>
    </el-radio-group>
</template>

<script>
const RadioTypeMap = {
    radio: 'el-radio',
    radiobutton: 'el-radio-button',
}

export default {
    name: 'Radio',

    model: {
        prop: 'value',
        event: 'update:value',
    },

    props: {
        type: {
            validator(val) {
                return ['radio', 'radiobutton'].includes(val)
            },
            default: 'radio',
        },

        value: {
            type: [String, Number],
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
            return RadioTypeMap[this.type]
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
