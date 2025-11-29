<script setup>
import {
  formatLevel,
  formatRunningStatus,
  formatMaoheLevelDiff,
  formatMaoheORP,
  formatMaoheMLSS,
  formatMaoheDO,
  formatMaoheBlower,
  getRunningPumpsMaohe,
  getRunningSludgeValves
} from '../../utils.js'

defineProps({
  maoheData: {
    type: Object,
    required: true,
    default: () => ({})
  }
})
</script>

<template>
  <div class="plant-detail">
    <table>
      <caption>茅河厂运行详览</caption>
      <tbody>
        <tr>
          <td rowspan="4" class="section-title">调节池</td>
          <td>格栅机</td>
          <td colspan="2">{{ formatRunningStatus(maoheData.mh_screen_machine_running, maoheData.mh_screen_machine_fault) }}</td>
          <td rowspan="11" class="section-title">生化池</td>
          <td></td>
          <td>1#生化池</td>
          <td>2#生化池</td>
          <td rowspan="11" class="section-title">辅助车间</td>
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
          <td rowspan="3" class="section-title">除臭系统</td>
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
          <td rowspan="4" class="section-title">高效沉淀池</td>
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