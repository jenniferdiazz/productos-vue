import { createStore } from 'vuex'

export default createStore({
  //el state son los datos donde vamos a acceder, las mutaciones solo sirven para cambiar el state
  //accions sirve para conectarse a la bd, los comit llaman a las mutaciones,
  state: {
    token:null
  },
  mutations: {
    setToken(state, payload){
      state.token = payload
    }
  },
  actions: {
    //lo segundo es el componente que recibe. dentro del login se hace la solicitud
    async login({commit}, usuario){
      console.log(usuario)
      try{
          const res= await fetch('http://localhost:3001/api/user/login',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario)
          })

          //viene la respuesta de nuestra base de datos
          const resDB = await res.json()
          console.log(resDB)
          //el commit llama una mutacion, lo segundo es lo que le enviaremos
          commit('setToken', resDB.data.token)
          //para almaacenar las credenciales usamos localstorage
          localStorage.setItem('token2', resDB.data.token)
      }catch(error){
        console.log(error)

      }

    },
    leerToken({ commit }){
      //pregunta si el token existe
      if(localStorage.getItem('token')){
        commit('setToken',localStorage.getItem('token'))
      }else{
        commit('setToken',null)

      }
    },
    cerrarSesion({commit}){
      localStorage.removeItem('token')
      commit('setToken', null)
    }
  },
  modules: {
  }
})
