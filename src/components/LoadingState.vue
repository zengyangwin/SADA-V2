<template>
  <div class="custom-marker">
    <div class="loading-text">{{ text }}</div>
  </div>
</template>

<script setup>

const props = defineProps({
  text: {
    type: String,
    default: '加载中...'
  }
});
</script>

<style scoped>
.custom-marker {
  border: 1px solid white;
  background-color: white;
  padding: 5px 10px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.loading-text {
  color: #e65100;
  font-weight: bold;
}
</style>