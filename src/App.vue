<template>
    <div id="app">
        <Test1017 />
        <div id="editorjs"></div>
        <PDFViewer />
        <Test0516 v-model="t0516" />
        <Test0512 v-model="t0512" />
        <ImageView />
        <Father />
        <Test11 :getty="false" hush="123" @click="() => {}" v-model="yidata">
            456
        </Test11>
        <Test1 />
        <Test2 />
        <Test3 />
        <Test4 />
        <Test5 />
        <Test5_1 />
        <TabsStudy />
        <Form
            v-model="formModel"
            :items="items"
            :rules="rules"
            @submit="onSearch"
            :renderLabel="renderLabel"
            :renderOperation="renderOperation"
            :mode="mode"
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
            <button @click="testReactivity">TEST</button>
            <button @click="testReactivity2">TEST2</button>
            <button @click="testReactivity3">TEST3</button>
            <button @click="testReactivity4">TEST4</button>
            <div>1: {{ testObj.property }}</div>
            <div>2: {{ testObj.pppp }}</div>
            <div>3: {{ testObj.qqqqqq }}</div>
        </div>
        <Functional style="color: skyblue" class="fff" :flag="true" />
        <!-- <ChangePage /> -->
        <!-- <Select /> -->
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
// import VxeTableDemo from './components/VxeTableDemo.vue'
// import Select from './components/Select.vue'
// import ChangePage from './components/ChangePage.vue'
import CSSModules from './components/CSSModules.vue'
import Draggable from './components/Draggable.vue'
import ClockThree from './components/ClockThree.vue'
import Functional from './components/Functional.vue'
import CountIndictor from './components/CountIndictor.vue'
import Count from './components/Count.vue'
import CompositionApi from './components/CompositionApi.vue'
import JsDoc from './components/JsDoc.vue'
import Table from './components/ARComponent/Table/index.vue'
import Form from './components/ARComponent/Form/index.vue'
import TabsStudy from './components/TabsStudy.vue'
import Space from './components/ARComponent/Space/index.vue'
import IconInfo from './components/IconInfo/index.vue'
import LongTextTooltip from './components/ARComponent/LongTextTooltip/index.vue'
import Test1 from './components/Test/1.vue'
import Test2 from './components/Test/2.vue'
import Test3 from './components/Test/3.vue'
import Test4 from './components/Test/4.js'
import { Test5, Test5_1 } from './components/Test/5.js'
import Test11 from './components/Test/11.vue'
import Test0512 from './components/Test/Test0512.vue'
import Test0516 from './components/Test/Test0516.vue'
import Father from './components/Rerender/Father.vue'
import ImageView from './components/ImageView/index.vue'
import PDFViewer from './components/PDFViewer.vue'
// import EditorJS from '@editorjs/editorjs'
import Test1017 from './components/Test/Test1017'

const ModeOptions = [
    {
        key: 1,
        name: 'Once',
    },
    {
        key: 2,
        name: 'Continous',
    },
    {
        key: 3,
        name: 'Continous',
    },
    {
        key: 4,
        name: 'Continous',
    },
    {
        key: 5,
        name: 'Continous',
    },
    {
        key: 6,
        name: 'Continous',
    },
    {
        key: 7,
        name: 'Continous',
    },
    {
        key: 8,
        name: 'Continous',
    },
    {
        key: 9,
        name: 'Continous',
    },
    {
        key: 10,
        name: 'Continous',
    },
    {
        key: 11,
        name: 'Continous',
    },
    {
        key: 12,
        name: 'Continous',
    },
    {
        key: 13,
        name: 'Continous',
    },
    {
        key: 14,
        name: 'Continous',
    },
    {
        key: 15,
        name: 'Continous',
    },
    {
        key: 16,
        name: 'Continous',
    },
    {
        key: 17,
        name: 'Continous',
    },
    {
        key: 18,
        name: 'Continous',
    },
    {
        key: 19,
        name: 'Continous',
    },
    {
        key: 20,
        name: 'Continous',
    },
    {
        key: 21,
        name: 'Continous',
    },
]

export default {
    components: {
        // Chart,
        // Day,
        // GridLayout,
        // VxeTableDemo,
        // Select,
        // ChangePage
        CSSModules,
        Draggable,
        ClockThree,
        Functional,
        CountIndictor,
        CompositionApi,
        JsDoc,
        Table,
        Form,
        Count,
        TabsStudy,
        Space,
        IconInfo,
        LongTextTooltip,
        Test1,
        Test2,
        Test3,
        Test4,
        Test5,
        Test5_1,
        Test11,
        Father,
        ImageView,
        Test0512,
        Test0516,
        PDFViewer,
        Test1017,
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

        renderLabel(h, { label }) {
            return <LongTextTooltip content={label} />
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
                    <el-button
                        onClick={() => {
                            if (this.mode === 'edit') {
                                this.mode = 'read'
                            } else {
                                this.mode = 'edit'
                            }
                        }}
                    >
                        {this.mode}
                    </el-button>
                </Space>
            )
        },
    },

    data() {
        return {
            test0516: '',
            yidata: {},
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
                {
                    prop: 'mode',
                    label: '活动模式',
                    fieldType: 'select',
                    fieldProps: {
                        options: ModeOptions,
                        fieldMap: {
                            value: 'key',
                            label: 'name',
                        },
                        placeholder: 'jdsajdj',
                        clearable: true,
                        filterable: true,
                        renderOptionText: (h, { label, value }) => {
                            return label + `---1---${value}---`
                        },
                        mode: 'read',
                    },
                    fieldListeners: {
                        clear: () => {
                            console.log('clear')
                        },
                        'visible-change': (visible) => {
                            console.log(visible)
                        },
                    },
                },
            ],
            formModel: {
                user: '',
                region: [2],
                expire: '#409EFF',
                time: new Date(),
                mode: 19,
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

            mode: 'edit',
            t0512: {},
            t0516: {
                ids: [],
                labels: '123',
            },
        }
    },

    watch: {
        formModel: {
            handler(val) {
                console.log(val)
            },
            deep: true,
        },

        t0512: {
            deep: true,
            handler(val) {
                console.log(val)
            },
        },

        t0516: {
            deep: true,
            handler(val) {
                console.log(val)
            },
        },
    },

    mounted() {
        setTimeout(() => {
            // this.tableRef?.clearSelection()
            this.formModel.user = 'Armito'
            // this.formModel.region = 1

            // window.location.replace('https://www.baidu.com')
            // window.location.replace('/search/search-result/mobile-search')
        }, 3000)

        // alert(window.navigator.userAgent)

        // const editor = new EditorJS({
        //     /**
        //      * Id of Element that should contain Editor instance
        //      */
        //     holder: 'editorjs',
        // })
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
