import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { karinPathBase } from 'node-karin'

let filePath = path.resolve(fileURLToPath(import.meta.url).replace(/\\/g, '/'), '../../..')
if (!fs.existsSync(path.join(filePath, 'package.json'))) {
  filePath = path.resolve(fileURLToPath(import.meta.url).replace(/\\/g, '/'), '../..')
}
const pkg = JSON.parse(fs.readFileSync(path.join(filePath, 'package.json'), 'utf-8'))

export const dir = {
  /** 插件名 */
  name: pkg.name,
  /** 插件版本 */
  version: pkg.version,
  /** 插件绝对路径 */
  pluginPath: filePath,
  /** 配置文件路径 */
  get ConfigDir () {
    return path.join(karinPathBase, this.name, 'config')
  },
}
