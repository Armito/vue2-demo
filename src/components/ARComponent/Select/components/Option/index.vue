<template>
    <el-option v-bind="source" :key="source.value">
        <template v-if="renderOption">
            <Render :render="renderOption" :params="source" />
        </template>
        <template v-else-if="renderOptionText">
            {{ renderOptionText(source.label, source) }}
        </template>
    </el-option>
</template>

<script>
import Render from '../../../Render/index.vue'

export default {
    name: 'Option',

    components: {
        Render,
    },

    props: {
        index: {
            type: Number,
        },

        source: {
            type: Object,
            default() {
                return {}
            },
        },

        renderOption: {
            type: Function,
        },

        renderOptionText: {
            type: Function,
        },
    },
}
</script>
