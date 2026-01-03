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
  const processSort = Cfg.config.processSort
  // 基础状态数据：仅包含 #状态（简易状态）所需字段
  const status = {
    bots,
    cpu: await getCPUInfo(),
    mem: await getMemoryInfo(),
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
    }
  }

  // 仅在 pro 状态时获取其余较重的数据
  const extraStatus = isAll
    ? await (async () => {
      const botColumns: Awaited<ReturnType<typeof getBotInfo>>[number][][] = []
      for (let i = 0; i < bots.length; i += 8) {
        botColumns.push(bots.slice(i, i + 8))
      }
      botColumns.reverse()

      const app = (await getPlugins('app', true))[0]?.apps.length || 0
      const plugin = {
        /** 全部插件数量减去karin-plugin-example文件夹 */
        all: (await getPlugins('all', false)).length - 1 + app,
        npm: (await getPlugins('npm', false)).length,
        git: (await getPlugins('git', false)).length,
        app
      }

      return {
        botColumns,
        plugin,
        disk: await getStorageInfo(),
        network: getNetworkInfo(),
        process: await getProcessInfo(10, processSort)
      }
    })()
    : {}

  const allstatus = {
    ...status,
    ...extraStatus
  }
  const template = isAll ? 'status/index' : 'status/simple'
  const img = await render(template, { status: allstatus })
  ctx.reply(img)
}, { name: '状态', priority: -Infinity })
