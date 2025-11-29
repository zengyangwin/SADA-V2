<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

// 计算源山墅的液位值
const yssLevel = () => {
  return props.data.yss_level ? (props.data.yss_level/100).toFixed(2) : '--';
};

// 计算源山墅的流量值
const yssFlow = () => {
  return props.data.yss_instant_flow ? props.data.yss_instant_flow.toFixed(0) : '--';
};
</script>

<template>
  <div class="csyl-marker">
    <div class="csyl-title">源山墅</div>
    <p class="csyl-text">液位{{ yssLevel() }}m<br/>流量{{ yssFlow() }}m<sup>3</sup>/h</p>
  </div>
</template>