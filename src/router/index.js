import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue'),
    
    
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta:{rutaProtegida:true}
  },
  {
    path: '/notas',
    name: 'Notas',
    component: () => import(/* webpackChunkName: "about" */ '../views/Notas.vue'),
    meta:{rutaProtegida:true}
    
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  //mi meta:true se pasa a rutaEsProtegida, home es f ,  y about es true
  const rutaEsProtegida= to.matched.some(item => item.meta.rutaProtegida)
  if(rutaEsProtegida && store.state.token===null){
    //si existe el token, el usuario puede acceder a la ruta protegida
    next('/')
  }
  else{
    next()
  }
})

export default router
