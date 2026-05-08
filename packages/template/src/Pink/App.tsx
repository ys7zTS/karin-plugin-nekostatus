import { BotSection } from '@/Pink/components/bot-card'
import { CpuSection } from '@/Pink/components/cpu-section'
import { DiskSection } from '@/Pink/components/disk-section'
import { FrameworkSection } from '@/Pink/components/framework-section'
import { MemorySection } from '@/Pink/components/memory-section'
import { NetworkSection } from '@/Pink/components/network-section'
import { PawIcon } from '@/Pink/components/neko-icons'
import { ProcessSection } from '@/Pink/components/process-section'
import { ServerSection } from '@/Pink/components/server-section'
import { StatusData } from '../types'

export default function App (data: StatusData) {
  return (
    <main className="min-h-svh bg-background">
      <div id="container" style={{ width: '800px', padding: '20px', boxSizing: 'border-box', transform: `scale(${1440 / 800})`, transformOrigin: 'top left' }}>
        {/* Header */}
        <header className="mb-6 flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 shadow-[0_2px_0_0_rgba(244,168,184,0.15)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <PawIcon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-foreground">
                NekoStatus<span className="ml-1 text-primary">~</span>
              </h1>
              <p className="text-xs text-muted-foreground leading-tight">
                喵喵服务器状态面板
              </p>
            </div>
          </div>
          <div className="hidden text-right sm:block">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
              快照时间
            </div>
            <div className="font-mono text-sm font-semibold text-foreground">
              {new Date().toLocaleString()}
            </div>
          </div>
        </header>

        {/* Sections */}
        <div className="space-y-5">
          <BotSection bots={data.bots} />
          <FrameworkSection {...data.framework} />
          <CpuSection {...data.cpu} />
          <MemorySection {...data.mem} />
          {data.disks.length > 0 && <DiskSection disks={data.disks} />}
          {data.networks.length > 0 && <NetworkSection networks={data.networks} />}
          {Object.keys(data.proc).length > 0 && data.proc.procs.length > 0 && <ProcessSection {...data.proc} />}
          <ServerSection {...data.hostInfo} />
        </div>

        <footer className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <PawIcon className="h-3.5 w-3.5 text-primary" />
          <span>{data.footer}</span>
          <PawIcon className="h-3.5 w-3.5 text-primary" />
        </footer>
      </div>
    </main>
  )
}
