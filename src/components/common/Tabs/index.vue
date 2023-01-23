<template>
    <el-tabs v-bind="$attrs" v-on="$listeners" v-model="innerValue">
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
                    {{ renderText?.(tab.label, tab) ?? tab.label }}
                </template>
            </template>

            <template #default>
                <Render v-if="render" :render="render" :params="tab" />
            </template>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import Base from '../Base/index.vue'
import Render from '../Render/index.vue'

export default {
    name: 'Tabs',

    extends: Base,

    components: {
        Render,
    },

    props: {
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
}
</script>
