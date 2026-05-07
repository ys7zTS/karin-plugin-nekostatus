import { getBotInfo, getCPUInfo, getMemoryInfo, getNetworkInfo, getProcessInfo, getStorageInfo, getSystemInfo } from '@/modules'
import { Cfg, render } from '@/utils'
import { StatusData } from '@ys7zts/neko-template'
import karin, { config, getPlugins, logger } from 'node-karin'
import os from 'node:os'
import { formatUptime } from '@/utils'

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
export function updateRegex () {
  const reg = getRegex()
  if (status.reg.source === reg.source && status.reg.flags === reg.flags) return
  status.reg = reg
  logger.info('[猫猫状态] 已更新命令正则表达式:', reg)
}

function getRegex () {
  const reg = Cfg.config.prefix.map(escapeRegex).join('|')
  const regex = new RegExp(`^#?(${reg})?状态(pro)?$`.trim(), 'i')
  return regex
}

export const status = karin.command(getRegex(), async (ctx) => {
  const match = ctx.msg.match(status.reg)!
  const prefix = match[1]
  const isAll = !!match[2]
  if (!Cfg.config.defStatus && !prefix) return false

  const bots = await getBotInfo(ctx.bot.selfId, isAll)
  const [cpu, mem, sysInfo] = await Promise.all([getCPUInfo(), getMemoryInfo(), getSystemInfo()])

  const [app, allPlugins, npm, git] = await Promise.all([
    getPlugins('app', false),
    getPlugins('all', false),
    getPlugins('npm', false),
    getPlugins('git', false)
  ])
  const raw: StatusData = {
    bots: bots.map(bot => ({
      id: bot.bot.id,
      nickname: bot.bot.nickname,
      avatar: bot.bot.avatar,
      friends: bot.bot.friends,
      groups: bot.bot.groups,
      sent: bot.bot.send,
      received: bot.bot.receive,
      adapter: bot.adapter.name,
      platform: bot.adapter.platform,
      adapterVersion: bot.adapter.version
    })),
    framework: {
      name: config.pkg().name,
      uptime: formatUptime(process.uptime()),
      version: config.pkg().version,
      plugins: {
        total: (allPlugins.includes('app:karin-plugin-example') ? allPlugins.length - 1 : allPlugins.length) + app.length,
        npm: npm.length,
        git: git.length,
        app: app.length
      }
    },
    cpu: {
      model: cpu.manufacturer + cpu.brand,
      cores: cpu.cores,
      frequency: cpu.maxSpeed,
      usage: cpu.totalLoad,
      threads: cpu.threads
    },
    mem: {
      ram: {
        used: mem.mem.used,
        total: mem.mem.total,
        usage: mem.mem.usage,
        free: mem.mem.free,
      },
      swap: mem.swap
    },
    hostInfo: {
      hostname: sysInfo.hostname,
      system: sysInfo.system,
      arch: sysInfo.arch,
      kernel: sysInfo.kernel,
      uptime: formatUptime(os.uptime()),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    networks: [],
    disks: [],
    proc: {
      procs: [],
      all: 0,
      sort: 'mem',
      running: 0,
      blocked: 0,
      sleeping: 0,
      unknown: 0
    },
    footer: ''
  }

  if (isAll) {
    const [disk, network, process] = await Promise.all([
      getStorageInfo(),
      Promise.resolve(getNetworkInfo()),
      getProcessInfo(10, Cfg.config.processSort)
    ])
    raw.disks = disk
    raw.networks = network
    raw.proc = {
      procs: process.list,
      all: process.all,
      sort: Cfg.config.processSort,
      running: process.running,
      blocked: process.blocked,
      sleeping: process.sleeping,
      unknown: process.unknown
    }
  }

  const img = await render(raw)
  ctx.reply(img)
}, { name: '状态', priority: -Infinity })
