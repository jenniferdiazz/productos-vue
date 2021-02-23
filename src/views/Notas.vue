<template>
  <div class="container">
    
    <h1>Fuente de los Deseos</h1>
     
    <div>
        
    </div>
    <div class="alert alert-primary" 
    role="alert" 
    :show="dismissCountDown"
    dismissible
    :variant="mensaje.color"
    @dismissed="dismissCountDown=0"
    @dismiss-count-down="countDownChanged"
    >
    {{mensaje.texto}}
   
    </div>
    <!-- <form @submit.prevent="editarNota(notaEditar)" v-if="!agregar">
            <h3 class="text-center">Pide un deseo</h3>
            <input type="text" class="form-control my-2" required v-model="notaEditar.name">
            <input type="text" class="form-control my-2"  required v-model="notaEditar.description">
            <button type="submit" class="btn-warning btn-block btn-success">Confirmar</button>  
            <button type="submit" class="btn-sm btn-block btn-danger" @click="agregar=true">Cancelar</button>
                      
    </form>
    <div class="row">
    <form @submit.prevent="agregarNota()" v-if="agregar">
            <h3 class="text-center">Pide un deseo</h3>
            <div class="text-center">
            <input type="text" placeholder="Ingrese el Nombre" class="form-control m-2" v-model="nota.name">
            <textarea type="text" placeholder="Ingrese la descripcion" class="form-control m-2" v-model="nota.description" rows="3"></textarea>
           <label for="">Lanzar (Pesos)</label>
      Example single danger button -->
<!-- <select class="form-select" aria-label="Default select example">
  <option selected>$100</option>
  <option value="1">$500</option>
  <option value="2">$1000</option>
  <option value="3">$10000</option>
</select>
<br> -->
            
            <!-- <button type="submit" class="btn btn-block btn-success"  @click="darMensaje()">Pedir Deseo</button>
            
            </div>
    </form> -->
    <!-- </div> -->
    <br>

    <table class="table">
  <thead>
    <tr>
        
      <th scope="col">Nombre</th>
      <th scope="col">Descripcion</th>
      <th scope="col">Fecha</th>
      <th scope="col">Accion</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in notas" :key="index">
      
        
       <td>{{item.name}}</td>
       <td>{{item.description}}</td>
       <td>{{item.date}}</td>
       <td><button type="button" class="btn btn-warning" @click="activarEdicion(item._id)">Actualizar</button></td>
         <td><button type="button" class="btn btn-danger" @click="eliminarNota(item._id)">Eliminar</button></td>
    </tr>
   
  </tbody>
</table>
<!-- Modal -->
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  </div>


</template>

<script>
import {mapState} from 'vuex'
import {mapActions} from 'vuex'

export default {
  data(){
    return{
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
