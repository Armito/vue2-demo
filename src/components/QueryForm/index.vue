<template>
    <el-form ref="formRef" v-bind="$attrs" v-on="$listeners" :model="formModel">
        <el-form-item
            v-for="item in items"
            v-bind="item.formItem"
            :key="item.prop"
            :label="item.label"
            :prop="item.prop"
        >
            <ProFormItem
                v-if="!item.slot"
                v-bind="item.proFormItem"
                v-model="formModel[item.prop]"
                :fieldType="item.fieldType"
                :options="item.options"
            />
            <slot :name="item.slot"></slot>
        </el-form-item>

        <el-form-item>
            <template v-if="!$scopedSlots.operation">
                <el-button @click="reset">重置</el-button>
                <el-button type="primary" @click="submit">查询</el-button>
            </template>
            <slot name="operation" :reset="reset" :submit="submit"></slot>
        </el-form-item>
    </el-form>
</template>

<script>
import ProFormItem from '../ProFormItem/index.vue'

export default {
    name: 'QueryForm',

    components: {
        ProFormItem,
    },

    model: {
        prop: 'model',
        event: 'update:model',
    },

    props: {
        items: {
            type: Array,
            default() {
                return []
            },
        },

        model: {
            type: Object,
            required: true,
        },
    },

    computed: {
        formModel: {
            get() {
                return this.model || {}
            },
            set(val) {
                this.$emit('update:model', val)
            },
        },
    },

    methods: {
        reset() {
            this.$refs.formRef.resetFields()
        },

        validate(callback = () => {}) {
            this.$refs.formRef.validate(callback)
        },

        submit() {
            this.$refs.formRef.validate((valid) => {
                valid && this.$emit('submit', this.formModel)
            })
        },
    },
}
</script>
