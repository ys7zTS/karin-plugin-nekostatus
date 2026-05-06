export interface BotInfo {
  /** BotId */
  id: string
  /**名称 */
  nickname: string
  /** 头像URL */
  avatar: string
  /** 平台 */
  platform: string
  /** 适配器名称 */
  adapter: string
  /** 适配器版本 */
  adapterVersion: string
  /** 发送 */
  sent: number
  /** 接收 */
  received: number
  /** 好友 */
  friends: number
  /** 群组 */
  groups: number
}

/** 框架信息 */
export interface FrameworkInfo {
  /** 框架名称 */
  name: string
  /** 框架版本 */
  version: string
  /** 框架运行时间 */
  uptime: string
  /** 插件数量 */
  plugins: {
    /** 总 */
    total: number
    /** NPM插件 */
    npm: number
    /** Git插件 */
    git: number
    /** 应用插件 */
    app: number
  },
}

/** CPU信息 */
export interface CPUInfo {
  /** 型号 */
  model: string
  /** 核心数 */
  cores: number
  /** 频率 */
  frequency: string
  /** 使用率 */
  usage: number
  /** 线程数 */
  threads: number
}

interface MemInfo {
  /** 已用 */
  used: number
  /** 总计 */
  total: number
  /** 空闲 */
  free: number
  /** 使用率 */
  usage: number
}
/** 内存信息 */
export interface MemoryInfo {
  /** 内存 */
  ram: MemInfo
  /** 内存交换 */
  swap: MemInfo
}

/** 网络信息 */
export interface NetfaceInfo {
  /** 接口名称 */
  name: string
  /** 上行速度 */
  upSpeed: number
  /** 下行速度 */
  downSpeed: number
  /** 累计上传 */
  totalUp: number
  /** 累计下载 */
  totalDown: number
}

/** 进程信息 */
export interface ProcessesInfo {
  /** 进程名称 */
  name: string
  /** 进程PID */
  pid: number
  /** CPU使用率 */
  cpu: number
  /** 内存使用量 */
  mem: number
}

export interface ProcInfo {
  /** 进程列表 */
  procs: ProcessesInfo[],
  /** 排序方式 */
  sort: 'cpu' | 'mem'
  /** 进程数量 */
  all: number
  /** 运行中 */
  running: number
  /** 被阻塞 */
  blocked: number
  /** 睡眠 */
  sleeping: number
  /** 未知 */
  unknown: number
}

export interface HostInfo {
  /** 主机名 */
  hostname: string
  /** 操作系统 */
  system: string
  /** 架构 */
  arch: string
  /** 内核版本 */
  kernel: string
  /** 系统运行时间 */
  uptime: string
  /** 时区 */
  timezone: string
}

export interface StatusData {
  /** 框架信息 */
  framework: FrameworkInfo
  /** 机器人列表 */
  bots: BotInfo[]
  /** CPU信息 */
  cpu: CPUInfo
  /** 内存信息 */
  mem: MemoryInfo
  /** 网络信息 */
  networks: NetfaceInfo[]
  /** 进程信息 */
  proc: ProcInfo
  /** 主机信息 */
  hostInfo: HostInfo
  /** 页脚 */
  footer: string
}