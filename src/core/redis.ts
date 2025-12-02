import { hooks, redis } from 'node-karin'

/** 接收消息key */
const RECV_MSG = 'nekostatus:receive'
/** 发送消息key */
// const SEND_MSG = 'nekostatus:send'
let isinit = false
/**
 * 获取指定Bot接收消息次数
 * @param Id BotId
 * @returns
 */
export const getReceiveCount = async (Id: string) => {
  const key = `${RECV_MSG}:${getMonth()}:${Id}`
  const d1 = await redis.get(key)
  return +(d1 || 0)
}
// TODO: 无法统计Bot消息发送量
/**
 * 获取指定Bot发送消息次数
 * @param Id BotId
 * @returns
 */
export const getSendCount = async (Id: string) => {
  return 0
}
/** 获取年月 */
const getMonth = () => {
  const now = new Date()
  return now.getFullYear() * 100 + now.getMonth() + 1
}
/** 初始化 */
export const init = async () => {
  if (isinit) return
  isinit = true
  hooks.message(async (event, next) => {
    try {
      const key = `${RECV_MSG}:${getMonth()}:${event.bot.selfId}`
      redis.incr(key)
      redis.expire(key, 60 * 60 * 24 * 35)
    } finally {
      next()
    }
  })
  // TODO: 该函数无法获取Bot本身ID用来统计消息量
  // hooks.sendMsg.message(async (contact, _, __, next) => {
  //   try {
  //     const d1 = await redis.get(`nekostatus:send:${contact.peer}`)
  //   } finally {
  //     next()
  //   }
  // })
}
