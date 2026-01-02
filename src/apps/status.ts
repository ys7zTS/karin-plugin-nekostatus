import { getBotInfo, getCPUInfo, getMemoryInfo, getNetworkInfo, getProcessInfo, getStorageInfo, getSystemInfo } from '@/modules'
import { Cfg, render } from '@/utils'
import karin, { config, getPlugins, uptime } from 'node-karin'

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const reg = Cfg.config.prefix.map(escapeRegex).join('|')
const regex = new RegExp(`^#?(${reg})?状态(pro)?$`.trim(), 'i')
export const status = karin.command(regex, async (ctx) => {
  const match = ctx.msg.match(regex)!
  const prefix = match[1]
  const isAll = !!match[2]
  if (!Cfg.config.defStatus && !prefix) return false
  const bots = await getBotInfo(ctx.bot.selfId, isAll)
  const botColumns: any[][] = []
  for (let i = 0; i < bots.length; i += 8) {
    botColumns.push(bots.slice(i, i + 8))
  }
  botColumns.reverse()

  const app = (await getPlugins('app', true))[0].apps.length
  const status = {
    bots,
    botColumns,
    plugin: {
      /** 全部插件数量减去karin-plugin-example文件 */
      all: (await getPlugins('all', false)).length - 1 + app,
      npm: (await getPlugins('npm', false)).length,
      git: (await getPlugins('git', false)).length,
      app
    },
    cpu: await getCPUInfo(),
    mem: await getMemoryInfo(),
    disk: await getStorageInfo(),
    k: {
      name: config.pkg().name,
      version: config.pkg().version,
      time: uptime(),
      bots: karin.getBotCount()
    },
    sys: {
      ...(await getSystemInfo()),
      node_version: process.version,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    network: getNetworkInfo(),
    process: await getProcessInfo()
  }
  const template = isAll ? 'status/index' : 'status/simple'
  const img = await render(template, { status })
  ctx.reply(img)
}, { name: '状态', priority: -Infinity })
