import { hooks, redis } from 'node-karin'

let isinit = false
/**
 * 获取指定Bot接收消息次数
 * @param Id BotId
 * @returns
 */
export const getReceiveCount = async (Id: string) => {
  const d1 = await redis.get(`nekostatus:receive:${Id}`)
  if (!d1) return 0
  return JSON.parse(d1).count as number
}
// TODO: 发送消息次数统计无法实现
/**
 * 获取指定Bot发送消息次数
 * @param Id BotId
 * @returns
 */
export const getSendCount = async (Id: string) => {
  return 0
}
const init = () => {
  if (isinit) return
  isinit = true
  hooks.message(async (event, next) => {
    try {
      const d1 = await redis.get(`nekostatus:receive:${event.bot.selfId}`)
      let d2: { count: number, time: number } = d1 ? JSON.parse(d1) : { count: 0, time: Date.now() }
      if (Date.now() - d2.time > 30 * 24 * 60 * 60 * 1000) {
        d2 = { count: 0, time: Date.now() }
      }
      d2.count += 1
      redis.set(`nekostatus:receive:${event.bot.selfId}`, JSON.stringify(d2))
    } finally {
      next()
    }
  })
  // TODO: 无法获取Bot本身ID用来统计消息量
  // hooks.sendMsg.message(async (contact, _, __, next) => {
  //   try {
  //     const d1 = await redis.get(`nekostatus:send:${contact.peer}`)
  //   } finally {
  //     next()
  //   }
  // })
}
init()
