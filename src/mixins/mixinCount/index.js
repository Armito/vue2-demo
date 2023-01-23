import { isNumber } from 'lodash'

export const mixin_count = {
    data() {
        return {
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
                this.count += val
            }
        },
    },

    created() {
        this.count = Math.floor(Math.random() * 10)
    },
}
