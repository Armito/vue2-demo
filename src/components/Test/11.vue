<!-- <template>
    <div>func</div>
</template> -->

<script>
export default {
    functional: true,

    props: {
        nickname: {
            type: String,
            default() {
                return 'Armito'
            },
        },
    },

    render(h, ctx) {
        console.log(ctx.props)
        console.log(ctx.data)
        console.log(ctx.listeners)
        console.log(ctx.children)
        return <div>123{ctx.props.nickname}</div>
        // return <div>123{this.nickname}</div>
    },
}
</script>
