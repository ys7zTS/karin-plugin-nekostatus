import type { ProcInfo } from '@/types'
import { formatBytes } from '@/utils'

export default function ProcessSection (proc: ProcInfo) {
  return (
    <section className="section">
      <div className="section-title">
        <h2>进程信息</h2>
        <span className="num-font">Top processes</span>
      </div>
      <div className="process-tags">
        <span className="process-tag all">总进程 {proc.all}</span>
        <span className="process-tag run">运行 {proc.running}</span>
        <span className="process-tag sleep">休眠 {proc.sleeping}</span>
        <span className="process-tag block">阻塞 {proc.blocked}</span>
      </div>
      <div className="process-list num-font">
        <div className="process-row header">
          <span className="process-name">名称</span>
          <span>PID</span>
          <span>CPU
            {proc.sort === 'cpu' && <span> ↓</span>}
          </span>
          <span>内存占用
            {proc.sort === 'mem' && <span> ↓</span>}
          </span>
        </div>
        {proc.procs.map((p, i) => (
          <div key={i} className="process-row">
            <span className="process-name">{p.name}</span>
            <span>{p.pid}</span>
            <span>{p.cpu.toFixed(1)}%</span>
            <span>{formatBytes(p.mem, { from: 'KB' })}</span>
          </div>
        ))}
      </div>
    </section>
  )
}