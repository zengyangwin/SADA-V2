<script setup>
// 使用 TypeScript 风格的 props 定义更清晰（可选）
const props = defineProps({
  data: {
    type: Object,
    required: true,
    validator: (val) => {
      const requiredFields = ['yqoutflow', 'yqozhuodu', 'yqoeryanghualv', 'yqlevel', 'yqoyali','yqiiflow'];
      return requiredFields.every(field => field in val);
    }
  }
});

</script>

<template>
  <div class="custom-marker">
    <div class="title">园区供水厂</div>
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
          <td>{{ data.yqiiflow.toFixed(0) }}</td>
          <td>
            {{ data.yqoutflow.toFixed(0) }}
          </td>
          <td>m³/h</td>
        </tr>
        <tr>
          <td>浊度</td>
          <td :class="{'warn':data.yqozhuodu>50,'exceed': data.yqozhuodu>100}">
            {{ data.yqizhuodu.toFixed(2)}}
          </td>
          <td :class="{'warn':data.yqozhuodu>0.8,'exceed': data.yqozhuodu>1}">
            {{ data.yqozhuodu.toFixed(2)}}
          </td>
          <td>NTU</td>
        </tr>
        <tr>
          <td>余ClO<sub>2</sub></td>
          <td>/</td>
          <td :class="{'exceed': data.yqoeryanghualv<0.1,'exceed': data.yqoeryanghualv>0.4,}">
            {{ data.yqoeryanghualv.toFixed(2) }}
          </td>
          <td>mg/L</td>
        </tr>
        <tr>
          <td>液位</td>
          <td>/</td>
          <td :class="{'warn':data.yqlevel<1.2||data.yqlevel<0.7 }">
            {{ data.yqlevel.toFixed(2) }}
          </td>
          <td>m</td>
        </tr>
        <tr>
          <td>压力</td>
          <td>/</td>
          <td :class="{'exceed': data.yqoyali<0.35 }">
            {{ data.yqoyali.toFixed(2)}}
          </td>
          <td>MPa</td>
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