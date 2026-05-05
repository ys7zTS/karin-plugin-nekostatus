import lodash from 'node-karin/lodash'
import moment from 'node-karin/moment'

/**
 * 生成随机数
 * @param min - 最小值
 * @param max - 最大值
 * @returns
 */
export const random = (min: number, max: number) => lodash.random(min, max)

/**
 * 睡眠函数
 * @param ms - 毫秒
 */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 使用moment返回时间
 * @param format - 格式
 */
export const time = (format = 'YYYY-MM-DD HH:mm:ss') => moment().format(format)

/**
 * 格式化字节
 * @param value 字节
 * @param options
 * @returns
 */
export const format = (
  value: number,
  options: {
    /** 传入的字节单位 */
    from?: 'B' | 'KB' | 'MB' | 'GB' | 'TB'
    /** 强制输出单位 */
    to?: 'B' | 'KB' | 'MB' | 'GB' | 'TB'
    /** 保留的小数位数 */
    decimals?: number
    /** 是否使用短格式(B->B,KB->K,MB->M,GB->G,TB->T) */
    short?: boolean
    /** 是否自动去除小数最末尾的0 */
    trimZero?: boolean
  } = {}
) => {
  const {
    from = 'B',
    to,
    decimals = 2,
    short = false,
    trimZero = true,
  } = options

  const units = ['B', 'KB', 'MB', 'GB', 'TB'] as const
  const factor = 1024

  let bytes = value * factor ** units.indexOf(from)

  const formatNumber = (num: number) => {
    let s = num.toFixed(decimals)
    if (trimZero) {
      s = s.replace(/\.?0+$/, '')
    }
    return s
  }
  if (to) {
    const result = bytes / factor ** units.indexOf(to)
    const numberStr = formatNumber(result)
    return short
      ? numberStr + to[0]
      : numberStr + ' ' + to
  }

  let unitIndex = 0
  while (bytes >= factor && unitIndex < units.length - 1) {
    bytes /= factor
    unitIndex++
  }

  const numberStr = formatNumber(bytes)
  const unit = units[unitIndex]

  return short
    ? numberStr + unit[0]
    : numberStr + ' ' + unit
}

/**
 * 时间转换
 * @param time 时间戳
 * @returns
 */
export const formatUptime = (time: number) => {
  const days = Math.floor(time / (3600 * 24))
  const hours = Math.floor((time % (3600 * 24)) / 3600)
  const minutes = Math.floor((time % 3600) / 60)

  const parts = []
  if (days > 0) parts.push(`${days}天`)
  if (hours > 0) parts.push(`${hours}小时`)
  if (minutes > 0) parts.push(`${minutes}分钟`)
  if (parts.length === 0) parts.push('不足1分钟')

  return parts.join('')
}
