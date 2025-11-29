<script setup>
// 使用 TypeScript 风格的 props 定义更清晰（可选）
const props = defineProps({
  data: {
    type: Object,
    required: true,
    validator: (val) => {
      const requiredFields = ['hyicod', 'hyocod', 'hyinh3n','hyonh3n', 'hyotp'];
      return requiredFields.every(field => field in val);
    }
  }
});

</script>

<template>
  <div class="custom-marker">
    <div class="title">红岩污水厂</div>
    <table>
      <thead> <!-- 添加 thead 语义化标签 -->
        <tr>
          <th>指标</th>
          <th>进水</th>
          <th>出水</th>
          <th>单位</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>COD</td>
          <td>{{ data.hyicod.toFixed(0)}}</td>
          <td :class="{ 'exceed': data.hyocod> 50 }">
            {{ data.hyocod.toFixed(0) }}
          </td>
          <td>mg/L</td>
        </tr>
        <tr>
          <td>NH<sub>3</sub>N</td>
          <td>{{data.hyinh3n.toFixed(2)}}</td>
          <td :class="{ 'exceed': data.hyonh3n> 5 }">
            {{data.hyonh3n.toFixed(2) }}
          </td>
          <td>mg/L</td>          
        </tr>
        <tr>
          <td>TP</td>
          <td>/</td>
          <td :class="{ 'exceed':data.hyotp> 0.5}">
            {{ data.hyotp.toFixed(2) }}
          </td>
          <td>mg/L</td>          
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
  color: #e65100;
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

.exceed {
  color: red;
  font-weight: bold;
}
</style>