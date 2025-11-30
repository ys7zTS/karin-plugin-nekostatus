import { format } from '@/utils'
import si from 'systeminformation'

export async function getMemoryInfo () {
  const mem = await si.mem()
  const total = mem.total
  const free = mem.free
  const used = mem.total - mem.free
  return {
    /** 物理内存信息 */
    mem: {
      /** 总内存 */
      total: format(total),
      /** 可用 */
      free: format(free),
      /** 已使用 */
      used: format(used),
      /** 使用率 */
      usage: +((used / total) * 100).toFixed(2),
      /** 缓存 */
      cached: format(mem.cached)
    },
    /** 内存交换 */
    swap: {
      /** 总内存 */
      total: format(mem.swaptotal),
      /** 可用 */
      free: format(mem.swapfree),
      /** 已使用 */
      used: format(mem.swapused),
      /** 使用率 */
      usage: +((mem.swapused / mem.swaptotal) * 100).toFixed(2)
    }
  }
}
