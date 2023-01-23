<template>
    <div id="app">
        <TabsStudy />
        <Form
            v-model="formModel"
            :items="items"
            :rules="rules"
            @submit="onSearch"
            :renderOperation="renderOperation"
        />
        <Table
            :forward-ref="(ref) => (tableRef = ref)"
            :columns="columns"
            :data="tableData"
            :renderAppend="renderAppend"
            height="250"
        />
        <JsDoc />
        <div>
            <CompositionApi />
        </div>
        <div>
            <CountIndictor />
        </div>
        <Count />
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
import CountIndictor from './components/CountIndictor.vue'
import Count from './components/Count.vue'
import CompositionApi from './components/CompositionApi.vue'
import JsDoc from './components/JsDoc.vue'
import Table from './components/ARComponent/Table/index.vue'
import Form from './components/ARComponent/Form/index.vue'
import TabsStudy from './components/TabsStudy.vue'
import Space from './components/ARComponent/Space/index.vue'

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
        CountIndictor,
        CompositionApi,
        JsDoc,
        Table,
        Form,
        Count,
        TabsStudy,
        Space,
    },

    methods: {
        onSearch(model) {
            console.log(model)
        },

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

        renderAppend() {
            return <div>4536251</div>
        },

        renderOperation(h, { submit, reset }) {
            return (
                <Space>
                    <el-button
                        onClick={() => {
                            submit()
                        }}
                    >
                        submit
                    </el-button>
                    <el-button
                        onClick={() => {
                            reset()
                        }}
                    >
                        reset
                    </el-button>
                </Space>
            )
        },
    },

    data() {
        return {
            items: [
                {
                    prop: 'user',
                    label: '审批人',
                    fieldType: 'textarea',
                },
                {
                    prop: 'region',
                    label: '审批类型',
                    fieldType: 'checkbox',
                    fieldProps: {
                        options: [
                            { name: 'a', key: 1 },
                            { name: 'b', key: 2 },
                        ],
                        fieldMap: {
                            value: 'key',
                            label: 'name',
                        },
                    },
                },
                {
                    prop: 'expire',
                    label: '审批截止时间',
                    renderField: (h) => {
                        return (
                            <el-color-picker vModel={this.formModel.expire} />
                        )
                    },
                },
                {
                    prop: 'time',
                    label: '审批时间',
                    fieldType: 'datetime',
                },
            ],
            formModel: {
                user: '',
                region: [2],
                expire: '#409EFF',
                time: new Date(),
            },
            rules: {
                region: [
                    {
                        required: true,
                    },
                ],
                expire: [
                    {
                        required: true,
                    },
                ],
            },

            form: useForm(),
            formItems: useFormItems(),
            buttons: useButtons(),

            testObj: {
                property: '111111',
                pppp: '22222',
            },

            tableRef: null,
            columns: [
                {
                    prop: 'date',
                    label: '日期',
                    width: 180,
                    render: (h, { row }) => {
                        return h('div', {}, row.date)
                    },
                },
                {
                    type: 'selection',
                },
                {
                    prop: 'name',
                    label: '姓名',
                    width: 180,
                    renderHeader: (h, { column }) => {
                        return h('div', {}, column.label + 123)
                    },
                },
                {
                    type: 'index',
                },
                {
                    prop: 'address',
                    label: '地址',
                    renderText: (label, row) => {
                        return label + 'ARARAR'
                    },
                },
            ],
            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                },
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                },
            ],
        }
    },

    watch: {
        formModel: {
            handler(val) {
                console.log(val)
            },
            deep: true,
        },
    },

    mounted() {
        setTimeout(() => {
            this.tableRef.clearSelection()
            this.formModel.user = 'Armito'
            // this.formModel.region = 1
        }, 3000)
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
