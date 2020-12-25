<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.jpg">
    <h1>Login</h1>
    <form @submit.prevent="login(usuario)">
      <!-- v-model relaciona los input con la data que tenemos en vue-->
      <input type="emai" placeholder="email" v-model="usuario.email">
      <input type="password" placeholder="password" v-model="usuario.password">
      <button type="submit">Acceder</button>
    </form>
    {{usuario}}
  </div>
</template>

<script>
//el mapaction accede a lo que esta en acciones
import {mapActions} from 'vuex'
//las acciones siempre van en los metodos, el metodo login se trae de index.js y se llama arriba en el formulario

export default {
  data(){
    return{
      usuario:{
        email:'prueba2@prueba.com',
        password:'123123'
      }
    }
  },
  methods:{
    ...mapActions(['login'])
  }

}
</script>
