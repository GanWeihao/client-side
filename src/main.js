// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import qs from 'qs';
import store from './store';
import VideoPlayer from 'vue-video-player'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'


Vue.use(Croppa)
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

axios.defaults.baseURL='http://114.116.238.138:9090'
Vue.use(Vuex)
Vue.use(ElementUI, {size: 'small', zIndex: 3000});
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.config.productionTip = false
Vue.filter("to-short",function(value){
  return value.slice(0,10)+"...";
})

Vue.directive("rainbow",{
  bind(el,binding,vnode){
    el.style.color="#"+Math.random().toString(16).slice(2,8);
  }
})
Vue.prototype.$bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
