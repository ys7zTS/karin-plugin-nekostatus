import type { BotData } from '../types'

interface BotCardProps {
  bot: BotData
}

export default function BotCard ({ bot }: BotCardProps) {
  return (
    <article className={'bot-card'}>
      <div className="avatar-frame">
        <img src={bot.avatar} alt={bot.name} />
      </div>
      <div className="bot-content">
        <div className="bot-name-row">
          <div>
            <div className="bot-name">{bot.name}</div>
            <div className="bot-role num-font">{bot.role}</div>
          </div>
        </div>
        <div className="tag-row num-font">
          <span className="tag platform">{bot.platform}</span>
          <span className="tag adapter">{bot.adapter}</span>
          <span className="tag version">{bot.adapterVersion}</span>
        </div>
        <div className="bot-stats">
          <div className="mini-stat">
            <span className="mini-value num-font">{bot.contacts}</span>
            <span className="mini-label">好友</span>
          </div>
          <div className="mini-stat">
            <span className="mini-value num-font">{bot.groups}</span>
            <span className="mini-label">群聊</span>
          </div>
          <div className="mini-stat">
            <span className="mini-value num-font">{bot.sent}</span>
            <span className="mini-label">发送</span>
          </div>
          <div className="mini-stat">
            <span className="mini-value num-font">{bot.received}</span>
            <span className="mini-label">接收</span>
          </div>
        </div>
      </div>
    </article>
  )
}
