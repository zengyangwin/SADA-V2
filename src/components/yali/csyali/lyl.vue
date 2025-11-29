<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

// 计算麓源路的压力值
const lylPressure = () => {
  return props.data.lyl_pressure ? (props.data.lyl_pressure / 1000).toFixed(2) : '--';
};

// 计算麓源路的流量值
const lylFlow = () => {
  return props.data.lyl_instant_flow ? props.data.lyl_instant_flow.toFixed(0) : '--';
};
</script>

<template>
  <div class="csyl-marker">
    <div class="csyl-title">麓源路</div>
    <p class="csyl-text">压力{{ lylPressure() }}mPa<br/>流量{{ lylFlow() }}m<sup>3</sup>/h</p>
  </div>
</template>
