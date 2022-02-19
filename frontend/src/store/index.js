import { createStore } from 'vuex'

import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/'
});

const store = createStore({
  state: {
    status:'',
    user: {
      userId: -1,
      token: '',
    }
  },
  mutations: {
    setStatus (state, status){
      state.status= status;
    },
    logUser (state, user){
      state.user = user;
    }
  },
  actions: {
    login: ({commit}, userInfos) =>{
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) =>{
        instance.post('/login', userInfos)
        .then(function(response){
          commit('setStatus', '');
          commit('logUser', response.data);
          resolve(response);
        })
        .catch(function(error){
          commit('setStatus', 'error_login');
          reject(error);
        })
      })
    },
    createAccount: ({commit}, userInfos) =>{
      return new Promise((resolve, reject) =>{
        commit;
        instance.post('/signup', userInfos)
        .then(function(response){
          commit('setStatus', 'created');
          resolve(response);
        })
        .catch(function(error){
          commit('setStatus', 'error_create');
          reject(error);
        })
      })
    }
  }
})

export default store
