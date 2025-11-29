<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 响应式数据
const zcData = ref({})
const fgsData = ref({})

// 定时器引用
const updateTimer = ref(null)

// 获取总厂数据
async function updateDatazongchang() {
  try {
    const response = await fetch("http://182.132.164.178:3000/zongchang")
    const data = await response.json()
    zcData.value = data
  } catch (error) {
    console.error('获取总厂数据失败:', error)
  }
}

// 获取分公司数据
async function updatefengongsi() {
  try {
    const response = await fetch("http://182.132.164.178:3000/fengongsi")
    const data = await response.json()
    fgsData.value = data
  } catch (error) {
    console.error('获取分公司数据失败:', error)
  }
}

// 更新所有数据
function updateAllData() {
  updateDatazongchang()
  updatefengongsi()
}

// 数据格式化函数
function formatFlow(value) {
  return value !== undefined && value !== null ? value.toFixed(2) + ' m³/h' : '-'
}
function zc_hc_formatFlow(value) {
  return value !== undefined && value !== null ? value.toFixed(2) + ' L/h' : '-'
}

function formatTotalFlow(value) {
  return value !== undefined && value !== null ? Math.round(value) + ' m³' : '-'
}

function formatTurbidity(value) {
  return value !== undefined && value !== null ? value.toFixed(2) + ' NTU' : '-'
}

function formatPH(value) {
  return value !== undefined && value !== null ? value.toFixed(1) : '-'
}

function formatTemperature(value) {
  return value !== undefined && value !== null ? value.toFixed(1) + ' °C' : '-'
}

function formatResidualChlorine(value) {
  return value !== undefined && value !== null ? value.toFixed(2) + ' mg/L' : '-'
}

function formatLevel(value) {
  return value !== undefined && value !== null ? value.toFixed(2) + ' m' : '-'
}

function formatCurrent(value) {
  return value !== undefined && value !== null ? value.toFixed(1) + ' A' : '-'
}

function formatFrequency(value) {
  return value !== undefined && value !== null ? value.toFixed(0) + ' Hz' : '-'
}

function zc_formatPressure(value) {
  return value !== undefined && value !== null ? ((value/100).toFixed(2)) + ' MPa' : '-'
}

function formatValveOpening(value) {
  return value !== undefined && value !== null ? value.toFixed(1) + ' %' : '-'
}

// 运行状态格式化函数
function formatRunningStatus(running, fault) {
  if (fault === 1) return '故障'
  return running === 1 ? '运行' : '停机'
}

// 获取取水泵状态
function getIntakePumpStatus(pumpNumber) {
  const data = zcData.value
  const running = data[`zc_intake_pump${pumpNumber}_running`]
  const fault = data[`zc_intake_pump${pumpNumber}_fault`]
  return formatRunningStatus(running, fault)
}

// 获取送水泵状态
function getDeliveryPumpStatus(pumpNumber) {
  const data = zcData.value
  const running = data[`zc_delivery_pump${pumpNumber}_running`]
  const fault = data[`zc_delivery_pump${pumpNumber}_fault`]
  return formatRunningStatus(running, fault)
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
    <p>供水实时生产数据</p>
    <div id="time" style="font-size: 12px; color: #666;position: absolute;bottom: 5px ;right: 10px;">数据更新时间：{{ zcData.TIME }}</div>
  </div>
  <div style="display:flex">
    <div id="zc-xianglan" style="width:60%;display:flex;display:inline-block">
      <div id="zc-xianglan-jibenshuju" style="width:100%">
        <table>
          <caption>农村供水总厂基本数据汇总</caption>
          <tbody>
            <tr>
              <td>进水流量</td>
              <td>{{ formatFlow(zcData.zc_influent_instant_flow) }}</td>
              <td>进水浊度</td>
              <td>{{ formatTurbidity(zcData.zc_influent_turbidity) }}</td>
              <td>进水pH</td>
              <td>{{ formatPH(zcData.zc_influent_ph) }}</td>
              <td>进水温度</td>
              <td>{{ formatTemperature(zcData.zc_influent_temperature) }}</td>	
            </tr>
            <tr>
              <td>出水流量</td>
              <td>{{ formatFlow(zcData.zc_pingliu_effluent_flow+zcData.zc_xiqu_instant_flow+zcData.zc_beiqu_instant_flow) }}</td>
              <td>出水浊度</td>
              <td>{{ formatTurbidity(zcData.zc_effluent_turbidity) }}</td>
              <td>出水pH</td>
              <td>{{ formatPH(zcData.zc_effluent_ph) }}</td>
              <td>出水余氯</td>
              <td>{{ formatResidualChlorine(zcData.zc_effluent_residual_chlorine) }}</td>	
            </tr>
            <tr>
              <td colspan="2">进水累积流量</td>
              <td colspan="2">{{ formatTotalFlow(zcData.zc_influent_total_flow) }}</td>
              <td colspan="2">出水累积流量</td>
              <td colspan="2">{{ formatTotalFlow(zcData.zc_pingliu_effluent_total_flow+zcData.zc_xiqu_total_flow+zcData.zc_beiqu_total_flow) }}</td>	
            </tr>
          </tbody>
        </table>
      </div>
      <div style="display:flex;width:100%">
        <div id="zc-xianglan-pump" style="width:49%;margin-right:1%">
          <table>
            <caption>取水泵</caption>
            <tbody>
              <tr>
                <td>取水泵</td>
                <td>运行状态</td>
                <td>电流</td>
                <td>频率</td>
              </tr>
              <tr>
                <td>1#取水泵</td>
                <td>{{ getIntakePumpStatus(1) }}</td>
                <td>{{ formatCurrent(zcData.zc_intake_pump1_current) }}</td>
                <td>{{ formatFrequency(zcData.zc_intake_pump1_frequency) }}</td>
              </tr>
              <tr>
                <td>2#取水泵</td>
                <td>{{ getIntakePumpStatus(2) }}</td>
                <td>{{ formatCurrent(zcData.zc_intake_pump2_current) }}</td>
                <td>{{ formatFrequency(zcData.zc_intake_pump2_frequency) }}</td>
              </tr>
              <tr>
                <td>3#取水泵</td>
                <td>{{ getIntakePumpStatus(3) }}</td>
                <td>{{ formatCurrent(zcData.zc_intake_pump3_current) }}</td>
                <td>{{ formatFrequency(zcData.zc_intake_pump3_frequency) }}</td>
              </tr>
              <tr>
                <td>4#取水泵</td>
                <td>{{ getIntakePumpStatus(4) }}</td>
                <td>{{ formatCurrent(zcData.zc_intake_pump4_current) }}</td>
                <td>{{ formatFrequency(zcData.zc_intake_pump4_frequency) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="zc-xianglan-other" style="width:49%;margin-left:1%">
          <table>
            <caption>流量详览</caption>
            <tbody>
              <tr>
                <td>区域</td>
                <td>瞬时流量</td>
                <td>日累积流量</td>
                <td>累积流量</td>
              </tr>
              <tr>
                <td>东区南区</td>
                <td>{{ formatFlow(zcData.zc_pingliu_effluent_flow) }}</td>
                <td>-</td>
                <td>{{ formatTotalFlow(zcData.zc_pingliu_effluent_total_flow) }}</td>
              </tr>
              <tr>
                <td>北区</td>
                <td>{{ formatFlow(zcData.zc_beiqu_instant_flow) }}</td>
                <td>-</td>
                <td>{{ formatTotalFlow(zcData.zc_beiqu_total_flow) }}</td>
              </tr>
              <tr>
                <td>西区</td>
                <td>{{ formatFlow(zcData.zc_xiqu_instant_flow) }}</td>
                <td>-</td>
                <td>{{ formatTotalFlow(zcData.zc_xiqu_total_flow) }}</td>
              </tr>
              <tr>
                <td>累积</td>
                <td>{{ formatFlow(zcData.zc_xiqu_instant_flow+zcData.zc_beiqu_instant_flow+zcData.zc_pingliu_effluent_flow) }}</td>
                <td>-</td>
                <td>{{ formatTotalFlow(zcData.zc_pingliu_effluent_total_flow+zcData.zc_xiqu_total_flow+zcData.zc_beiqu_total_flow) }}</td>
              </tr>
            </tbody>        
          </table>
        </div>
      </div>
      <div style="display:flex;width:100%">
        <div id="zc-xianglan-yuchen" style="width:48%;margin-right:1%">
          <table>
            <caption>预沉池</caption>
            <tbody>
              <tr>
                <td>预沉池</td>
                <td>浊度</td>
                <td>沉淀池</td>
                <td>浊度</td>
              </tr>
              <tr>
                <td>1#预沉池</td>
                <td>{{ formatTurbidity(zcData.zc_presedimentation_tank1_turbidity) }}</td>
                <td>1#沉淀池</td>
                <td>{{ formatTurbidity(zcData.zc_sedimentation_tank1_turbidity) }}</td>
              </tr>
              <tr>
                <td>2#预沉池</td>
                <td>{{ formatTurbidity(zcData.zc_presedimentation_tank2_turbidity) }}</td>
                <td>2#沉淀池</td>
                <td>{{ formatTurbidity(zcData.zc_sedimentation_tank2_turbidity) }}</td>
              </tr>
              <tr>
                <td>3#预沉池</td>
                <td>-</td>
                <td>3#沉淀池</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="zc-xianglan-filter" style="width:32%">
          <table>
            <caption>V型滤池</caption>
            <tbody>
              <tr>
                <td>滤格</td>
                <td>液位</td>
                <td>清水阀开度</td>
                <td>出水浊度</td>
              </tr>
              <tr>
                <td>1#</td>
                <td>{{ formatLevel(zcData.zc_v_filter1_level) }}</td>
                <td>{{ formatValveOpening(zcData.zc_v_filter1_water_valve_opening) }}</td>
                <td rowspan="6">{{ formatTurbidity(zcData.zc_effluent_turbidity) }}</td>
              </tr>
              <tr>
                <td>2#</td>
                <td>{{ formatLevel(zcData.zc_v_filter2_level) }}</td>
                <td>{{ formatValveOpening(zcData.zc_v_filter2_water_valve_opening) }}</td>
              </tr>
              <tr>
                <td>3#</td>
                <td>{{ formatLevel(zcData.zc_v_filter3_level) }}</td>
                <td>{{ formatValveOpening(zcData.zc_v_filter3_water_valve_opening) }}</td>
              </tr>
              <tr>
                <td>4#</td>
                <td>{{ formatLevel(zcData.zc_v_filter4_level) }}</td>
                <td>{{ formatValveOpening(zcData.zc_v_filter4_water_valve_opening) }}</td>
              </tr>
              <tr>
                <td>5#</td>
                <td>{{ formatLevel(zcData.zc_v_filter5_level) }}</td>
                <td>{{ formatValveOpening(zcData.zc_v_filter5_water_valve_opening) }}</td>
              </tr>
              <tr>
                <td>6#</td>
                <td>{{ formatLevel(zcData.zc_v_filter6_level) }}</td>
                <td>{{ formatValveOpening(zcData.zc_v_filter6_water_valve_opening) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="zc-xianglan-tank" style="width:16%;margin-left:1%">
          <table>
            <caption>清水池</caption>
            <tbody>
              <tr>
                <td>清水池</td>
                <td>液位</td>
              </tr>
              <tr>
                <td>1#</td>
                <td>{{ formatLevel(zcData.zc_clean_water_tank1) }}</td>
              </tr>
              <tr>
                <td>2#</td>
                <td>{{ formatLevel(zcData.zc_clean_water_tank2) }}</td>
              </tr>
              <tr>
                <td>新庙</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style="display:flex;width:100%">
        <div id="zc-xianglan-opump" style="width:49%;margin-right:1%">
          <table>
            <caption>北区送水泵房</caption>
            <tbody>
              <tr>
                <td>送水泵</td>
                <td>运行状态</td>
                <td>电流</td>
                <td>频率</td>
                <td>压力</td>
              </tr>
              <tr>
                <td>1#送水泵</td>
                <td>{{ getDeliveryPumpStatus(1) }}</td>
                <td>{{ formatCurrent(zcData.zc_delivery_pump1_current) }}</td>
                <td>{{ formatFrequency(zcData.zc_delivery_pump1_frequency) }}</td>
                <td rowspan="3">{{ zc_formatPressure(zcData.zc_delivery_pump1_pressure) }}</td>
              </tr>
              <tr>
                <td>2#送水泵</td>
                <td>{{ getDeliveryPumpStatus(2) }}</td>
                <td>{{ formatCurrent(zcData.zc_delivery_pump2_current) }}</td>
                <td>{{ formatFrequency(zcData.zc_delivery_pump2_frequency) }}</td>
              </tr>
              <tr>
                <td>3#送水泵（错误）</td>
                <td>{{ getDeliveryPumpStatus(3) }}</td>
                <td>{{ formatCurrent(zcData.zc_delivery_pump3_current) }}</td>
                <td>工频</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="zc-xianglan-cl" style="width:50%;margin-left:1%">
          <table>
            <caption>次氯酸钠加药系统</caption>
            <tbody>
              <tr>
                <td>成品罐液位</td>
                <td>{{ formatLevel(zcData.zc_sodium_hypochlorite_level/100) }}</td>
              </tr>
              <tr>
                <td>前加氯流量（1#泵）</td>
                <td>{{ zc_hc_formatFlow(zcData.zc_sodium_hypochlorite_pre_dosing_flow) }}</td>
              </tr>
              <tr>
                <td>备用加氯流量（2#泵）</td>
                <td>{{ zc_hc_formatFlow(zcData.zc_sodium_hypochlorite_post_dosing_flow) }}</td>
              </tr>
              <tr>
                <td>后加氯流量（3#泵）</td>
                <td>{{ zc_hc_formatFlow(zcData.zc_sodium_hypochlorite_backup_dosing_flow) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="fgs-xianglan" style="width:40%;margin-left:1%">
      <table>
        <caption>箭竹坪供水厂基本数据汇总</caption>
        <tbody>
          <tr>
            <td>进水流量</td>
            <td>{{ formatFlow(fgsData.jzp_line1_xjg_flow+fgsData.jzp_line2_mzq_flow+fgsData.xjg_bs_instant_flow) }}</td>
            <td>进水浊度</td>
            <td>{{ formatTurbidity(fgsData.jzp_in_turbidity) }}</td>
            <td>出水pH</td>
            <td>{{ formatPH(fgsData.jzp_out_ph) }}</td>
          </tr>
          <tr>
            <td>出水流量</td>
            <td>{{ formatFlow(fgsData.jzp_out_flow) }}</td>
            <td>出水浊度</td>
            <td>{{ formatTurbidity(fgsData.jzp_out_turbidity) }}</td>
            <td>出水余氯</td>
            <td>{{ formatResidualChlorine(fgsData.jzp_out_chlorine_dioxide) }}</td>
          </tr>
          <tr>
            <td colspan="2">进水累积流量</td>
            <td>{{ formatTotalFlow(fgsData.xjg_bs_accum_flow+fgsData.jzp_line1_xjg_flow+fgsData.jzp_line2_mzq_flow) }}</td>
            <td colspan="2">出水累积流量</td>
            <td>{{ formatTotalFlow(fgsData.jzp_out_accum_flow) }}</td>
          </tr>
          <tr>
            <td>1#清水池液位</td>
            <td colspan="2">{{ formatLevel(fgsData.jzp_line1_level) }}</td>
            <td colspan="2">2#清水池液位</td>
            <td>{{ formatLevel(fgsData.jzp_line2_level) }}</td>
          </tr>
          <tr>
            <td colspan="2" rowspan="2">1#生产线进水流量</td>
            <td rowspan="2">{{ formatFlow(fgsData.jzp_line1_xjg_flow) }}</td>
            <td rowspan="2">2#生产线</td>
            <td>名左渠</td>
            <td>{{ formatFlow(fgsData.jzp_line2_mzq_flow) }}</td>
          </tr>
          <tr>
            <td>徐家沟</td>
            <td>{{ formatFlow(fgsData.xjg_bs_instant_flow) }}</td>
          </tr>
          <tr>
            <td>总厂补水流量</td>
            <td colspan="5">{{ formatFlow(fgsData.jzp_in_instant_flow) }}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <caption>园区供水厂基本数据汇总</caption>
        <tbody>
          <tr>
            <td>进水流量</td>
            <td>{{ formatFlow(fgsData.yq_in_instant_flow) }}</td>
            <td>进水浊度</td>
            <td>{{ formatTurbidity(fgsData.yq_in_turbidity) }}</td>
            <td>出水pH</td>
            <td>{{ formatPH(fgsData.yq_out_ph) }}</td>
          </tr>
          <tr>
            <td>出水流量</td>
            <td>{{ formatFlow(fgsData.yq_out_flow) }}</td>
            <td>出水浊度</td>
            <td>{{ formatTurbidity(fgsData.yq_turbidity) }}</td>
            <td>出水余氯</td>
            <td>{{ formatResidualChlorine(fgsData.yq_chlorine_dioxide) }}</td>
          </tr>
          <tr>
            <td colspan="2">清水池液位</td>
            <td>{{ formatLevel(fgsData.yq_level) }}</td>
            <td colspan="2">出水压力</td>
            <td>{{ zc_formatPressure(fgsData.yq_out_pressure) }}</td>
          </tr>
          <tr>
            <td colspan="2">水泵</td>
            <td>频率</td>
            <td>电流</td>
            <td colspan="2">状态</td>
          </tr>
          <tr>
            <td colspan="2">1#送水泵</td>
            <td>工频</td>
            <td>{{ formatCurrent(fgsData.yq_pump1_current) }}</td>
          
            <td rowspan="4" colspan="2">{{ formatRunningStatus(fgsData.yq_pump1_running, fgsData.yq_pump1_fault) }} 需要修改</td>
          </tr>        
          <tr>
            <td colspan="2">2#送水泵</td>
            <td>工频</td>
            <td>{{ formatCurrent(fgsData.yq_pump2_current) }}</td>
          </tr>
          <tr>
            <td colspan="2">3#送水泵</td>
            <td>{{ formatFrequency(fgsData.yq_pump3_freq) }}</td>
            <td>{{ formatCurrent(fgsData.yq_pump3_current) }}</td>
          </tr>
          <tr>
            <td colspan="2">4#送水泵</td>
            <td>{{ formatFrequency(fgsData.yq_pump4_freq) }}</td>
            <td>{{ formatCurrent(fgsData.yq_pump4_current) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
/* 保持原有样式不变 */
.container-head {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
  font-size: 12px;
}

caption {
  font-weight: bold;
  text-align: center;
  padding: 5px;
}

td {
  border: 1px solid #ccc;
  padding: 4px;
  text-align: center;
}
</style>