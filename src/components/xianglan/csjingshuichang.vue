<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 响应式数据
const cscData = ref({})

// 定时器引用
const updateTimer = ref(null)

// 获取城市厂数据
async function updateDatachengshichang() {
  try {
    const response = await fetch("http://182.132.164.178:3000/chengshichang")
    const data = await response.json()
    cscData.value = data
  } catch (error) {
    console.error('获取城市厂数据失败:', error)
  }
}

// 更新所有数据
function updateAllData() {
  updateDatachengshichang()
}

// 统一格式化函数
function formatValue(value, type = 'default') {
  if (value === undefined || value === null) return '-'
  
  const formatters = {
    ammonia: (v) => v.toFixed(2) + ' mg/L',
    cod: (v) => Math.round(v) + ' mg/L',
    tp: (v) => v.toFixed(2) + ' mg/L',
    ph: (v) => v.toFixed(1),
    totalFlow: (v) => Math.round(v) + ' m³',
    flow: (v) => v.toFixed(2) + ' m³/h',
    level: (v) => v.toFixed(2) + ' m',
    do: (v) => v.toFixed(2) + ' mg/L',
    levelDiff: (v) => v.toFixed(2) + ' m',
    orp: (v) => Math.round(v) + ' mv',
    mlss: (v) => Math.round(v) + ' mg/L',
    blower: (v) => Math.round(v) + ' kW',
    temperature: (v) => v.toFixed(1) + ' °C',
    pressure: (v) => v.toFixed(1) + ' kPa',
    power: (v) => v.toFixed(1) + ' kW',
    current: (v) => v.toFixed(1) + ' A',
    default: (v) => v.toString()
  }
  
  return formatters[type] ? formatters[type](value) : formatters.default(value)
}

// 运行状态格式化函数
function formatRunningStatus(running, fault) {
  if (fault === 1) return '故障'
  return running === 1 ? '运行' : '停机'
}

// 通用设备状态获取函数
function getEquipmentStatus(data, prefix, count, type = 'running') {
  const running = []
  const fault = []
  
  for (let i = 1; i <= count; i++) {
    const runningKey = `${prefix}${i}_${type}`
    const faultKey = `${prefix}${i}_fault`
    
    if (data[runningKey] === 1) running.push(i)
    if (data[faultKey] === 1) fault.push(i)
  }
  
  if (fault.length > 0) return fault.join('、') + '#' + '故障'
  if (running.length > 0) return running.join('、') + '#' + '运行'
  return '全部停机'
}

// 设备状态获取函数
const getPACStatus = () => getEquipmentStatus(cscData.value, 'csc_pac_pump', 3, 'running')
const getSodiumAcetateStatus = () => getEquipmentStatus(cscData.value, 'csc_sodium_acetate_pump', 3, 'running')
const getSludgeReturnStatus = () => getEquipmentStatus(cscData.value, 'csc_sludge_return_pump', 3, 'running')
const getSurplusSludgeStatus = () => getEquipmentStatus(cscData.value, 'csc_surplus_sludge_pump', 2, 'running')

// 特定设备状态获取函数
const getLine1ReturnPump1Status = () => {
  if (cscData.value.csc_line1_return_pump1_fault === 1) return '故障'
  return cscData.value.csc_line1_return_pump1_running === 1 ? '运行' : '停机'
}

const getLine1ReturnPump2Status = () => {
  if (cscData.value.csc_line1_return_pump2_fault === 1) return '故障'
  return cscData.value.csc_line1_return_pump2_running === 1 ? '运行' : '停机'
}

const getLine2ReturnPump1Status = () => {
  if (cscData.value.csc_line2_return_pump1_fault === 1) return '故障'
  return cscData.value.csc_line2_return_pump1_running === 1 ? '运行' : '停机'
}

const getLine3MainReturnPumpStatus = () => {
  if (cscData.value.csc_line3_main_return_pump_fault === 1) return '故障'
  return cscData.value.csc_line3_main_return_pump_running === 1 ? '运行' : '停机'
}

const getLine3BackupReturnPumpStatus = () => {
  if (cscData.value.csc_line3_backup_return_pump_fault === 1) return '故障'
  return cscData.value.csc_line3_backup_return_pump_running === 1 ? '运行' : '停机'
}

const getLine4MainReturnPumpStatus = () => {
  if (cscData.value.csc_line4_main_return_pump_fault === 1) return '故障'
  return cscData.value.csc_line4_main_return_pump_running === 1 ? '运行' : '停机'
}

const getLine4BackupReturnPumpStatus = () => {
  if (cscData.value.csc_line4_backup_return_pump_fault === 1) return '故障'
  return cscData.value.csc_line4_backup_return_pump_running === 1 ? '运行' : '停机'
}

// 组件挂载时初始化数据
onMounted(() => {
  updateAllData()
  // 每30秒更新一次数据
  updateTimer.value = setInterval(updateAllData, 30000)
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (updateTimer.value) {
    clearInterval(updateTimer.value)
  }
})
</script>

<template>
  <div class="container">
    <div class="container-head">
      <p>城市净水厂实时生产数据</p>
      <div class="update-time">数据更新时间：{{ cscData.TIME }}</div>
    </div>
    
    <div class="data-section">
      <table>    
        <caption>基本数据汇总</caption>
        <tbody>
          <tr>
            <td>进水流量</td>
            <td>{{ formatValue(cscData.csc_external_instant_flow, 'flow') }}</td>
            <td>进水COD</td>
            <td>{{ formatValue(cscData.csc_influent_cod, 'cod') }}</td>
            <td>进水总氮</td>
            <td>{{ formatValue(cscData.csc_influent_total_nitrogen, 'ammonia') }}</td> 
            <td>进水氨氮</td>
            <td>{{ formatValue(cscData.csc_influent_ammonia_nitrogen, 'ammonia') }}</td>
            <td>进水总磷</td>
            <td>{{ formatValue(cscData.csc_influent_total_phosphorus, 'tp') }}</td>
          </tr>
          <tr>
            <td>出水流量</td>
            <td>{{ formatValue(cscData.csc_effluent_flow_instant, 'flow') }}</td>
            <td>出水COD</td>
            <td>{{ formatValue(cscData.csc_effluent_cod, 'cod') }}</td>
            <td>出水总氮</td>
            <td>{{ formatValue(cscData.csc_effluent_total_nitrogen, 'ammonia') }}</td>          
            <td>出水氨氮</td>
            <td>{{ formatValue(cscData.csc_effluent_ammonia_nitrogen, 'ammonia') }}</td>
            <td>出水总磷</td>
            <td>{{ formatValue(cscData.csc_effluent_total_phosphorus, 'tp') }}</td> 
          </tr>
          <tr>
            <td colspan="2">进水累积流量</td>
            <td colspan="3">{{ formatValue(cscData.csc_effluent_flow_total, 'totalFlow') }}</td>
            <td colspan="2">出水累积流量</td>
            <td colspan="3">{{ formatValue(cscData.csc_effluent_flow_total, 'totalFlow') }}</td>
          </tr>
        </tbody>
      </table>						
    </div>
    
    <div class="tables-container">
      <!-- 预处理系统 -->
      <div class="table-section">
        <table>    
          <caption>预处理系统</caption>
          <tbody>
            <tr>
              <td rowspan="4" class="section-title">厂外泵站</td>
              <td> </td>
              <td>1#罐体</td>
              <td>2#罐体</td>
            </tr>
            <tr>
              <td>液位</td>
              <td>-</td>
              <td>-</td>          
            </tr>
            <tr>
              <td>水泵</td>
              <td>1~3#泵频率</td>
              <td>4~6#泵频率</td>
            </tr>
            <tr>
              <td>进水流量</td>
              <td colspan="2">
                {{ formatValue(cscData.csc_external_pump_flow1, 'flow') }} /
                {{ formatValue(cscData.csc_external_pump_flow2, 'flow') }} /
                {{ formatValue(cscData.csc_external_pump_flow3, 'flow') }} /
                {{ formatValue(cscData.csc_external_pump_flow4, 'flow') }}
              </td>
            </tr>
            <tr>
              <td rowspan="3" class="section-title">粗格栅</td>
              <td>提升泵</td>
              <td colspan="2">
                {{ formatRunningStatus(cscData.csc_lift_pump1_running, cscData.csc_lift_pump1_fault) }} /
                {{ formatRunningStatus(cscData.csc_lift_pump3_running, cscData.csc_lift_pump3_fault) }} /
                {{ formatRunningStatus(cscData.csc_lift_pump4_running, cscData.csc_lift_pump4_fault) }}
              </td>          
            </tr>
            <tr>
              <td>液位</td>
              <td colspan="2">{{ formatValue(cscData.csc_coarse_screen_level, 'level') }}</td>
            </tr>
            <tr>
              <td>流量计</td>
              <td colspan="2">
                {{ formatValue(cscData.csc_coarse_screen_flow1, 'flow') }} /
                {{ formatValue(cscData.csc_coarse_screen_flow2, 'flow') }} /
                {{ formatValue(cscData.csc_coarse_screen_flow3, 'flow') }} /
                {{ formatValue(cscData.csc_coarse_screen_flow4, 'flow') }}
              </td>
            </tr>
          </tbody>
        </table>
        
        <table>
          <caption>辅助车间</caption>
          <tbody>
            <tr>
              <td rowspan="6" class="section-title">风机房</td>
              <td></td>
              <td>1#</td>
              <td>2#</td>
              <td>3#</td>
            </tr>
            <tr>
              <td>功率</td>
              <td>{{ formatValue((cscData.csc_fan1_load_power || 0) * 0.1, 'power') }}</td>
              <td>{{ formatValue((cscData.csc_fan2_load_power || 0) * 0.1, 'power') }}</td>
              <td>{{ formatValue(cscData.csc_fan3_load_power || 0, 'power') }}</td>
            </tr>
            <tr>
              <td>风量（缺失）</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>风压</td>
              <td>{{ formatValue((cscData.csc_fan1_outlet_pressure || 0) * 0.1, 'pressure') }}</td>
              <td>{{ formatValue((cscData.csc_fan2_outlet_pressure || 0) * 0.1, 'pressure') }}</td>
              <td>{{ formatValue(cscData.csc_fan3_outlet_pressure || 0, 'pressure') }}</td>
            </tr>
            <tr>
              <td>电机温度</td>
              <td>{{ formatValue((cscData.csc_fan1_motor_temp || 0) * 0.1, 'temperature') }}</td>
              <td>{{ formatValue((cscData.csc_fan2_motor_temp || 0) * 0.1, 'temperature') }}</td>
              <td>{{ formatValue(cscData.csc_fan3_motor_temp || 0, 'temperature') }}</td>
            </tr>
            <tr>
              <td>Δp(缺失)</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td rowspan="3" class="section-title">除磷剂</td>
              <td>原液桶液位</td>
              <td colspan="3">{{ formatValue(cscData.csc_pac_tank_level, 'level') }}</td>
            </tr>
            <tr>
              <td>向生化池加药泵</td>
              <td colspan="3">{{ getPACStatus() }}</td>
            </tr>
            <tr>
              <td>向高效沉淀池加药泵</td>
              <td colspan="3">就地</td>
            </tr>
            <tr>
              <td rowspan="2" class="section-title">碳源</td>
              <td>液位</td>
              <td colspan="3">{{ formatValue(cscData.csc_carbon_source_level, 'level') }}</td>
            </tr>
            <tr>
              <td>生化池加药泵</td>
              <td colspan="3">{{ getSodiumAcetateStatus() }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 1#、2#生产线 -->
      <div class="table-section">
        <table>    
          <caption>1#、2#生化生产线</caption>
          <tbody>
            <tr>
              <td rowspan="11" class="section-title">生化池</td>
              <td></td>
              <td>1#生化池</td>
              <td>2#生化池</td>
            </tr>
            <tr>
              <td>厌氧推流器</td>
              <td>{{ formatRunningStatus(cscData.csc_line1_anaerobic_mixer_running, cscData.csc_line1_anaerobic_mixer_fault) }}</td>
              <td>{{ formatRunningStatus(cscData.csc_line2_anaerobic_mixer_running, cscData.csc_line2_anaerobic_mixer_fault) }}</td>          
            </tr>
            <tr>
              <td>厌氧ORP</td>
              <td>{{ formatValue(cscData.csc_line1_anaerobic_orp, 'orp') }}</td>
              <td>{{ formatValue(cscData.csc_line2_anaerobic_orp, 'orp') }}</td>
            </tr>
            <tr>
              <td>1#缺氧推流器</td>
              <td>{{ formatRunningStatus(cscData.csc_line1_anoxic1_mixer_running, cscData.csc_line1_anoxic1_mixer_fault) }}</td>
              <td>{{ formatRunningStatus(cscData.csc_line2_anoxic1_mixer_running, cscData.csc_line2_anoxic1_mixer_fault) }}</td>
            </tr>
            <tr>
              <td>2#缺氧推流器</td>
              <td>{{ formatRunningStatus(cscData.csc_line1_anoxic2_mixer_running, cscData.csc_line1_anoxic2_mixer_fault) }}</td>
              <td>{{ formatRunningStatus(cscData.csc_line2_anoxic2_mixer_running, cscData.csc_line2_anoxic2_mixer_fault) }}</td>
            </tr>
            <tr>
              <td>缺氧ORP</td>
              <td>{{ formatValue(cscData.csc_line1_anoxic_orp, 'orp') }}</td>
              <td>{{ formatValue(cscData.csc_line2_anoxic_orp, 'orp') }}</td>
            </tr>
            <tr>
              <td>缺氧MLSS</td>
              <td>{{ formatValue(cscData.csc_line1_anoxic1_mlss, 'mlss') }}</td>
              <td>{{ formatValue(cscData.csc_line2_anoxic1_mlss, 'mlss') }}</td>
            </tr>
            <tr>
              <td>缺氧DO</td>
              <td>{{ formatValue(cscData.csc_line1_anoxic1_do, 'do') }}</td>
              <td>{{ formatValue(cscData.csc_line2_anoxic1_do, 'do') }}</td>
            </tr>
            <tr>
              <td>好氧内回流泵</td>
              <td>{{ getLine1ReturnPump1Status() }}</td>
              <td>{{ getLine2ReturnPump1Status() }}</td>
            </tr>
            <tr>
              <td>好氧MLSS</td>
              <td>{{ formatValue(cscData.csc_line1_aerobic_mlss, 'mlss') }}</td>
              <td>{{ formatValue(cscData.csc_line2_aerobic_mlss, 'mlss') }}</td> 
            </tr>
            <tr>
              <td>好氧DO</td>
              <td>{{ formatValue(cscData.csc_line1_aerobic_do, 'do') }}</td> 
              <td>{{ formatValue(cscData.csc_line2_aerobic_do, 'do') }}</td> 
            </tr>       
            <tr>
              <td rowspan="6" class="section-title">二沉池</td>          
              <td></td>
              <td>1#</td>
              <td>2#</td>
            </tr>
            <tr>
              <td>1#回流泵</td>
              <td>就地</td>
              <td>就地</td>
            </tr>
            <tr>
              <td>2#回流泵</td>
              <td>就地</td>
              <td>就地</td>
            </tr>
            <tr>
              <td>刮泥机行走状态</td>
              <td>就地</td>
              <td>就地</td>
            </tr>
            <tr>
              <td>回流井推流器</td>
              <td colspan="2">就地</td>
            </tr>
            <tr>
              <td>增加内容</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 3#、4#生产线 -->
      <div class="table-section">
        <table>    
          <caption>3#、4#生化生产线</caption>
          <tbody>
            <tr>
              <td rowspan="14" class="section-title">生化池</td>
              <td></td>
              <td>1#生化池</td>
              <td>2#生化池</td>
            </tr>
            <tr>
              <td>厌氧推流器</td>
              <td>{{ formatRunningStatus(cscData.csc_line3_anaerobic_mixer_running, cscData.csc_line3_anaerobic_mixer_fault) }}</td>
              <td>{{ formatRunningStatus(cscData.csc_line4_anaerobic_mixer_running, cscData.csc_line4_anaerobic_mixer_fault) }}</td>          
            </tr>
            <tr>
              <td>厌氧ORP</td>
              <td>{{ formatValue(cscData.csc_line3_anaerobic_orp, 'orp') }}</td>
              <td>{{ formatValue(cscData.csc_line4_anaerobic_orp, 'orp') }}</td>
            </tr>
            <tr>
              <td>1#缺氧推流器</td>
              <td>{{ formatRunningStatus(cscData.csc_line3_aerobic1_mixer_running, cscData.csc_line3_aerobic1_mixer_fault) }}</td>
              <td>{{ formatRunningStatus(cscData.csc_line4_aerobic1_mixer_running, cscData.csc_line4_aerobic1_mixer_fault) }}</td>
            </tr>
            <tr>
              <td>2#缺氧推流器</td>
              <td>{{ formatRunningStatus(cscData.csc_line3_aerobic2_mixer_running, cscData.csc_line3_aerobic2_mixer_fault) }}</td>
              <td>{{ formatRunningStatus(cscData.csc_line4_aerobic2_mixer_running, cscData.csc_line4_aerobic2_mixer_fault) }}</td>
            </tr>
            <tr>
              <td>缺氧DO</td>
              <td>{{ formatValue(cscData.csc_line3_anoxic1_do, 'do') }}</td>
              <td>{{ formatValue(cscData.csc_line4_anoxic1_do, 'do') }}</td>
            </tr>
            <tr>
              <td>缺氧ORP</td>
              <td>{{ formatValue(cscData.csc_line3_anoxic_orp, 'orp') }}</td>
              <td>{{ formatValue(cscData.csc_line4_anoxic_orp, 'orp') }}</td>
            </tr>
            <tr>
              <td>缺氧MLSS</td>
              <td>{{ formatValue(cscData.csc_line3_anoxic1_mlss, 'mlss') }}</td>
              <td>{{ formatValue(cscData.csc_line4_anoxic1_mlss, 'mlss') }}</td>
            </tr>
            <tr>
              <td>好氧内回流泵</td>
              <td>{{ getLine3MainReturnPumpStatus() }}</td>
              <td>{{ getLine4MainReturnPumpStatus() }}</td>
            </tr>
            <tr>
              <td>好氧内回流泵（备用）</td>
              <td>{{ getLine3BackupReturnPumpStatus() }}</td>
              <td>{{ getLine4BackupReturnPumpStatus() }}</td>
            </tr>      
            <tr>
              <td>1#好氧推流器</td>
              <td>{{ formatRunningStatus(cscData.csc_line3_aerobic1_mixer_running, cscData.csc_line3_aerobic1_mixer_fault) }}</td>
              <td>{{ formatRunningStatus(cscData.csc_line4_aerobic1_mixer_running, cscData.csc_line4_aerobic1_mixer_fault) }}</td>
            </tr>
            <tr>
              <td>2#好氧推流器</td>
              <td>{{ formatRunningStatus(cscData.csc_line3_aerobic2_mixer_running, cscData.csc_line3_aerobic2_mixer_fault) }}</td>
              <td>{{ formatRunningStatus(cscData.csc_line4_aerobic2_mixer_running, cscData.csc_line4_aerobic2_mixer_fault) }}</td>
            </tr>        
            <tr>
              <td>好氧DO</td>
              <td>{{ formatValue(cscData.csc_line3_aerobic_do, 'do') }}</td>
              <td>{{ formatValue(cscData.csc_line4_aerobic_do, 'do') }}</td>
            </tr> 
            <tr>
              <td>好氧MLSS</td>
              <td>{{ formatValue(cscData.csc_line3_aerobic_mlss, 'mlss') }}</td>
              <td>{{ formatValue(cscData.csc_line4_aerobic_mlss, 'mlss') }}</td>
            </tr>   
            <tr>
              <td rowspan="3" class="section-title">二沉池</td>          
              <td>刮泥机行走状态</td>
              <td>{{ formatRunningStatus(cscData.csc_line3_scraper_running, cscData.csc_line3_scraper_fault) }}</td>
              <td>{{ formatRunningStatus(cscData.csc_line4_scraper_running, cscData.csc_line4_scraper_fault) }}</td>
            </tr>
            <tr>
              <td>回流泵</td>
              <td colspan="2">{{ getSludgeReturnStatus() }}</td>
            </tr>
            <tr>
              <td>剩余污泥泵</td>
              <td colspan="2">{{ getSurplusSludgeStatus() }}</td>
            </tr>  
          </tbody>
        </table>
      </div>
      
      <!-- 深度处理 -->
      <div class="table-section">
        <table>    
          <caption>深度处理</caption>
          <tbody>
            <!-- 磁混凝 -->
            <tr>
              <td rowspan="9" class="section-title">磁混凝</td>
              <td></td>
              <td>1#</td>
            </tr>
            <tr>
              <td>PAC混合搅拌</td>
              <td>就地</td>
            </tr>
            <tr>
              <td>PAM搅拌器</td>
              <td>就地</td>
            </tr>
            <tr>
              <td>磁分离机</td>
              <td>就地</td>   
            </tr>
            <tr>
              <td>排泥泵</td>
              <td>就地</td>
            </tr>        
            <tr>
              <td>剩余污泥泵</td>
              <td>就地</td>
            </tr>        
            <tr>
              <td>剩余污泥池液位</td>
              <td>就地</td>
            </tr>
            <tr>
              <td>回流泵</td>
              <td>就地</td>
            </tr>        
            <tr>
              <td>PAM投加泵</td>
              <td>就地</td>
            </tr>     
            <!-- 反硝化滤池 -->
            <tr>
              <td rowspan="4" class="section-title">反硝化滤池</td>
              <td>液位</td>
              <td>就地</td>
            </tr>
            <tr>
              <td>清水阀开度</td>
              <td>就地</td>
            </tr>
            <tr>
              <td>反冲水泵</td>
              <td>就地</td>
            </tr>
            <tr>
              <td>反冲洗风机</td>
              <td>就地</td>
            </tr>        
            <!-- 出水 -->
            <tr>
              <td rowspan="4" class="section-title">出水</td>
              <td>强排泵</td>
              <td>就地</td>
            </tr>
            <tr>
              <td>出水泵</td>
              <td>就地</td>
            </tr>
            <tr>
              <td>中水泵</td>
              <td>就地</td>
            </tr>
            <tr>
              <td>防洪闸门</td>
              <td>就地</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --base-font-size: 0.65vw;
  --caption-font-size: 0.9vw;
  --section-title-font-size: 0.8vw;
  --table-padding: 2px 4px;
}

.container {
  width: 100%;
  margin: 0;
  padding: 0;
}

.update-time {
  font-size: 0.7vw;
  color: #666;
  position: absolute;
  bottom: 5px;
  right: 10px;
}

.data-section {
  margin-bottom: 10px;
}

.tables-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 5px;
}

.table-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

table {
  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
  font-size: var(--base-font-size);
  font-family: '微软雅黑', 'Times New Roman', serif;
  margin: 0;
  padding: 0;
  border-spacing: 0;
}

caption {
  caption-side: top;
  font-weight: bold;
  margin: 0;
  font-size: var(--caption-font-size);
  font-family: '微软雅黑', 'Times New Roman', serif;
  color: red;
  text-align: center;
  width: 100%;
}

td {
  border: 1px solid black;
  padding: var(--table-padding);
  text-align: center;
}

.section-title {
  font-family: '微软雅黑', 'Times New Roman', serif;
  font-size: var(--section-title-font-size);
  font-weight: bold;
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  :root {
    --base-font-size: 0.7vw;
    --caption-font-size: 0.95vw;
    --section-title-font-size: 0.85vw;
  }
}

@media (max-width: 992px) {
  :root {
    --base-font-size: 0.8vw;
    --caption-font-size: 1.1vw;
    --section-title-font-size: 1vw;
  }
  
  .tables-container {
    flex-wrap: wrap;
  }
  
  .table-section {
    min-width: 48%;
  }
}

@media (max-width: 768px) {
  :root {
    --base-font-size: 1.2vw;
    --caption-font-size: 1.5vw;
    --section-title-font-size: 1.4vw;
  }
  
  .table-section {
    min-width: 100%;
  }
  
  .container-head p {
    font-size: 1.8vw;
  }
  
  .update-time {
    font-size: 1.2vw;
  }
}

@media (max-width: 576px) {
  :root {
    --base-font-size: 1.8vw;
    --caption-font-size: 2.2vw;
    --section-title-font-size: 2vw;
  }
  
  .container-head p {
    font-size: 2.5vw;
  }
  
  .update-time {
    font-size: 1.8vw;
  }
}
</style>