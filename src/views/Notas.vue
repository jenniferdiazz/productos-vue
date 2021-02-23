<template>

<transition name="fade">
  <div class="modal-overlay" v-if="showModal" style="  background-color: rgba(255,255,255,0.9); border: 3px solid black">
    <div>
      <button type="button" class="btn btn-danger" @click="showModal = false">Cerrar</button>
    <h1>Producto agregado</h1>
    <p>Contenido</p>
             <img :src="producto.photo" alt="" srcset=""  width="200" height="200" >
             <div>{{producto.name}}</div>
             <div>{{producto.code}}</div>
             <div>{{producto.price}}</div>
             <div>cantidad : 1</div>
             <div>{{producto.description}}</div>
    </div>         
     
    <button type="button" class="btn btn-warning btn-block" @click="showModal = false">Seguir comprando</button>
    <button type="button" class="btn btn-success btn-block" @click="showModal = false">Agregar al Carro</button>
    
  </div>
</transition>
  <div class="container">
    <div class="row" >

    <h1>tienda</h1>
            <div class="col-lg-3" v-for="producto in notas" :key="producto.id">
              <div class="list">
                  <img :src="producto.photo" alt="" srcset=""  width="200" height="200" >
                  <div>{{producto.name}}</div>
                  <div>{{producto.price}}</div>
                  <div>
                    <div style="display: inline"></div>

                    <div style="display: inline"><button @click="obtenerProducto(producto)"><img src="../../dist/img/carro.png" alt="" srcset=""  width="30" height="30"></button></div>
                  </div>
              </div>
            </div>
            
   
 </div>
      
   
<!-- Modal -->

  </div>


</template>

<script>
import {mapState} from 'vuex'
import {mapActions} from 'vuex'

export default {
  data(){
    return{
      productoId: 0,
      producto:"",
      showModal : false,
      notas:[],
    }
  },
   computed:{
    //...mapState(['token'])
  },
  methods:{
     obtenerProducto(producto){
        
          
          this.producto=producto
          console.log(this.producto)
          this.showModal=true
      },
    //...mapActions(cerrarSesion),
     
    // async datosProtegidos(){
    //   try{
    //     //por defecto la solicitud es get
    //     const res = await fetch('http://localhost:3001/api/admin',{
    //       headers:{
    //          'Content-Type': 'application/json',
    //          //esto lee del servidor
    //         'auth-token': this.token
    //       }
    //     })
    //     const dataDB = await res.json()
    //     console.log(dataDB)

    //   }catch(error){
    //     console.log(error)
    //   }
    // },
    listarNotas(){
        this.axios.get('/product')
        .then((response)=>{
            this.notas= response.data;
        })
        .catch(e=>{
            console.log('error'+e)
        })
    },
  
    

            
  
  },

  created(){
    // this.datosProtegidos();
      this.listarNotas();
      
  },

};

</script>


<style>
    @import '../css/product_list.css';
</style>