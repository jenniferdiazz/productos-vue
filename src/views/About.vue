<template>
  <div class="about">
    <h1>Ruta protegida</h1>
    {{token}}
  </div>
</template>
<script>
 //El map state siempre va en una propiedad computada
import {mapState} from 'vuex'
export default{
  computed:{
    ...mapState(['token'])
  },
  methods:{
    async datosProtegidos(){
      try{
        //por defecto la solicitud es get
        const res = await fetch('http://localhost:3001/api/admin',{
          headers:{
             'Content-Type': 'application/json',
             //esto lee del servidor
            'auth-token': this.token
          }
        })
        const dataDB = await res.json()
        console.log(dataDB)

      }catch(error){
        console.log(error)
      }
    }
  },
  //created inicializa una funcion
  created(){
    this.datosProtegidos();
  }


}
</script>
