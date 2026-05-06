import { MemoryStick } from "lucide-react"
import { ProgressBar, Section, StatTile } from "./section"
import { MemoryInfo } from "@/types"
import { formatBytes } from "@/utils"

function MemRow ({
  title,
  used,
  total,
  free,
  usage,
  tone,
}: {
  title: string
  used: number
  total: number
  free: number
  usage: number
  tone: "primary" | "accent"
}) {
  return (
    <div className="rounded-xl shadow-sm bg-secondary/30 p-4">
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <h3 className="text-sm font-bold text-foreground">{title}</h3>
          <span className="font-mono text-xs text-muted-foreground">
            {formatBytes(used)} / {formatBytes(total)}
          </span>
        </div>
        <div className="font-mono text-xl font-bold tabular-nums text-primary">{usage}%</div>
      </div>
      <div className="mt-2.5">
        <ProgressBar value={usage} tone={tone} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <StatTile label="已用" value={`${formatBytes(used)}`} />
        <StatTile label="剩余" value={`${formatBytes(free)}`} />
        <StatTile label="总量" value={`${formatBytes(total)}`} />
      </div>
    </div>
  )
}

export function MemorySection (memory: MemoryInfo) {
  return (
    <Section
      title="内存信息"
      subtitle="RAM 与 Swap 使用情况"
      icon={<MemoryStick className="h-5 w-5" />}
    >
      <div className="space-y-3">
        <MemRow
          title="物理内存 RAM"
          used={memory.ram.used}
          total={memory.ram.total}
          free={memory.ram.free}
          usage={memory.ram.usage}
          tone="primary"
        />
        {Object.keys(memory.swap ?? {}).length !== 0 && <MemRow
          title="交换分区 Swap"
          used={memory.swap.used}
          total={memory.swap.total}
          free={memory.swap.free}
          usage={memory.swap.usage}
          tone="accent"
        />}
      </div>
    </Section>
  )
}
