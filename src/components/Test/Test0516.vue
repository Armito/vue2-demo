<template>
    <div @mouseover="onMouseover" @mouseleave="onMouseleave">
        <el-input v-model="params.labels" readonly>
            <template #suffix v-if="inputClearable">
                <div
                    :style="{
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }"
                    @click="onInputClear"
                >
                    <i class="el-icon-circle-close"></i>
                </div>
            </template>

            <template #append>
                <el-button @click="onDialogOpen">选择</el-button>
            </template>
        </el-input>

        <el-dialog
            title="选择"
            width="30%"
            :visible.sync="dialogVisible"
            :before-close="onDialogClose"
        >
            <el-tree
                :data="data"
                node-key="id"
                show-checkbox
                @check="onTreeCheckChange"
            >
            </el-tree>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'Test0516',

    model: {
        prop: 'value',
        event: 'update:value',
    },

    props: {
        /**
         * @typedef Value
         * @property {Array} Value.ids
         * @property {String}  Value.labels
         */
        value: {
            type: Object,
            default() {
                return {
                    ids: [],
                    labels: '',
                }
            },
        },
    },

    methods: {
        onMouseover() {
            this.showInputClear = true
        },

        onMouseleave() {
            this.showInputClear = false
        },

        onInputClear() {
            this.params = { labels: '', ids: [] }
        },

        onDialogOpen() {
            this.dialogVisible = true
        },

        onDialogClose() {
            this.dialogVisible = false
        },

        onTreeCheckChange(item, state) {
            const { checkedKeys, checkedNodes } = state
            this.params = {
                ids: checkedKeys,
                labels: checkedNodes.map((n) => n.label).join(','),
            }
        },
    },

    data() {
        return {
            showInputClear: false,
            dialogVisible: false,
            data: [
                {
                    id: 1,
                    label: '一级 1',
                    children: [
                        {
                            id: 4,
                            label: '二级 1-1',
                            children: [
                                {
                                    id: 9,
                                    label: '三级 1-1-1',
                                },
                                {
                                    id: 10,
                                    label: '三级 1-1-2',
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 2,
                    label: '一级 2',
                    children: [
                        {
                            id: 5,
                            label: '二级 2-1',
                        },
                        {
                            id: 6,
                            label: '二级 2-2',
                        },
                    ],
                },
                {
                    id: 3,
                    label: '一级 3',
                    children: [
                        {
                            id: 7,
                            label: '二级 3-1',
                        },
                        {
                            id: 8,
                            label: '二级 3-2',
                        },
                    ],
                },
            ],
        }
    },

    computed: {
        params: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('update:value', val)
            },
        },

        inputClearable() {
            return !!this.params.labels && this.showInputClear
        },
    },
}
</script>

<style scoped></style>
