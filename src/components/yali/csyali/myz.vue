<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

// 计算名一中的压力值
const myzPressure = () => {
  return props.data.myz_pressure ? (props.data.myz_pressure / 1000).toFixed(2) : '--';
};

// 计算名一中的流量值
const myzFlow = () => {
  return props.data.myz_instant_flow ? props.data.myz_instant_flow.toFixed(0) : '--';
};
</script>

<template>
  <div class="csyl-marker">
    <div class="csyl-title">名一中</div>
    <p class="csyl-text">压力{{ myzPressure() }}mPa<br/>流量{{ myzFlow() }}m<sup>3</sup>/h</p>
  </div>
</template>
