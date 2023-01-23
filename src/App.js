/*
 * @Author: Armito
 * @Date: 2021-05-11 17:48:50
 * @LastEditTime: 2021-07-20 14:36:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-demo\src\App.js
 */
export const useForm = () => ({
    model: {
        gender: 1,
        phone: 18234432223,
        hobby: [],
    },
    inline: true,
    labelWidth: '80px',
    rules: {
        name: [
            {
                required: true,
                message: 'Can Not Empty!',
                trigger: 'blur',
            },
        ],
        age: [
            {
                required: true,
                message: 'Can Not Empty',
                trigger: 'blur',
            },
        ],
    },
})

export const useFormItems = () => [
    {
        key: 'name',
        itemAttrs: {
            label: 'NAME',
            prop: 'name',
        },
        widgetType: 'input',
        widgetEvents: {
            change: (value) => {
                console.log(value)
            },
            blur: () => {
                console.log('blur')
            },
        },
    },
    {
        key: 'age',
        itemAttrs: {
            label: 'AGE',
            prop: 'age',
        },
        widgetType: 'input',
        widgetAttrs: {
            showPassword: true,
        },
    },
    {
        key: 'phone',
        itemAttrs: {
            label: 'PHONE',
        },
        widgetType: 'input-slot-button',
        widgetAttrs: {
            clearable: true,
        },
        widgetSlots: {
            slot: 'append',
            icon: 'el-icon-search',
        },
    },
    {
        key: 'address',
        itemAttrs: {
            label: 'ADDRESS',
        },
        widgetType: 'select',
        widgetAttrs: {
            selectWidget: {
                clearable: true,
            },
            optionsWidget: [
                {
                    value: 1,
                    label: '洪山区',
                    disabled: true,
                },
                {
                    value: 2,
                    label: '江夏区',
                },
            ],
        },
    },
    {
        key: 'gender',
        itemAttrs: {
            label: 'GENDER',
        },
        widgetType: 'radio',
        widgetAttrs: {
            radioGroupWidget: {
                disabled: false,
            },
            radioWidget: [
                {
                    label: 1,
                    labelText: '男',
                    size: 'small',
                },
                {
                    label: 2,
                    labelText: '女',
                    size: 'small',
                },
            ],
        },
    },
    {
        key: 'hooby',
        itemAttrs: {
            label: 'HOBBY',
        },
        widgetType: 'checkbox',
        widgetAttrs: {
            checkboxGroupWidget: {
                fill: '#666',
            },
            ckeckboxWidget: [
                {
                    label: 'Programming',
                },
                {
                    label: 'Computer Game',
                },
            ],
        },
        widgetEvents: {
            change: () => {
                console.log('change')
            },
        },
    },
]

export const useButtons = () => [
    {
        effect: 'Search',
        label: 'Search',
        buttonAttrs: {
            type: 'primary',
            size: 'middle',
        },
    },
    {
        effect: 'Submit',
        label: 'Submit',
        buttonAttrs: {
            type: 'warning',
            size: 'middle',
        },
    },
    {
        effect: 'Reset',
        label: 'Reset',
        buttonAttrs: {
            type: 'normal',
            size: 'middle',
        },
    },
    {
        effect: 'Cancel',
        label: 'Cancel',
        buttonAttrs: {
            type: 'danger',
            size: 'middle',
        },
    },
]
