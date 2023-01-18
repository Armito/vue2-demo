<template>
    <Tabs :tabs="tabs" v-model="currentTab" type="border-card" />
</template>

<script>
import Tabs from './Tabs/index.vue'
import Space from './Space/index.vue'
import IconInfo from './IconInfo/index.vue'
import Wrapper from './Wrapper/index.vue'
import Day from './Day.vue'
import FormStudy from './FormStudy.vue'
import Chart from './Chart.vue'
import Select from './Select/index.vue'
import If from './If/index.vue'

export default {
    components: {
        Tabs,
        Space,
        IconInfo,
        Wrapper,
        Day,
        Chart,
        FormStudy,
        Select,
        If,
    },

    data() {
        this.infoContent = '这是一点信息～～～'
        this.wrapperHeight = '250px'

        return {
            currentTab: '2',
            gender: 'male',
            num: 0,
        }
    },

    computed: {
        tabs() {
            return [
                {
                    label: '我的行程',
                    name: '1',
                    render: (tab) => (
                        <Wrapper height={this.wrapperHeight}>
                            <span>{tab.label}</span>
                        </Wrapper>
                    ),
                    renderText: (tab) => {
                        return `${tab.label} (${this.num})`
                    },
                },
                {
                    label: '角色管理',
                    name: '2',
                    renderLabel: (tab) => (
                        <Space>
                            <span>{tab.label}</span>
                            <IconInfo content={this.infoContent} />
                        </Space>
                    ),
                    render: () => (
                        <Wrapper height={this.wrapperHeight}>
                            <Day />
                        </Wrapper>
                    ),
                },
                {
                    label: '行程管理',
                    name: '3',
                    render: (tab) => (
                        <Wrapper height={this.wrapperHeight}>
                            {this.gender === 'male' ? <FormStudy /> : tab.label}
                        </Wrapper>
                    ),
                    renderLabel: () => (
                        <Select
                            vModel={this.gender}
                            options={[
                                { label: 'male', value: 'male' },
                                { label: 'female', value: 'female' },
                            ]}
                        />
                    ),
                },
            ]
        },
    },

    mounted() {
        setInterval(() => {
            this.num += 1
        }, 1000)
    },
}
</script>
