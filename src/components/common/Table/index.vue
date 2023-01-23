<template>
    <el-table
        v-bind="$attrs"
        v-on="$listeners"
        :ref="forwardRef"
        style="width: 100%"
    >
        <template #default>
            <template v-for="(c, idx) in columns">
                <el-table-column
                    v-if="c.type"
                    :key="c.prop ?? idx"
                    v-bind="c"
                />

                <el-table-column v-else :key="c.prop" v-bind="c">
                    <template #default="{ row, column, $index }">
                        <template v-if="c.render">
                            <Render
                                :render="c.render"
                                :params="{ row, column, $index }"
                            />
                        </template>
                        <template v-else>
                            {{
                                c.renderText?.(row[c.prop], row) ?? row[c.prop]
                            }}
                        </template>
                    </template>

                    <template #header="{ column, $index }">
                        <template v-if="c.renderHeader">
                            <Render
                                :render="c.renderHeader"
                                :params="{ column, $index }"
                            />
                        </template>
                        <template v-else>
                            {{
                                c.renderHeaderText?.(column.label, row) ??
                                column.label
                            }}
                        </template>
                    </template>
                </el-table-column>
            </template>
        </template>

        <template #append>
            <template v-if="renderAppend">
                <Render :render="renderAppend" />
            </template>
        </template>
    </el-table>
</template>

<script>
import Render from '../Render/index.vue'

export default {
    name: 'Table',

    components: {
        Render,
    },

    props: {
        forwardRef: {
            type: Function,
        },

        /**
         * @typedef {object} Column
         * @property {function} Column.render             -- 渲染单元格
         * @property {function} Column.renderText         -- 渲染单元格文本
         * @property {function} Column.renderHeader       -- 渲染标题格
         * @property {function} Column.renderHeaderText   -- 渲染标题格文本
         */
        /**
         * @des column配置
         * @type {Column[]}
         */
        columns: {
            type: Array,
            default() {
                return []
            },
        },

        renderAppend: {
            type: Function,
        },
    },
}
</script>
