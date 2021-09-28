<!--
 * @Author: Armito
 * @Date: 2021-04-12 16:49:57
 * @LastEditTime: 2021-09-17 09:59:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-demo\src\App.vue
-->
<template>
  <div id="app">
    <Dom />
    <Functional style="color: skyblue;" class="fff" :flag="true" />
    <!-- <ChangePage /> -->
    <!-- <Select /> -->
    <!-- <InputValidate /> -->
    <ARForm
      ref="arForm"
      :form="form"
      :formItems="formItems"
      :buttons="buttons"
      @buttonClick="buttonClick"
    />
    <!-- <Chart chartBoxId="demo1" /> -->
    <!-- <Day /> -->
    <!-- <GridLayout /> -->
    <!-- <VxeTableDemo /> -->
    <CSSModules />
    <Draggable />
    <ClockThree />
  </div>
</template>

<script>
import { useForm, useFormItems, useButtons } from "./App.js";
// import Chart from './components/Chart.vue'
// import Day from './components/Day.vue'
// import GridLayout from './components/GridLayout.vue'
import ARForm from "./components/ARForm.vue";
// import InputValidate from './components/InputValidate.vue'
// import VxeTableDemo from './components/VxeTableDemo.vue'
// import Select from './components/Select.vue'
// import ChangePage from './components/ChangePage.vue'
import CSSModules from "./components/CSSModules.vue";
import Draggable from "./components/Draggable.vue";
import ClockThree from "./components/ClockThree.vue";
import Functional from "./components/Functional.vue";
import Dom from "./components/Dom.vue";

export default {
  components: {
    // Chart,
    // Day,
    // GridLayout,
    ARForm,
    // InputValidate
    // VxeTableDemo,
    // Select,
    // ChangePage
    CSSModules,
    Draggable,
    ClockThree,
    Functional,
    Dom
  },

  data() {
    return {
      form: useForm(),
      formItems: useFormItems(),
      buttons: useButtons()
    };
  },

  methods: {
    buttonClick([effect, formData]) {
      switch (effect) {
        case "Search":
          console.log(effect, formData);
          break;

        case "Reset":
          console.log(effect, formData);
          this.form.model = {};
          break;

        case "Submit":
          this.$refs.arForm.$children[0].validate(valid => {
            if (valid) {
              console.log(effect, formData);
            }
          });
          break;

        case "Cancel":
          console.log(effect, formData);
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

.fff {
  background-color: lime;
}
</style>
