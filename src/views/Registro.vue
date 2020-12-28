<template>
  <div class="container">
    
    <h1>Registro</h1>
  
   
    <div class="row">
    <form submit="agregarUsuario()">
            <div class="text-center">
                <div class="form-floating mb-3">
  <input type="text" class="form-control" id="floatingInput" placeholder="Ingrese su nombre" v-model="user.name">
  <label for="floatingInput">Nombre</label>
</div>
  <div class="form-floating mb-3">
  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"  v-model="user.email">
  <label for="floatingInput">Email address</label>
</div>
<div class="form-floating">
  <input type="password" class="form-control" id="floatingPassword" placeholder="Password"  v-model="user.password">
  <label for="floatingPassword">Password</label>
</div>
          
            </div>
    </form>
    
    </div>
    <br>
    <button type="submit" class="btn btn-success"  @click="agregarUser()">Registrarse</button>
     </div>


</template>

<script>
import {mapState} from 'vuex'

export default {
  data(){
    return{
      user:{},
      users:[],


    }
  },
   computed:{
    //...mapState(['token'])
  },
  methods:{
    agregarUser(){
        this.axios.post('/user/register', this.user)
        .then(res=>{
            this.users.push(res.data)
            this.user.name ='';
            this.user.email='';
            this.user.password='';
            alert("usuario agregado")
        })
        .catch(e=>{
             this.user.name ='';
            this.user.email='';
            this.user.password='';
            alert("ha ocurrido un error, vuelva a intentarlo, recuerde que el minimo de caracteres es 6")
            console.log("error"+e)
            });
        }

    } 
    }      


</script>
