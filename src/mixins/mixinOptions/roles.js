export const mixin_options_roles = {
    data() {
        return {
            mixinOptionsRoles: [],
        }
    },

    methods: {
        mixinOptionsGetRoles() {
            setTimeout(() => {
                this.mixinOptionsRoles = [
                    {
                        value: '0000',
                        label: 'admin',
                    },
                    {
                        value: '0003',
                        label: 'police',
                    },
                    {
                        value: '0007',
                        label: 'doctor',
                    },
                ]
            }, 500)
        },
    },

    created() {
        this.mixinOptionsGetRoles()
    },
}
