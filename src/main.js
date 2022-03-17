import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import toast from './plugins/toastification'
import '@fortawesome/fontawesome-free/css/all.css' 
import './css/reset-css.css'
import './css/style.css'
import { store } from './store/index'


Vue.config.productionTip = false


new Vue({
  store,
  router,
  vuetify,
  toast,
  render: h => h(App)
})
.$mount('#app')
