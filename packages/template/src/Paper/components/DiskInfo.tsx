import type { DiskInfo } from '@/types'
import { formatBytes } from '@/utils'

function DiskIcon () {
  return (
    <svg viewBox="0 0 24 24">
      <ellipse cx="12" cy="6" rx="8" ry="3"></ellipse>
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"></path>
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"></path>
    </svg>
  )
}

export default function DiskInfo ({ disks }: { disks: DiskInfo[] }) {
  return (
    <section className="section">
      <div className="section-title">
        <h2>磁盘信息</h2>
      </div>
      <div className="resource-list">
        {disks.map((disk, i) => {
          return (
            <article key={i} className={`resource-item disk ${disk.usage < 70 ? 'low' : disk.usage < 85 ? 'medium' : 'high'}`} style={{ '--value': `${disk.usage}%` } as React.CSSProperties}>
              <div className="resource-icon">
                <DiskIcon />
              </div>
              <div className="resource-main">
                <div className="resource-heading">
                  <span className="resource-name">{disk.mount}({disk.type})</span>
                  <span className="resource-desc num-font">已用 {formatBytes(disk.used)} · 可用 {formatBytes(disk.free)} · 总计 {formatBytes(disk.total)}</span>
                </div>
                <div className="bar">
                  <div className="bar-fill"></div>
                </div>
              </div>
              <div className="resource-value num-font">{disk.usage}<small>%</small></div>
            </article>
          )
        })}
      </div>
    </section>
  )
}