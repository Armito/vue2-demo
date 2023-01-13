<template>
    <Tabs :tabs="tabs" v-model="currentTab" type="border-card" />
</template>

<script>
import Tabs from './Tabs/index.vue'
import Space from './Space/index.vue'
import IconInfo from './IconInfo/index.vue'
import Day from './Day.vue'

export default {
    components: {
        Tabs,
        Space,
        IconInfo,
        Day,
    },

    data() {
        return {
            infoContent: '这是一点信息～～～',
            currentTab: '2',
        }
    },

    computed: {
        tabs() {
            return [
                {
                    label: '我的行程',
                    name: '1',
                    render: () => <span>我的行程</span>,
                },
                {
                    label: '角色管理',
                    name: '2',
                    renderLabel: () => (
                        <Space>
                            <span>角色管理</span>
                            <IconInfo content={this.infoContent} />
                        </Space>
                    ),
                    render: () => <Day />,
                },
            ]
        },
    },
}
</script>
