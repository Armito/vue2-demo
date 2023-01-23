<template>
    <el-transfer
        v-bind="$attrs"
        v-on="$listeners"
        v-model="innerValue"
        :ref="forwardRef"
        :data="innerData"
    >
        <template #default="{ option }">
            <template v-if="$scopedSlots.default">
                <slot name="default" :option="option"></slot>
            </template>
        </template>

        <template #left-footer>
            <template v-if="renderLeftFooter">
                <Render :render="renderLeftFooter" />
            </template>
            <template v-else-if="$scopedSlots['left-footer']">
                <slot name="left-footer"></slot>
            </template>
        </template>

        <template #right-footer>
            <template v-if="renderRightFooter">
                <Render :render="renderRightFooter" />
            </template>
            <template v-else-if="$scopedSlots['right-footer']">
                <slot name="right-footer"></slot>
            </template>
        </template>
    </el-transfer>
</template>

<script>
import Base from '../Base/index.vue'
import Render from '../Render/index'

export default {
    name: 'Transfer',

    extends: Base,

    components: {
        Render,
    },

    props: {
        forwardRef: {
            type: Function,
        },

        /**
         * @type {Options}
         */
        data: {
            type: Array,
            default() {
                return []
            },
        },

        renderLeftFooter: {
            type: Function,
        },

        renderRightFooter: {
            type: Function,
        },
    },

    computed: {
        innerData() {
            return this.data.map((d) => ({
                ...d,
                key: d.value ?? d.key,
            }))
        },
    },
}
</script>
