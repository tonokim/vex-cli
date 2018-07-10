
import Vue from 'vue'
import router from './router'
import App from './pages/App'
import store from './store'

// Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
