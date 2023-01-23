<script>
export default {
    name: 'Base',

    model: {
        prop: 'value',
        event: 'update:value',
    },

    props: {
        value: {
            required: true,
        },
    },

    computed: {
        innerValue: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('update:value', val)
            },
        },
    },
}
</script>
