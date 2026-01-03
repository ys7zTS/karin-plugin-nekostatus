import si from 'systeminformation'

export type ProcessSortType = 'cpu' | 'mem'

/**
 * 获取进程信息
 * @param limit 返回的进程数量，默认10
 * @param sort 排序方式：按 CPU 或内存占用排序
 * @returns
 */
export async function getProcessInfo (limit = 10, sort: ProcessSortType = 'cpu') {
  const processes = await si.processes()

  // 过滤系统空闲进程和系统进程
  const filtered = processes.list.filter(p => {
    const name = p.name.toLowerCase()
    const exclude = [
      'system idle process', 'system', 'idle', 'registry', 'smss.exe', 'csrss.exe',
      'wininit.exe', 'services.exe', 'lsass.exe', 'svchost.exe', 'fontdrvhost.exe',
      'memory compression', 'runtime broker', 'searchindexer.exe', 'applicationframehost.exe'
    ]
    // 检查是否包含在排除列表中，或者包含 'system idle'
    if (name.includes('system idle') || name === 'system' || name === 'registry') return false
    return !exclude.includes(name) && p.cpu > 0
  })

  // 分组并统计
  const grouped = new Map<string, { name: string, pid: number, cpu: number, mem: number, count: number, user: string }>()

  for (const p of filtered) {
    const name = p.name
    if (grouped.has(name)) {
      const item = grouped.get(name)!
      item.cpu += p.cpu
      item.mem += p.mem
      item.count += 1
    } else {
      grouped.set(name, {
        name,
        pid: p.pid,
        cpu: p.cpu,
        mem: p.mem,
        count: 1,
        user: p.user
      })
    }
  }

  const list = Array.from(grouped.values())
    .sort((a, b) => {
      if (sort === 'mem') return b.mem - a.mem
      return b.cpu - a.cpu
    })
    .slice(0, limit)
    .map(p => ({
      name: p.count > 1 ? `${p.name}(${p.count})` : p.name,
      pid: p.pid, // 显示主进程PID
      cpu: p.cpu.toFixed(1),
      mem: p.mem.toFixed(1),
      user: p.user
    }))

  return {
    list,
    sort,
    all: processes.all,
    running: processes.running,
    blocked: processes.blocked,
    sleeping: processes.sleeping,
    unknown: processes.unknown ?? 0
  }
}
