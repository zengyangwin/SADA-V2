<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

// 计算同贯路的流量值
const tglFlow = () => {
  return props.data.tgl_instant_flow !== null && props.data.tgl_instant_flow !== undefined 
    ? props.data.tgl_instant_flow.toFixed(0) 
    : '--';
};

// 同贯路没有压力数据，显示为--
const tglPressure = () => {
  return '--';
};
</script>

<template>
  <div class="csyl-marker">
    <div class="csyl-title">同贯路</div>   
    <p class="csyl-text">流量{{ tglFlow() }}m<sup>3</sup>/h</p>
  </div>
</template>
