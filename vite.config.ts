import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib';

  return {
    plugins: [
      react(),
      isLib && dts({
        include: ['src/core', 'src/components', 'src/index.ts'],
        insertTypesEntry: true,
      })
    ].filter(Boolean),
    build: isLib ? {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'ReactSchemaFormLite',
        fileName: (format) => `react-schema-form-lite.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'antd', '@ant-design/icons'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            antd: 'antd',
            '@ant-design/icons': 'AntIcons',
          },
        },
      },
    } : {
      outDir: 'dist',
      sourcemap: true,
    },
  };
})
