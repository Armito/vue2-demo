<template>
    <div>
        <div>{{ age }}</div>
        <button @click="grow">+++</button>
        <!-- <iframe :src="url" height="800px"></iframe> -->
        <div :style="{ display: 'flex' }">
            <div>123</div>
            <div>
                <div>
                    12332431123324311233243112332431123324311233243112332431
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

const CompositionApi = defineComponent({
    name: 'CompositionApi',

    data() {
        return {
            url: 'https://s-case1.udesk.cn/backend/auth/users/h5/test?recordId=83736&jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJVX1NFUlZJQ0UiLCJzdWIiOiJzZWUtOTlAMTYzLmNvbSIsImlhdCI6MTY2OTcxOTM5Mn0.qzFsppwZZcNK_Utj0-1GhNXQzmTIMBX3Txh8j-_ctjw',
        }
    },

    setup: () => {
        const age = ref(0)

        const grow = () => {
            age.value += 1
        }

        return {
            age,
            grow,
        }
    },
})

export default CompositionApi
</script>
