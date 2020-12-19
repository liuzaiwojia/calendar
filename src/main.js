import Vue from 'vue'
import App from './App.vue'
import './assets/css/common.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false


// 测试提交
new Vue({
  render: h => h(App),
}).$mount('#app')
