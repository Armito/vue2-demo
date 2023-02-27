<template>
    <el-form
        label-width="100px"
        v-bind="$attrs"
        v-on="$listeners"
        :model="formModel"
        :ref="getFormRef"
    >
        <el-form-item
            v-for="item in items"
            v-bind="item"
            :key="item.prop"
            :label="item.label"
            :prop="item.prop"
        >
            <template #default>
                <template v-if="item.renderField">
                    <Render :render="item.renderField" :params="item" />
                </template>
                <template v-else>
                    <Field
                        :mode="mode"
                        v-bind="item.fieldProps"
                        v-on="item.fieldListeners"
                        v-model="formModel[item.prop]"
                        :fieldType="item.fieldType"
                    />
                </template>
            </template>

            <template #label>
                <template v-if="renderLabel || item.renderLabel">
                    <Render
                        :render="renderLabel || item.renderLabel"
                        :params="item"
                    />
                </template>
                <template v-else>
                    {{
                        (renderLabelText || item.renderLabelText)?.(
                            item.label,
                            item,
                        ) ?? item.label
                    }}
                </template>
            </template>
        </el-form-item>

        <el-form-item>
            <template v-if="renderOperation">
                <Render :render="renderOperation" :params="{ reset, submit }" />
            </template>
            <template v-else>
                <el-button @click="reset">重置</el-button>
                <el-button type="primary" @click="submit">查询</el-button>
            </template>
        </el-form-item>
    </el-form>
</template>

<script>
import Field from '../Field/index.vue'
import Render from '../Render/index.vue'

export default {
    name: 'Form',

    components: {
        Field,
        Render,
    },

    model: {
        prop: 'model',
        event: 'update:model',
    },

    props: {
        forwardRef: {
            type: Function,
        },

        /**
         * @typedef {object} Item
         * @property {function} Item.fieldType        -- Field类型
         * @property {function} Item.fieldProps       -- Field的props
         * @property {function} Item.fieldListeners   -- Field的events
         * @property {function} Item.renderField      -- 渲染自定义Field
         * @property {function} Item.renderLabel      -- 渲染自定义label
         * @property {function} Item.renderLabelText  -- 渲染自定义label文本
         */
        /**
         * @des column配置
         * @type {Item[]}
         */
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

        renderLabel: {
            type: Function,
        },

        renderLabelText: {
            type: Function,
        },

        renderOperation: {
            type: Function,
        },

        mode: {
            validator(value) {
                return ['read', 'edit'].includes(value)
            },
            default: 'edit',
        },
    },

    data() {
        return {
            formRef: null,
        }
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
        getFormRef(ref) {
            this.formRef = ref
            this.forwardRef?.(ref)
        },

        reset() {
            this.formRef.resetFields()
        },

        validate(callback = () => {}) {
            this.formRef.validate(callback)
        },

        submit() {
            this.formRef.validate((valid) => {
                valid && this.$emit('submit', this.formModel)
            })
        },
    },
}
</script>
