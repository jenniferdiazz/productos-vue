<template>
 <div class="container" >
    <div style="display: inline"><button @click="obtenerCarro()"><img src="../../dist/img/bolso.png" alt="" srcset=""  width="40" height="30"></button></div>
 
  <!-- {{productos}} -->
  <transition name="fadeCarro" appear>
  <div class="modal-overlay" v-if="showModalCarro">
    <div class="popup">
      <div>
      <div  style=" display: inline-block; margin:10px" ><b>Resumen de compra</b></div>
      
       <br>
      </div>
    
 
     
            <div class="text-center" v-for="producto in productos" :key="producto.id">
              
             <p>{{producto.name}}</p>
             <p>Precio : ${{producto.price}}</p>
             <p>cantidad : 1</p>
            </div>

        <button type="button" class="btn btn-warning btn-block" @click="showModalCarro = false" style="margin:10px">Seguir comprando</button>

    </div>        
  </div>
</transition>
<!-- finProductos-->
<transition name="fade" appear>
  <div class="modal-overlay" v-if="showModal"  >
    <div class="popup">
      <div>
      <div  style=" display: inline-block; margin:10px" ><b>Producto agregado</b></div>
      <div  style=" display: inline-block;  margin:10px"><button type="button" class="btn btn-danger btn-sm" @click="showModal = false">X</button></div>
       <br>
      </div>
    
   
      <div class="row">
            <div class="col-lg-6">
             <img :src="producto.photo" alt="" srcset=""  width="200" height="200" >
            </div>
            <div class="col-lg-6"> 
             <div><p>{{producto.name}}</p></div>
             <div><p>{{producto.code}}</p></div>
             <div><p>Precio : ${{producto.price}}</p></div>
             <div><p>cantidad : 1</p></div>
            </div>
            <div class="col-lg-12">{{producto.description}}</div>
      </div>
        <button type="button" class="btn btn-warning btn-block" @click="showModal = false" style="margin:10px">Seguir comprando</button>
        <button type="button" class="btn btn-success btn-block" @click="agregarProducto(producto)" style="margin:10px">Agregar al Carro</button>
    </div>        
  </div>
</transition>
 
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
      showModalCarro : false,
      notas:[],
      productos: [],
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
      agregarProducto(producto){
        this.productos.push(producto)
        this.showModal = false
      },
   
    listarNotas(){
        this.axios.get('/product')
        .then((response)=>{
            this.notas= response.data;
        })
        .catch(e=>{
            console.log('error'+e)
        })
    },
    obtenerCarro(){
       this.showModalCarro=true
    }

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