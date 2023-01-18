<template>
    <el-tabs v-bind="$attrs" v-model="currentTab">
        <el-tab-pane
            v-for="{ render, renderLabel, renderText, ...tab } in tabs"
            v-bind="tab"
            :key="tab.name"
        >
            <template #label>
                <Render
                    v-if="renderLabel"
                    :render="renderLabel"
                    :params="tab"
                />
                <template v-else>
                    {{ renderText ? renderText(tab) : tab.label }}
                </template>
            </template>

            <template #default>
                <Render v-if="render" :render="render" :params="tab" />
            </template>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import Render from '../Render/index.vue'

export default {
    name: 'Tabs',

    model: {
        prop: 'value',
        event: 'update:value',
    },

    components: {
        Render,
    },

    props: {
        value: {
            type: String,
            required: true,
        },

        /**
         * @typedef {object} Tabpane
         * @property {function} Tabpane.render            -- 渲染内容
         * @property {function} Tabpane.renderLabel       -- 渲染label
         * @property {function} Tabpane.renderText        -- 渲染label文本
         */
        /**
         * @des tab页配置
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
