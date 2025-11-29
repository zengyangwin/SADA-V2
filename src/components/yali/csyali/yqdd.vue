<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

// 计算园区大道的压力值
const yqddPressure = () => {
  return props.data.yqdd_pressure ? (props.data.yqdd_pressure / 1000).toFixed(2) : '--';
};

// 计算园区大道的流量值
const yqddFlow = () => {
  return props.data.yqdd_instant_flow ? props.data.yqdd_instant_flow.toFixed(0) : '--';
};
</script>

<template>
  <div class="csyl-marker">
    <div class="csyl-title">园区大道</div>
    <p class="csyl-text">压力{{ yqddPressure() }}mPa<br/>流量{{ yqddFlow() }}m<sup>3</sup>/h</p>
  </div>
</template>
