<template>
    <el-tooltip placement="top" v-bind="$attrs" :content="content">
        <template #default>
            <slot name="default">
                <span>
                    {{
                        content.length > length
                            ? content.slice(0, length) + '...:'
                            : content + '：'
                    }}
                </span>
            </slot>
        </template>

        <template #content>
            <template v-if="renderContent">
                <Render :render="renderContent" :params="{ content }" />
            </template>
            <template v-else>
                <slot name="content" :content="content"></slot>
            </template>
        </template>
    </el-tooltip>
</template>

<script>
import Render from '../Render/index.vue'

export default {
    name: 'LongTextTooltip',

    components: {
        Render,
    },

    props: {
        content: {
            type: String,
            default: '',
        },

        length: {
            type: Number,
            default: 4,
        },

        renderContent: {
            type: Function,
        },
    },
}
</script>
