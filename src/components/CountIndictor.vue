<template>
    <div @click="$_mixinCount_increment(1)">
        {{ count }}
    </div>
</template>

<script>
import { mixinCount } from '../mixins'
import Count from '../components/Count.vue'

export default {
    mixins: [mixinCount],
    // extends: Count,

    watch: {
        $_mixinCount_count: {
            handler(v) {
                console.log(v)
            },
        },
    },
}
</script>
