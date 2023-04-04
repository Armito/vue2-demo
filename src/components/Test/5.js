import { defineComponent } from 'vue'

const Test = {
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

export const Test5 = {
    ...Test,

    name: 'Test5',

    render(h, ctx) {
        return (
            <div>
                Test5: {this.count}
                <button onClick={this.increment}>increment</button>
            </div>
        )
    },
}

export const Test5_1 = defineComponent({
    ...Test,

    name: 'Test5_1',

    render(h, ctx) {
        return (
            <div>
                Test5_1: {this.count}
                <button onClick={this.increment}>increment</button>
            </div>
        )
    },
})
