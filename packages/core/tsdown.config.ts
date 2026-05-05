import { defineConfig } from 'tsdown'
export default defineConfig({
  entry: ['src/*.ts', 'src/apps/*.ts'],
  format: 'esm',
  outExtensions: (_) => {
    return {
      js: '.js',
      dts: '.d.ts',
    }
  },
  nodeProtocol: true,
  unbundle: false,
  fixedExtension: true,
  dts: false,
  clean: true,
  minify: true,
  target: 'node24',
  sourcemap: false,
  treeshake: true,
  platform: 'node',
  outDir: './lib',
  deps: {
    neverBundle: [/^node-karin/],
    alwaysBundle: ['@ys7zts/plugin-template']
  }
})
