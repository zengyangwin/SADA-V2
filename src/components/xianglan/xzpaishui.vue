<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 响应式数据
const hongyanData = ref({})
const maoheData = ref({})
const chelingData = ref({})

// 定时器引用
const updateTimer = ref(null)

// 获取红岩数据
async function updateDataHongyan() {
  try {
    const response = await fetch("http://182.132.164.178:3000/hongyan")
    const data = await response.json()
    hongyanData.value = data
  } catch (error) {
    console.error('获取红岩数据失败:', error)
  }
}

// 获取茅河数据
async function updateDataMaohe() {
  try {
    const response = await fetch("http://182.132.164.178:3000/maohe")
    const data = await response.json()
    maoheData.value = data
  } catch (error) {
    console.error('获取茅河数据失败:', error)
  }
}

// 获取车岭数据
async function updateDataCheling() {
  try {
    const response = await fetch("http://182.132.164.178:3000/cheling")
    const data = await response.json()
    chelingData.value = data
  } catch (error) {
    console.error('获取车岭数据失败:', error)
  }
}

// 更新所有数据
function updateAllData() {
  updateDataHongyan()
  updateDataMaohe()
  updateDataCheling()
}

// 数据格式化函数
function formatAmmonia(value) {
  return value !== undefined && value !== null ? value.toFixed(2) + ' mg/L' : '-'
}

function formatCOD(value) {
  return value !== undefined && value !== null ? Math.round(value) + ' mg/L' : '-'
}

function formatTP(value) {
  return value !== undefined && value !== null ? value.toFixed(2) + ' mg/L' : '-'
}

function formatPH(value) {
  return value !== undefined && value !== null ? value.toFixed(1) : '-'
}

function formatTotalFlow(value) {
  return value !== undefined && value !== null ? Math.round(value) + ' m³' : '-'
}

function formatFlow(value) {
  return value !== undefined && value !== null ? value.toFixed(2) + ' m³/h' : '-'
}

function formatLevel(value) {
  return value !== undefined && value !== null ? value.toFixed(2) + ' m' : '-'
}
function formatDO(value) {
  return value !== undefined && value !== null ? value.toFixed(2) + ' mg/L' : '-'
}

// 茅河厂专用格式化函数
function formatMaoheLevelDiff(value) {
  return value !== undefined && value !== null ? value.toFixed(2) + ' m' : '-'
}

function formatMaoheORP(value) {
  return value !== undefined && value !== null ? Math.round(value) + ' mv' : '-'
}

function formatMaoheMLSS(value) {
  return value !== undefined && value !== null ? Math.round(value) + ' mg/L' : '-'
}

function formatMaoheDO(value) {
  return value !== undefined && value !== null ? value.toFixed(2) + ' mg/L' : '-'
}

function formatMaoheBlower(value) {
  return value !== undefined && value !== null ? Math.round(value) + ' Hz' : '-'
}

// 车岭厂专用格式化函数
function formatChelingLevelDiff(value) {
  return value !== undefined && value !== null ? value.toFixed(2) + ' m' : '-'
}

function formatChelingORP(value) {
  return value !== undefined && value !== null ? Math.round(value) + ' mv' : '-'
}

function formatChelingDO(value) {
  return value !== undefined && value !== null ? value.toFixed(2) + ' mg/L' : '-'
}

function formatChelingMLSS(value) {
  return value !== undefined && value !== null ? Math.round(value) + ' mg/L' : '-'
}

// 运行状态格式化函数
function formatRunningStatus(running, fault) {
  if (fault === 1) return '故障'
  return running === 1 ? '运行' : '停机'
}

// 阀门状态格式化函数
function formatValveStatus(open, close) {
  return open === 1 ? '开启' : '关闭'
}

// 获取开启的泵编号 - 红岩
function getRunningPumpsHongyan(pumpData) {
  const runningPumps = []
  for (let i = 1; i <= 2; i++) {
    if (pumpData[`hy_${i}_lift_pump_running`] === 1) {
      runningPumps.push(i)
    }
  }
  return runningPumps.length > 0 ? runningPumps.join('、') + '#' : '全部停机'
}

// 获取开启的鼓风机编号 - 红岩
function getRunningblowerhongyan(pumpData) {
  const runningBlowers = []
  for (let i = 1; i <= 2; i++) {
    if (pumpData[`hy_${i}_blower_running`] === 1) {
      runningBlowers.push(i)
    }
  }
  return runningBlowers.length > 0 ? runningBlowers.join('、') + '#' : '全部停机'
}
// 获取除臭风机编号 - 红岩

function getRunningstatus_hy(pump1Running, pump2Running, pump1Fault, pump2Fault) {
  // 检查故障状态
  const faultPumps = []
  if (pump1Fault === 1) {
    faultPumps.push('1#')
  }
  if (pump2Fault === 1) {
    faultPumps.push('2#')
  }
    if (faultPumps.length > 0) {
    return faultPumps.join('、') + '故障'
  }
    const runningPumps = []
  if (pump1Running === 1) {
    runningPumps.push('1#')
  }
  if (pump2Running === 1) {
    runningPumps.push('2#')
  }
  return runningPumps.length > 0 ? runningPumps.join('、') : '全部停机'
}


// 获取开启的泵编号 - 茅河
function getRunningPumpsMaohe(pumpData) {
  const runningPumps = []
  for (let i = 1; i <= 4; i++) {
    if (pumpData[`mh_${i}_lift_pump_running`] === 1) {
      runningPumps.push(i)
    }
  }
  return runningPumps.length > 0 ? runningPumps.join('、') + '#' : '全部停机'
}

// 获取开启的污泥阀编号
function getRunningSludgeValves(valveData, system) {
  const runningValves = []
  for (let i = 1; i <= 6; i++) {
    if (valveData[`${system}_sludge_valve_${i}_open`] === 1) {
      runningValves.push(i)
    }
  }
  return runningValves.length > 0 ? runningValves.join('、') + '#' : '全部关闭'
}

// 获取开启的泵编号 - 车岭
function getRunningPumpsCheling(pumpData, pumpType, pumpCount) {
  const runningPumps = []
  for (let i = 1; i <= pumpCount; i++) {
    if (pumpData[`cl_${i}_${pumpType}_running`] === 1) {
      runningPumps.push(i)
    }
  }
  return runningPumps.length > 0 ? runningPumps.join('、') + '#' : '全部停机'
}

// 获取细格栅运行状态
function getFineScreensStatus(pumpData) {
  const runningScreens = []
  for (let i = 1; i <= 2; i++) {
    if (pumpData[`cl_${i}_screen_machine_running`] === 1) {
      runningScreens.push(i)
    }
  }
  return runningScreens.length > 0 ? runningScreens.join('、') + '#' : '全部停机'
}

// 获取罗茨风机运行状态
function getRootsBlowersStatus(pumpData) {
  const runningBlowers = []
  for (let i = 1; i <= 2; i++) {
    if (pumpData[`hy_${i}_roots_blower_running`] === 1) {
      runningBlowers.push(i)
    }
  }
  return runningBlowers.length > 0 ? runningBlowers.join('、') + '#' : '全部停机'
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
  <div class="container-head" >
    <p>乡镇排水实时生产数据</p>
    <div id="time" style="font-size: 12px; color: #666;position: absolute;bottom: 5px ;right: 10px;">数据更新时间：{{ hongyanData.TIME }}</div>
  </div>
  <div id="xz-zonglan" >
    <table>
      <caption>基本数据汇总</caption>
      <tbody>
        <!-- 红岩数据 -->
        <tr>
          <td rowspan="3" class='xz-title' style="font-family: '微软雅黑', 'Times New Roman', serif; font-size: 15px; font-weight: bold; text-align: center;">红岩</td>
          <td>进水流量</td>
          <td>{{ formatFlow(hongyanData.hy_influent_flow) }}</td>
          <td>进水氨氮</td>
          <td>{{ formatAmmonia(hongyanData.hy_influent_ammonia_nitrogen) }}</td>
          <td>进水COD</td>
          <td>{{ formatCOD(hongyanData.hy_influent_cod) }}</td>
          <td>出水总磷</td>
          <td>{{ formatTP(hongyanData.hy_effluent_tp) }}</td>
          <td rowspan="3" style="font-family: '微软雅黑', 'Times New Roman', serif; font-size: 15px; font-weight: bold; text-align: center;">茅河</td>
          <td>进水流量</td>
          <td>{{ formatFlow(maoheData.mh_influent_flow) }}</td>
          <td>进水氨氮</td>
          <td>{{ formatAmmonia(maoheData.mh_influent_ammonia_nitrogen) }}</td>
          <td>进水COD</td>
          <td>{{ formatCOD(maoheData.mh_influent_cod) }}</td>
          <td>出水总磷</td>
          <td>{{ formatTP(maoheData.mh_effluent_tp) }}</td>
          <td rowspan="3" style="font-family: '微软雅黑', 'Times New Roman', serif; font-size: 15px; font-weight: bold; text-align: center;">车岭</td>
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
  </div>

  <!-- 下方左右布局：左侧1/3（红岩、茅河），右侧2/3（车岭） -->
  <div>
       <div id="cheling-xianglan">
      <table>
        <caption>车岭厂运行详览</caption>
        <tbody>
          <tr>
            <td rowspan="5" style="font-family: '微软雅黑', 'Times New Roman', serif; font-size: 15px; font-weight: bold; text-align: center;">调节池</td>
            <td></td>
            <td>1#</td>
            <td>2#</td>
            <td rowspan="7" style="font-family: '微软雅黑', 'Times New Roman', serif; font-size: 15px; font-weight: bold; text-align: center;">生化池</td>
            <td></td>
            <td>1#生化池</td>
            <td>2#生化池</td>
            <td rowspan="8" style="font-family: '微软雅黑', 'Times New Roman', serif; font-size: 15px; font-weight: bold; text-align: center;">高效沉淀池</td>
            <td></td>
            <td>1#</td>
            <td>2#</td>
            <td>3#</td>
          </tr>
          <tr>
            <td>粗格栅</td>
            <td>{{ formatRunningStatus(chelingData.cl_1_coarse_screen_running, chelingData.cl_1_coarse_screen_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_2_coarse_screen_running, chelingData.cl_2_coarse_screen_fault) }}</td>
            <td>厌氧搅拌器</td>
            <td>{{ formatRunningStatus(chelingData.cl_1_anaerobic_mixer_running, chelingData.cl_1_anaerobic_mixer_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_2_anaerobic_mixer_running, chelingData.cl_2_anaerobic_mixer_fault) }}</td>
            <td>混合搅拌机</td>
            <td>{{ formatRunningStatus(chelingData.cl_1_mixing_mixer_running, chelingData.cl_1_mixing_mixer_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_2_mixing_mixer_running, chelingData.cl_2_mixing_mixer_fault) }}</td>
            <td>-</td>
          </tr>
          <tr>
            <td>调节池液位</td>
            <td colspan="2">{{ formatLevel(chelingData.cl_regulating_tank_level) }}</td>
            <td>缺氧池搅拌器</td>
            <td>{{ formatRunningStatus(chelingData.cl_1_anoxic_mixer_running, chelingData.cl_1_anoxic_mixer_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_2_anoxic_mixer_running, chelingData.cl_2_anoxic_mixer_fault) }}</td>
            <td>絮凝搅拌机</td>
            <td>{{ formatRunningStatus(chelingData.cl_1_flocculation_mixer_running, chelingData.cl_1_flocculation_mixer_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_2_flocculation_mixer_running, chelingData.cl_2_flocculation_mixer_fault) }}</td>
            <td>-</td>
          </tr>
          <tr>
            <td>提升泵</td>
            <td>{{ formatRunningStatus(chelingData.cl_1_lift_pump_running, chelingData.cl_1_lift_pump_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_2_lift_pump_running, chelingData.cl_2_lift_pump_fault) }}</td>
            <td>缺氧池ORP</td>
            <td>{{ formatChelingORP(chelingData.cl_1_anoxic_orp_1) }}</td>
            <td>{{ formatChelingORP(chelingData.cl_2_anoxic_orp_1) }}</td>
            <td>刮泥机</td>
            <td>{{ formatRunningStatus(chelingData.cl_1_scraper_running, chelingData.cl_1_scraper_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_2_scraper_running, chelingData.cl_2_scraper_fault) }}</td>
            <td>-</td>
          </tr>
          <tr>
            <td>液位差</td>
            <td>{{ formatChelingLevelDiff(chelingData.cl_1_regulating_tank_level_diff) }}</td>
            <td>{{ formatChelingLevelDiff(chelingData.cl_2_regulating_tank_level_diff) }}</td>
            <td>好氧池DO</td>
            <td>{{ formatChelingDO(chelingData.cl_1_aerobic_do_1) }}</td>
            <td>{{ formatChelingDO(chelingData.cl_2_aerobic_do_1) }}</td>
            <td>污泥内回流泵</td>
            <td>{{ formatRunningStatus(chelingData.cl_1_sludge_internal_return_pump_running, chelingData.cl_1_sludge_internal_return_pump_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_2_sludge_internal_return_pump_running, chelingData.cl_2_sludge_internal_return_pump_fault) }}</td>
            <td>-</td>
          </tr>       
          <tr>
            <td rowspan="6" style="font-family: '微软雅黑', 'Times New Roman', serif; font-size: 15px; font-weight: bold; text-align: center;">细格栅/旋流沉砂池</td>
            <td>细格栅</td>
            <td>{{ formatRunningStatus(chelingData.cl_1_fine_screen_running, chelingData.cl_1_fine_screen_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_2_fine_screen_running, chelingData.cl_2_fine_screen_fault) }}</td>
            <td>MLSS</td>
            <td>-</td>
            <td>{{ formatChelingMLSS(chelingData.cl_2_aerobic_mlss) }}</td>          
            <td>内回流流量</td>
            <td>{{ formatFlow(chelingData.cl_1_internal_return_flowmeter) }}</td>
            <td>{{ formatFlow(chelingData.cl_2_internal_return_flowmeter) }}</td>
            <td>-</td>
          </tr>
          <tr>
            <td>细格栅液位差</td>
            <td>{{ formatChelingLevelDiff(chelingData.cl_1_fine_screen_channel_level_diff) }}</td>
            <td>{{ formatChelingLevelDiff(chelingData.cl_2_fine_screen_channel_level_diff) }}</td>
            <td>回流泵</td>
            <td>{{ formatRunningStatus(chelingData.cl_biopool_1_return_pump_running, chelingData.cl_biopool_1_return_pump_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_biopool_2_return_pump_running, chelingData.cl_biopool_2_return_pump_fault) }}</td>  
            <td>剩余污泥泵</td>
            <td>{{ formatRunningStatus(chelingData.cl_1_excess_sludge_pump_running, chelingData.cl_1_excess_sludge_pump_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_2_excess_sludge_pump_running, chelingData.cl_2_excess_sludge_pump_fault) }}</td>
            <td>-</td>
          </tr>
          <tr>
            <td>提砂风机</td>
            <td>{{ formatRunningStatus(chelingData.cl_1_sand_lift_fan_running, chelingData.cl_1_sand_lift_fan_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_2_sand_lift_fan_running, chelingData.cl_2_sand_lift_fan_fault) }}</td>
            <td rowspan="6" style="font-family: '微软雅黑', 'Times New Roman', serif; font-size: 15px; font-weight: bold; text-align: center;">污泥处理系统</td>
            <td>污泥回流泵</td>
            <td>{{ formatRunningStatus(chelingData.cl_1_sludge_return_pump_running, chelingData.cl_1_sludge_return_pump_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_2_sludge_return_pump_running, chelingData.cl_2_sludge_return_pump_fault) }}</td>       
            <td>剩余污泥流量</td>
            <td>{{ formatFlow(chelingData.cl_1_excess_sludge_flow) }}</td>
            <td>{{ formatFlow(chelingData.cl_2_excess_sludge_flow) }}</td>
            <td>-</td>
          </tr>
          <tr>
            <td>旋流沉砂器</td>
            <td>{{ formatRunningStatus(chelingData.cl_1_cyclone_grit_chamber_running, chelingData.cl_1_cyclone_grit_chamber_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_2_cyclone_grit_chamber_running, chelingData.cl_2_cyclone_grit_chamber_fault) }}</td>
            <td>污泥回流井液位</td>
            <td colspan="2">{{ formatLevel(chelingData.cl_sludge_return_well_level) }}</td>
            <td rowspan="5" style="font-family: '微软雅黑', 'Times New Roman', serif; font-size: 15px; font-weight: bold; text-align: center;">辅助车间</td>
            <td>PAC加药泵</td>
            <td>就地</td>
            <td>就地</td>
            <td>就地</td>
          </tr>
          <tr>
            <td>沉砂器排砂阀</td>
            <td>{{ formatValveStatus(chelingData.cl_1_grit_chamber_sand_valve_1, chelingData.cl_1_grit_chamber_sand_valve_2) }}</td>
            <td>{{ formatValveStatus(chelingData.cl_2_grit_chamber_sand_valve_1, chelingData.cl_2_grit_chamber_sand_valve_2) }}</td>
            <td>储泥池液位</td>
            <td colspan="2">{{ formatLevel(chelingData.cl_sludge_storage_tank_level) }}</td>
            <td>乙酸钠加药泵</td>
            <td>就地</td>
            <td>就地</td>
            <td>就地</td>
          </tr>
          <tr>
            <td>砂水分离器</td>
            <td colspan="2">{{ formatRunningStatus(chelingData.cl_sand_water_separator_running, chelingData.cl_sand_water_separator_fault) }}</td>
            <td>二沉池刮泥机</td>
            <td>{{ formatRunningStatus(chelingData.cl_secondary_1_scraper_running, chelingData.cl_secondary_1_scraper_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_secondary_2_scraper_running, chelingData.cl_secondary_2_scraper_fault) }}</td>
            <td>PAM加药泵</td>
            <td>{{ formatRunningStatus(chelingData.cl_1_pam_dosing_pump_running, chelingData.cl_1_pam_dosing_pump_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_2_pam_dosing_pump_running, chelingData.cl_2_pam_dosing_pump_fault) }}</td>
            <td>-</td>
          </tr>
          <tr>
            <td rowspan="2" style="font-family: '微软雅黑', 'Times New Roman', serif; font-size: 15px; font-weight: bold; text-align: center;">除臭系统</td>
            <td>除臭风机</td>
            <td>{{ formatRunningStatus(chelingData.cl_1_deodorization_fan_running, chelingData.cl_1_deodorization_fan_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_2_deodorization_fan_running, chelingData.cl_2_deodorization_fan_fault) }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td>曝气风机</td>
            <td>{{ formatRunningStatus(chelingData.cl_1_aeration_blower_running, chelingData.cl_1_aeration_blower_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_2_aeration_blower_running, chelingData.cl_2_aeration_blower_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_3_aeration_blower_running, chelingData.cl_3_aeration_blower_fault) }}</td>
          </tr>
          <tr>
            <td>散水泵</td>
            <td >{{ formatRunningStatus(chelingData.cl_1_sprinkler_pump_running, chelingData.cl_1_sprinkler_pump_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_2_sprinkler_pump_running, chelingData.cl_2_sprinkler_pump_fault) }}</td>
            <td></td>
            <td></td>
            <td></td>            
            <td>反冲罗茨风机</td>
            <td>{{ formatRunningStatus(chelingData.cl_1_backwash_roots_blower_running, chelingData.cl_1_backwash_roots_blower_fault) }}</td>
            <td>{{ formatRunningStatus(chelingData.cl_2_backwash_roots_blower_running, chelingData.cl_2_backwash_roots_blower_fault) }}</td>
            <td>-</td>  
          </tr>
        </tbody>
      </table>
    </div>
  <div class="layout-row">
    <div id="hongyan-xianglan">
      <table>
        <caption >红岩厂运行详览</caption>
        <tbody>
          <tr>
            <td rowspan="6" style="font-family: '微软雅黑', 'Times New Roman', serif; font-size: 15px; font-weight: bold; text-align: center;">调节池</td>
            <td>格栅机（缺失）</td>
            <td>{{ formatRunningStatus(hongyanData.hy_screen_machine_running, hongyanData.hy_screen_machine_fault) }}</td>
            <td rowspan="5" style="font-family: '微软雅黑', 'Times New Roman', serif; font-size: 15px; font-weight: bold; text-align: center;">生化池</td>
            <td>污泥外回流</td>
            <td>{{ formatRunningStatus(hongyanData.hy_sludge_discharge_pump_running, hongyanData.hy_sludge_discharge_pump_fault) }}</td>
          </tr>
          <tr>
            <td>调节池液位</td>
            <td>{{ formatLevel(hongyanData.hy_regulating_tank_level) }}</td>
            <td>污泥外回流流量</td>
            <td>{{ formatFlow(hongyanData.hy_biopool_return_flow) }}</td>
          </tr>
          <tr>
            <td>1#搅拌机</td>
            <td>{{ formatRunningStatus(hongyanData.hy_1_regulating_tank_mixer_running, hongyanData.hy_1_regulating_tank_mixer_fault) }}</td>
            <td>潜水推流器</td>
            <td>{{ formatRunningStatus(hongyanData.hy_submersible_pusher_running, hongyanData.hy_submersible_pusher_fault) }}</td>
          </tr>
          <tr>
            <td>2#搅拌机</td>
            <td>{{ formatRunningStatus(hongyanData.hy_2_regulating_tank_mixer_running, hongyanData.hy_1_regulating_tank_mixer_fault) }}</td>
            <td>DO</td>
            <td>{{ formatDO(hongyanData.hy_biopool_do) || '-' }}</td>
          </tr>
          <tr>
            <td>1#提升泵</td>
            <td>{{ formatRunningStatus(hongyanData.hy_1_lift_pump_running, hongyanData.hy_1_lift_pump_fault) }}</td>
            <td>内回流泵</td>
            <td>{{ formatRunningStatus(hongyanData.hy_mixed_return_pump_running, hongyanData.hy_mixed_return_pump_fault) }}</td>
          </tr>
          <tr>
            <td>2#提升泵</td>
            <td>{{ formatRunningStatus(hongyanData.hy_2_lift_pump_running, hongyanData.hy_2_lift_pump_fault) }}</td>
            <td rowspan="3" style="font-family: '微软雅黑', 'Times New Roman', serif; font-size: 15px; font-weight: bold; text-align: center;">辅助车间</td>
            <td>PAC加药泵</td>
            <td>{{ formatRunningStatus(hongyanData.hy_pac_dosing_pump_running, hongyanData.hy_pac_dosing_pump_fault) }}</td>
          </tr>
          <tr>
            <td rowspan="2" style="font-family: '微软雅黑', 'Times New Roman', serif; font-size: 15px; font-weight: bold; text-align: center;">除臭系统</td>
            <td>除臭风机</td>
            <td>{{ getRunningstatus_hy(hongyanData.hy_1_roots_blower_running, hongyanData.hy_1_roots_blower_fault, hongyanData.hy_2_roots_blower_running, hongyanData.hy_2_roots_blower_fault) }}</td>
            <td>PAC搅拌机</td>
            <td>{{ formatRunningStatus(hongyanData.hy_dosing_mixer_running, hongyanData.hy_dosing_mixer_fault) }}</td>
          </tr>
          <tr>
            <td>散水泵运行状态</td>
            <td>{{ getRunningstatus_hy(hongyanData.hy_scattered_water_pump_1_running, hongyanData.hy_scattered_water_pump_2_running, hongyanData.hy_scattered_water_pump_1_fault, hongyanData.hy_scattered_water_pump_2_fault) }}</td>
            <td>鼓风机</td>
            <td>{{ getRunningblowerhongyan(hongyanData) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="maohe-xianglan">
      <table>
        <caption >茅河厂运行详览</caption>
        <tbody>
          <tr>
            <td rowspan="4" style="font-family: '微软雅黑', 'Times New Roman', serif; font-size: 15px; font-weight: bold; text-align: center;">调节池</td>
            <td>格栅机</td>
            <td colspan="2">{{ formatRunningStatus(maoheData.mh_screen_machine_running, maoheData.mh_screen_machine_fault) }}</td>
            <td rowspan="11" style="font-family: '微软雅黑', 'Times New Roman', serif; font-size: 15px; font-weight: bold; text-align: center;">生化池</td>
            <td></td>
            <td>1#生化池</td>
            <td>2#生化池</td>
            <td rowspan="11" style="font-family: '微软雅黑', 'Times New Roman', serif; font-size: 15px; font-weight: bold; text-align: center;">辅助车间</td>
            <td></td>
            <td>1#</td>
            <td>2#</td>
          </tr>
          <tr>
            <td>格栅液位差</td>
            <td colspan="2">{{ formatMaoheLevelDiff(maoheData.mh_grit_channel_level) }}</td>
            <td>外回流污（剩余）泥泵</td>
            <td>{{ formatRunningStatus(maoheData.mh_1_mixed_return_pump_running, maoheData.mh_1_mixed_return_pump_fault) }}</td>
            <td>{{ formatRunningStatus(maoheData.mh_2_pac_dosing_pump_running, maoheData.mh_2_pac_dosing_pump_fault) }}</td>
            <td>PAC加药泵</td>
            <td>{{ formatRunningStatus(maoheData.mh_1_pac_dosing_pump_running, maoheData.mh_1_pac_dosing_pump_fault) }}</td>
            <td>{{ formatRunningStatus(maoheData.mh_2_pac_dosing_pump_running, maoheData.mh_2_pac_dosing_pump_fault) }}</td>
          </tr>
          <tr>
            <td>调节池液位</td>
            <td colspan="2">{{ formatLevel(maoheData.mh_regulating_tank_level) }}</td>
            <td>内回流泵</td>
            <td>{{ formatRunningStatus(maoheData.mh_1_sludge_suction_pump_running, maoheData.mh_1_sludge_suction_pump_fault) }}</td>
            <td>{{ formatRunningStatus(maoheData.mh_2_sludge_suction_pump_running, maoheData.mh_2_sludge_suction_pump_fault) }}</td>
            <td>葡萄糖加药泵</td>
            <td>{{ formatRunningStatus(maoheData.mh_1_sodium_acetate_dosing_pump_running, maoheData.mh_1_sodium_acetate_dosing_pump_fault) }}</td>
            <td>{{ formatRunningStatus(maoheData.mh_2_sodium_acetate_dosing_pump_running, maoheData.mh_2_sodium_acetate_dosing_pump_fault) }}</td>
          </tr>
          <tr>
            <td>提升泵</td>
            <td colspan="2">{{ getRunningPumpsMaohe(maoheData) }}</td>
            <td>潜水推流器</td>
            <td>{{ formatRunningStatus(maoheData.mh_1_submersible_pusher_running, maoheData.mh_1_submersible_pusher_fault) }}</td>
            <td>{{ formatRunningStatus(maoheData.mh_2_submersible_pusher_running, maoheData.mh_2_submersible_pusher_fault) }}</td>
            <td>PAM搅拌器</td>
            <td>{{ formatRunningStatus(maoheData.mh_pam_dissolving_system_running, maoheData.mh_pam_dissolving_system_fault) }}</td>
            <td>{{ formatRunningStatus(maoheData.mh_pam_dissolving_system_running, maoheData.mh_pam_dissolving_system_fault) }}</td>
          </tr>
          <tr>
            <td rowspan="3" style="font-family: '微软雅黑', 'Times New Roman', serif; font-size: 15px; font-weight: bold; text-align: center;">除臭系统</td>
            <td></td>
            <td>1#</td>
            <td>2#</td>
            <td>ORP</td>
            <td>{{ formatMaoheORP(maoheData.mh_1_biopool_orp) }}</td>
            <td>{{ formatMaoheORP(maoheData.mh_2_biopool_orp) }}</td>
            <td>PAM加药泵</td>
            <td>{{ formatRunningStatus(maoheData.mh_1_pam_dosing_pump_running, maoheData.mh_1_pam_dosing_pump_fault) }}</td>
            <td>{{ formatRunningStatus(maoheData.mh_2_pam_dosing_pump_running, maoheData.mh_2_pam_dosing_pump_fault) }}</td>
          </tr>
          <tr>
            <td>除臭风机运行状态</td>
            <td colspan="2">{{ formatRunningStatus(maoheData.mh_deodorization_fan_running, maoheData.mh_deodorization_fan_fault) }}</td>
            <td>MLSS</td>
            <td>{{ formatMaoheMLSS(maoheData.mh_1_biopool_mlss) }}</td>
            <td>{{ formatMaoheMLSS(maoheData.mh_2_biopool_mlss) }}</td>
            <td>PAC搅拌器</td>
            <td>{{ formatRunningStatus(maoheData.mh_1_pac_mixer_running, maoheData.mh_1_pac_mixer_fault) }}</td>
            <td>{{ formatRunningStatus(maoheData.mh_2_pac_mixer_running, maoheData.mh_2_pac_mixer_fault) }}</td>
          </tr>
          <tr>
            <td>散水泵运行状态</td>
            <td colspan="2">{{ formatRunningStatus(maoheData.mh_scattered_water_pump_running, maoheData.mh_scattered_water_pump_fault) }}</td>
            <td>DO</td>
            <td>{{ formatMaoheDO(maoheData.mh_1_biopool_do) }}</td>
            <td>{{ formatMaoheDO(maoheData.mh_2_biopool_do) }}</td>
            <td>葡萄糖搅拌器</td>
            <td>{{ formatRunningStatus(maoheData.mh_1_sodium_acetate_mixer_running, maoheData.mh_1_sodium_acetate_mixer_fault) }}</td>
            <td>{{ formatRunningStatus(maoheData.mh_2_sodium_acetate_mixer_running, maoheData.mh_2_sodium_acetate_mixer_fault) }}</td>
          </tr>
          <tr>
            <td rowspan="4" style="font-family: '微软雅黑', 'Times New Roman', serif; font-size: 15px; font-weight: bold; text-align: center;">高效沉淀池</td>
            <td>PAC混合搅拌</td>
            <td>{{ formatRunningStatus(maoheData.mh_1_pac_mixing_mixer_running, maoheData.mh_1_pac_mixing_mixer_fault) }}</td>
            <td>{{ formatRunningStatus(maoheData.mh_2_pac_mixing_mixer_running, maoheData.mh_2_pac_mixing_mixer_fault) }}</td>
            <td>污泥排放（回流）阀</td>
            <td>{{ getRunningSludgeValves(maoheData, 'mh_1_biopool') }}</td>
            <td>{{ getRunningSludgeValves(maoheData, 'mh_2_biopool') }}</td>
            <td>次氯酸钠搅拌器</td>
            <td>{{ formatRunningStatus(maoheData.mh_1_sodium_hypochlorite_mixer_running, maoheData.mh_1_sodium_hypochlorite_mixer_fault) }}</td>
            <td>{{ formatRunningStatus(maoheData.mh_2_sodium_hypochlorite_mixer_running, maoheData.mh_2_sodium_hypochlorite_mixer_fault) }}</td>
          </tr>
          <tr>
            <td>PAM混合搅拌</td>
            <td>{{ formatRunningStatus(maoheData.mh_1_pam_flocculation_mixer_running, maoheData.mh_1_pam_flocculation_mixer_fault) }}</td>
            <td>{{ formatRunningStatus(maoheData.mh_2_pam_flocculation_mixer_running, maoheData.mh_2_pam_flocculation_mixer_fault) }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td>次氯酸钠加药泵</td>
            <td>{{ formatRunningStatus(maoheData.mh_1_sodium_hypochlorite_dosing_pump_running, maoheData.mh_1_sodium_hypochlorite_dosing_pump_fault) }}</td>
            <td>{{ formatRunningStatus(maoheData.mh_2_sodium_hypochlorite_dosing_pump_running, maoheData.mh_2_sodium_hypochlorite_dosing_pump_fault) }}</td>
          </tr>
          <tr>
            <td>污泥循环泵</td>
            <td>{{ formatRunningStatus(maoheData.mh_1_sludge_circulation_pump_running, maoheData.mh_1_sludge_circulation_pump_fault) }}</td>
            <td>{{ formatRunningStatus(maoheData.mh_2_sludge_circulation_pump_running, maoheData.mh_2_sludge_circulation_pump_fault) }}</td>
            <td></td>
            <td></td>
            <td></td>
            <td>罗茨风机</td>
            <td>{{ formatMaoheBlower(maoheData.mh_1_roots_blower_frequency) }}</td>
            <td>{{ formatMaoheBlower(maoheData.mh_2_roots_blower_frequency) }}</td>
          </tr>
          <tr>
            <td>污泥外排泵</td>
            <td>{{ formatRunningStatus(maoheData.mh_1_sludge_discharge_pump_running, maoheData.mh_1_sludge_discharge_pump_fault) }}</td>
            <td>{{ formatRunningStatus(maoheData.mh_2_sludge_discharge_pump_running, maoheData.mh_2_sludge_discharge_pump_fault) }}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>

  </div>
</template>

<style scoped>
.xzcontainer-head {
  font-size: 6vh;
  font-weight: bold;
  color: black;
  font-family: '黑体', 'times new roman', Arial, sans-serif;
  text-align: center;
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0; 
  background-color:rgb(184,223,236);
  color:rgb(98,115,128);
}

.layout-row {
  display: flex;
  gap: 0; 
  margin-top: 0; 
}

#hongyan-xianglan {
  width:30vw;
  display: flex;
  flex-direction: column;
  gap: 0; /* 改为0 */
}

#maohe-xianglan {
  width:69vw;
  box-sizing: border-box;
  background-color: white;
  margin: 0;
  padding-left:1vw;
}

#cheling-xianglan {
  width:87vw;
  box-sizing: border-box;
  background-color: white;
  margin: 0; /* 确保没有外边距 */
}

table {
  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
  font-size: 0.65vw;
  font-family: '微软雅黑','Times New Roman';
  margin: 0; 
  padding: 0; 
}

/* 移除标题的额外间距 */
caption {
  caption-side: top;
  font-weight: bold;
  margin: 0;
  padding: 0;
  font-size:0.9vw;
  font-family: '微软雅黑', 'times new roman';
  color: red;
  font-size: 17px
}

/* 数据状态样式 */
.running {
  color: green;
  font-weight: bold;
}

.stopped {
  color: red;
  font-weight: bold;
}

.fault {
  color: orange;
  font-weight: bold;
}
</style>