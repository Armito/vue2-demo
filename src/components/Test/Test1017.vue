<template>
    <div>
        <div>color-picker</div>
        <p>Chrome</p>
        <chrome-picker v-model="colors" />
        <p>Sketch</p>
        <sketch-picker v-model="colors" />
        <p>Photoshop</p>
        <photoshop-picker v-model="colors" />
        <p>Material</p>
        <material-picker v-model="colors" />
        <p>Slider</p>
        <slider-picker v-model="colors" />
        <p>Compact</p>
        <compact-picker v-model="colors" />
        <p>Swatches</p>
        <swatches-picker v-model="colors" />
        <p>Twitter</p>
        <twitter-picker v-model="colors" />
        <p>Grayscale</p>
        <grayscale-picker v-model="colors" @input="updateValue" />
    </div>
</template>

<script>
import {
    Material,
    Compact,
    Swatches,
    Slider,
    Photoshop,
    Chrome,
    Sketch,
    Twitter,
    Grayscale,
} from 'vue-color'

export default {
    name: 'color-picker',
    components: {
        'material-picker': Material,
        'compact-picker': Compact,
        'swatches-picker': Swatches,
        'slider-picker': Slider,
        'photoshop-picker': Photoshop,
        'chrome-picker': Chrome,
        'sketch-picker': Sketch,
        'twitter-picker': Twitter,
        'grayscale-picker': Grayscale,
    },
    data() {
        return {
            colors: {
                color: '',
                hex: '#194d33',
                hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
                hsv: { h: 150, s: 0.66, v: 0.3, a: 1 },
                rgba: { r: 25, g: 77, b: 51, a: 1 },
                a: 1,
            },
        }
    },
    methods: {
        // 值改变事件
        updateValue(value) {
            console.log(value)
            console.log(this.color)
        },
    },
}
</script>
<style lang="less" scoped>
.color {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    div {
        margin: 20px;
        font-size: 18px;
        font-weight: bold;
        border: 1px solid #eee;
        padding: 10px;
    }
}
</style>
