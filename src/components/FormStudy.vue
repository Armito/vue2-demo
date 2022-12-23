<template>
    <el-form ref="form" :model="formModel" label-width="80px">
        <el-form-item label="活动名称">
            <el-input v-model="formModel.name" />
        </el-form-item>

        <el-form-item label="活动人数">
            <Space>
                <el-input-number v-model="formModel.porpleNum[0]" :min="1" />
                <span>~</span>
                <el-input-number
                    v-model="formModel.porpleNum[1]"
                    :min="formModel.porpleNum[0]"
                />
            </Space>
        </el-form-item>

        <el-form-item label="活动模式">
            <Select
                ref="selectRef"
                v-model="formModel.mode"
                :options="ModeOptions"
                :field-map="{
                    value: 'key',
                    label: 'name',
                }"
                placeholder="jdsajdj"
                clearable
                filterable
                @clear="onClear"
                :has-page="true"
                :pagination-props="{
                    total: 14,
                }"
                @curret-change="onCurrentPageChange"
            >
                <!-- <el-option-group label="2133">
                    <el-option value="1" label="a"></el-option>
                    <el-option value="2" label="b"></el-option>
                </el-option-group> -->
            </Select>
        </el-form-item>

        <!-- <el-form-item label="活动规则">
            <Rule />
        </el-form-item> -->

        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Space from './Space/index.vue'
import Rule from './Rule/index.vue'
import Select from './Select/index.vue'

const ModeOptions = [
    {
        key: 1,
        name: 'Once',
    },
    {
        key: 2,
        name: 'Continous',
    },
    {
        key: 3,
        name: 'Continous',
    },
    {
        key: 4,
        name: 'Continous',
    },
    {
        key: 5,
        name: 'Continous',
    },
    {
        key: 6,
        name: 'Continous',
    },
    {
        key: 7,
        name: 'Continous',
    },
    {
        key: 8,
        name: 'Continous',
    },
    {
        key: 9,
        name: 'Continous',
    },
    {
        key: 10,
        name: 'Continous',
    },
    {
        key: 11,
        name: 'Continous',
    },
    {
        key: 12,
        name: 'Continous',
    },
    {
        key: 13,
        name: 'Continous',
    },
    {
        key: 14,
        name: 'Continous',
    },
]

export default {
    name: 'FormStudy',

    components: {
        Space,
        // Rule,
        Select,
    },

    data() {
        return {
            ModeOptions: ModeOptions.slice(0, 9),
            formModel: {
                name: '',
                porpleNum: [1, 1],
                mode: 1,
                rule: 2,
            },
        }
    },

    methods: {
        onClear() {
            console.log('clear')
        },

        onCurrentPageChange(currentPage) {
            this.ModeOptions = ModeOptions.slice(
                (currentPage - 1) * 10,
                currentPage * 10,
            )
        },

        onSubmit() {
            console.log(this.formModel)
        },
    },

    mounted() {
        console.log(this.$refs.selectRef)
        this.$refs.selectRef.focus()
    },
}
</script>
