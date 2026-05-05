import type { ProcessData, ProcessTagsData } from '../types'

interface ProcessSectionProps {
  processTags: ProcessTagsData
  processes: ProcessData[]
}

export default function ProcessSection ({ processTags, processes }: ProcessSectionProps) {
  return (
    <section className="section">
      <div className="section-title">
        <h2>进程信息</h2>
        <span className="num-font">Top processes</span>
      </div>
      <div className="process-tags">
        <span className="process-tag all">总进程 {processTags.total}</span>
        <span className="process-tag run">运行 {processTags.running}</span>
        <span className="process-tag sleep">休眠 {processTags.sleeping}</span>
        <span className="process-tag block">阻塞 {processTags.blocked}</span>
      </div>
      <div className="process-list num-font">
        <div className="process-row header">
          <span className="process-name">名称</span>
          <span>PID</span>
          <span>CPU</span>
          <span>内存占用</span>
        </div>
        {processes.map((proc, i) => (
          <div key={i} className="process-row">
            <span className="process-name">{proc.name}</span>
            <span>{proc.pid}</span>
            <span>{proc.cpu}</span>
            <span>{proc.memory}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
