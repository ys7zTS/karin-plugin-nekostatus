import type { HostInfoData } from '../types'


export default function HostInfo (hostInfo: HostInfoData) {
  return (
    <section className="section">
      <div className="section-title">
        <h2>宿主信息</h2>
        <span className="num-font">Server profile</span>
      </div>
      <div className="info-list">
        <div key='1' className="info-row">
          <span className="info-label">主机名</span>
          <span className="info-value num-font">{hostInfo.hostname}</span>
        </div>
        <div key='2' className="info-row">
          <span className="info-label">操作系统</span>
          <span className="info-value num-font">{hostInfo.system}</span>
        </div>
        <div key='3' className="info-row">
          <span className="info-label">内核版本</span>
          <span className="info-value num-font">{hostInfo.kernel}</span>
        </div>
        <div key='4' className="info-row">
          <span className="info-label">架构</span>
          <span className="info-value num-font">{hostInfo.arch}</span>
        </div>
      </div>
    </section>
  )
}
