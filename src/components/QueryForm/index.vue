<template>
    <el-form
        v-bind="$attrs"
        v-on="$listeners"
        :inline="true"
        :model="formModel"
    >
        <el-form-item
            v-for="item in items"
            v-bind="item.formItem"
            :key="item.prop"
            :label="item.label"
        >
            <ProFormItem
                v-if="!item.render"
                v-bind="item.proFormItem"
                v-model="formModel[item.prop]"
                :fieldType="item.fieldType"
                :options="item.options"
            />
            <RenderItemComponent v-else :render="item.render" />
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import ProFormItem from '../ProFormItem/index.vue'
import RenderItemComponent from '../RenderItemComponent/index.vue'

export default {
    name: 'QueryForm',

    components: {
        ProFormItem,
        RenderItemComponent,
    },

    model: {
        prop: 'value',
        event: 'update:value',
    },

    props: {
        items: {
            type: Array,
            default() {
                return []
            },
        },

        value: {
            type: Object,
        },
    },

    data() {
        return {}
    },

    computed: {
        formModel: {
            get() {
                return this.value || {}
            },

            set(val) {
                this.$emit('update:value', val)
            },
        },
    },

    methods: {
        onSubmit() {
            this.$emit('submit', this.formModel)
        },
    },
}
</script>
