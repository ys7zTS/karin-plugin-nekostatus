import type { StatusData } from './types'
import Hero from './components/Hero'
import BotStack from './components/BotStack'
import ResourceSection from './components/ResourceSection'
import AppFramework from './components/AppFramework'
import HostInfo from './components/HostInfo'
import NetworkSection from './components/NetworkSection'
import ProcessSection from './components/ProcessSection'
import Footer from './components/Footer'
import DiskInfo from './components/DiskInfo'

interface AppProps {
  data: StatusData
}

export default function App ({ data }: AppProps) {
  return (
    <main className="poster">
      <Hero data={data} />
      <div className="poster-body">
        <BotStack bots={data.bots} />
        <ResourceSection resources={data.resources} />
        {+data.diskInfo?.length > 0 && <DiskInfo diskInfo={data.diskInfo!} />}
        <AppFramework data={data} />
        {data.hostInfo && <HostInfo {...data.hostInfo} />}
        {+data.networks?.length > 0 && <NetworkSection networks={data.networks} />}
        {+data.processes?.process?.length > 0 && <ProcessSection processTags={data.processTags} processes={data.processes} />}
        <Footer text={data.footerText} />
      </div>
    </main>
  )
}
