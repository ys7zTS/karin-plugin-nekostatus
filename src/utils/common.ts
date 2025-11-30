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
 * 根据字节数自动转换单位
 * @param bytes - 字节数
 * @param options
 * @returns
 */
export const format = (bytes: number, options: { minMB?: number, minGB?: number, decimals?: number } = {}) => {
  const { minMB = 1024, minGB = 1024, decimals = 2 } = options

  if (bytes === 0) return '0 B'

  const MB = bytes / 1024 / 1024
  const GB = bytes / 1024 / 1024 / 1024
  const TB = bytes / 1024 / 1024 / 1024 / 1024

  if (TB >= 1 && GB >= minGB) {
    return `${TB.toFixed(decimals)} TB`
  } else if (GB >= 1 && MB >= minMB) {
    return `${GB.toFixed(decimals)} GB`
  } else if (MB >= 1) {
    return `${MB.toFixed(decimals)} MB`
  } else {
    const KB = bytes / 1024
    return KB >= 1 ? `${KB.toFixed(decimals)} KB` : `${bytes} B`
  }
}
