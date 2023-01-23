<template>
    <div @click="mixinCountIncrement(1)">
        {{ count }}
    </div>
</template>

<script>
import { mixin_count } from '../mixins'
import Count from '../components/Count.vue'

export default {
    mixins: [mixin_count],
    // extends: Count,

    watch: {
        mixinCountCount: {
            handler(v) {
                console.log(v)
            },
        },
    },
}
</script>
