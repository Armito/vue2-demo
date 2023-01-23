<template>
    <el-radio-group
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
    </el-radio-group>
</template>

<script>
import Base from '../Base/index.vue'
import Render from '../Render/index.vue'

const RadioTypeMap = {
    radio: 'el-radio',
    radiobutton: 'el-radio-button',
}

export default {
    name: 'Radio',

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
                return Object.keys(RadioTypeMap).includes(val)
            },
            default: 'radio',
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
            return RadioTypeMap[this.type]
        },

        innerOptions() {
            return this.options.map((o) => ({
                ...o,
                value: o[this.fieldMap.value || 'value'],
                label: o[this.fieldMap.label || 'label'],
                disabled: o[this.fieldMap.disabled || 'disabled'],
            }))
        },
    },
}
</script>
