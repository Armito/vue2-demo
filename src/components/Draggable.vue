<!--
 * @Author: your name
 * @Date: 2021-07-21 13:09:38
 * @LastEditTime: 2021-08-05 13:22:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-demo\src\components\Draggable.vue
-->
<template>
    <div>
        <div class="select">
            <div :class="$style.box" @dragover.prevent @drop="drop">
                <span draggable @dragstart="dragstart">Armito</span>
            </div>
            <div :class="$style.box" @dragover.prevent @drop="drop"></div>
            <div :class="$style.box" @dragover.prevent @drop="drop"></div>
            <div :class="$style.box" @dragover.prevent @drop="drop"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        this.movingDOM = null
        return {}
    },

    methods: {
        dragstart(e) {
            this.movingDOM = e.target
        },

        drop(e) {
            this.movingDOM.remove()
            e.target.appendChild(this.movingDOM)
        },
    },
}
</script>

<style module>
.box {
    width: 80px;
    height: 30px;
    border: 1px solid #ccc;
}
</style>
