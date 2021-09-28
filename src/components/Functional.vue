<!--
 * @Author: your name
 * @Date: 2021-08-05 11:20:15
 * @LastEditTime: 2021-08-05 13:23:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-demo\src\components\Functional.vue
-->
<template>
  <Fuji />
</template>

<script>
export default {
  components: {
    Fuji: {
      functional: true,
      render(h, ctx) {
        console.log(ctx);
        return h("p", 321);
      }
    }
  }
};
</script>

<style></style>
