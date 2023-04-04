<template>
    <div
        @click="
            {
                count++
            }
        "
    >
        Father{{ count }}
        <Son />
    </div>
</template>

<script>
import Son from './Son.vue'

export default {
    name: 'Father',
    components: {
        Son,
    },
    data() {
        return {
            count: 0,
        }
    },
    mounted() {
        console.log('Father')
    },
}
</script>
