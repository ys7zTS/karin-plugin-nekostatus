import { DiskInfoData } from '@/types'

function DiskIcon () {
  return (
    <svg viewBox="0 0 24 24">
      <ellipse cx="12" cy="6" rx="8" ry="3"></ellipse>
      <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"></path>
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"></path>
    </svg>
  )
}

export default function DiskInfo ({ diskInfo }: { diskInfo: DiskInfoData[] }) {
  return (
    <section className="section">
      <div className="section-title">
        <h2>磁盘信息</h2>
      </div>
      <div className="resource-list">
        {diskInfo.map((disk, i) => {
          return (
            <article key={i} className={`resource-item disk ${+disk.use < 70 ? 'low' : +disk.use < 85 ? 'medium' : 'high'}`} style={{ '--value': `${+disk.use}%` } as React.CSSProperties}>
              <div className="resource-icon">
                <DiskIcon />
              </div>
              <div className="resource-main">
                <div className="resource-heading">
                  <span className="resource-name">{disk.mount}({disk.type})</span>
                  <span className="resource-desc num-font">已用 {disk.used} · 可用 {disk.free} · 总计 {disk.size}</span>
                </div>
                <div className="bar">
                  <div className="bar-fill"></div>
                </div>
              </div>
              <div className="resource-value num-font">{+disk.use}<small>%</small></div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
