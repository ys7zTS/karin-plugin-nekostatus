import type { FrameworkInfo } from '@/types'
import KarinLogo from '@/assets/image/karin.png'

interface HeroProps {
  framework: FrameworkInfo
}

export default function Hero ({ framework }: HeroProps) {
  return (
    <section className="hero">
      <div className="paw one"></div>
      <div className="paw two"></div>
      <div className="hero-left">
        <h1 className="num-font">NekoStatus</h1>
        <div className="title-badges">
          <div className="eyebrow">猫猫状态</div>
          <div className="online-pill num-font">
            <span className="online-dot"></span>
            系统在线
          </div>
        </div>
        <div className="hero-subtitle num-font">Karin v{framework.version} · 运行 {framework.uptime}</div>
      </div>
      <div className="hero-right">
        <img className="hero-portrait" src={KarinLogo} alt="Karin" />
      </div>
    </section>
  )
}