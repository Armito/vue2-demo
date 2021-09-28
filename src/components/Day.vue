<!--
 * @Author: your name
 * @Date: 2021-04-25 09:48:35
 * @LastEditTime: 2021-07-20 14:35:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-demo\src\components\Day.vue
-->
<template>
  <div @click="handleClick">
    {{ time }}
    {{ count }}
  </div>
</template>

<script>
import * as moment from "moment";
import { throttle } from "../assets/js/utils";

export default {
  data() {
    return {
      time: "",
      count: 0
    };
  },
  methods: {
    handleClick() {
      const fn = (val, a, b) => {
        console.log(val, b);
      };
      setInterval(
        throttle(() => {
          this.count++;
          fn(1, 2, 3);
        }, 1000),
        50
      );
    }
  },
  created() {
    // this.time = moment().format('YYYY-MM-DD hh:mm:ss');
    // this.time = moment('2021-01-01').format('YYYY-MM-DD hh:mm:ss');
    // this.time = moment([2021, 0, 1]).format('YYYY-MM-DD hh:mm:ss');
    // this.time = moment([2021, 0, 1]).valueOf();
    // this.time = moment([2021, 0, 1]).toArray();
    // this.time = moment([2021, 0, 1]).toObject();
    this.time = moment([2021, 0, 1]).isLeapYear();
  }
};
</script>
