<template>
    <el-form ref="form" :model="formModel" label-width="80px">
        <el-form-item label="活动名称">
            <el-input v-model="formModel.name" />
        </el-form-item>

        <el-form-item label="活动人数">
            <el-input-number v-model="formModel.porpleNum[0]" :min="1" />
            <span>~</span>
            <el-input-number
                v-model="formModel.porpleNum[1]"
                :min="formModel.porpleNum[0]"
            />
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'FormStudy',

    data() {
        return {
            formModel: {
                name: '',
                porpleNum: [1, 1],
            },
        }
    },

    methods: {
        onSubmit() {
            console.log(this.formModel)
        },
    },
}
</script>
