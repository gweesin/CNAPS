import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import CNAPSQuery from './components/CNAPSQuery.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'

import './style.css'
import './element.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  // eslint-disable-next-line unused-imports/no-unused-vars
  enhanceApp({ app, router, siteData }) {
    app.component('CNAPSQuery', CNAPSQuery)
  },
} satisfies Theme
