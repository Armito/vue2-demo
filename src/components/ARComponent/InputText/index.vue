<template>
    <el-input :value="value" readonly></el-input>
</template>

<script>
export default {
    name: 'InputText',

    props: {
        value: {
            type: String,
            default: '',
        },
    },
}
</script>

<style lang="less" scoped>
/deep/ .el-input__inner {
    padding: 0;
    border: 0;
    border-radius: 0;
}
</style>
