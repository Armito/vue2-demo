<!--
 * @Author: your name
 * @Date: 2021-09-17 09:55:34
 * @LastEditTime: 2021-09-17 09:57:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-demo\src\components\Dom.vue
-->
<template>
  <div id="subdom">
    subdom
  </div>
</template>

<script>
export default {
  created() {},

  mounted() {
    document.querySelector("#subdom").innerHTML = "sub";
  }
};
</script>

<style></style>
