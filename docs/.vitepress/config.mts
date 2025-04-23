import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '联行号查询',
  description: '免费的联行号 | 大额支付号查询，可离线导出，不需要关注公众号、不需要二维码加好友、不需要每次查询输入验证码！',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '联行号查询', link: '/cnaps-query/' },
      // { text: '地区代码查询', link: '/area-code-query/' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/gweesin/CNAPS' },
    ],
  },
  vite: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
})
