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

// 统一格式化函数
function formatValue(value, type = 'default') {
  if (value === undefined || value === null) return '-'
  
  const formatters = {
    flow: (v) => v.toFixed(2) + ' m³/h',
    hc_flow: (v) => v.toFixed(2) + ' L/h',
    totalFlow: (v) => Math.round(v) + ' m³',
    turbidity: (v) => v.toFixed(2) + ' NTU',
    ph: (v) => v.toFixed(1),
    temperature: (v) => v.toFixed(1) + ' °C',
    residualChlorine: (v) => v.toFixed(2) + ' mg/L',
    level: (v) => v.toFixed(2) + ' m',
    current: (v) => v.toFixed(1) + ' A',
    frequency: (v) => v.toFixed(0) + ' Hz',
    pressure: (v) => ((v/100).toFixed(2)) + ' MPa',
    valveOpening: (v) => v.toFixed(1) + ' %',
    default: (v) => v.toString()
  }
  
  return formatters[type] ? formatters[type](value) : formatters.default(value)
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
              <td>{{ formatValue(zcData.zc_influent_instant_flow, 'flow') }}</td>
              <td>进水浊度</td>
              <td>{{ formatValue(zcData.zc_influent_turbidity, 'turbidity') }}</td>
              <td>进水pH</td>
              <td>{{ formatValue(zcData.zc_influent_ph, 'ph') }}</td>
              <td>进水温度</td>
              <td>{{ formatValue(zcData.zc_influent_temperature, 'temperature') }}</td>	
            </tr>
            <tr>
              <td>出水流量</td>
              <td>{{ formatValue(zcData.zc_pingliu_effluent_flow+zcData.zc_xiqu_instant_flow+zcData.zc_beiqu_instant_flow, 'flow') }}</td>
              <td>出水浊度</td>
              <td>{{ formatValue(zcData.zc_effluent_turbidity, 'turbidity') }}</td>
              <td>出水pH</td>
              <td>{{ formatValue(zcData.zc_effluent_ph, 'ph') }}</td>
              <td>出水余氯</td>
              <td>{{ formatValue(zcData.zc_effluent_residual_chlorine, 'residualChlorine') }}</td>	
            </tr>
            <tr>
              <td colspan="2">进水累积流量</td>
              <td colspan="2">{{ formatValue(zcData.zc_influent_total_flow, 'totalFlow') }}</td>
              <td colspan="2">出水累积流量</td>
              <td colspan="2">{{ formatValue(zcData.zc_pingliu_effluent_total_flow+zcData.zc_xiqu_total_flow+zcData.zc_beiqu_total_flow, 'totalFlow') }}</td>	
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
                <td>{{ formatValue(zcData.zc_intake_pump1_current, 'current') }}</td>
                <td>{{ formatValue(zcData.zc_intake_pump1_frequency, 'frequency') }}</td>
              </tr>
              <tr>
                <td>2#取水泵</td>
                <td>{{ getIntakePumpStatus(2) }}</td>
                <td>{{ formatValue(zcData.zc_intake_pump2_current, 'current') }}</td>
                <td>{{ formatValue(zcData.zc_intake_pump2_frequency, 'frequency') }}</td>
              </tr>
              <tr>
                <td>3#取水泵</td>
                <td>{{ getIntakePumpStatus(3) }}</td>
                <td>{{ formatValue(zcData.zc_intake_pump3_current, 'current') }}</td>
                <td>{{ formatValue(zcData.zc_intake_pump3_frequency, 'frequency') }}</td>
              </tr>
              <tr>
                <td>4#取水泵</td>
                <td>{{ getIntakePumpStatus(4) }}</td>
                <td>{{ formatValue(zcData.zc_intake_pump4_current, 'current') }}</td>
                <td>{{ formatValue(zcData.zc_intake_pump4_frequency, 'frequency') }}</td>
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
                <td>{{ formatValue(zcData.zc_pingliu_effluent_flow, 'flow') }}</td>
                <td>-</td>
                <td>{{ formatValue(zcData.zc_pingliu_effluent_total_flow, 'totalFlow') }}</td>
              </tr>
              <tr>
                <td>北区</td>
                <td>{{ formatValue(zcData.zc_beiqu_instant_flow, 'flow') }}</td>
                <td>-</td>
                <td>{{ formatValue(zcData.zc_beiqu_total_flow, 'totalFlow') }}</td>
              </tr>
              <tr>
                <td>西区</td>
                <td>{{ formatValue(zcData.zc_xiqu_instant_flow, 'flow') }}</td>
                <td>-</td>
                <td>{{ formatValue(zcData.zc_xiqu_total_flow, 'totalFlow') }}</td>
              </tr>
              <tr>
                <td>累积</td>
                <td>{{ formatValue(zcData.zc_xiqu_instant_flow+zcData.zc_beiqu_instant_flow+zcData.zc_pingliu_effluent_flow, 'flow') }}</td>
                <td>-</td>
                <td>{{ formatValue(zcData.zc_pingliu_effluent_total_flow+zcData.zc_xiqu_total_flow+zcData.zc_beiqu_total_flow, 'totalFlow') }}</td>
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
                <td>{{ formatValue(zcData.zc_presedimentation_tank1_turbidity, 'turbidity') }}</td>
                <td>1#沉淀池</td>
                <td>{{ formatValue(zcData.zc_sedimentation_tank1_turbidity, 'turbidity') }}</td>
              </tr>
              <tr>
                <td>2#预沉池</td>
                <td>{{ formatValue(zcData.zc_presedimentation_tank2_turbidity, 'turbidity') }}</td>
                <td>2#沉淀池</td>
                <td>{{ formatValue(zcData.zc_sedimentation_tank2_turbidity, 'turbidity') }}</td>
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
                <td>{{ formatValue(zcData.zc_v_filter1_level, 'level') }}</td>
                <td>{{ formatValue(zcData.zc_v_filter1_water_valve_opening, 'valveOpening') }}</td>
                <td rowspan="6">{{ formatValue(zcData.zc_effluent_turbidity, 'turbidity') }}</td>
              </tr>
              <tr>
                <td>2#</td>
                <td>{{ formatValue(zcData.zc_v_filter2_level, 'level') }}</td>
                <td>{{ formatValue(zcData.zc_v_filter2_water_valve_opening, 'valveOpening') }}</td>
              </tr>
              <tr>
                <td>3#</td>
                <td>{{ formatValue(zcData.zc_v_filter3_level, 'level') }}</td>
                <td>{{ formatValue(zcData.zc_v_filter3_water_valve_opening, 'valveOpening') }}</td>
              </tr>
              <tr>
                <td>4#</td>
                <td>{{ formatValue(zcData.zc_v_filter4_level, 'level') }}</td>
                <td>{{ formatValue(zcData.zc_v_filter4_water_valve_opening, 'valveOpening') }}</td>
              </tr>
              <tr>
                <td>5#</td>
                <td>{{ formatValue(zcData.zc_v_filter5_level, 'level') }}</td>
                <td>{{ formatValue(zcData.zc_v_filter5_water_valve_opening, 'valveOpening') }}</td>
              </tr>
              <tr>
                <td>6#</td>
                <td>{{ formatValue(zcData.zc_v_filter6_level, 'level') }}</td>
                <td>{{ formatValue(zcData.zc_v_filter6_water_valve_opening, 'valveOpening') }}</td>
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
                <td>{{ formatValue(zcData.zc_clean_water_tank1, 'level') }}</td>
              </tr>
              <tr>
                <td>2#</td>
                <td>{{ formatValue(zcData.zc_clean_water_tank2, 'level') }}</td>
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
                <td>{{ formatValue(zcData.zc_delivery_pump1_current, 'current') }}</td>
                <td>{{ formatValue(zcData.zc_delivery_pump1_frequency, 'frequency') }}</td>
                <td rowspan="3">{{ formatValue(zcData.zc_delivery_pump1_pressure, 'pressure') }}</td>
              </tr>
              <tr>
                <td>2#送水泵</td>
                <td>{{ getDeliveryPumpStatus(2) }}</td>
                <td>{{ formatValue(zcData.zc_delivery_pump2_current, 'current') }}</td>
                <td>{{ formatValue(zcData.zc_delivery_pump2_frequency, 'frequency') }}</td>
              </tr>
              <tr>
                <td>3#送水泵（错误）</td>
                <td>{{ getDeliveryPumpStatus(3) }}</td>
                <td>{{ formatValue(zcData.zc_delivery_pump3_current, 'current') }}</td>
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
                <td>{{ formatValue(zcData.zc_sodium_hypochlorite_level/100, 'level') }}</td>
              </tr>
              <tr>
                <td>前加氯流量（1#泵）</td>
                <td>{{ formatValue(zcData.zc_sodium_hypochlorite_pre_dosing_flow, 'hc_flow') }}</td>
              </tr>
              <tr>
                <td>备用加氯流量（2#泵）</td>
                <td>{{ formatValue(zcData.zc_sodium_hypochlorite_post_dosing_flow, 'hc_flow') }}</td>
              </tr>
              <tr>
                <td>后加氯流量（3#泵）</td>
                <td>{{ formatValue(zcData.zc_sodium_hypochlorite_backup_dosing_flow, 'hc_flow') }}</td>
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
            <td>{{ formatValue(fgsData.jzp_line1_xjg_flow+fgsData.jzp_line2_mzq_flow+fgsData.xjg_bs_instant_flow, 'flow') }}</td>
            <td>进水浊度</td>
            <td>{{ formatValue(fgsData.jzp_in_turbidity, 'turbidity') }}</td>
            <td>出水pH</td>
            <td>{{ formatValue(fgsData.jzp_out_ph, 'ph') }}</td>
          </tr>
          <tr>
            <td>出水流量</td>
            <td>{{ formatValue(fgsData.jzp_out_flow, 'flow') }}</td>
            <td>出水浊度</td>
            <td>{{ formatValue(fgsData.jzp_out_turbidity, 'turbidity') }}</td>
            <td>出水余氯</td>
            <td>{{ formatValue(fgsData.jzp_out_chlorine_dioxide, 'residualChlorine') }}</td>
          </tr>
          <tr>
            <td colspan="2">进水累积流量</td>
            <td>{{ formatValue(fgsData.xjg_bs_accum_flow+fgsData.jzp_line1_xjg_flow+fgsData.jzp_line2_mzq_flow, 'totalFlow') }}</td>
            <td colspan="2">出水累积流量</td>
            <td>{{ formatValue(fgsData.jzp_out_accum_flow, 'totalFlow') }}</td>
          </tr>
          <tr>
            <td>1#清水池液位</td>
            <td colspan="2">{{ formatValue(fgsData.jzp_line1_level, 'level') }}</td>
            <td colspan="2">2#清水池液位</td>
            <td>{{ formatValue(fgsData.jzp_line2_level, 'level') }}</td>
          </tr>
          <tr>
            <td colspan="2" rowspan="2">1#生产线进水流量</td>
            <td rowspan="2">{{ formatValue(fgsData.jzp_line1_xjg_flow, 'flow') }}</td>
            <td rowspan="2">2#生产线</td>
            <td>名左渠</td>
            <td>{{ formatValue(fgsData.jzp_line2_mzq_flow, 'flow') }}</td>
          </tr>
          <tr>
            <td>徐家沟</td>
            <td>{{ formatValue(fgsData.xjg_bs_instant_flow, 'flow') }}</td>
          </tr>
          <tr>
            <td>总厂补水流量</td>
            <td colspan="5">{{ formatValue(fgsData.jzp_in_instant_flow, 'flow') }}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <caption>园区供水厂基本数据汇总</caption>
        <tbody>
          <tr>
            <td>进水流量</td>
            <td>{{ formatValue(fgsData.yq_in_instant_flow, 'flow') }}</td>
            <td>进水浊度</td>
            <td>{{ formatValue(fgsData.yq_in_turbidity, 'turbidity') }}</td>
            <td>出水pH</td>
            <td>{{ formatValue(fgsData.yq_out_ph, 'ph') }}</td>
          </tr>
          <tr>
            <td>出水流量</td>
            <td>{{ formatValue(fgsData.yq_out_flow, 'flow') }}</td>
            <td>出水浊度</td>
            <td>{{ formatValue(fgsData.yq_turbidity, 'turbidity') }}</td>
            <td>出水余氯</td>
            <td>{{ formatValue(fgsData.yq_chlorine_dioxide, 'residualChlorine') }}</td>
          </tr>
          <tr>
            <td colspan="2">清水池液位</td>
            <td>{{ formatValue(fgsData.yq_level, 'level') }}</td>
            <td colspan="2">出水压力</td>
            <td>{{ fgsData.yq_out_pressure?.toFixed(2) }} mPa</td>
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
            <td>{{ formatValue(fgsData.yq_pump1_current, 'current') }}</td>
            <td rowspan="4" colspan="2">/</td>
          </tr>        
          <tr>
            <td colspan="2">2#送水泵</td>
            <td>工频</td>
            <td>{{ formatValue(fgsData.yq_pump2_current, 'current') }}</td>
          </tr>
          <tr>
            <td colspan="2">3#送水泵</td>
            <td>{{ formatValue(fgsData.yq_pump3_freq, 'frequency') }}</td>
            <td>{{ formatValue(fgsData.yq_pump3_current, 'current') }}</td>
          </tr>
          <tr>
            <td colspan="2">4#送水泵</td>
            <td>{{ formatValue(fgsData.yq_pump4_freq, 'frequency') }}</td>
            <td>{{ formatValue(fgsData.yq_pump4_current, 'current') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
:root {
  --base-font-size: 0.65vw;
  --caption-font-size: 0.9vw;
  --table-padding: 2px 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
  font-size: var(--base-font-size);
  font-family: '微软雅黑', 'Times New Roman', serif;
}

caption {
  font-weight: bold;
  text-align: center;
  padding: 5px;
  font-size: var(--caption-font-size);
  font-family: '微软雅黑', 'Times New Roman', serif;
  color: red;
}

td {
  border: 1px solid #ccc;
  padding: var(--table-padding);
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  :root {
    --base-font-size: 0.7vw;
    --caption-font-size: 0.95vw;
  }
}

@media (max-width: 992px) {
  :root {
    --base-font-size: 0.8vw;
    --caption-font-size: 1.1vw;
  }
}

@media (max-width: 768px) {
  :root {
    --base-font-size: 1.2vw;
    --caption-font-size: 1.5vw;
  }
}

@media (max-width: 576px) {
  :root {
    --base-font-size: 1.8vw;
    --caption-font-size: 2.2vw;
  }
}
</style>