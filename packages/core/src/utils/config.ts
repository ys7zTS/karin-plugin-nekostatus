import { dir } from '@/utils/dir'
import chokidar from 'chokidar'
import {
  logger,
  requireFileSync,
  mkdirSync,
  existsSync,
} from 'node-karin'
import fs from 'node:fs'
import path from 'node:path'

export interface ConfigType {
  /** 是否默认状态 */
  defStatus: boolean
  /** 自定义前缀 */
  prefix: string[]
  /** 进程排序方式：mem 或 cpu */
  processSort: 'mem' | 'cpu'
  styles: 'pink'
}
class Config {
  defConfig: ConfigType = {
    defStatus: false,
    prefix: ['猫猫', 'neko'],
    processSort: 'mem',
    styles: 'pink'
  }

  CfgPath = path.join(dir.ConfigDir, 'config.json')
  cache: null | ConfigType = null
  constructor () {
    this.init()
  }

  init (): void {
    if (!existsSync(this.CfgPath)) {
      mkdirSync(path.dirname(this.CfgPath))
      fs.writeFileSync(this.CfgPath, JSON.stringify(this.defConfig, null, 2), 'utf8')
    }
    this.watchConfig()
  }

  /**
   * 监听配置文件变化，带防抖，变化时清空缓存
   */
  watchConfig (): void {
    try {
      const watcher = chokidar.watch(this.CfgPath, {
        persistent: true,
        ignoreInitial: true,
        awaitWriteFinish: {
          stabilityThreshold: 300
        }
      })
      watcher.on('change', async () => {
        this.cache = null
        logger.info('[猫猫状态] 检测到配置文件变化，已刷新缓存')
        const { updateRegex } = await import('@/apps/status')
        updateRegex()
      })
    } catch (err) {
      logger.error('[猫猫状态] 启动配置文件监听失败', err)
    }
  }

  get config (): ConfigType {
    try {
      if (!this.cache) {
        const cfg = requireFileSync(this.CfgPath, { force: true }) as ConfigType
        if (typeof cfg.prefix === 'string') { cfg.prefix = cfg.prefix ? [cfg.prefix] : this.defConfig.prefix }
        if (cfg.prefix.length === 0) delete (cfg as any).prefix
        this.cache = {
          ...this.defConfig,
          ...cfg
        }
      }
      return this.cache
    } catch (err) {
      logger.error('[猫猫状态] 读取配置文件失败，已加载默认配置', err)
      return this.defConfig
    }
  }

  save (config: ConfigType): boolean {
    try {
      fs.writeFileSync(this.CfgPath, JSON.stringify(config, null, 2), 'utf8')
      this.cache = null
      return true
    } catch (err) {
      logger.error('[猫猫状态] 保存配置文件失败', err)
      return false
    }
  }
}
export const Cfg = new Config()
