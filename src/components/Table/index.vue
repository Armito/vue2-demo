<template>
    <el-table
        ref="tableRef"
        v-bind="$attrs"
        v-on="$listeners"
        style="width: 100%"
    >
        <el-table-column
            v-if="hasSelection"
            type="selection"
            width="55"
        ></el-table-column>

        <el-table-column v-if="hasIndex" type="index"></el-table-column>

        <el-table-column v-for="c in columns" :key="c.prop" v-bind="c">
            <template #default="{ row, column, $index }">
                <RenderComponent
                    v-if="c.render"
                    :render="c.render"
                    :params="{ row, column, $index }"
                />
                <template v-else>{{ row[c.prop] }}</template>
            </template>

            <template #header="{ column, $index }">
                <RenderComponent
                    v-if="c.renderHeader"
                    :render="c.renderHeader"
                    :params="{ column, $index }"
                />
                <template v-else>{{ column.label }}</template>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import RenderComponent from '../RenderComponent/index.vue'

export default {
    name: 'Table',

    components: {
        RenderComponent,
    },

    props: {
        columns: {
            type: Array,
            default: () => [],
        },

        hasSelection: {
            type: Boolean,
            default: false,
        },

        hasIndex: {
            type: Boolean,
            default: false,
        },
    },
}
</script>
