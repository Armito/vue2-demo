export default {
    name: 'Test4',

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

    render(h, ctx) {
        return (
            <div>
                Test4: {this.count}
                <button onClick={this.increment}>increment</button>
            </div>
        )
    },
}
