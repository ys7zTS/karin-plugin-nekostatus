import { Layers, Package, GitBranch, AppWindow, Clock } from "lucide-react"
import { Section, StatTile } from "./section"
import LogoImg from '@/assets/image/logo.png'
import { FrameworkInfo } from "@/types"

export function FrameworkSection (framework: FrameworkInfo) {
  return (
    <Section
      title="框架信息"
      subtitle="当前运行的 Bot 框架"
      icon={<Layers className="h-5 w-5" />}
    >
      <div className="flex items-center gap-4 rounded-xl shadow-sm bg-secondary/30 p-4">
        <img
          src={LogoImg}
          alt={`${framework.name} logo`}
          className="h-16 w-16 shrink-0 rounded-2xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <h3 className="text-lg font-bold text-foreground">{framework.name}</h3>
            <span className="font-mono text-xs text-primary font-semibold">
              {framework.version}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>已运行</span>
            <span className="font-mono font-semibold text-foreground">{framework.uptime}</span>
          </div>
        </div>
        <div className="hidden text-right sm:block">
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">插件总数</div>
          <div className="font-mono text-2xl font-bold text-primary tabular-nums leading-none">
            {framework.plugins.total}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <StatTile
          label="总数"
          value={
            <span className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-primary" />
              {framework.plugins.total}
            </span>
          }
        />
        <StatTile
          label="NPM"
          value={
            <span className="flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5 text-primary" />
              {framework.plugins.npm}
            </span>
          }
        />
        <StatTile
          label="GIT"
          value={
            <span className="flex items-center gap-1.5">
              <GitBranch className="h-3.5 w-3.5 text-primary" />
              {framework.plugins.git}
            </span>
          }
        />
        <StatTile
          label="APP"
          value={
            <span className="flex items-center gap-1.5">
              <AppWindow className="h-3.5 w-3.5 text-primary" />
              {framework.plugins.app}
            </span>
          }
        />
      </div>
    </Section>
  )
}
