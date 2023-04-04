export const Test = {
    name: 'Test',

    data() {
        return {
            count: 0,
        }
    },

    methods: {
        increment() {
            this.count++
        },
    },

    mounted() {
        this.count = Math.floor(Math.random() * 10)
    },
}
