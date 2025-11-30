import { dir } from './utils/dir'
import { logger } from 'node-karin'
import '@/core'
logger.info(`${logger.violet(`[插件:${dir.version}]`)} ${logger.green(dir.name)} 初始化完成~`)
