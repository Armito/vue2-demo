<template>
    <el-tooltip effect="dark" v-bind="$attrs">
        <template #default>
            <Icon type="el-icon-info" />
        </template>
        <template #content>
            <slot name="content"></slot>
        </template>
    </el-tooltip>
</template>

<script>
import Icon from '../ARComponent/Icon/index.vue'

export default {
    name: 'IconInfo',

    components: {
        Icon,
    },
}
</script>
