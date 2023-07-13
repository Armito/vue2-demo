<!--
 * @Author: your name
 * @Date: 2021-05-29 10:28:13
 * @LastEditTime: 2021-07-20 14:35:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-demo\src\components\PDFViewer.vue
-->
<template>
    <div>
        <!-- <iframe
            :src="newSrc"
            :frameborder="frameborder"
            :height="height"
            :width="width"
            :scrolling="scrolling"
        ></iframe> -->
        <iframe
            src="https://espreview.s4.udesk.cn/onlinePreview?url=RDZDQUNBQ0VDRDg0OTE5MUNEQ0FERkQ5RDdEMEQ5OTNDQkRBREJDREQ1OTBEMUNEQ0Q5M0RERDA5M0RDREJEN0Q0RDdEMEQ5OTBERkQyRDdDN0NCRDBERENEOTBEREQxRDM5MUZBREZDQURGOTE4ODkxRDg4OURDRDhEQTg5ODdERDkzOERERDhGREI5MzhBREQ4QURCOTNERkRGODY4NjkzOEQ4ODhEODhEQjg3OEE4Qzg3OENEQzhBOTE1QTA0MDQ1QTA0MzU1QjM2MDg1QjA0MTg1QTA1MzU1OTA1MzM5MENFREFEODgxREREMUQwQ0FEQkQwQ0E4Mzk4Q0NEQkRGRDJGMERGRDNEQjgzOThEQUQxQzlEMEYyRDFERkRBODNEOERGRDJDRERCOThDQkNEREJDQ0Y3REE4MzkzOEY5OERCRDBEOUQ3RDBEQkY3REE4MzkzOEY5OERERDFEM0NFREZEMEM3RjdEQTgzOTM4Rg%3D%3D"
            :frameborder="frameborder"
            :height="height"
            :width="width"
            :scrolling="scrolling"
        ></iframe>
        <iframe
            src="http://localhost:8002/site/operation/view-center/list"
            :frameborder="frameborder"
            :height="height"
            :width="width"
            :scrolling="scrolling"
        ></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            frameborder: 1, //规定是否显示框架周围的边框。
            height: '600px', //高度
            width: '600px', //宽度
            src: '', //路由地址
            scrolling: 'auto', //yes  no  auto 规定是否在 iframe 中显示滚动条。
            // fileSrc: process.env.NODE_ENV === 'development' ? './plugins/TdPluginZhfzPublicTools/web/pdf/web/viewer.html?file=' : './pg/zhfz/pdf/web/viewer.html?file=',
            fileSrc:
                './plugins/TdPluginZhfzPublicTools/web/pdf/web/viewer.html?file=',
            fileName: '',
        }
    },
}
</script>

<style></style>
