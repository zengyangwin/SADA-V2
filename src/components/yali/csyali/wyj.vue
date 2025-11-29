<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

// 计算望月街的压力值
const wyjPressure = () => {
  return props.data.wyj_pressure !== null && props.data.wyj_pressure !== undefined 
    ? (props.data.wyj_pressure / 1000).toFixed(2) 
    : '--';
};

// 计算望月街的流量值
const wyjFlow = () => {
  return props.data.wyj_instant_flow !== null && props.data.wyj_instant_flow !== undefined 
    ? props.data.wyj_instant_flow.toFixed(0) 
    : '--';
};
</script>

<template>
  <div class="csyl-marker">
    <div class="csyl-title">望月街</div>
    <p class="csyl-text">压力{{ wyjPressure() }}mPa<br/>流量{{ wyjFlow() }}m<sup>3</sup>/h</p>
  </div>
</template>
