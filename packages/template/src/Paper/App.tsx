import type { StatusData } from '../types'
import Hero from './components/Hero'
import BotStack from './components/BotStack'
import ResourceSection from './components/ResourceSection'
import AppFramework from './components/AppFramework'
import HostInfo from './components/HostInfo'
import NetworkSection from './components/NetworkSection'
import ProcessSection from './components/ProcessSection'
import Footer from './components/Footer'
import DiskInfo from './components/DiskInfo'


export default function App (data: StatusData) {
  return (
    <main className="poster">
      <Hero framework={data.framework} />
      <div className="poster-body">
        <BotStack bots={data.bots} />
        <ResourceSection cpu={data.cpu} mem={data.mem} />
        {data.disks.length > 0 && <DiskInfo disks={data.disks} />}
        <AppFramework data={data} />
        {data.hostInfo && <HostInfo {...data.hostInfo} />}
        {data.networks.length > 0 && <NetworkSection networks={data.networks} />}
        {data.proc.procs.length > 0 && <ProcessSection {...data.proc} />}
        <Footer text={data.footer} />
      </div>
    </main>
  )
}