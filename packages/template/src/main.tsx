import styles from '@/styles/style.css?raw'
import { StatusData } from './types'
import { renderToString } from 'react-dom/server'
import App from './App'

export const render = (data: StatusData) => {
  const res = renderToString(<App {...data} />)
  const html = `<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NekoStatus</title>
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Noto+Sans+SC:wght@400;500;700;900&display=swap"
    rel="stylesheet">
  <style>${styles}</style>
</head>

<body>
  <div id="root">${res}</div>
</body>

</html>`
  return html
}