import { Bot, Send, Inbox, Users, Users2 } from "lucide-react"
import { Section } from "./section"
import DefAvatar from '@/assets/image/logo.png'
import { BotInfo } from "@/types"
import { formatNum } from "@/utils"

export function BotSection ({ bots }: { bots: BotInfo[] }) {
  return (
    <Section
      title="Bot 信息"
      subtitle={`共 ${bots.length} 个机器人`}
      icon={<Bot className="h-5 w-5" />}
      rightSlot={<span className="font-mono">nya~ {bots.length} bots</span>}
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {bots.map((bot, i) => (
          <article
            key={i}
            className="flex gap-3 rounded-xl shadow-sm bg-secondary/30 p-3"
          >
            <div className="relative shrink-0">
              <img
                src={bot.avatar || DefAvatar}
                alt={`${bot.nickname} 头像`}
                className="h-14 w-14 rounded-full border-2 border-card object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <h3 className="truncate text-sm font-bold text-foreground">{bot.nickname}</h3>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-[11px] font-semibold text-primary">
                  {bot.platform}
                </span>
                <span className="rounded-md bg-accent/40 px-1.5 py-0.5 text-[11px] font-medium text-foreground">
                  {bot.adapter}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {bot.adapterVersion}
                </span>
              </div>
              <dl className="mt-2 grid grid-cols-4 gap-1.5 text-center">
                <Stat icon={<Send className="h-3 w-3" />} label="发送" value={formatNum(bot.sent)} />
                <Stat
                  icon={<Inbox className="h-3 w-3" />}
                  label="接收"
                  value={formatNum(bot.received)}
                />
                <Stat
                  icon={<Users className="h-3 w-3" />}
                  label="好友"
                  value={formatNum(bot.friends)}
                />
                <Stat
                  icon={<Users2 className="h-3 w-3" />}
                  label="群"
                  value={formatNum(bot.groups)}
                />
              </dl>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Stat ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-md bg-card px-1 py-1">
      <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <div className="font-mono text-xs font-bold tabular-nums text-foreground">{value}</div>
    </div>
  )
}
