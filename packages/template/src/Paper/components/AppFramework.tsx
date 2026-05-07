import type { FrameworkInfo } from '@/types'

interface AppFrameworkProps {
  data: {
    framework: FrameworkInfo
  }
}

function RuntimeIcon () {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  )
}

function BotIcon () {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="3" />
      <circle cx="12" cy="5" r="3" />
      <path d="M8 15h.01M16 15h.01" />
      <path d="M9 18h6" />
    </svg>
  )
}

const pluginTypeStyles: Record<string, { color: string; bg: string; label: string }> = {
  git: { color: '#d66a7d', bg: 'rgba(245, 120, 145, 0.13)', label: 'Git' },
  npm: { color: '#4a8cc0', bg: 'rgba(92, 167, 217, 0.14)', label: 'NPM' },
  app: { color: '#3da66d', bg: 'rgba(90, 193, 123, 0.14)', label: 'APP' },
  total: { color: '#8c7569', bg: 'rgba(140, 117, 105, 0.1)', label: '插件总数' }
}

export default function AppFramework ({ data }: AppFrameworkProps) {
  const plugins = data.framework.plugins
  return (
    <section className="section">
      <div className="section-title">
        <h2>应用框架与插件</h2>
        <span className="num-font">Karin v{data.framework.version}</span>
      </div>
      <div className="app-grid">
        <div className="app-card app-card--icon">
          <div className="app-icon app-icon--runtime">
            <RuntimeIcon />
          </div>
          <div className="app-content">
            <div className="app-title num-font">运行时间</div>
            <div className="app-value num-font">{data.framework.uptime}</div>
          </div>
        </div>
        <div className="app-card app-card--icon">
          <div className="app-icon app-icon--bot">
            <BotIcon />
          </div>
          <div className="app-content">
            <div className="app-title num-font">框架名称</div>
            <div className="app-value num-font">{data.framework.name}</div>
          </div>
        </div>
      </div>
      <div className="plugin-chips">
        {Object.entries(pluginTypeStyles).map(([key, style]) => {
          const value = key === 'total' ? plugins.total : plugins[key as keyof typeof plugins]
          return (
            <div key={key} className="plugin-chip" style={{ '--chip-color': style.color, '--chip-bg': style.bg } as React.CSSProperties}>
              <strong className="num-font">{value}</strong>
              <span>{style.label}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}