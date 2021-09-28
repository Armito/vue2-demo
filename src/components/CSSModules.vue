<!--
 * @Author: your name
 * @Date: 2021-07-20 14:30:04
 * @LastEditTime: 2021-07-21 13:09:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-demo\src\components\CSSModules.vue
-->
<template>
  <div>
    <div :class="$style_a.red">1</div>
    <div :class="$style_a.green">2</div>
    <div :class="$style_a.box">4</div>
    <div :class="$style_a.blue">3</div>
  </div>
</template>

<script>
export default {};
</script>

<style module="$style_a">
@value theme: "../assets/css/theme.css";
@value Primary, Success, Warning from theme;

.box {
  width: 100px;
  height: 100px;
}

.red {
  composes: box;
  background-color: Warning;
}

.green {
  composes: box;
  background-color: Success;
}

.blue {
  composes: box;
  background-color: Primary;
}
</style>
