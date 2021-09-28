<!--
 * @Author: Armito
 * @Date: 2021-04-27 16:06:53
 * @LastEditTime: 2021-07-20 14:35:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-demo\src\components\SearchForm.vue
-->
<template>
  <div class="ar-form">
    <el-form v-bind="form">
      <!-- 条件列表 -->
      <el-form-item
        class="ar-form-item"
        v-for="item in formItems"
        :key="item.key"
        v-bind="item.itemAttrs"
      >
        <el-input
          v-if="item.widgetType === 'input'"
          v-model="form.model[item.key]"
          v-bind="item.widgetAttrs"
          v-on="item.widgetEvents"
        ></el-input>

        <el-input
          v-if="item.widgetType === 'input-slot-button'"
          v-model="form.model[item.key]"
          v-bind="item.widgetAttrs"
          v-on="item.widgetEvents"
        >
          <el-button v-bind="item.widgetSlots"></el-button>
        </el-input>

        <el-select
          v-else-if="item.widgetType === 'select'"
          v-model="form.model[item.key]"
          v-bind="item.widgetAttrs.selectWidget"
          v-on="item.widgetEvents"
        >
          <el-option
            v-for="option in item.widgetAttrs.optionsWidget"
            :key="option.value"
            v-bind="option"
          ></el-option>
        </el-select>

        <el-radio-group
          v-else-if="item.widgetType === 'radio'"
          v-model="form.model[item.key]"
          v-bind="item.widgetAttrs.radioGroupWidget"
          v-on="item.widgetEvents"
        >
          <el-radio
            v-for="radio in item.widgetAttrs.radioWidget"
            :key="radio.label"
            v-bind="radio"
          >
            {{ radio.labelText }}
          </el-radio>
        </el-radio-group>

        <!-- <el-checkbox-group
                    v-else-if="item.widgetType === 'checkbox'"
                    v-model="form.model[item.key]"
                    v-bind="item.widgetAttrs.checkboxGroupWidget"
                    v-on="item.widgetEvents"
                >
                    <el-checkbox
                        v-for="checkbox in item.widgetAttrs.ckeckboxWidget"
                        :key="checkbox.label"
                        v-bind="checkbox"
                    >
                        {{ checkbox.label }}
                    </el-checkbox>
                </el-checkbox-group> -->

        <el-date-time
          v-else-if="item.widgetType === 'date'"
          v-model="form.model[item.key]"
          v-bind="item.widgetAttrs"
          v-on="item.widgetEvents"
        ></el-date-time>
        <el-date-picker
          v-else-if="item.widgetType === 'datePciker'"
          v-model="form.model[item.key]"
          v-bind="item.widgetAttrs"
          v-on="item.widgetEvents"
        ></el-date-picker>
        <el-tree-select
          v-else-if="item.widgetType === 'treeSelect'"
          v-model="form.model[item.key]"
          v-bind="item.widgetAttrs"
          v-on="item.widgetEvents"
        ></el-tree-select>
        <slot
          v-else-if="item.widgetType === 'slot'"
          :name="item.slotName"
          :scope="form"
        ></slot>
        <div v-else-if="item.widgetType === 'string'">
          {{ form.model[item.key] }}
        </div>
      </el-form-item>
      <!-- 按钮列表 -->
      <el-form-item class="ar-form-button">
        <el-button
          v-for="item in buttons"
          :key="item.effect"
          v-bind="item.buttonAttrs"
          @click="buttonClick(item.effect)"
        >
          {{ item.label }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array,
      default() {
        return [];
      }
    },
    buttons: {
      type: Array,
      required: true
    }
  },
  methods: {
    buttonClick(effect) {
      this.$emit("buttonClick", [effect, this.form.model]);
    }
  }
};
</script>

<style scoped>
.ar-form {
  padding: 20px 20px 0;
}

.ar-form-button {
  text-align: center;
}
</style>
