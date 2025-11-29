<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

// 计算龙殿桥的压力值
const ldqPressure = () => {
  return props.data.ldq_pressure ? (props.data.ldq_pressure / 1000).toFixed(2) : '--';
};

// 计算龙殿桥的流量值（如果没有流量数据，显示为0）
const ldqFlow = () => {
  return props.data.ldq_instant_flow ? props.data.ldq_instant_flow.toFixed(0) : '0';
};
</script>

<template>
  <div class="csyl-marker">
    <div class="csyl-title">龙殿桥</div>
    <p class="csyl-text">压力{{ ldqPressure() }}mPa</p>
  </div>
</template>
