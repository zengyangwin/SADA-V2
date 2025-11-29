<script setup>
// 使用 TypeScript 风格的 props 定义更清晰（可选）
const props = defineProps({
  data: {
    type: Object,
    required: true,
    validator: (val) => {
      const requiredFields = ['iflow1', 'iflow2', 'oflow', 'icod', 'ocod', 'inh3n','onh3n', 'itn', 'otn', 'itp', 'otp'];
      return requiredFields.every(field => field in val);
    }
  }
});
</script>

<template>
  <div class="custom-marker">
    <div class="title">城市净水厂</div>
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
          <td>流量</td>
          <td>{{(data.iflow1+data.iflow2).toFixed(0)}}</td>
          <td>{{ data.oflow.toFixed(0) }}</td>
          <td>m³/h</td>
        </tr>
        <tr>
          <td>COD</td>
          <td>{{data.icod.toFixed(0)}}</td>
          <td :class="{ 'exceed': data.ocod>30}">
            {{ data.ocod.toFixed(0)}}
          </td>
          <td>mg/L</td>
        </tr>
        <tr>
          <td>NH<sub>3</sub>N</td>
          <td>{{data.inh3n.toFixed(2)}}</td>
          <td :class="{ 'exceed':data.onh3n>1.5 }">
            {{ data.onh3n.toFixed(2) }}
          </td>
          <td>mg/L</td>
        </tr>
        <tr>
          <td>TN</td>
          <td>{{ data.itn.toFixed(2)}}</td>
          <td :class="{ 'exceed': data.otn> 10 }">
            {{ data.otn.toFixed(2)}}
          </td>
          <td>mg/L</td>
        </tr>
        <tr>
          <td>TP</td>
          <td>{{ data.itp.toFixed(2)}}</td>
          <td :class="{ 'exceed': data.otp>0.3 }">
            {{ data.otp.toFixed(2)}}
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