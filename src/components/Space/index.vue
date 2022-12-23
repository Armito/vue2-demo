<template>
    <div class="space">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Space',
}
</script>

<style scoped>
.space {
    display: inline-flex;
    gap: 8px;
}
</style>
