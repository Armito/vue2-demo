<!--
 * @Author: Armito
 * @Date: 2021-04-12 16:49:57
 * @LastEditTime: 2021-09-28 09:38:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-demo\src\App.vue
-->
<template>
    <div id="app">
        <div>
            <FormStudy />
        </div>
        <div>
            <button @click="testReactivity">TEST</button>
            <button @click="testReactivity2">TEST2</button>
            <button @click="testReactivity3">TEST3</button>
            <button @click="testReactivity4">TEST4</button>
            <div>1: {{ testObj.property }}</div>
            <div>2: {{ testObj.pppp }}</div>
            <div>3: {{ testObj.qqqqqq }}</div>
        </div>

        <Dom />
        <Functional style="color: skyblue" class="fff" :flag="true" />
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
import { useForm, useFormItems, useButtons } from './App.js'
// import Chart from './components/Chart.vue'
// import Day from './components/Day.vue'
// import GridLayout from './components/GridLayout.vue'
import ARForm from './components/ARForm.vue'
// import InputValidate from './components/InputValidate.vue'
// import VxeTableDemo from './components/VxeTableDemo.vue'
// import Select from './components/Select.vue'
// import ChangePage from './components/ChangePage.vue'
import CSSModules from './components/CSSModules.vue'
import Draggable from './components/Draggable.vue'
import ClockThree from './components/ClockThree.vue'
import Functional from './components/Functional.vue'
import Dom from './components/Dom.vue'
import FormStudy from './components/FormStudy.vue'

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
        Dom,
        FormStudy,
    },

    methods: {
        buttonClick([effect, formData]) {
            switch (effect) {
                case 'Search':
                    console.log(effect, formData)
                    break

                case 'Reset':
                    console.log(effect, formData)
                    this.form.model = {}
                    break

                case 'Submit':
                    this.$refs.arForm.$children[0].validate((valid) => {
                        if (valid) {
                            console.log(effect, formData)
                        }
                    })
                    break

                case 'Cancel':
                    console.log(effect, formData)
                    break

                default:
                    break
            }
        },

        testReactivity() {
            // this.testObj.pppp = "3333";
            // this.testObj.property = "44444";
            this.testObj = {
                property: '33333',
                // pppp: "22444444444222"
                qqqqqq: '88888',
            }
        },

        testReactivity2() {
            this.testObj.property = '44444'
            this.testObj.pppp = '55555'
        },

        testReactivity3() {
            this.testObj.pppp = '66666'
        },

        testReactivity4() {
            this.testObj.qqqqqq = '77777'
        },
    },

    data() {
        return {
            form: useForm(),
            formItems: useFormItems(),
            buttons: useButtons(),

            testObj: {
                property: '111111',
                pppp: '22222',
            },
        }
    },
}
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
