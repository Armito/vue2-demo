<!--
 * @Author: your name
 * @Date: 2021-04-28 16:03:35
 * @LastEditTime: 2021-05-11 13:27:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-demo\src\components\InputValidate.vue
-->
<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model.number="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动类型" prop="type">
        <el-select v-model="ruleForm.type">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button @click="submit">submit</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        type: ""
      },
      rules: {
        name: [
          {
            required: true,
            type: "number",
            min: 1,
            max: 3,
            message: "不合法",
            trigger: "blur"
          }
        ]
      },
      options: [
        {
          value: 0,
          label: "123"
        },
        {
          value: 1,
          label: "456"
        }
      ]
    };
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(valid => {
        console.log(valid, this.ruleForm);
      });
    }
  }
};
</script>
