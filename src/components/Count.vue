<template>
    <div @click="$_mixinCount_increment(1)">
        {{ $_mixinCount_count }}{{ count }}
    </div>
</template>

<script>
import { isNumber } from 'lodash'

export default {
    data() {
        return {
            $_mixinCount_count: 0,
            count: 0,
        }
    },

    watch: {
        $_mixinCount_count() {
            console.log('123')
        },
    },

    methods: {
        /**
         * @param  {number} val
         */
        $_mixinCount_increment(val = 0) {
            console.log(val)
            if (isNumber(val)) {
                console.log(23)
                this.$_mixinCount_count = 123
                this.count += 1
            }
        },
    },

    created() {
        this.$_mixinCount_count = Math.floor(Math.random() * 10)
    },
}
</script>

<style></style>
