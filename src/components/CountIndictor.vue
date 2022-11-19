<template>
    <div @click="mixinCount_increment(1)">
        {{ mixinCount_count }}
    </div>
</template>

<script>
import mixinCount from '../mixins/mixin-count'

export default {
    mixins: [mixinCount],
}
</script>
