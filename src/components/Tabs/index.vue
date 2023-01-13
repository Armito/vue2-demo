<template>
    <el-tabs v-bind="$attrs" v-model="currentTab">
        <el-tab-pane v-for="tab in tabs" v-bind="tab" :key="tab.name">
            <template #label>
                <RenderComponent
                    v-if="tab.renderLabel"
                    :render="tab.renderLabel"
                />
                <template v-else>{{ tab.label }}</template>
            </template>

            <template #default>
                <RenderComponent v-if="tab.render" :render="tab.render" />
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
