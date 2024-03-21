import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { fileURLToPath, URL } from 'node:url'
import { visualizer } from 'rollup-plugin-visualizer'
import { viteSingleFile } from 'vite-plugin-singlefile'
//Gzip文件压缩
import viteCompression from 'vite-plugin-compression'
// 图片压缩
import viteImagemin from 'vite-plugin-imagemin'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    //开启Gzip压缩
    viteCompression({
      verbose: true, // 是否在控制台中输出压缩结果
      disable: false,
      threshold: 1024, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
      algorithm: 'gzip', // 压缩算法，可选['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
      ext: '.gz',
      deleteOriginFile: false // 源文件压缩后是否删除
    }),

    // 图片资源压缩
    viteImagemin({
      gifsicle: {
        // gif图片压缩
        optimizationLevel: 3, // 选择1到3之间的优化级别
        interlaced: false // 隔行扫描gif进行渐进式渲染
      },
      optipng: { // png
        optimizationLevel: 7 // 选择0到7之间的优化级别
      },
      mozjpeg: {// jpeg
        quality: 20 // 压缩质量，范围从0(最差)到100(最佳)。
      },
      pngquant: {// png
        quality: [0.8, 0.9], // Min和max是介于0(最差)到1(最佳)之间的数字，类似于JPEG。达到或超过最高质量所需的最少量的颜色。如果转换导致质量低于最低质量，图像将不会被保存。
        speed: 4 // 压缩速度，1(强力)到11(最快)
      },
      svgo: {
        plugins: [
          // svg压缩
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    }),

    // 打包体积分析
    visualizer({
      open: true,
      filename: 'visualizer.html' //分析图生成的文件名
    }),
    viteSingleFile(),
    vue(),
    AutoImport({
      imports:['vue'],
      dts:'src/auto-import.d.ts'
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    chunkSizeWarningLimit: 1500,
    minify: false,
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
      },
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return id.toString().split('node_modules/')[1].split('/')[0].toString();
        }
      }
    }
  }
})
