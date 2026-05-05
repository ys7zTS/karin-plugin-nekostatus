import { getBotInfo, getCPUInfo, getMemoryInfo, getNetworkInfo, getProcessInfo, getStorageInfo, getSystemInfo } from '@/modules'
import { Cfg, render } from '@/utils'
import { StatusData } from '@ys7zts/neko-template'
import karin, { config, getPlugins } from 'node-karin'
import { formatUptime } from '@/utils'

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const reg = Cfg.config.prefix.map(escapeRegex).join('|')
const regex = new RegExp(`^#?(${reg})?状态(pro)?$`.trim(), 'i')

export const status = karin.command(regex, async (ctx) => {
  const match = ctx.msg.match(regex)!
  const prefix = match[1]
  const isAll = !!match[2]
  if (!Cfg.config.defStatus && !prefix) return false

  const bots = await getBotInfo(ctx.bot.selfId, isAll)
  const [cpu, mem, sysInfo] = await Promise.all([getCPUInfo(), getMemoryInfo(), getSystemInfo()])

  const raw: StatusData = {
    karinVersion: config.pkg().version,
    uptime: formatUptime(process.uptime()),
    bots: bots.map(bot => ({
      name: bot.bot.nickname,
      role: 'Bot',
      avatar: bot.bot.avatar,
      platform: bot.adapter.platform,
      adapter: bot.adapter.name,
      adapterVersion: bot.adapter.version,
      contacts: String(bot.bot.friends),
      groups: String(bot.bot.groups),
      sent: String(bot.bot.send),
      received: String(bot.bot.receive)
    })),
    resources: [
      {
        type: 'cpu',
        name: 'CPU',
        desc: cpu.brand,
        value: Number(cpu.totalLoad),
        display: cpu.totalLoad + '',
        unit: '%'
      },
      {
        type: 'ram',
        name: '内存',
        desc: `已用 ${mem.mem.used} / 总计 ${mem.mem.total}`,
        value: mem.mem.usage,
        display: mem.mem.usage.toFixed(1),
        unit: '%'
      },
      {
        type: 'swap',
        name: '交换分区',
        desc: `已用 ${mem.swap.used} / 总计 ${mem.swap.total}`,
        value: mem.swap.usage,
        display: mem.swap.usage.toFixed(1),
        unit: '%'
      }
    ],
    runtimeVersion: `Node.js ${process.version}`,
    mountedBots: karin.getAllBotID().length,
    plugins: {
      total: 0,
      git: 0,
      npm: 0,
      app: 0
    },
    hostInfo: {
      hostname: sysInfo.hostname,
      system: sysInfo.system,
      arch: sysInfo.arch,
      kernel: sysInfo.kernel
    },
    diskInfo: [],
    networks: [],
    processTags: {
      total: 0,
      running: 0,
      sleeping: 0,
      blocked: 0
    },
    processes: [],
    footerText: ''
  }

  if (isAll) {
    const [appPlugins, allPlugins, npmPlugins, gitPlugins] = await Promise.all([
      getPlugins('app', true),
      getPlugins('all', false),
      getPlugins('npm', false),
      getPlugins('git', false)
    ])
    const app = appPlugins[0]?.apps.length || 0

    raw.plugins = {
      total: (allPlugins.includes('app:karin-plugin-example') ? allPlugins.length - 1 : allPlugins.length) + app,
      npm: npmPlugins.length,
      git: gitPlugins.length,
      app
    }

    const [disk, network, process] = await Promise.all([
      getStorageInfo(),
      Promise.resolve(getNetworkInfo()),
      getProcessInfo(10, Cfg.config.processSort)
    ])
    raw.diskInfo = disk.map(d => ({
      mount: d.mount,
      type: d.type,
      size: d.size,
      used: d.used,
      free: d.free,
      use: d.use
    }))

    raw.networks = network.map(n => ({
      name: n.name,
      upload: {
        speed: n.upload,
        total: n.totalUpload
      },
      download: {
        speed: n.download,
        total: n.totalDownload
      }
    }))

    raw.processTags = {
      total: process.all,
      running: process.running,
      sleeping: process.sleeping,
      blocked: process.blocked
    }

    raw.processes = process.list.map(p => ({
      name: p.name,
      pid: String(p.pid),
      cpu: p.cpu,
      memory: p.mem
    }))
  }

  const img = await render(raw)
  ctx.reply(img)
}, { name: '状态', priority: -Infinity })
