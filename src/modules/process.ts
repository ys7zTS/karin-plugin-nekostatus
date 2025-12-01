// import { format } from '@/utils'
// import { isWin } from 'node-karin'
// import si from 'systeminformation'
// const prList = ['node', 'chrome', 'chromium', 'redis-server', `${process.title}`]
// /**
//  * 获取进程信息
//  * @param opt
//  * @returns
//  */
// export async function getProcessInfo (opt: { sortBy: 'cpu' | 'mem' } = { sortBy: 'mem' }) {
//   const p = await si.processes()
//   const f = p.list.filter(proc => proc.name !== 'System Idle Process')
//   const l = f.filter(i => prList.includes(isWin ? i.name.replace(/\.exe$/i, '').toLocaleLowerCase() : i.name.toLocaleLowerCase())
//   )
// }

// export async function _getProcessInfo (opt: { sortBy: 'cpu' | 'mem' } = { sortBy: 'mem' }) {
//   const p = await si.processes()
//   const f = p.list.filter(proc => proc.name !== 'System Idle Process')
//   interface ob {
//     name: string,
//     pid: string,
//     cpu: number,
//     mem: number,
//     count: number
//   }
//   const pm = new Map<number, ob>()
//   f.forEach(p => {
//     const Pid = p.parentPid || p.pid
//     if (!pm.has(Pid)) {
//       pm.set(Pid, {
//         name: p.name,
//         pid: p.pid.toString(),
//         cpu: p.cpu,
//         mem: p.mem,
//         count: 1
//       })
//     } else {
//       const pd = pm.get(Pid)
//       if (pd) {
//         pd.cpu += p.cpu
//         pd.mem += p.mem
//         pd.count++
//         pd.pid += `,${p.pid}`
//       }
//     }
//   })
//   const pl = Array.from(pm.values())
//   const sp = pl.sort((a, b) => {
//     const sf = opt.sortBy === 'mem' ? 'mem' : 'cpu'
//     return b[sf] - a[sf]
//   })
//   const l = sp.slice(0, 10).map(p => ({
//     name: p.name,
//     count: p.count - 1,
//     cpu: p.cpu,
//     mem: format(p.mem),
//     pid: p.pid
//   }))
//   return {
//     all: p.all,
//     running: p.running,
//     blocked: p.blocked,
//     sleeping: p.sleeping,
//     unknown: p.unknown,
//     list: l
//   }
// }
