import type { BotData } from '../types'
import BotCard from './BotCard'

interface BotStackProps {
  bots: BotData[]
}

export default function BotStack ({ bots }: BotStackProps) {
  return (
    <section className="bot-stack" aria-label="账号列表">
      {bots.map((bot, i) => (
        <BotCard key={i} bot={bot} />
      ))}
    </section>
  )
}
