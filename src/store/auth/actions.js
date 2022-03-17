import axios from "@/axios/axios";
import Vue from 'vue';
import router from '../../router'
import toast from '@/plugins/toastification'

export const getMe = ({ commit }) => {
  axios.get("/auth/me")
    .then((resp) => {
      commit('SET_USER', resp.data && resp.data.user)
    })
    .catch((err) => {
      console.log('error', err.data)
    })
}

export const logout = ({ commit }) => {

  axios.get("/auth/logout")
    .then((resp) => {
      localStorage.removeItem("access_token");
      commit('SET_LOGOUT', router.push('/'))
    })
    .catch((err) => {
      console.log('error', err);
      if (err.response.status == 401) {
        localStorage.removeItem("access_token");
        commit('SET_LOGOUT', router.push('/'))
      }
    });
}

export const  login = ({ commit, dispatch,state}, payload) => {
  const  user = payload
  axios.post("/auth/login", user)
  .then(async (resp) => {
    Vue.prototype.$toast.success("Hola, ¡Bienvenido.!", {});
    await dispatch('getMe')
    commit('SET_TOKEN', resp.data)
    
    // if(state.user.role == 1) {
    //   setTimeout(() => router.push("index"), 2500);
    // }else if (state.user.role == 3) {
    //   setTimeout(() => router.push({name: 'pedidos', params: { id: state.user.id , name: state.user.name}}), 2500);
    // }

    setTimeout(() => router.push({name: 'pedidos', params: { id: state.user.id , name: state.user.name}}), 2500);
    
    // console.log('Login - role', state.user);
    // console.log('Rol del usuario:', state.user.role)
    // setTimeout(() => router.push("index"), 2500);
    })
    .catch((error) => {
      // this.alert = true
      Vue.prototype.$toast.error("Tu email o contraseña no son correctas", {});
    });
}