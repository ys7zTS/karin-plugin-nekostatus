export interface BotData {
  name: string
  role: string
  avatar: string
  platform: string
  adapter: string
  adapterVersion: string
  contacts: string
  groups: string
  sent: string
  received: string
}

export interface ResourceData {
  type: 'cpu' | 'ram' | 'swap'
  name: string
  desc: string
  value: number
  display: string
  unit: string
}

export interface PluginData {
  total: number
  git: number
  npm: number
  app: number
}

export interface HostInfoData {
  /** 主机名 */
  hostname: string
  /** 操作系统 */
  system: string
  /** 架构 */
  arch: string
  /** 内核版本 */
  kernel: string
}

/** 磁盘信息 */
export interface DiskInfoData {
  /** 磁盘盘符 */
  mount: string,
  /** 磁盘类型 */
  type: string,
  /** 总空间 */
  size: string,
  /** 已使用 */
  used: string,
  /** 剩余 */
  free: string,
  /** 使用百分比 */
  use: string,
}

export interface NetworkMetricData {
  speed: string
  total: string
}

export interface NetworkData {
  name: string
  upload: NetworkMetricData
  download: NetworkMetricData
}

export interface ProcessesData {
  name: string
  pid: string
  cpu: string
  memory: string
}

export interface ProcessData {
  process: ProcessesData[]
  sort: 'cpu' | 'mem'
}

export interface ProcessTagsData {
  total: number
  running: number
  sleeping: number
  blocked: number
}

export interface StatusData {
  karinVersion: string
  uptime: string
  bots: BotData[]
  resources: ResourceData[]
  runtimeVersion: string
  mountedBots: number
  plugins: PluginData
  hostInfo: HostInfoData
  diskInfo: DiskInfoData[]
  networks: NetworkData[]
  processTags: ProcessTagsData
  processes: ProcessData
  footerText: string
}
