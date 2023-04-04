<script>
export default {
    name: 'Test3',

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
        // return (
        //     <div>
        //         Test3: {this.count}
        //         <button onClick={this.increment}>increment</button>
        //     </div>
        // )

        return h('div', {}, [
            `Test3: ${this.count}`,
            h(
                'button',
                {
                    on: {
                        click: this.increment,
                    },
                },
                'increment',
            ),
        ])
    },
}
</script>
