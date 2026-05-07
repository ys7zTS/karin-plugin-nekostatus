# NekoStatus

![GitHub](https://img.shields.io/badge/GitHub-猫猫状态插件-black?style=flat-square&logo=github)
![Karin](https://img.shields.io/badge/Karin-black?style=flat-square&logo=dependabot)
![Version](https://img.shields.io/badge/Version-1.4.6-blue?style=flat-square)
![MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)

一个为 [Karin](https://github.com/KarinJS/Karin) 机器人框架设计的系统状态监控插件，提供精美的卡片式 UI 展示服务器与机器人的运行状态。

## 特性

- **系统监控** - 实时展示 CPU、内存、磁盘、网络、进程等服务器状态
- **机器人状态** - 显示适配器信息、插件数量、消息统计、好友/群组数量
- **精美 UI** - 基于 React 渲染的卡片式状态图，简洁美观
- **命令灵活** - 支持自定义命令前缀，适应不同使用习惯
- **性能优先** - 精简的信息使用默认命令，详细扩展信息通过 `全部` 参数按需获取

## 快速开始

### 安装

```bash
pnpm add @ys7zts/karin-plugin-nekostatus -w
```

### 命令

| 命令 | 说明 |
| --- | --- |
| `#猫猫状态` | 显示精简状态信息 |
| `#猫猫状态全部` | 显示完整状态信息（含进程、磁盘、网络详情） |
| `#(自定义前缀)状态` | 使用自定义前缀触发 |

### 配置

插件配置文件位于 `@karinjs/@ys7zts/karin-plugin-nekostatus/config/config.json`

```json
{
  "defStatus": false,
  "prefix": ["猫猫", "neko"],
  "processSort": "mem"
}
```

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `defStatus` | `boolean` | `false` | 是否启用默认状态命令 |
| `prefix` | `string[]` | `["猫猫", "neko"]` | 自定义命令前缀 |
| `processSort` | `'mem' \| 'cpu'` | `'mem'` | 进程列表排序方式 |

## 项目结构

```
packages/
├── core/                    # Karin 插件主体
│   └── src/
│       ├── index.ts         # 插件入口
│       ├── apps/            # 命令处理器
│       ├── core/            # 核心模块
│       ├── modules/         # 系统信息采集模块
│       └── utils/           # 工具函数
└── template/                # React UI 模板
    └── src/
        ├── components/      # UI 组件
        └── styles/          # 样式文件
```

## 开发

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 开发插件
pnpm dev

# 开发 UI 模板
pnpm dev:ui
```

## 相关项目

- [Karin](https://github.com/KarinJS/Karin) - 机器人框架
- [karin-plugin-basic](https://github.com/KarinJS/karin-plugin-basic) - 基础插件

## 支持

- [GitHub Issues](https://github.com/ys7zTS/karin-plugin-nekostatus/issues)
- QQ 群: 454991766

## 许可证

[MIT](LICENSE)
