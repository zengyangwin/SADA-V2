<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import hy_xianglan from './xzpaishui/hy_xianglan.vue'
import mh_xianglan from './xzpaishui/mh_xianglan.vue'
import cl_xianglan from './xzpaishui/cl_xianglan.vue'
import {
  formatAmmonia,
  formatCOD,
  formatTP,
  formatPH,
  formatTotalFlow,
  formatFlow
} from '../utils.js'

// 响应式数据
const hongyanData = ref({})
const maoheData = ref({})
const chelingData = ref({})
const updateTimer = ref(null)

// API配置
const API_CONFIG = {
  hongyan: 'http://182.132.164.178:3000/hongyan',
  maohe: 'http://182.132.164.178:3000/maohe',
  cheling: 'http://182.132.164.178:3000/cheling'
}

// 通用数据获取函数
async function fetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl)
    return await response.json()
  } catch (error) {
    console.error(`获取数据失败: ${apiUrl}`, error)
    return {}
  }
}

// 更新单个数据源
async function updateData(dataRef, apiKey) {
  dataRef.value = await fetchData(API_CONFIG[apiKey])
}

// 更新所有数据
function updateAllData() {
  updateData(hongyanData, 'hongyan')
  updateData(maoheData, 'maohe')
  updateData(chelingData, 'cheling')
}

// 生命周期
onMounted(() => {
  updateAllData()
  updateTimer.value = setInterval(updateAllData, 30000)
})

onUnmounted(() => {
  if (updateTimer.value) {
    clearInterval(updateTimer.value)
  }
})
</script>

<template>
  <div class="container">
    <!-- 头部 -->
    <header class="container-head">
      <p>乡镇排水实时生产数据</p>
      <div class="update-time">
        数据更新时间：{{ hongyanData.TIME || '-' }}
      </div>
    </header>

    <!-- 基本数据汇总 -->
    <section class="summary-section">
      <table>
        <caption>基本数据汇总</caption>
        <tbody>
          <tr>
            <td rowspan="3" class="plant-title">红岩</td>
            <td>进水流量</td>
            <td>{{ formatFlow(hongyanData.hy_influent_flow) }}</td>
            <td>进水氨氮</td>
            <td>{{ formatAmmonia(hongyanData.hy_influent_ammonia_nitrogen) }}</td>
            <td>进水COD</td>
            <td>{{ formatCOD(hongyanData.hy_influent_cod) }}</td>
            <td>出水总磷</td>
            <td>{{ formatTP(hongyanData.hy_effluent_tp) }}</td>
            
            <td rowspan="3" class="plant-title">茅河</td>
            <td>进水流量</td>
            <td>{{ formatFlow(maoheData.mh_influent_flow) }}</td>
            <td>进水氨氮</td>
            <td>{{ formatAmmonia(maoheData.mh_influent_ammonia_nitrogen) }}</td>
            <td>进水COD</td>
            <td>{{ formatCOD(maoheData.mh_influent_cod) }}</td>
            <td>出水总磷</td>
            <td>{{ formatTP(maoheData.mh_effluent_tp) }}</td>
            
            <td rowspan="3" class="plant-title">车岭</td>
            <td>进水流量</td>
            <td>{{ formatFlow(chelingData.cl_influent_flow) }}</td>
            <td>进水氨氮</td>
            <td>{{ formatAmmonia(chelingData.cl_influent_ammonia_nitrogen) }}</td>
            <td>进水COD</td>
            <td>{{ formatCOD(chelingData.cl_influent_cod) }}</td>
            <td>出水总磷</td>
            <td>{{ formatTP(chelingData.cl_effluent_tp) }}</td>
          </tr>
          
          <tr>
            <td>出水流量</td>
            <td>{{ formatFlow(hongyanData.hy_effluent_flow) }}</td>
            <td>出水氨氮</td>
            <td>{{ formatAmmonia(hongyanData.hy_effluent_ammonia_nitrogen) }}</td>
            <td>出水COD</td>
            <td>{{ formatCOD(hongyanData.hy_effluent_cod) }}</td>
            <td>出水pH</td>
            <td>{{ formatPH(hongyanData.hy_effluent_ph) }}</td>
            
            <td>出水流量</td>
            <td>{{ formatFlow(maoheData.mh_effluent_flow) }}</td>
            <td>出水氨氮</td>
            <td>{{ formatAmmonia(maoheData.mh_effluent_ammonia_nitrogen) }}</td>
            <td>出水COD</td>
            <td>{{ formatCOD(maoheData.mh_effluent_cod) }}</td>
            <td>出水pH</td>
            <td>{{ formatPH(maoheData.mh_effluent_ph) }}</td>
            
            <td>出水流量</td>
            <td>{{ formatFlow(chelingData.cl_effluent_flow) }}</td>
            <td>出水氨氮</td>
            <td>{{ formatAmmonia(chelingData.cl_effluent_ammonia_nitrogen) }}</td>
            <td>出水COD</td>
            <td>{{ formatCOD(chelingData.cl_effluent_cod) }}</td>
            <td>出水pH</td>
            <td>{{ formatPH(chelingData.cl_effluent_ph) }}</td>
          </tr>
          
          <tr>
            <td>累计流量</td>
            <td colspan="7">{{ formatTotalFlow(hongyanData.hy_effluent_total_flow) }}</td>
            
            <td>累计流量</td>
            <td colspan="7">{{ formatTotalFlow(maoheData.mh_effluent_total_flow) }}</td>
            
            <td>累计流量</td>
            <td colspan="7">{{ formatTotalFlow(chelingData.cl_effluent_total_flow) }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- 车岭厂详览 -->
    <section class="detail-section full-width">
      <cl_xianglan :chelingData="chelingData" />
    </section>

    <!-- 红岩和茅河厂详览 -->
    <section class="detail-section layout-row">
      <div class="hongyan-detail">
        <hy_xianglan :hongyanData="hongyanData" />
      </div>
      <div class="maohe-detail">
        <mh_xianglan :maoheData="maoheData" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  padding: 0;
  margin: 0;
}

.update-time {
  font-size: 12px;
  color: #666;
  position: absolute;
  bottom: 5px;
  right: 10px;
}

.summary-section,
.detail-section {
  margin: 0;
  padding: 0;
}

.full-width {
  width: 87vw;
}

.layout-row {
  display: flex;
  gap: 0;
  margin-top: 0;
}

.hongyan-detail {
  width: 30vw;
}

.maohe-detail {
  width: 69vw;
  padding-left: 1vw;
  box-sizing: border-box;
}

table {
  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
  font-size: 0.65vw;
  font-family: '微软雅黑', 'Times New Roman';
  margin: 0;
  padding: 0;
}

caption {
  caption-side: top;
  font-weight: bold;
  margin: 0;
  padding: 0;
  font-size: 17px;
  font-family: '微软雅黑', 'times new roman';
  color: red;
}

.plant-title {
  font-family: '微软雅黑', 'Times New Roman', serif;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
}

.running { color: green; font-weight: bold; }
.stopped { color: red; font-weight: bold; }
.fault { color: orange; font-weight: bold; }
</style>