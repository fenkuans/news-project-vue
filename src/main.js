// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

axios.defaults.baseURL="http://localhost:8081";
Vue.prototype.$http=axios
Vue.prototype.$host = "http://192.168.56.103";
// Vue.prototype.$host = "http://localhost:8082";
Vue.use(elementui);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
