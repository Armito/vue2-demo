<template>
    <div>
        <div>{{ age }}</div>
        <button @click="grow">+++</button>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

const CompositionApi = defineComponent({
    name: 'CompositionApi',

    setup: () => {
        const age = ref(0)

        const grow = () => {
            age.value += 1
        }

        return {
            age,
            grow,
        }
    },
})

export default CompositionApi
</script>
