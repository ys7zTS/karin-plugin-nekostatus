import { Network, ArrowUp, ArrowDown } from "lucide-react"
import { Section } from "./section"
import { NetfaceInfo } from "@/types"
import { formatBytes } from "@/utils"

export function NetworkSection ({ networks }: { networks: NetfaceInfo[] }) {
  return (
    <Section
      title="网络信息"
      subtitle={`${networks.length} 个网络接口`}
      icon={<Network className="h-5 w-5" />}
    >
      <div className="space-y-2">
        {networks.map((n, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-xl shadow-sm bg-secondary/30 p-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <div className="flex items-center gap-2 sm:w-28">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="font-mono text-sm font-bold text-foreground">{n.name}</span>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4">
              <Cell
                icon={<ArrowUp className="h-3.5 w-3.5 text-primary" />}
                label="上行"
                value={formatBytes(n.upSpeed) + "/s"}
              />
              <Cell
                icon={<ArrowDown className="h-3.5 w-3.5 text-primary" />}
                label="下行"
                value={formatBytes(n.downSpeed) + "/s"}
              />
              <Cell
                icon={<ArrowUp className="h-3.5 w-3.5 text-muted-foreground" />}
                label="总上传"
                value={formatBytes(n.totalUp)}
                muted
              />
              <Cell
                icon={<ArrowDown className="h-3.5 w-3.5 text-muted-foreground" />}
                label="总下载"
                value={formatBytes(n.totalDown)}
                muted
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Cell ({
  icon,
  label,
  value,
  muted,
}: {
  icon: React.ReactNode
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <div className="rounded-lg bg-card px-2.5 py-1.5">
      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <div
        className={`font-mono text-sm font-bold tabular-nums ${muted ? "text-muted-foreground" : "text-foreground"
          }`}
      >
        {value}
      </div>
    </div>
  )
}
