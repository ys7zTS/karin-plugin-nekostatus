import { dir } from './utils/dir'
import { logger } from 'node-karin'
import { init } from '@/core'
await init()
logger.info(`${logger.violet(`[插件:${dir.version}]`)} ${logger.green(dir.name)} 初始化完成~`)
