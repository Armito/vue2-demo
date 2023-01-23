<template>
    <div :class="['space', align]">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Space',

    props: {
        align: {
            validator(v) {
                return ['top', 'center', 'right'].includes(v)
            },
            default: 'center',
        },
    },
}
</script>

<style scoped>
.space {
    display: inline-flex;
    gap: 8px;
    align-items: center;
}

.top {
    align-items: flex-start;
}

.center {
    align-items: center;
}

.right {
    align-items: flex-end;
}
</style>
