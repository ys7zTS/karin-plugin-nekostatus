import { format } from '@/utils'
import si from 'systeminformation'

const formatGHz = (ghz: number) => ghz.toFixed(2) + ' GHz'
/** 获取CPU信息 */
export async function getCPUInfo () {
  const [cpu, cpuLoad] = await Promise.all([
    si.cpu(),
    si.currentLoad()
  ])
  return {
    /** CPU品牌 */
    manufacturer: cpu.manufacturer || 'N/A',
    /** 型号 */
    brand: cpu.brand || 'N/A',
    /** 核心数 */
    cores: cpu.physicalCores || 0,
    /** 线程数 */
    threads: cpu.cores,
    /** 基础频率 */
    speed: formatGHz(cpu.speed || cpu.speedMax || 0),
    /** 最大睿频 */
    maxSpeed: formatGHz(cpu.speedMax || 0),
    /** L3缓存信息 */
    l3cache: cpu.cache?.l3 ? format(cpu.cache.l3) : 'N/A',
    /** CPU总使用率 */
    totalLoad: cpuLoad.currentLoad.toFixed(0) || 0,
    /** 每个核心使用率 */
    cpus: cpuLoad.cpus
      ? cpuLoad.cpus.map((core, index) => ({ core: index + 1, usage: +core.load.toFixed(2) }))
      : []
  }
}
