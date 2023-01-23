<script>
export default {
    name: 'Render',

    props: {
        render: {
            type: Function,
            default() {
                return () => {}
            },
        },

        params: {
            type: Object,
            default() {
                return {}
            },
        },
    },

    render(h) {
        return this.render(h, this.params)
    },
}
</script>
