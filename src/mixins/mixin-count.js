import { isNumber } from 'lodash'

export default {
    data() {
        return {
            mixinCount_count: 0,
        }
    },

    methods: {
        mixinCount_increment(val = 0) {
            if (isNumber(val)) {
                this.mixinCount_count += val
            }
        },
    },

    created() {
        this.mixinCount_count = Math.floor(Math.random() * 10)
    },
}
