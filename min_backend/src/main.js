import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store'

import ElementUI from 'element-ui'
import './assets/css/theme/index.css'
import './assets/css/font-awesome/css/font-awesome.css'
import { getSesstion } from './utils/util'

Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const name = to.name
  const { token } = getSesstion()

  if (!token) {
    if (name !== 'LOGIN') {
      router.push({ name: 'LOGIN' })
    }
  } else {
    if (name === 'LOGIN') {
      router.push({ name: 'HOME' })
    }
  }

  next()
})

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
