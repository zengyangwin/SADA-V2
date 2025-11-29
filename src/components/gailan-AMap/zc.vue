<script setup>
// 使用 TypeScript 风格的 props 定义更清晰（可选）
const props = defineProps({
  data: {
    type: Object,
    required: true,
    validator: (val) => {
      const requiredFields = ['iflow', 'beiquflow','pingliuflow','xiquflow','ozhuodu','oyulv','zc2level'];
      return requiredFields.every(field => field in val);
    }
  }
});
</script>

<template>
  <div class="custom-marker">
    <div class="title">农村供水总厂</div>
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
          <td :class="{'warn':data.iflow>2700}">
            {{ data.iflow.toFixed(0)}}
          </td>
          <td :class="{ 'warn':(data.beiquflow+data.pingliuflow+data.xiquflow)>2800}">
            {{ (data.beiquflow+data.pingliuflow+data.xiquflow).toFixed(0)}}
          </td>
          <td>m³/h</td>
        </tr>
        <tr>
          <td>浊度</td>
          <td>
            {{ data.izhuodu.toFixed(0)}}
          </td>
          <td :class="{'warn':data.ozhuodu>0.8,'exceed': data.ozhuodu>1}">
            {{data.ozhuodu.toFixed(2) }}
          </td>
          <td>NTU</td>
        </tr>
        <tr>
          <td>余氯</td>
          <td>/</td>
          <td :class="{'exceed': data.oyulv < 0.3|| data.oyulv >0.8,}">
            {{ data.oyulv.toFixed(2) }}
          </td>
          <td>mg/L</td>
        </tr>
        <tr>
          <td>液位</td>
          <td>/</td>
          <td :class="{'warn': data.zc2level<1.7,'exceed': data.zc2level<1.5}">
            {{ data.zc2level.toFixed(2) }}
          </td>
          <td>m</td>
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
  color: rgb(26, 125, 162);
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