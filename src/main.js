import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// use Vuelidate
import Vuelidate from 'vuelidate'
// vue mask to format phone number
import VueMask from 'v-mask'
// tooltip
import VTooltip from 'v-tooltip'

// sử  dụng event bus
export const eventBus = new Vue()

Vue.use(Vuelidate)
Vue.use(VueMask)
Vue.use(VTooltip)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
