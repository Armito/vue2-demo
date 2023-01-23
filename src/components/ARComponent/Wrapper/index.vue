<template>
    <div v-bind="$attrs" :style="{ height }">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Wrapper',

    props: {
        height: String,
    },
}
</script>
