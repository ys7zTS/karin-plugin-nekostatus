import type { NetworkData } from '../types'

interface NetworkSectionProps {
  networks: NetworkData[]
}

function UploadIcon () {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5M5 12l7-7 7 7"/>
    </svg>
  )
}

function DownloadIcon () {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12l7 7 7-7"/>
    </svg>
  )
}

interface MetricCardProps {
  label: string
  speed: string
  total: string
  type: 'up' | 'down'
}

function MetricCard ({ label, speed, total, type }: MetricCardProps) {
  return (
    <div className={`net-metric net-metric--${type}`}>
      <div className="net-metric-icon">
        {type === 'up' ? <UploadIcon /> : <DownloadIcon />}
      </div>
      <div className="net-metric-body">
        <div className="net-metric-header">
          <em>{label}</em>
          <span className="net-speed num-font">{speed}</span>
        </div>
        <div className="net-total num-font">Total {total}</div>
      </div>
    </div>
  )
}

export default function NetworkSection ({ networks }: NetworkSectionProps) {
  return (
    <section className="section">
      <div className="section-title">
        <h2>网络通信</h2>
        <span className="num-font">Interfaces</span>
      </div>
      <div className="network-list">
        {networks.map((net, i) => (
          <article key={i} className="network-card">
            <div className="network-header">
              <div className="network-name num-font">{net.name}</div>
            </div>
            <div className="network-metrics">
              <MetricCard label="上传" speed={net.upload.speed} total={net.upload.total} type="up" />
              <MetricCard label="下载" speed={net.download.speed} total={net.download.total} type="down" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
