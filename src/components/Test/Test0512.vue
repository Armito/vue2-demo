<template>
    <div>
        <el-select
            v-model="params.one"
            multiple
            clearable
            @change="onOneChange"
        >
            <el-option
                v-for="item in options_one"
                :key="item.id"
                :label="item.label"
                :value="item.id"
            >
            </el-option>
        </el-select>
        <el-select
            v-model="params.two"
            multiple
            clearable
            @change="onTwoChange"
        >
            <el-option
                v-for="item in options_two"
                :key="item.id"
                :label="item.label"
                :value="item.id"
            >
            </el-option>
        </el-select>
        <el-select
            v-model="params.three"
            multiple
            clearable
            @change="onThreeChange"
        >
            <el-option
                v-for="item in options_three"
                :key="item.id"
                :label="item.label"
                :value="item.id"
            >
            </el-option>
        </el-select>
        <el-select
            v-model="params.four"
            multiple
            clearable
            @change="onFourChange"
        >
            <el-option
                v-for="item in options_four"
                :key="item.id"
                :label="item.label"
                :value="item.id"
            >
            </el-option>
        </el-select>
    </div>
</template>

<script>
const options_one = [
    {
        id: '1-1',
        label: 'l-1-1',
    },
    {
        id: '1-2',
        label: 'l-1-2',
    },
]

const options_two = [
    {
        id: '2-1',
        label: 'l-2-1',
        parentId: '1-1',
    },
    {
        id: '2-2',
        label: 'l-2-2',
        parentId: '1-1',
    },
    {
        id: '2-3',
        label: 'l-2-3',
        parentId: '1-2',
    },
]

const options_three = [
    {
        id: '3-1',
        label: 'l-3-1',
        parentId: '2-1',
    },
    {
        id: '3-2',
        label: 'l-3-2',
        parentId: '2-3',
    },
]

const options_four = [
    {
        id: '4-1',
        label: 'l-4-1',
        parentId: '3-1',
    },
    {
        id: '4-2',
        label: 'l-4-2',
        parentId: '3-2',
    },
]

export default {
    name: 'Test0512',

    model: {
        prop: 'value',
        event: 'update:value',
    },

    props: {
        value: {
            type: Object,
            default() {
                return {
                    one: [],
                    two: [],
                    three: [],
                    four: [],
                }
            },
        },
    },

    methods: {
        onOneChange(v) {
            // 下行
            if (v?.length) {
                this.params.two = this.params.two.filter((id) =>
                    this.options_two.some((o) => o.id === id),
                )
            } else {
                this.params.two = []
            }
            this.onTwoChange(this.params.two)
        },

        onTwoChange(v) {
            // 下行
            if (v?.length) {
                this.params.three = this.params.three.filter((id) =>
                    this.options_three.some((o) => o.id === id),
                )
            } else {
                this.params.three = []
            }

            // 上行
            if (v?.length && !this.params.one?.length) {
                this.params.one = v.reduce(
                    (pre, cur) => [
                        ...new Set([
                            ...pre,
                            this.options_two.find((o) => o.id === cur).parentId,
                        ]),
                    ],
                    [],
                )
            }

            this.onThreeChange(this.params.three)
        },

        onThreeChange(v) {
            // 下行
            if (v?.length) {
                this.params.four = this.params.four.filter((id) =>
                    this.options_four.some((o) => o.id === id),
                )
            } else {
                this.params.four = []
            }

            // 上行
            if (v?.length && !this.params.two?.length) {
                this.params.two = v.reduce(
                    (pre, cur) => [
                        ...new Set([
                            ...pre,
                            this.options_three.find((o) => o.id === cur)
                                .parentId,
                        ]),
                    ],
                    [],
                )
                this.onTwoChange(this.params.two)
            }
        },

        onFourChange(v) {
            // 上行
            if (v?.length && !this.params.three?.length) {
                this.params.three = v.reduce(
                    (pre, cur) => [
                        ...new Set([
                            ...pre,
                            this.options_four.find((o) => o.id === cur)
                                .parentId,
                        ]),
                    ],
                    [],
                )
                this.onThreeChange(this.params.three)
            }
        },
    },

    data() {
        return {
            params: this.value,
        }
    },

    computed: {
        options_one() {
            return options_one
        },

        options_two() {
            if (this.params.one?.length) {
                return options_two.filter((o) =>
                    this.params.one.includes(o.parentId),
                )
            } else {
                return options_two
            }
        },

        options_three() {
            if (this.params.two?.length) {
                return options_three.filter((o) =>
                    this.params.two.includes(o.parentId),
                )
            } else {
                return options_three.filter((o) =>
                    this.options_two
                        .map((sub_o) => sub_o.id)
                        .includes(o.parentId),
                )
            }
        },

        options_four() {
            if (this.params.three?.length) {
                return options_four.filter((o) =>
                    this.params.three.includes(o.parentId),
                )
            } else {
                return options_four.filter((o) =>
                    this.options_three
                        .map((sub_o) => sub_o.id)
                        .includes(o.parentId),
                )
            }
        },
    },

    watch: {
        params: {
            deep: true,
            handler(val) {
                this.$emit('update:value', val)
            },
        },
    },
}
</script>

<style scoped></style>
