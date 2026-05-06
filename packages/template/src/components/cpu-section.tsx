import { Cpu } from "lucide-react"
import { Section, StatTile } from "./section"
import { CPUInfo } from "@/types"

function Gauge ({ value }: { value: number }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const dash = (value / 100) * circumference
  return (
    <div className="relative">
      <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          strokeWidth="14"
          className="stroke-secondary"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          className="stroke-primary"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-mono text-3xl font-bold tabular-nums text-foreground leading-none">
          {value}
          <span className="text-base text-muted-foreground">%</span>
        </div>
        <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
          CPU 使用
        </div>
      </div>
    </div>
  )
}

export function CpuSection (cpu: CPUInfo) {
  return (
    <Section
      title="CPU 信息"
      subtitle="处理器状态"
      icon={<Cpu className="h-5 w-5" />}
      rightSlot={<span className="font-mono">{cpu.usage}% 占用</span>}
    >
      <div className="flex flex-col items-center gap-5 sm:flex-row">
        <Gauge value={cpu.usage} />
        <div className="flex-1 space-y-3">
          <div>
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
              处理器型号
            </div>
            <div className="mt-1 font-mono text-sm font-semibold text-foreground">{cpu.model}</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <StatTile label="核心" value={`${cpu.cores} 核`} />
            <StatTile label="线程" value={`${cpu.threads} 线程`} />
            <StatTile label="频率" value={`${cpu.frequency}`} />
          </div>
        </div>
      </div>
    </Section>
  )
}
