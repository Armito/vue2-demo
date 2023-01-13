import { isNumber } from 'lodash'

export const mixinCount = {
    data() {
        return {
            count: 0,
        }
    },

    watch: {
        count() {
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
                this.count += val
            }
        },
    },

    created() {
        this.count = Math.floor(Math.random() * 10)
    },
}
