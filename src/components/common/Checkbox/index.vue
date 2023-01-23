<template>
    <el-checkbox-group
        v-bind="$attrs"
        v-on="$listeners"
        v-model="innerValue"
        :ref="forwardRef"
    >
        <component
            :is="innerType"
            v-for="o in innerOptions"
            v-bind="o"
            :key="o.value"
            :label="o.value"
        >
            <template #default>
                <template v-if="renderLabel">
                    <Render :render="renderLabel" :params="o" />
                </template>

                <template v-else>
                    <slot name="default">
                        {{ renderText?.(o.label, o) ?? o.label }}
                    </slot>
                </template>
            </template>
        </component>
    </el-checkbox-group>
</template>

<script>
import Base from '../Base/index.vue'
import Render from '../Render/index.vue'

const CheckboxTypeMap = {
    checkbox: 'el-checkbox',
    checkboxbutton: 'el-checkbox-button',
}

export default {
    name: 'Checkbox',

    extends: Base,

    components: {
        Render,
    },

    props: {
        forwardRef: {
            type: Function,
        },

        type: {
            validator(val) {
                return Object.keys(CheckboxTypeMap).includes(val)
            },
            default: 'checkbox',
        },

        options: {
            type: Array,
            default() {
                return []
            },
        },

        fieldMap: {
            type: Object,
            default() {
                return {}
            },
        },

        renderLabel: {
            type: Function,
        },

        renderText: {
            type: Function,
        },
    },

    computed: {
        innerType() {
            return CheckboxTypeMap[this.type]
        },

        innerOptions() {
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
