import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'


import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"



createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app')

axios.defaults.baseURL= 'http://localhost:3001/api'

//axios.defaults.baseURL= 'https://api-node-escala.herokuapp.com/api'

