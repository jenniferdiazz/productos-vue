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
        <button type="button" class="btn btn-primary">Primary</button>
   
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
      mensaje:{color:'success', texto:''},
      dismessecs:3,
      dissmissCountDown:0,
      agregar:true,
      nota:{},
      notaEditar:[],
      ver:true,
      frase:["Tendrás un día de alegrías y buenos momentos, disfrútalos como nunca.", "Concéntrate en lo que quieres lograr y ganaras. No lo olvides.",
"El cielo sera tu limite, pues grandes acontecimientos te sucederán.", "Te sentirás feliz como un niño y veras al mundo con sus ojos.",
"Vivirás tu vejez con comodidades y riquezas materiales.", "Confía en tu suerte, que es mucha y te rodeara de prosperidad.",
"No todo el mundo puede recibir las mismas cosas. Se practico.", "Te aguarda una larga y feliz vida.",
"Hoy es el momento de explorar: no temas.", "Muy pronto seras incluido en muchas reuniones, fiestas y tertulias.",
"Cuando busques lo que mas deseas, recuerda hacer tu mejor esfuerzo.", "Tienes por delante un maravilloso día para triunfar; disfrútalo y compártelo.",
"Hoy seras reconocido por tus dones especiales y lograras ser feliz por muchas horas.", "Tu corazón estallara de alegría con la llegada de buenas noticias.",
"Mañana puede ser muy tarde para disfrutar lo que tienes hoy.", "Seras promovido en tu trabajo debido a tus logros y capacidades.",
"Alégrate, un camino de hermosas pasiones te espera y debes transitarlo.", "Nunca tendrás que preocuparte por un ingreso estable.", "Hoy tendrás un día de increíble alegría y brillara tu sentido del humor.",
"Hoy compartirás las horas mas tiernas de tu vida con alguien muy amado.", "La rueda de la fortuna te favorecerá y estarás rodeado de prosperidad.",
"Tendrás entera satisfacción al final de esta temporada. Prepárate.", "Muchos se alegraran por tus logros y a ti te mejorara la vida.",
"Eres una persona a la que le gusta triunfar en la vida.", "Confía en tu buen juicio y veras que este te lleva al triunfo.",
"Se te cumplirá un hermoso sueño y veras como otros sueños se hacen realidad.", "No olvides que un amigo es un regalo que te das a ti mismo.",
"Sabes que es exactamente lo que quieres. Trabaja en ello y hazlo materializarse.", "Siente la felicidad que espera por ti y no olvides atraparla para mantenerla contigo."
],
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
  //   countDownChanged(dissmissCountDown){
  //       this.dismissCountDown = dismissCountDown
  //   },
  //   showAlert(){
  //       this.dismissCountDown = this.dismisSecs
  //   },
    eliminarNota(id){
         this.axios.delete(`nota/${id}`)
        .then(res=>{
            const index= this.notas.findIndex(item=>item._id == res.data._id);
            this.notas.splice(index,1)

             //alerta de mensaje
            
            this.mensaje.texto = 'Deseo eliminado'
            this.mensaje.color= 'success';
            this.showAlert();
        })
        .catch(e=>{
            console.log('error'+e)
            this.mensaje.texto = 'Error'
            this.mensaje.color= 'danger';
            this.showAlert();
        })

    },
    editarNota(item){
        this.axios.put(`/nota/${item._id}`, item)
            .then(res=>{
                const index = this.notas.findIndex(n => n._id === res.data._id);
                this.notas[index].name = res.data.name;
                this.notas[index].description = res.data.description;

                //alerta de mensaje
            
            this.mensaje.texto = 'Deseo Actualizado'
            this.mensaje.color= 'success';
            this.showAlert();
            })
            .catch(e=>{
                console.log(e)
                 //alerta de mensaje
            
            this.mensaje.texto = 'Error'
            this.mensaje.color= 'danger';
            this.showAlert();
            })
            this.agregar = true; 
    },
    agregarNota(){
        this.axios.post('/notanueva', this.nota)
        .then(res=>{
            this.notas.push(res.data)
            this.nota.name ='';
            this.nota.description='';

            //alerta de mensaje
            
            this.mensaje.texto = 'Nuevo deseo agregado !'
            this.mensaje.color= 'success';
            this.showAlert();
        })
        .catch(e=>{
           //alerta de mensaje
            
            this.mensaje.texto = 'Error'
            this.mensaje.color= 'danger';
            this.showAlert();
    })
    },
    activarEdicion(id){
        this.agregar=false;
        this.axios.get(`/nota/${id}`)
            .then(res=>{
                this.notaEditar = res.data;
            })
            .catch(e=>{
                console.log(e)
            })

    },
   
    darMensaje(){
      
        var limite= this.frase.length
        
        var aleatorio = Math.round(Math.random()*limite);
        //alert(aleatorio)
        alert(this.frase[aleatorio])
      

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