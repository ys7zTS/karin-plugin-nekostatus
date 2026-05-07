import { formatNum } from '@/utils'
import type { BotInfo } from '../../types'

export default function BotCard (bot: BotInfo) {
  return (
    <article className={'bot-card'}>
      <div className="avatar-frame">
        <img src={bot.avatar} alt={bot.nickname} />
      </div>
      <div className="bot-content">
        <div className="bot-name-row">
          <div>
            <div className="bot-name">{bot.nickname}</div>
            <div className="bot-role num-font">{bot.adapter} v{bot.adapterVersion}</div>
          </div>
        </div>
        <div className="tag-row num-font">
          <span className="tag platform">{bot.platform}</span>
        </div>
        <div className="bot-stats">
          <div className="mini-stat">
            <span className="mini-value num-font">{formatNum(bot.friends)}</span>
            <span className="mini-label">好友</span>
          </div>
          <div className="mini-stat">
            <span className="mini-value num-font">{formatNum(bot.groups)}</span>
            <span className="mini-label">群聊</span>
          </div>
          <div className="mini-stat">
            <span className="mini-value num-font">{formatNum(bot.sent)}</span>
            <span className="mini-label">发送</span>
          </div>
          <div className="mini-stat">
            <span className="mini-value num-font">{formatNum(bot.received)}</span>
            <span className="mini-label">接收</span>
          </div>
        </div>
      </div>
    </article>
  )
}