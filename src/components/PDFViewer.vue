<!--
 * @Author: your name
 * @Date: 2021-05-29 10:28:13
 * @LastEditTime: 2021-07-20 14:35:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-demo\src\components\PDFViewer.vue
-->
<template>
  <iframe
    :src="newSrc"
    :frameborder="frameborder"
    :height="height"
    :width="width"
    :scrolling="scrolling"
  ></iframe>
</template>

<script>
export default {
  data() {
    return {
      frameborder: 1, //规定是否显示框架周围的边框。
      height: "600px", //高度
      width: "350px", //宽度
      src: "", //路由地址
      scrolling: "auto", //yes  no  auto 规定是否在 iframe 中显示滚动条。
      // fileSrc: process.env.NODE_ENV === 'development' ? './plugins/TdPluginZhfzPublicTools/web/pdf/web/viewer.html?file=' : './pg/zhfz/pdf/web/viewer.html?file=',
      fileSrc:
        "./plugins/TdPluginZhfzPublicTools/web/pdf/web/viewer.html?file=",
      fileName: ""
    };
  }
};
</script>

<style></style>
