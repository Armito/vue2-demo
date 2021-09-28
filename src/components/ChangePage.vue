<!--
 * @Author: Armito
 * @Date: 2021-06-21 10:33:57
 * @LastEditTime: 2021-06-21 14:01:03
 * @LastEditors: Please set LastEditors
 * @Description: 分页研究
 * @FilePath: \vue-demo\src\components\ChangePage.vue
-->
<template>
  <div class="box">
    <div>
      <img id="preview" :src="previewSrc" />
    </div>
    <div>
      <canvas id="copy" width="400" height="200"></canvas>
    </div>
    <div>
      <input type="file" @change="uploadFile" />
    </div>
  </div>
</template>

<script>
import { readFile } from "../assets/js/utils.js";

export default {
  data() {
    return {
      previewSrc: ""
    };
  },
  methods: {
    uploadFile(e) {
      readFile(e.target.files[0])
        .dataURL()
        .then(dataURL => {
          this.previewSrc = dataURL;
          this.$nextTick(() => {
            this.parseImg();
          });
        });
    },
    parseImg() {
      const img = document.querySelector("#preview");
      const canvas = document.querySelector("#copy");
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      // console.log(imageData.data)
    }
  }
};
</script>

<style scoped>
#preview {
  width: 400px;
  height: 200px;
}
</style>
