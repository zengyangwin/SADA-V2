<script setup>
import {
  formatFlow,
  formatLevel,
  formatDO,
  formatRunningStatus,
  getRunningDevices,
  getRunningStatusHY
} from '../../utils.js'

defineProps({
  hongyanData: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

// 红岩专用函数
const getRunningBlowersHY = (data) => getRunningDevices(data, 'hy', 2, '_blower')
</script>

<template>
  <div class="plant-detail">
    <table>
      <caption>红岩厂运行详览</caption>
      <tbody>
        <tr>
          <td rowspan="6" class="section-title">调节池</td>
          <td>格栅机（缺失）</td>
          <td>{{ formatRunningStatus(hongyanData.hy_screen_machine_running, hongyanData.hy_screen_machine_fault) }}</td>
          <td rowspan="5" class="section-title">生化池</td>
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
          <td>{{ formatRunningStatus(hongyanData.hy_2_regulating_tank_mixer_running, hongyanData.hy_2_regulating_tank_mixer_fault) }}</td>
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
          <td rowspan="3" class="section-title">辅助车间</td>
          <td>PAC加药泵</td>
          <td>{{ formatRunningStatus(hongyanData.hy_pac_dosing_pump_running, hongyanData.hy_pac_dosing_pump_fault) }}</td>
        </tr>
        <tr>
          <td rowspan="2" class="section-title">除臭系统</td>
          <td>除臭风机</td>
          <td>{{ getRunningStatusHY(
            hongyanData.hy_1_roots_blower_running,
            hongyanData.hy_2_roots_blower_running,
            hongyanData.hy_1_roots_blower_fault,
            hongyanData.hy_2_roots_blower_fault
          ) }}</td>
          <td>PAC搅拌机</td>
          <td>{{ formatRunningStatus(hongyanData.hy_dosing_mixer_running, hongyanData.hy_dosing_mixer_fault) }}</td>
        </tr>
        <tr>
          <td>散水泵运行状态</td>
          <td>{{ getRunningStatusHY(
            hongyanData.hy_scattered_water_pump_1_running,
            hongyanData.hy_scattered_water_pump_2_running,
            hongyanData.hy_scattered_water_pump_1_fault,
            hongyanData.hy_scattered_water_pump_2_fault
          ) }}</td>
          <td>鼓风机</td>
          <td>{{ getRunningBlowersHY(hongyanData) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.plant-detail {
  width: 100%;
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

caption {
  caption-side: top;
  font-weight: bold;
  margin: 0;
  padding: 0;
  font-size: 17px;
  font-family: '微软雅黑', 'times new roman';
  color: red;
}

.section-title {
  font-family: '微软雅黑', 'Times New Roman', serif;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
}
</style>