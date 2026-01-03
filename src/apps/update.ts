import { dir } from '@/utils'
import karin, { restart, updatePkg } from 'node-karin'

export const update = karin.command(/^#(猫猫|neko)(状态)?(更新|update)$/, async (ctx) => {
  await ctx.reply('正在更新猫猫状态，请稍候...')
  const res = await updatePkg(dir.name)
  if (res.status === 'ok') {
    await ctx.reply(`猫猫状态更新完成 ${res.local} -> ${res.remote},开始执行重启`)
    restart(ctx.selfId, ctx.contact, ctx.messageId)
  } else {
    await ctx.reply(`猫猫状态更新失败，${res.data}`)
  }
  return true
})
