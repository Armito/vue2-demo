<!--
 * @Author: your name
 * @Date: 2021-05-29 14:47:39
 * @LastEditTime: 2021-05-29 17:08:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-demo\src\components\Select.vue
-->
<template>
  <select
    id="scaleSelect"
    title="缩放"
    tabindex="23"
    data-l10n-id="zoom"
    :key="selectKey"
  >
    <option
      id="pageAutoOption"
      title=""
      value="auto"
      data-l10n-id="page_scale_auto"
      >自动缩放</option
    >
    <option
      id="pageActualOption"
      title=""
      value="page-actual"
      data-l10n-id="page_scale_actual"
      >实际大小</option
    >
    <option
      id="pageFitOption"
      title=""
      value="page-fit"
      data-l10n-id="page_scale_fit"
      >适合页面</option
    >
    <option
      id="pageWidthOption"
      title=""
      value="page-width"
      data-l10n-id="page_scale_width"
      >适合页宽</option
    >
    <option
      id="customScaleOption"
      title=""
      value="custom"
      disabled="disabled"
      hidden="true"
    ></option>
    <option
      title=""
      value="0.5"
      data-l10n-id="page_scale_percent"
      data-l10n-args='{ "scale": 50 }'
      >50%</option
    >
    <option
      title=""
      value="0.75"
      data-l10n-id="page_scale_percent"
      data-l10n-args='{ "scale": 75 }'
      >75%</option
    >
    <option
      title=""
      value="1"
      data-l10n-id="page_scale_percent"
      data-l10n-args='{ "scale": 100 }'
      >100%</option
    >
    <option
      title=""
      value="1.25"
      data-l10n-id="page_scale_percent"
      data-l10n-args='{ "scale": 125 }'
      >125%</option
    >
    <option
      title=""
      value="1.5"
      data-l10n-id="page_scale_percent"
      data-l10n-args='{ "scale": 150 }'
      >150%</option
    >
    <option
      title=""
      value="2"
      data-l10n-id="page_scale_percent"
      data-l10n-args='{ "scale": 200 }'
      >200%</option
    >
    <option
      title=""
      value="3"
      data-l10n-id="page_scale_percent"
      data-l10n-args='{ "scale": 300 }'
      >300%</option
    >
    <option
      title=""
      value="4"
      data-l10n-id="page_scale_percent"
      data-l10n-args='{ "scale": 400 }'
      >400%</option
    >
  </select>
</template>

<script>
export default {
  data() {
    return {
      selectKey: 0
    };
  },
  mounted() {
    const o = document.querySelector('#scaleSelect option[value="page-width"]');
    // const div = document.createElement('div')
    // div.appendChild(o)
    // document.querySelector('#scaleSelect').insertAdjacentElement('afterbegin', o)
    // this.selectKey++
    o.setAttribute("selected", "selected");
  }
};
</script>

<style></style>
