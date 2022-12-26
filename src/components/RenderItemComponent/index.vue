<script>
export default {
    name: 'RenderComponent',

    props: {
        render: Function,
    },

    render(h) {
        return this.render(h, this.$attrs)
    },
}
</script>
