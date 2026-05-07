import type { CPUInfo, MemoryInfo } from '@/types'
import { formatBytes } from '@/utils'

interface ResourceSectionProps {
  cpu: CPUInfo
  mem: MemoryInfo
}

function CpuIcon () {
  return (
    <svg viewBox="0 0 24 24">
      <rect x="5" y="5" width="14" height="14" rx="3"></rect>
      <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4"></path>
    </svg>
  )
}

function RamIcon () {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M6 7h12v10H6z"></path>
      <path d="M8 3v4M12 3v4M16 3v4M8 17v4M12 17v4M16 17v4"></path>
    </svg>
  )
}

function SwapIcon () {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M7 7h10v10H7z"></path>
      <path d="M4 12h3M17 12h3M12 4v3M12 17v3"></path>
    </svg>
  )
}

export default function ResourceSection ({ cpu, mem }: ResourceSectionProps) {
  return (
    <section className="section">
      <div className="section-title">
        <h2>核心资源</h2>
      </div>
      <div className="resource-list">
        <article className="resource-item cpu" style={{ '--value': `${cpu.usage}%` } as React.CSSProperties}>
          <div className="resource-icon">
            <CpuIcon />
          </div>
          <div className="resource-main">
            <div className="resource-heading">
              <span className="resource-name">CPU</span>
              <span className="resource-desc num-font">{cpu.model}</span>
            </div>
            <div className="bar">
              <div className="bar-fill"></div>
            </div>
          </div>
          <div className="resource-value num-font">{cpu.usage}<small>%</small></div>
        </article>

        <article className="resource-item ram" style={{ '--value': `${mem.ram.usage}%` } as React.CSSProperties}>
          <div className="resource-icon">
            <RamIcon />
          </div>
          <div className="resource-main">
            <div className="resource-heading">
              <span className="resource-name">内存</span>
              <span className="resource-desc num-font">{formatBytes(mem.ram.used)} / {formatBytes(mem.ram.total)}</span>
            </div>
            <div className="bar">
              <div className="bar-fill"></div>
            </div>
          </div>
          <div className="resource-value num-font">{mem.ram.usage}<small>%</small></div>
        </article>

        <article className="resource-item swap" style={{ '--value': `${mem.swap.usage}%` } as React.CSSProperties}>
          <div className="resource-icon">
            <SwapIcon />
          </div>
          <div className="resource-main">
            <div className="resource-heading">
              <span className="resource-name">Swap</span>
              <span className="resource-desc num-font">{formatBytes(mem.swap.used)} / {formatBytes(mem.swap.total)}</span>
            </div>
            <div className="bar">
              <div className="bar-fill"></div>
            </div>
          </div>
          <div className="resource-value num-font">{mem.swap.usage}<small>%</small></div>
        </article>
      </div>
    </section>
  )
}