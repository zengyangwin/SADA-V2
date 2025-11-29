<script setup>
// 使用 TypeScript 风格的 props 定义更清晰（可选）
const props = defineProps({
  data: {
    type: Object,
    required: true,
    validator: (val) => {
      const requiredFields = ['zhuodu'];
      return requiredFields.every(field => field in val);
    }
  }
});
</script>

<template>
  <div class="custom-marker">
    <div class="title">黄家岗监测站</div>
    <table>
      <thead> <!-- 添加 thead 语义化标签 -->
        <tr>
          <th>指标</th>
          <th>数值</th>
          <th>单位</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>浊度</td>
          <td :class="{'warn': data.zhuodu>200,'exceed': data.zhuodu>1000}">
            {{ data.zhuodu.toFixed(0) }}
          </td>
          <td>NTU</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped> 

.custom-marker {
  border: 1px solid white;
  background-color: white;
  border-radius: 9px;
  font-family: '微软雅黑', 'Microsoft Times New Roman', 'sans-serif';
  background-color: white;
  border-radius: 4px;
}

.title {
  color:rgb(26, 125, 162);
  font-weight: bold;
  line-height: 1;
  text-align: center;
  margin-bottom: 8px;
  font-size:0.7vw;
}

table {
  font-size: 0.5vw;
  border-collapse: collapse;
  width: 100%;
}

th, td {
  text-align: center;
  font-size:0.6vw;
  padding: 3px 3px;
  border: 1px solid #ddd; 
}

.warn {
  color: rgb(168,50,132);
  font-weight: bold;
}
.exceed {
  color: red;
  font-weight: bold;
}
</style>