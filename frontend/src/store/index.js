import { createStore } from 'vuex'

import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/users'
});

//
let user = localStorage.getItem('user');
if (!user) {
 user = {
    userId: -1,
    token: '',
  }; 
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['Authorization'] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: '',
    };
  }
}

// Create a new store instance.
const store = createStore({
  state: {
    status:'',
    user: user,
    userInfos:{
      email: '',
      username: '',
      bio: '',
      picture: '',
    }

  },
  mutations: {
    setStatus (state, status){
      state.status= status;
    },
    logUser: function (state, user) {
      instance.defaults.headers.common['Authorization'] = user.token;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: '',
      }
      localStorage.removeItem('user');
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
        commit('setStatus', 'loading');
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
    },
    getUserInfos: ({commit}) =>{
      instance.get('/profile/me')
        .then(function(response){
          commit('userInfos', response.data);
        })
        .catch(function(){
        })
    },
    updateAccount: ({commit}, userInfos) =>{
      return new Promise((resolve, reject) =>{
        instance.put('/profile/me', userInfos)
        .then(function(response){
          commit();
          resolve(response);
        })
        .catch(function(error){
          reject(error);
        })
      })
    },
    deleteAccount: ({commit}) =>{
      instance.delete('/profile/me')
        .then(function(response){
          state.user = {
            userId: -1,
            token: '',
          }
          localStorage.removeItem('user');
          commit(response);
        })
        .catch(function(error){
          commit(error);
        })
    },
  }
})

export default store
