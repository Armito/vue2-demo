<template>
    <el-tooltip effect="dark" v-bind="$attrs">
        <template #default>
            <Icon type="el-icon-info" />
        </template>

        <template #content>
            <template v-if="renderContent">
                <Render :render="renderContent" />
            </template>
            <template v-else>
                <slot name="content"></slot>
            </template>
        </template>
    </el-tooltip>
</template>

<script>
import Icon from '../ARComponent/Icon/index.vue'
import Render from '../ARComponent/Render/index.vue'

export default {
    name: 'IconInfo',

    components: {
        Icon,
        Render,
    },

    props: {
        renderContent: {
            type: Function,
        },
    },
}
</script>
