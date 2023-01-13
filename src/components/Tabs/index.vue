<template>
    <el-tabs v-bind="$attrs" v-model="currentTab">
        <el-tab-pane
            v-for="{ render, renderLabel, ...tab } in tabs"
            v-bind="tab"
            :key="tab.name"
        >
            <template #label>
                <RenderComponent v-if="renderLabel" :render="renderLabel" />
                <template v-else>{{ tab.label }}</template>
            </template>

            <template #default>
                <RenderComponent v-if="render" :render="render" />
            </template>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import RenderComponent from '../RenderComponent/index.vue'

export default {
    model: {
        prop: 'value',
        event: 'update:value',
    },

    components: {
        RenderComponent,
    },

    props: {
        value: {
            type: String,
            required: true,
        },

        /**
         * @typedef {object} Tabpane
         * @property {function} Tabpane.render        -- 渲染内容
         * @property {function} Tabpane.renderLabel   -- 渲染label
         */
        /**
         * @type {Tabpane[]}
         */
        tabs: {
            type: Array,
            default: () => [],
        },
    },

    computed: {
        currentTab: {
            get() {
                return this.value
            },
            set(v) {
                this.$emit('update:value', v)
            },
        },
    },
}
</script>
