import { HardDrive } from "lucide-react"
import { ProgressBar, Section, StatTile } from "./section"
import { DiskInfo } from "@/types"
import { formatBytes } from "@/utils"

function DiskRow ({
  disk,
}: {
  disk: DiskInfo
}) {
  const tone = disk.usage >= 80 ? "warn" : "primary"
  return (
    <div className="rounded-xl shadow-sm bg-secondary/30 p-4">
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <h3 className="text-sm font-bold text-foreground">{disk.mount}</h3>
          <span className="font-mono text-xs text-muted-foreground">
            {disk.type}
          </span>
        </div>
        <div className="font-mono text-xl font-bold tabular-nums text-primary">{disk.usage}%</div>
      </div>
      <div className="mt-2.5">
        <ProgressBar value={disk.usage} tone={tone} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <StatTile label="已用" value={`${formatBytes(disk.used)}`} />
        <StatTile label="剩余" value={`${formatBytes(disk.free)}`} />
        <StatTile label="总量" value={`${formatBytes(disk.total)}`} />
      </div>
    </div>
  )
}

export function DiskSection ({ disks }: { disks: DiskInfo[] }) {
  return (
    <Section
      title="硬盘信息"
      subtitle="磁盘存储使用情况"
      icon={<HardDrive className="h-5 w-5" />}
    >
      <div className="space-y-3">
        {disks.map((disk) => (
          <DiskRow key={disk.mount} disk={disk} />
        ))}
      </div>
    </Section>
  )
}