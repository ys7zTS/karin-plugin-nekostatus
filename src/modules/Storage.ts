import { format } from '@/utils'
import _ from 'lodash'
import si from 'systeminformation'
export async function getStorageInfo () {
  const fsSize = _.uniqWith(await si.fsSize(),
    (a, b) => a.used === b.used && a.size === b.size && a.use === b.use && a.available === b.available
  ).filter(item => item.size && item.used && item.available && item.use)
  return fsSize.map((disk, index) => {
    return {
      Id: index + 1,
      mount: disk.mount,
      type: disk.type,
      size: format(disk.size),
      used: format(disk.used),
      free: format(disk.available),
      use: disk.use.toFixed(2),
    }
  })
}
