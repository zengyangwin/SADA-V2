<script setup>
import {
  formatFlow,
  formatLevel,
  formatRunningStatus,
  formatValveStatus,
  formatChelingLevelDiff,
  formatChelingORP,
  formatChelingDO,
  formatChelingMLSS
} from '../../utils.js'

defineProps({
  chelingData: {
    type: Object,
    required: true,
    default: () => ({})
  }
})
</script>

<template>
  <div class="plant-detail">
    <table>
      <caption>车岭厂运行详览</caption>
      <tbody>
        <tr>
          <td rowspan="5" class="section-title">调节池</td>
          <td></td>
          <td>1#</td>
          <td>2#</td>
          <td rowspan="7" class="section-title">生化池</td>
          <td></td>
          <td>1#生化池</td>
          <td>2#生化池</td>
          <td rowspan="8" class="section-title">高效沉淀池</td>
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
          <td rowspan="6" class="section-title">细格栅/旋流沉砂池</td>
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
          <td rowspan="6" class="section-title">污泥处理系统</td>
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
          <td rowspan="5" class="section-title">辅助车间</td>
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
          <td rowspan="2" class="section-title">除臭系统</td>
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
          <td>{{ formatRunningStatus(chelingData.cl_1_sprinkler_pump_running, chelingData.cl_1_sprinkler_pump_fault) }}</td>
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