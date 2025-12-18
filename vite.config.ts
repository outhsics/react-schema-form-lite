import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/core', 'src/components', 'src/index.ts'],
      insertTypesEntry: true,
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ReactSchemaFormLite',
      fileName: (format) => `react-schema-form-lite.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不希望打包进库的依赖
      external: ['react', 'react-dom', 'antd', '@ant-design/icons'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          antd: 'antd',
          '@ant-design/icons': 'AntIcons',
        },
      },
    },
  },
})
