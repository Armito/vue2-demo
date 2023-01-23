<!--
 * @Author: your name
 * @Date: 2021-05-19 15:36:37
 * @LastEditTime: 2021-07-20 14:34:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-demo\src\components\VxeTableDemo.vue
-->
<template>
    <div>
        <vxe-toolbar>
            <template #buttons>
                <vxe-button @click="allAlign = 'left'">居左</vxe-button>
                <vxe-button @click="allAlign = 'center'">居中</vxe-button>
                <vxe-button @click="allAlign = 'right'">居右</vxe-button>
            </template>
        </vxe-toolbar>

        <vxe-table
            :align="allAlign"
            :data="tableData"
            border
            :show-overflow="true"
        >
            <vxe-table-column type="seq" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex"></vxe-table-column>
            <vxe-table-column field="age" title="Age"></vxe-table-column>
            <vxe-table-column
                field="address"
                title="Address"
            ></vxe-table-column>
        </vxe-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            allAlign: null,
            tableData: [
                {
                    id: 10001,
                    name: 'Test1',
                    role: 'Develop',
                    sex: 'Man',
                    age: 28,
                    address: 'vxe-table 从入门到放弃',
                },
                {
                    id: 10002,
                    name: 'Test2',
                    role: 'Test',
                    sex: 'Women',
                    age: 22,
                    address: 'Guangzhou',
                },
                {
                    id: 10003,
                    name: 'Test3',
                    role: 'PM',
                    sex: 'Man',
                    age: 32,
                    address: 'Shanghai',
                },
                {
                    id: 10004,
                    name: 'Test4',
                    role: 'Designer',
                    sex: 'Women',
                    age: 24,
                    address: 'Shanghai',
                },
            ],
        }
    },
}
</script>

<style></style>
