import { getBotInfo, getCPUInfo, getMemoryInfo, getNetworkInfo, getProcessInfo, getStorageInfo, getSystemInfo } from '@/modules'
import { Cfg, render } from '@/utils'
import { StatusData } from '@ys7zts/neko-template'
import karin, { config, getPlugins, logger } from 'node-karin'
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
    getPlugins('app', true),
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
        total: allPlugins.length,
      }
    },
    hostInfo: {
      hostname: sysInfo.hostname,
      system: sysInfo.system,
      arch: sysInfo.arch,
      kernel: sysInfo.kernel,
      uptime: '0',
      timezone: ''
    },
    networks: [],
    footer: ''
  }

  if (isAll) {


    const [disk, network, process] = await Promise.all([
      getStorageInfo(),
      Promise.resolve(getNetworkInfo()),
      getProcessInfo(10, Cfg.config.processSort)
    ])

  }

  const img = await render(raw)
  ctx.reply(img)
  logger.info(status.reg)
}, { name: '状态', priority: -Infinity })
