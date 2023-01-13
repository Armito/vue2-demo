<template>
    <i :class="type"></i>
</template>

<script>
export default {
    name: 'Icon',

    props: {
        type: {
            type: String,
            required: true,
        },
    },
}
</script>
