import path from 'node:path'
import fs from 'node:fs/promises'
import { segment, karin } from 'node-karin'
import { dir } from '@/utils/dir'
import { StatusData, render as renderHtml } from '@ys7zts/neko-template'

/**
 * 渲染
 * @param data 渲染数据
 */
export const render = async (data: StatusData) => {
  const filePath = path.join(dir.TempDir, `status-${Date.now()}.html`)
  try {
    const html = renderHtml(data)
    await fs.writeFile(filePath, html, 'utf8')
    const img = await karin.render({
      name: 'status',
      type: 'png',
      file: filePath,
      pageGotoParams: {
        waitUntil: 'networkidle0',
      },
      setViewport: {
        width: 1920,
        height: 1080,
        deviceScaleFactor: 4
      }
    })
    return segment.image(`${img.includes('base64://') ? img : `base64://${img}`}`)
  } finally {
    await fs.unlink(filePath).catch(() => { })
  }
}