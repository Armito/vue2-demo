export const GenderOptions = [
    { label: 'male', value: 'male' },
    { label: 'female', value: 'female' },
]

export const mixin_options_gender = {
    data() {
        this.mixinOptionsGender = GenderOptions
        return {}
    },
}
