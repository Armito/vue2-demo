<template>
    <div>
        <Filed
            field-type="transfer"
            :forwardRef="(ref) => (forwardRef = ref)"
            v-model="transferedArray"
            :data="mixinOptionsRoles"
            filterable
            :renderContent="renderContent"
            :renderLeftFooter="renderLeftFooter"
            :renderRightFooter="renderRightFooter"
        />

        <Tabs
            :tabs="tabs"
            v-model="currentTab"
            type="border-card"
            @tab-remove="removeTab"
        />

        <Space>
            <el-button @click="addTab">+++</el-button>
            <el-button @click="saveTab">save</el-button>
        </Space>
    </div>
</template>

<script>
import Tabs from './ARComponent/Tabs/index.vue'
import Space from './ARComponent/Space/index.vue'
import IconInfo from './IconInfo/index.vue'
import Wrapper from './ARComponent/Wrapper/index.vue'
import Day from './Day.vue'
import Chart from './Chart.vue'
import Filed from './ARComponent/Field/index.vue'
import { mixin_options_gender, mixin_options_roles } from '../mixins'

export default {
    components: {
        Tabs,
        Space,
        IconInfo,
        Wrapper,
        Day,
        Chart,
        Filed,
    },

    mixins: [mixin_options_gender, mixin_options_roles],

    methods: {
        renderContent(h, option) {
            return <span>{option.label + ' ⬆️'}</span>
        },

        renderLeftFooter() {
            return (
                <el-button onClick={this.clearTransferQuery}>reset</el-button>
            )
        },

        clearTransferQuery() {
            this.forwardRef?.clearQuery?.('left')
            this.forwardRef?.clearQuery?.('right')
        },

        renderRightFooter() {
            return (
                <Space>
                    <el-button onClick={this.clearTransfer}>clear</el-button>
                    <el-button type="primary" onClick={this.saveTransfer}>
                        save
                    </el-button>
                </Space>
            )
        },

        clearTransfer() {
            this.transferedArray = []
        },

        saveTransfer() {
            console.log(this.transferedArray)
        },

        addTab() {
            this.newTabs.push({
                label: `new tab ${this.num + 1}`,
                name: ++this.num + '',
                lazy: true,
                closable: true,
                render: () => (
                    <Wrapper height={this.wrapperHeight}>
                        {this.mixinOptionsRoles.map((o) => o.label).join('-')}
                    </Wrapper>
                ),
            })
            this.$nextTick(() => {
                this.currentTab = this.num + ''
            })
        },

        removeTab(name) {
            if (name === this.currentTab) {
                const idx = this.tabs.findIndex((tab) => tab.name === name)
                this.currentTab = this.tabs[idx - 1]?.name
            }
            this.newTabs = this.newTabs.filter((tab) => tab.name !== name)
        },

        saveTab() {
            console.log(this.newTabs)
            console.log(JSON.stringify(this.newTabs))
        },
    },

    data() {
        this.infoContent = '这是一点信息～～～'
        this.wrapperHeight = '250px'

        return {
            currentTab: '2',
            gender: 'male',
            num: 3,
            newTabs: [],
            transferedArray: [],
            forwardRef: null,
        }
    },

    computed: {
        tabs() {
            return [
                {
                    label: '我的行程',
                    name: '1',
                    closable: false,
                    renderText: (label) => `${label} (${this.newTabs.length})`,
                    render: (h, tab) => (
                        <Wrapper height={this.wrapperHeight}>
                            <span>{tab.label}</span>
                        </Wrapper>
                    ),
                },
                {
                    label: '角色管理',
                    name: '2',
                    lazy: true,
                    renderLabel: (h, tab) => (
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
                    lazy: true,
                    renderLabel: () => (
                        <Filed
                            fieldType="radio"
                            vModel={this.gender}
                            options={this.mixinOptionsGender}
                            renderLabel={(h, { label }) => (
                                <span>🈶️ {label}</span>
                            )}
                        />
                    ),
                    render: () => (
                        <Wrapper height={this.wrapperHeight}>
                            {this.gender === 'male' ? <div /> : <Chart />}
                        </Wrapper>
                    ),
                },
                ...this.newTabs,
            ]
        },
    },
}
</script>
