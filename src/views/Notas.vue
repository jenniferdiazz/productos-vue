<template>
  <div class="container">
    
    <h1>Notas</h1>
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
    <form @submit.prevent="editarNota(notaEditar)" v-if="!agregar">
            <h3 class="text-center">Editar nota</h3>
            <input type="text" class="form-control my-2" v-model="notaEditar.name">
            <input type="text" class="form-control my-2" v-model="notaEditar.description">
            <button type="submit" class="btn-warning btn-block btn-success">Confirmar</button>  
            <button type="submit" class="btn-sm btn-block btn-danger" @click="agregar=true">Cancelar</button>
                      
    </form>
    <form @submit.prevent="agregarNota()" v-if="agregar">
            <h3 class="text-center">Agregar Nueva nota</h3>
            <input type="text" placeholder="Ingrese el Nombre" class="form-control my-2" v-model="nota.name">
            <input type="text" placeholder="Ingrese la descripcion" class="form-control my-2" v-model="nota.description">
            <button type="submit" class="btn-sm btn-block btn-success">Agregar</button>
    </form>
    <table class="table">
  <thead>
    <tr>
        <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Descripcion</th>
      <th scope="col">Fecha</th>
      <th scope="col">Accion</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item,index) in notas" :key="index">
      
        <td>{{item._id}}</td>
       <td>{{item.name}}</td>
       <td>{{item.description}}</td>
       <td>{{item.date}}</td>
       <td><button type="button" class="btn btn-warning" @click="activarEdicion(item._id)">Actualizar</button></td>
         <td><button type="button" class="btn btn-danger" @click="eliminarNota(item._id)">Eliminar</button></td>
    </tr>
   
  </tbody>
</table>
  </div>


</template>

<script>

export default {
  data(){
    return{
      notas:[],
      mensaje:{color:'success', texto:''},
      dismessecs:3,
      dissmissCountDown:0,
      agregar:true,
      nota:{},
      notaEditar:[]
    }
  },
  created(){
      this.listarNotas();
  },
  methods:{
    listarNotas(){
        this.axios.get('/nota')
        .then((response)=>{
            this.notas= response.data;
        })
        .catch(e=>{
            console.log('error'+e)
        })
    },
    countDownChanged(dissmissCountDown){
        this.dismissCountDown = dismissCountDown
    },
    showAlert(){
        this.dismissCountDown = this.dismisSecs
    },
    eliminarNota(id){
         this.axios.delete(`nota/${id}`)
        .then(res=>{
            const index= this.notas.findIndex(item=>item._id == res.data._id);
            this.notas.splice(index,1)

             //alerta de mensaje
            
            this.mensaje.texto = 'Nota Eliminada'
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
            
            this.mensaje.texto = 'Nota Actualizada'
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
            
            this.mensaje.texto = 'Nota Agregada'
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
    

            
  }

};

</script>
