import { format } from '@/utils'
import _ from 'node-karin/lodash'
import si from 'systeminformation'
export async function getStorageInfo () {
  const fsSize = _.uniqWith(await si.fsSize(),
    (a, b) => a.used === b.used && a.size === b.size && a.use === b.use && a.available === b.available
  ).filter(item => item.size && item.used && item.available && item.use)
  return fsSize.map((disk, index) => {
    return {
      /** 磁盘盘符 */
      mount: disk.mount,
      /** 磁盘类型 */
      type: disk.type,
      /** 总空间 */
      size: format(disk.size),
      /** 已使用 */
      used: format(disk.used),
      /** 剩余 */
      free: format(disk.available),
      /** 使用百分比 */
      use: disk.use.toFixed(2),
    }
  })
}
