<template>
    <div @click="mixinCountIncrement(1)">{{ mixinCountCount }}{{ count }}</div>
</template>

<script>
import { isNumber } from 'lodash'

export default {
    data() {
        return {
            mixinCountCount: 0,
            count: 0,
        }
    },

    watch: {
        mixinCountCount() {
            console.log('123')
        },
    },

    methods: {
        /**
         * @param  {number} val
         */
        mixinCountIncrement(val = 0) {
            console.log(val)
            if (isNumber(val)) {
                console.log(23)
                this.mixinCountCount = 123
                this.count += 1
            }
        },
    },

    created() {
        this.mixinCountCount = Math.floor(Math.random() * 10)
    },
}
</script>

<style></style>
