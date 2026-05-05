import { format } from '@/utils'
import { getNetworkInfo as gni } from '@puniyu/system-info'

interface NetworkStats {
  /** 网络接口名称 */
  name: string
  /** 上传速度 */
  upload: string
  /** 下载速度 */
  download: string
  /** 总上传字节数 */
  totalUpload: string
  /** 总下载字节数 */
  totalDownload: string
}

type NetworkInfo = ReadonlyArray<NetworkStats>

const Vi = new Map<string, RegExp>([
  // Docker & 容器
  ['docker', /^docker\d*$/i],
  ['veth', /^veth[0-9a-f]+$/i],
  ['bridge-hash', /^br-[0-9a-f]+$/i],
  ['cni', /^cni-/i],
  ['flannel', /^flannel\./i],
  ['calico', /^calico/i],
  ['weave', /^weave/i],

  // 虚拟化
  ['virtualbox', /^vboxnet\d*$/i],
  ['vmware', /^vmnet\d*$/i],
  ['vnic', /^vnic\d*$/i],
  ['kube-bridge', /^kube-bridge$/i],
  ['kube-ipvs', /^kube-ipvs\d*$/i],
  ['cbr', /^cbr\d*$/i],
  ['virbr', /^virbr\d*$/i],

  // 虚拟网络设备
  ['tap', /^tap\d*$/i],
  ['tun', /^tun\d*$/i],
  ['wireguard', /^wg\d*$/i],
  ['bridge', /^br\d*$/i],
  ['loopback', /^lo$/i],
  ['dummy', /^dummy\d*$/i],

  // 隧道协议
  ['sit', /^sit\d*$/i],
  ['gre', /^gre\d*$/i],
  ['gretap', /^gretap\d*$/i],
  ['ip6gre', /^ip6gre\d*$/i],
  ['ip6tnl', /^ip6tnl\d*$/i],
  ['isatap', /^isatap\d*$/i],
  ['teredo', /^teredo$/i],
  ['ppp', /^ppp\d*$/i],

  // 网络绑定
  ['bond', /^bond\d*$/i],
  ['team', /^team\d*$/i],

  // 容器运行时
  ['lxc', /^lxcbr\d*$/i],
  ['lxd', /^lxdbr\d*$/i],
  ['podman', /^podman\d*$/i],
  ['vnet', /^vnet\d*$/i],

  // Apple/macOS
  ['utun', /^utun\d*$/i],
  ['awdl', /^awdl\d*$/i],
  ['llw', /^llw\d*$/i],
  ['p2p', /^p2p\d*$/i],

  // 无线网络
  ['virtual-wlan', /^wlan\d*\.\d*$/i],
  ['monitor', /^mon\.wlan/i],
  ['wwan', /^wwan\d*$/i],
  ['cdc-wdm', /^cdc-wdm\d*$/i],

  // Windows 虚拟网络
  ['hyper-v', /^Hyper-V/i],
  ['virtual-ethernet', /^Ethernet\s*Adapter\s*.*Virtual/i],
  ['wsl', /^WSL/i],
  ['bluetooth', /^Bluetooth/i],
])

/**
 * 检查是否为虚拟网络接口
 */
function isVirtualInterface (name: string): boolean {
  for (const pattern of Vi.values()) {
    if (pattern.test(name)) {
      return true
    }
  }
  return false
}

/**
 * 获取物理网络接口信息
 * 过滤掉 Docker、虚拟化、容器、隧道等虚拟接口
 */
export function getNetworkInfo (): NetworkInfo {
  const ni = gni()
  const list: NetworkStats[] = []

  for (const v of ni) {
    if (!isVirtualInterface(v.name)) {
      list.push({
        name: v.name,
        upload: format(v.upload, { from: 'KB' }) + '/s',
        download: format(v.download, { from: 'KB' }) + '/s',
        totalUpload: format(v.totalUpload, { from: 'MB' }),
        totalDownload: format(v.totalDownload, { from: 'MB' }),
      })
    }
  }

  return list
}
