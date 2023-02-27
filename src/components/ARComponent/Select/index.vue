<template>
    <InputText v-if="mode === 'read'" :value="currentLabel"></InputText>

    <el-select
        v-else
        v-bind="$attrs"
        v-on="$listeners"
        v-model="innerValue"
        :ref="forwardRef"
        @visible-change="onVisibleChange"
    >
        <template #default>
            <template v-if="renderOptions">
                <Render
                    :render="renderOptions"
                    :params="{ options: innerOptions }"
                />
            </template>
            <template v-else>
                <slot name="default">
                    <VirtualList
                        :ref="(ref) => (virtualListRef = ref)"
                        style="max-height: 250px; overflow-y: auto"
                        data-key="value"
                        :data-sources="innerOptions"
                        :data-component="dataComponent"
                        :keeps="10"
                        :extra-props="{
                            renderOption,
                            renderOptionText,
                        }"
                    />
                </slot>
            </template>
        </template>

        <template #prefix>
            <template v-if="renderPrefix">
                <Render :render="renderPrefix" />
            </template>
            <template v-else-if="$scopedSlots.prefix">
                <slot name="prefix"></slot>
            </template>
        </template>

        <template #empty>
            <template v-if="renderEmpty">
                <Render :render="renderEmpty" />
            </template>
            <template v-else-if="$scopedSlots.empty">
                <slot name="empty"></slot>
            </template>
        </template>
    </el-select>
</template>

<script>
import Base from '../Base/index.vue'
import Render from '../Render/index.vue'
import VirtualList from 'vue-virtual-scroll-list'
import Option from './components/Option/index.vue'
import InputText from '../InputText/index.vue'

export default {
    name: 'Select',

    extends: Base,

    components: {
        Render,
        VirtualList,
        Option,
        InputText,
    },

    props: {
        forwardRef: {
            type: Function,
        },

        options: {
            type: Array,
            required: true,
            default() {
                return []
            },
        },

        fieldMap: {
            type: Object,
            default() {
                return {}
            },
        },

        renderOptions: {
            type: Function,
        },

        renderOption: {
            type: Function,
        },

        renderOptionText: {
            type: Function,
        },

        renderPrefix: {
            type: Function,
        },

        renderEmpty: {
            type: Function,
        },

        mode: {
            validator(value) {
                return ['read', 'edit'].includes(value)
            },
            default: 'edit',
        },
    },

    data() {
        return {
            dataComponent: Option,
            virtualListRef: null,
        }
    },

    computed: {
        innerOptions() {
            return this.options.map((o) => ({
                ...o,
                value: o[this.fieldMap.value || 'value'],
                label: o[this.fieldMap.label || 'label'],
                disabled: o[this.fieldMap.disabled || 'disabled'],
            }))
        },

        currentLabel() {
            return (
                this.innerOptions?.find?.((o) => o.value === this.innerValue)
                    ?.label || '-'
            )
        },
    },

    methods: {
        onVisibleChange(visible) {
            if (!visible) {
                this.virtualListRef?.reset?.()
            }
        },
    },
}
</script>
