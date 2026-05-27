import { getReceiveCount, getSendCount } from '@/core'
import karin from 'node-karin'

/**
 * 获取Bot信息
 * @param Id BotId
 * @param isAll 是否获取全部Bot信息
 */
export async function getBotInfo (Id: string, isAll: boolean = false) {
  if (isAll) {
    const bots = karin.getAllBotID()
    return Promise.all(bots.map(botId => BotInfo(botId)))
  } else {
    return [await BotInfo(Id)]
  }
}

async function BotInfo (Id: string) {
  const bot = karin.getBot(Id)
  return {
    /** Bot信息 */
    bot: {
      /** 昵称 */
      nickname: bot?.account.name || bot?.account.selfId || `Bot ${Id}`,
      /** BotId */
      id: Id,
      /** 头像 */
      avatar: bot?.account.avatar || 'https://p.qlogo.cn/gh/967068507/967068507/0',
      /** 好友数量 */
      friends: await getSafeLength(async () => bot?.getFriendList()),
      /** 群聊数量 */
      groups: await getSafeLength(async () => bot?.getGroupList()),
      /** 接收消息数量 */
      receive: await getReceiveCount(Id),
      /** 发送消息数量 */
      send: await getSendCount(Id)
    },
    /** 适配器信息 */
    adapter: {
      /** 名称 */
      name: bot?.adapter.name || '希腊奶',
      /** 平台 */
      platform: bot?.adapter.platform || 'N/A',
      /** 版本 */
      version: bot?.adapter.version || '0.0.0'
    }
  }
}

async function getSafeLength (func: () => Promise<{ length?: number } | null | undefined>) {
  if (!func) return 0
  try {
    const res = await func()
    return res?.length || 0
  } catch (e) {
    return 0
  }
}
