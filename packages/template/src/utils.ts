const units = ['B', 'KB', 'MB', 'GB', 'TB'] as const

/**
 * 格式化字节数
 * @param bytes 字节数
 * @param options 可选配置
 * @returns 格式化后的字符串，例如 "1.5 MB"
 */
export const formatBytes = (
  bytes: number,
  options: {
    /** 输入的单位，默认 'B' */
    from?: typeof units[number]
    /** 保留的小数位数，默认 1 */
    decimals?: number
    /** 是否使用短格式（B→B, KB→K, MB→M, GB→G, TB→T），默认 false */
    short?: boolean
    /** 是否自动去除小数最末尾的0，默认 true */
    trimZero?: boolean
  } = {}
) => {
  const { from = 'B', decimals = 1, short = false, trimZero = true } = options

  if (bytes === 0) return '0 B'

  const factor = 1024

  let unitIndex = 0
  let value = bytes * factor ** units.indexOf(from)
  while (value >= factor && unitIndex < units.length - 1) {
    value /= factor
    unitIndex++
  }

  // 格式化数字
  let s = value.toFixed(decimals)
  if (trimZero) {
    s = s.replace(/\.?0+$/, '')
  }

  const unit = units[unitIndex]
  const displayUnit = short ? unit[0] : unit
  return `${s} ${displayUnit}`.trim()
}

export function formatNum (num: number, decimals = 1) {
  if (num === null || num === undefined) return ''
  if (num < 1000) return num.toString()

  const units = ['k', 'M', 'B', 'T'] // 千、百万、十亿、万亿
  let unitIndex = -1
  let scaledNum = num

  while (scaledNum >= 1000 && unitIndex < units.length - 1) {
    scaledNum /= 1000
    unitIndex++
  }

  return `${parseFloat(scaledNum.toFixed(decimals))}${units[unitIndex]}`
}