import { components, defineConfig } from 'node-karin'
import { Cfg, ConfigType, dir } from './utils'

// 深度比较两个配置是否相等（忽略对象键顺序）
function isConfigEqual (a: ConfigType, b: ConfigType): boolean {
  const isObject = (v: any) => v !== null && typeof v === 'object' && !Array.isArray(v)

  const deepEqual = (x: any, y: any): boolean => {
    if (x === y) return true
    if (Array.isArray(x) && Array.isArray(y)) {
      if (x.length !== y.length) return false
      for (let i = 0; i < x.length; i++) {
        if (!deepEqual(x[i], y[i])) return false
      }
      return true
    }
    if (isObject(x) && isObject(y)) {
      const xKeys = Object.keys(x)
      const yKeys = Object.keys(y)
      if (xKeys.length !== yKeys.length) return false
      for (const key of xKeys) {
        if (!Object.prototype.hasOwnProperty.call(y, key)) return false
        if (!deepEqual(x[key], y[key])) return false
      }
      return true
    }
    return false
  }

  return deepEqual(a, b)
}

export default defineConfig({
  info: {
    id: dir.name,
    name: '猫猫状态',
    author: {
      name: dir.pkg.author,
      home: dir.pkg.homepage,
      avatar: 'https://github.com/yusheng929.png'
    },
    icon: {
      name: 'Computer',
      size: 24,
      color: '#B2A8D3'
    },
    version: dir.version,
    description: dir.pkg.description,
  },
  components: () => [
    components.switch.create('defStatus', {
      size: 'sm',
      color: 'warning',
      defaultSelected: Cfg.config.defStatus,
      label: '默认状态',
      description: '启用后该插件的状态则会替换所有指令为#状态的插件'
    }),
    components.input.group('prefix', {
      label: '自定义前缀',
      data: Cfg.config.prefix,
      template: components.input.string('prefixItem', {
        color: 'warning',
        label: '前缀',
        size: 'sm',
        placeholder: '请输入自定义前缀',
        isRequired: true,
      })
    }),
    components.radio.group('processSort', {
      label: '进程排序方式',
      size: 'md',
      color: 'warning',
      defaultValue: Cfg.config.processSort,
      radio: [
        components.radio.create('procSort_mem', {
          label: '内存使用率',
          value: 'mem',
          description: '进程信息按内存使用率排序'
        }),
        components.radio.create('procSort_cpu', {
          label: 'CPU使用率',
          value: 'cpu',
          description: '进程信息按CPU使用率排序'
        })
      ]
    })
  ],
  save: (config: ConfigType) => {
    // 如果新配置与当前配置内容一致，则不写盘
    if (isConfigEqual(config, Cfg.config)) {
      return {
        success: false,
        message: '配置文件无变化',
      }
    }

    const success = Cfg.save(config)
    return {
      success,
      message: success ? '配置保存成功' : '配置保存失败',
    }
  }
})
