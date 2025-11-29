// utils.js - 公共工具函数

// 通用格式化函数
export function formatValue(value, unit = '', precision = 2, suffix = '') {
  if (value == null || isNaN(value)) return '-'
  const formatted = precision === 0 ? Math.round(value) : value.toFixed(precision)
  return `${formatted}${suffix} ${unit}`.trim()
}

// 专用格式化函数
export const formatAmmonia = (value) => formatValue(value, 'mg/L', 2)
export const formatCOD = (value) => formatValue(value, 'mg/L', 0)
export const formatTP = (value) => formatValue(value, 'mg/L', 2)
export const formatPH = (value) => formatValue(value, '', 1)
export const formatTotalFlow = (value) => formatValue(value, 'm³', 0)
export const formatFlow = (value) => formatValue(value, 'm³/h', 2)
export const formatLevel = (value) => formatValue(value, 'm', 2)
export const formatDO = (value) => formatValue(value, 'mg/L', 2)

// 茅河厂专用
export const formatMaoheLevelDiff = (value) => formatValue(value, 'm', 2)
export const formatMaoheORP = (value) => formatValue(value, 'mv', 0)
export const formatMaoheMLSS = (value) => formatValue(value, 'mg/L', 0)
export const formatMaoheDO = (value) => formatValue(value, 'mg/L', 2)
export const formatMaoheBlower = (value) => formatValue(value, 'Hz', 0)

// 车岭厂专用
export const formatChelingLevelDiff = (value) => formatValue(value, 'm', 2)
export const formatChelingORP = (value) => formatValue(value, 'mv', 0)
export const formatChelingDO = (value) => formatValue(value, 'mg/L', 2)
export const formatChelingMLSS = (value) => formatValue(value, 'mg/L', 0)

// 状态格式化函数
export function formatRunningStatus(running, fault) {
  if (fault === 1) return '故障'
  return running === 1 ? '运行' : '停机'
}

export function formatValveStatus(open, close) {
  return open === 1 ? '开启' : '关闭'
}

// 获取运行设备列表的通用函数
export function getRunningDevices(deviceData, prefix, count, suffix = '#') {
  const runningDevices = []
  for (let i = 1; i <= count; i++) {
    if (deviceData[`${prefix}_${i}_running`] === 1) {
      runningDevices.push(i)
    }
  }
  return runningDevices.length > 0 ? runningDevices.join('、') + suffix : '全部停机'
}

// 获取故障设备列表
export function getFaultDevices(deviceData, prefix, count, suffix = '#') {
  const faultDevices = []
  for (let i = 1; i <= count; i++) {
    if (deviceData[`${prefix}_${i}_fault`] === 1) {
      faultDevices.push(i + suffix)
    }
  }
  return faultDevices.length > 0 ? faultDevices.join('、') + '故障' : null
}

// 红岩专用函数
export function getRunningStatusHY(pump1Running, pump2Running, pump1Fault, pump2Fault) {
  const faultDevices = getFaultDevices(
    { pump_1_fault: pump1Fault, pump_2_fault: pump2Fault },
    'pump',
    2
  )
  if (faultDevices) return faultDevices

  const runningPumps = []
  if (pump1Running === 1) runningPumps.push('1#')
  if (pump2Running === 1) runningPumps.push('2#')
  return runningPumps.length > 0 ? runningPumps.join('、') : '全部停机'
}

// 茅河专用函数
export function getRunningPumpsMaohe(pumpData) {
  return getRunningDevices(pumpData, 'mh', 4, '_lift_pump')
}

export function getRunningSludgeValves(valveData, system) {
  const runningValves = []
  for (let i = 1; i <= 6; i++) {
    if (valveData[`${system}_sludge_valve_${i}_open`] === 1) {
      runningValves.push(i)
    }
  }
  return runningValves.length > 0 ? runningValves.join('、') + '#' : '全部关闭'
}