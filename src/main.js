import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'vue-select/dist/vue-select.css';

// use Vue select
import vSelect from 'vue-select'
// use Vuelidate
import Vuelidate from 'vuelidate'
// vue mask to format phone number
import VueMask from 'v-mask'
// 
import money from 'v-money'
// tooltip
import VTooltip from 'v-tooltip'

// sử  dụng event bus
export const eventBus = new Vue()

Vue.component('v-select', vSelect)
Vue.use(Vuelidate)
Vue.use(VueMask)
// register directive v-money and component <money>
Vue.use(money, {precision: 4})
Vue.use(VTooltip)
Vue.use(require('vue-shortkey'))

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
