import { Server, Globe, Clock, Terminal, Layers, Box } from "lucide-react"
import { Section } from "./section"
import { HostInfo } from "@/types"

export function ServerSection (server: HostInfo) {
  const items = [
    { icon: <Terminal className="h-4 w-4" />, label: "主机名", value: server.hostname },
    { icon: <Server className="h-4 w-4" />, label: "操作系统", value: server.system },
    { icon: <Box className="h-4 w-4" />, label: "内核", value: server.kernel },
    { icon: <Layers className="h-4 w-4" />, label: "架构", value: server.arch },
    { icon: <Globe className="h-4 w-4" />, label: "时区", value: server.timezone },
    { icon: <Clock className="h-4 w-4" />, label: "运行时间", value: server.uptime },
  ]
  return (
    <Section
      title="服务器信息"
      subtitle="主机基础环境"
      icon={<Server className="h-5 w-5" />}
    >
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex items-center gap-3 rounded-xl shadow-sm bg-secondary/30 px-3 py-2.5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              {it.icon}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {it.label}
              </div>
              <div className="truncate font-mono text-sm font-semibold text-foreground">
                {it.value}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
