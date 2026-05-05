import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
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
  dts: {
    emitDtsOnly: true,
  },
  deps: {
    onlyBundle: false
  },
  clean: false,
  minify: true,
  target: 'node24',
  sourcemap: false,
  treeshake: true,
  platform: 'node',
  outDir: './dist',
})