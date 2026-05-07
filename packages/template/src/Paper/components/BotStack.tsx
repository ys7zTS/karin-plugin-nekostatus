import type { BotInfo } from '@/types'
import BotCard from './BotCard'

export default function BotStack ({ bots }: { bots: BotInfo[] }) {
  return (
    <section className="bot-stack" aria-label="账号列表">
      {bots.map((bot, i) => (
        <BotCard key={i} {...bot} />
      ))}
    </section>
  )
}
