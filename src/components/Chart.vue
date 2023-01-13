<!--
 * @Author: your name
 * @Date: 2021-04-12 16:52:13
 * @LastEditTime: 2021-07-20 14:35:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-demo\src\components\Chart.vue
-->
<template>
    <div :id="chartBoxId" :style="chartBoxStyle"></div>
</template>

<script>
import * as echarts from 'echarts'

const option = {
    title: {
        text: 'ECharts 入门示例',
    },
    tooltip: {},
    legend: {
        data: ['销量'],
    },
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        triggerEvent: true,
    },
    yAxis: {},
    series: [
        {
            name: '销量',
            type: 'pictorialBar',
            data: [
                {
                    value: 5,
                    type: 1,
                },
                {
                    value: 20,
                    type: 2,
                },
                {
                    value: 2,
                    type: 3,
                },
                10,
                10,
                20,
            ],
            symbol: 'image://./img/colune-1.png',
            symbolSize: ['60%', '100%'],
            symbolOffset: [0, -5],
        },
        {
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
            itemStyle: {
                color: 'transparent',
            },
            label: {
                show: true,
                position: ['40%', -24],
                fontWeight: 'bolder',
                fontSize: '15',
                color: '#0CE3F0',
                fontFamily: 'DS-DIGI',
            },
        },
    ],
}

export default {
    props: {
        chartBoxId: {
            type: String,
            default() {
                return 'chartBox' + Math.random()
            },
        },
        chartBoxStyle: {
            type: Object,
            default() {
                return {
                    width: '50%',
                    height: '50%',
                }
            },
        },
    },
    methods: {
        chartResize() {
            this.myChart.resize()
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.myChart = echarts.init(
                document.getElementById(this.chartBoxId),
            )
            this.myChart.setOption(option)
            this.myChart.on('click', (e) => {
                console.log(e)
            })
            // this.myChart.getZr().on('click',  event => {
            // 	console.log(event)
            // });
            window.addEventListener('resize', this.chartResize)
        })
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.chartResize)
    },
}
</script>
