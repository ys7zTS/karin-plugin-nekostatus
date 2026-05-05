import { formatUptime } from '@/utils'
import si from 'systeminformation'

/** 获取系统信息 */
export async function getSystemInfo () {
  const os = await si.osInfo()
  const t = si.time()
  return {
    /** 系统 */
    system: os.distro + os.release,
    /** 主机名 */
    hostname: os.hostname,
    /** 内核版本 */
    kernel: os.kernel,
    /** 架构 */
    arch: os.arch,
    /** 运行时间 */
    runtime: formatUptime(t.uptime),
    time: t.timezoneName + `(${t.timezone})`
  }
}
