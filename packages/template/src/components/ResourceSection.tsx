import type { JSX } from 'react'
import type { ResourceData } from '../types'

interface ResourceSectionProps {
  resources: ResourceData[]
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

const iconMap: Record<string, () => JSX.Element> = {
  cpu: CpuIcon,
  ram: RamIcon,
  swap: SwapIcon
}

export default function ResourceSection ({ resources }: ResourceSectionProps) {
  return (
    <section className="section">
      <div className="section-title">
        <h2>核心资源</h2>
      </div>
      <div className="resource-list">
        {resources.map((res, i) => {
          const Icon = iconMap[res.type] || CpuIcon
          return (
            <article key={i} className={`resource-item ${res.type}`} style={{ '--value': `${res.value}%` } as React.CSSProperties}>
              <div className="resource-icon">
                <Icon />
              </div>
              <div className="resource-main">
                <div className="resource-heading">
                  <span className="resource-name">{res.name}</span>
                  <span className="resource-desc num-font">{res.desc}</span>
                </div>
                <div className="bar">
                  <div className="bar-fill"></div>
                </div>
              </div>
              <div className="resource-value num-font">{res.display}<small>{res.unit}</small></div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
