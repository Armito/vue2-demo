<template>
    <div>
        Test1: {{ count }}
        <button @click="increment">increment</button>
    </div>
</template>

<script>
export default {
    name: 'Test1',

    data() {
        return {
            count: 0,
        }
    },

    methods: {
        increment() {
            this.count++
        },
    },

    mounted() {
        this.count = Math.floor(Math.random() * 10)
    },
}
</script>
