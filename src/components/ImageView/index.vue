<template>
    <div>
        <el-image ref="preview" :preview-src-list="previewSrcList">
            <template #error>
                <i
                    class="el-icon-view cursor-pointer"
                    @click="clickHandler"
                ></i>
            </template>
        </el-image>
        <ImagePreview
            :z-index="9999"
            :initial-index="0"
            v-if="showViewer"
            :on-close="() => (showViewer = false)"
            :url-list="previewSrcList"
        />
    </div>
</template>

<script>
import Img from '../../assets/img/colune-1.png'
import ImagePreview from 'element-ui/packages/image/src/image-viewer.vue'

export default {
    name: 'ImageView',

    components: {
        ImagePreview,
    },

    data() {
        return {
            previewSrcList: [Img],
            showViewer: false,
        }
    },

    methods: {
        clickHandler() {
            // this.$refs.preview.clickHandler()
            this.showViewer = true
        },
    },
}
</script>

<style>
.cursor-pointer {
    cursor: pointer;
}
</style>
