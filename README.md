![status](https://socialify.git.ci/ys7zTS/karin-plugin-nekostatus/image?font=Inter&forks=1&issues=1&language=1&name=1&owner=1&pattern=Plus&pulls=1&stargazers=1&theme=Auto)

<div align="center">

# Karin-plugin-NekoStatus

[![GitHub](https://img.shields.io/badge/GitHub-猫猫状态插件-black?style=flat-square&logo=github)](https://github.com/ys7zTS/karin-plugin-nekostatus) [![Karin](https://img.shields.io/badge/Karin-black?style=flat-square&logo=dependabot)](https://github.com/KarinJS/Karin)

![动态访问量](https://count.kjchmc.cn/get/ys7zTS/karin-plugin-nekostatus?theme=rule34)

</div>

## 简介 📝

本插件 是一个为 Karin 机器人框架设计的系统状态监控插件，提供了精美的UI界面来展示服务器和机器人的各项运行状态。插件采用了可爱的风格设计，让系统监控也能变得有趣起来！

## 功能特性 ✨

### 系统监控
- **CPU 占用率** - 实时监控处理器使用情况
- **内存占用** - 显示系统内存使用状况
- **磁盘空间** - 监控磁盘容量使用情况
- **网络速率** - 显示网络上下行速率
- **运行时间** - 系统运行时长统计

### 机器人状态
- **插件数量** - 统计已加载的插件总数
- **适配器信息** - 显示当前连接的适配器
- **消息统计** - 收发消息数量统计
- **好友&群数量** - 统计好友和群组总数

## 安装 🔧

### NPM 安装（推荐）
# 在Karin根目录执行
```bash
pnpm add @ys7zts/karin-plugin-nekostatus -w
```

配置 ⚙️

基础配置

插件支持通过配置文件进行部分自定义设置：
配置文件路径
```text
@karinjs/@ys7zts/karin-plugin-nekostatus/config/config.json
```

配置文件格式

```json
{
// 是否是默认状态
  "defStatus": false,
// 自定义正则前缀
  "prefix": [
    "猫猫",
    "neko"
  ]
}
```
使用 📖

基本命令

- `#状态` - 开启默认状态时有效
- `#猫猫状态` - 默认命令
- `#(自定义前缀)状态`

效果图 🎨

（实际效果以插件运行为准）

支持与贡献 🤝

支持项目
如果这个项目对你有帮助，欢迎：
- ⭐ 给项目点个 Star
- 💖 提交 Issues 和 Pull Requests
- 💰 进行赞助支持

联系方式
- Issues: [GitHub Issues](https://github.com/ys7zTS/karin-plugin-nekostatus/issues)
- QQ群: 454991766（使用中遇到问题可加群咨询）

相关项目 🔗

- [karin-plugin-basic](https://github.com/KarinJS/karin-plugin-basic) - Karin基础插件
- [Karin](https://github.com/KarinJS/Karin) - Karin本体

许可证 📄

本项目使用 [MIT](LICENSE) 作为开源许可证。

---