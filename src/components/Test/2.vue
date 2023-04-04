<script>
export default {
    name: 'Test2',

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

    template: `
        <div>
            Test2: {{ count }}
            <button @click="increment">increment</button>
        </div>
    `,
}
</script>
