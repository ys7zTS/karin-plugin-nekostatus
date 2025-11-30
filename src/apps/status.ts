import { getBotInfo, getCPUInfo, getMemoryInfo, getStorageInfo } from '@/modules'
import { Cfg, render } from '@/utils'
import karin, { getPlugins, logger } from 'node-karin'

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const reg = Cfg.config.prefix.map(escapeRegex).join('|')
const regex = new RegExp(`^#?(${reg})?状态(all)?$`.trim(), 'i')
export const status = karin.command(regex, async (ctx) => {
  const match = ctx.msg.match(regex)!
  const prefix = match[1]
  const isAll = !!match[2]
  if (!Cfg.config.defStatus && !prefix) return false
  const status = {
    bots: await getBotInfo(ctx.bot.selfId, isAll),
    plugin: {
      all: (await getPlugins('all', false)).length,
      npm: (await getPlugins('npm', false)).length,
      git: (await getPlugins('git', false)).length,
      js: (await getPlugins('app', false)).length
    },
    cpu: await getCPUInfo(),
    mem: await getMemoryInfo(),
    disk: await getStorageInfo()
  }
  logger.info(status)
  const img = await render('status/index', { status })
  ctx.reply(img)
})
