<template>
    <el-select
        v-bind="$attrs"
        v-on="$listeners"
        v-model="innerValue"
        :ref="forwardRef"
    >
        <template #default>
            <template v-if="renderOptions">
                <Render
                    :render="renderOptions"
                    :params="{ options: innerOptions }"
                />
            </template>
            <template v-else>
                <slot name="default">
                    <el-option
                        v-for="o in innerOptions"
                        v-bind="o"
                        :key="o.value"
                    />
                </slot>
            </template>
        </template>

        <template #prefix>
            <template v-if="renderPrefix">
                <Render :render="renderPrefix" />
            </template>
            <template v-else-if="$scopedSlots.prefix">
                <slot name="prefix"></slot>
            </template>
        </template>

        <template #empty>
            <template v-if="renderEmpty">
                <Render :render="renderEmpty" />
            </template>
            <template v-else-if="$scopedSlots.empty">
                <slot name="empty"></slot>
            </template>
        </template>
    </el-select>
</template>

<script>
import Base from '../Base/index.vue'
import Render from '../Render/index.vue'

export default {
    name: 'Select',

    extends: Base,

    components: {
        Render,
    },

    props: {
        forwardRef: {
            type: Function,
        },

        options: {
            type: Array,
            required: true,
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

        renderOptions: {
            type: Function,
        },

        renderPrefix: {
            type: Function,
        },

        renderEmpty: {
            type: Function,
        },

        infiniteScroll: {
            type: Function,
        },

        infiniteScrollProps: {
            type: Object,
            default() {
                return {}
            },
        },
    },

    computed: {
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

<style scoped></style>
