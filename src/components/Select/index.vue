<template>
    <el-select
        ref="selectRef"
        v-bind="$attrs"
        v-on="$listeners"
        v-model="_value"
    >
        <template #default>
            <slot name="default">
                <div class="option-wrapper">
                    <el-option
                        v-for="o in _options"
                        v-bind="o"
                        :key="o.value"
                    />

                    <template v-if="hasPage">
                        <el-divider />
                        <el-pagination
                            v-bind="{
                                ...defaultPaginationProps,
                                ...paginationProps,
                            }"
                            @size-change="onPageSizeChange"
                            @current-change="onCurrentPageChange"
                            @prev-click="onCurrentPageChange"
                            @next-click="onCurrentPageChange"
                        />
                    </template>
                </div>
            </slot>
        </template>

        <template #prefix>
            <slot name="prefix"></slot>
        </template>

        <template #empty>
            <slot name="empty"></slot>
        </template>
    </el-select>
</template>

<script>
export default {
    name: 'Select',

    model: {
        prop: 'value',
        event: 'update:value',
    },

    props: {
        value: [String, Number],

        options: {
            type: Array,
            required: true,
            default: () => [],
        },

        fieldMap: {
            type: Object,
            default: () => ({}),
        },

        hasPage: {
            type: Boolean,
            default: false,
        },

        paginationProps: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        this.defaultPaginationProps = {
            small: true,
            layout: 'sizes, prev, pager, next',
            'hide-on-single-page': true,
        }
        return {}
    },

    computed: {
        _value: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('update:value', val)
            },
        },

        _options() {
            const _fieldMap = {
                value: this.fieldMap.value || 'value',
                label: this.fieldMap.label || 'label',
                disabled: this.fieldMap.disabled || 'disabled',
            }
            return this.options.map((o) => ({
                ...o,
                value: o[_fieldMap.value],
                label: o[_fieldMap.label],
                disabled: o[_fieldMap.disabled],
            }))
        },
    },

    methods: {
        focus() {
            this.$refs.selectRef?.focus()
        },

        blur() {
            this.$refs.selectRef?.blur()
        },

        onPageSizeChange(pageSize) {
            this.$emit('size-change', pageSize)
        },

        onCurrentPageChange(currentPage) {
            this.$emit('curret-change', currentPage)
        },
    },
}
</script>

<style scoped>
.option-wrapper {
    padding: 0 5px 5px;
}

.el-divider {
    margin: 8px 0;
}
</style>
