import { hooks, redis } from 'node-karin'

const RECV_MSG = 'nekostatus:receive'
const SEND_MSG = 'nekostatus:send'
let isinit = false
/**
 * 获取指定Bot接收消息次数
 * @param Id BotId
 * @returns
 */
export const getReceiveCount = async (Id: string) => {
  const d1 = await redis.get(`${RECV_MSG}:${Id}`)
  if (!d1) return 0
  return JSON.parse(d1).count as number
}
/**
 * 获取指定Bot发送消息次数
 * @param Id BotId
 * @returns
 */
export const getSendCount = async (Id: string) => {
  const d1 = await redis.get(`${SEND_MSG}:${Id}`)
  if (!d1) return 0
  return JSON.parse(d1).count as number
}
const init = () => {
  if (isinit) return
  isinit = true
  hooks.message(async (event, next) => {
    try {
      let key
      // TODO: 临时监听消息判断发送者是否是本身来判断发送消息次数
      if (event.selfId === event.sender.userId) {
        key = `${SEND_MSG}:${event.bot.selfId}`
      } else {
        key = `${RECV_MSG}:${event.bot.selfId}`
      }
      const d1 = await redis.get(key)
      const now = new Date()
      const time = now.getFullYear() * 100 + now.getMonth() + 1
      let d2: { count: number, time: number } = d1 ? JSON.parse(d1) : { count: 0, time }
      if (d2.time !== time) {
        d2 = { count: 0, time }
      }
      d2.count += 1
      redis.set(key, JSON.stringify(d2))
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
