import path from 'node:path'
import { segment, karin, config } from 'node-karin'
import { dir } from '@/utils/dir'

const copyright = `${dir.name} v${dir.version} - Copyright © 2025 瑜笙 | Powered by Karin v${config.pkg().version}`
/**
 * 渲染
 * @param name 文件名称 不包含`.html`
 * @param params 渲染参数
 */
export const render = async (
  name: string,
  params: Record<string, any>
) => {
  name = name.replace(/.html$/, '')
  const root = path.join(dir.pluginPath, 'resources')
  const img = await karin.render({
    name: path.basename(name),
    type: 'jpeg',
    file: path.join(root, `${name}.html`),
    data: {
      pluResPath: `${root}/`,
      sys: {
        copyright,
      },
      ...params,
    },
    screensEval: '#container',
    pageGotoParams: {
      waitUntil: 'networkidle2',
    },
  })
  return segment.image(`${img.includes('base64://') ? img : `base64://${img}`}`)
}
