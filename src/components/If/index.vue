<script>
export default {
    name: 'If',

    props: {
        condition: {
            type: Boolean,
            required: true,
        },
    },

    render() {
        return this.condition ? this.$scopedSlots.default() : null
    },
}
</script>
