import { Activity } from "lucide-react"
import { Section } from "./section"
import { ProcInfo } from "@/types"
import { formatBytes } from "@/utils"

export function ProcessSection (proc: ProcInfo) {
  return (
    <Section
      title="进程信息"
      subtitle={`${proc.sort}占用最高的前 10 个进程`}
      icon={<Activity className="h-5 w-5" />}
      rightSlot={<span className="font-mono">TOP {proc.procs.length}</span>}
    >
      <div className="overflow-hidden rounded-xl shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary/60 text-left">
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                #
              </th>
              <th className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                进程名
              </th>
              <th className="px-3 py-2 text-right text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                PID
              </th>
              <th className="px-3 py-2 text-right text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                CPU {proc.sort === 'cpu' && '↓'}
              </th>
              <th className="px-3 py-2 text-right text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                MEM {proc.sort === 'mem' && '↓'}
              </th>
            </tr>
          </thead>
          <tbody>
            {proc.procs.map((p, i) => (
              <tr
                key={i}
                className="border-t border-border bg-card hover:bg-secondary/30"
              >
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </td>
                <td className="px-3 py-2 font-mono text-xs font-semibold text-foreground">
                  {p.name}
                </td>
                <td className="px-3 py-2 text-right font-mono text-xs tabular-nums text-muted-foreground">
                  {p.pid}
                </td>
                <td className="px-3 py-2 text-right font-mono text-xs font-bold tabular-nums text-foreground">
                  {p.cpu.toFixed(1)}%
                </td>
                <td className="px-3 py-2 text-right font-mono text-xs font-bold tabular-nums text-foreground">
                  {formatBytes(p.mem)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}
