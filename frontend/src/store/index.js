import { createStore } from 'vuex'

import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/'
});

// Get user auth token from localstorage
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

// Create a new store instance
const store = createStore({
  state: {
    status:'',
    user: user,
    userInfos:{
      email: '',
      username: '',
      bio: '',
      picture: '',
    },
    publication:{
      attachement: '',
      title:'',
      message:''
    },
    publications:[],
    userPublication:{
      attachement: '',
      title:'',
      message:''
    },
    userPublications:[],
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
    },
    publication: function(state, publication) {
      state.publication = publication;
    },
    publications: function(state, publications) {
      state.publications = publications;
    },
    userPublication: function(state, userPublication) {
      state.userPublication = userPublication;
    },
    userPublications: function(state, userPublications) {
      state.userPublications = userPublications;
    },
    publicationId: function(state, publicationId){
      state.publication.id = publicationId;
    }

  },
  actions: {
    login: ({commit}, userInfos) =>{
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) =>{
        instance.post('/users/login', userInfos)
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
        instance.post('/users/signup', userInfos)
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
      instance.get('/users/profile/me')
        .then(function(response){
          commit('userInfos', response.data);
        })
        .catch(function(){
        })
    },
    updateAccount: ({commit}, data) =>{
      return new Promise((resolve, reject) =>{
        instance.put('/users/profile/me', data)
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
      instance.delete('/users/profile/me')
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
    createPost: ({commit}, publication) =>{
      return new Promise((resolve, reject) =>{
        instance.post('/publication/post', publication)
        .then(function(response){
          commit('setStatus', '');
          resolve(response);
        })
        .catch(function(error){
          commit('setStatus', 'error_posting');
          reject(error);
        })
      })
    },
    getAllPublication: ({commit}) =>{
      instance.get('/publication/')
        .then(function(response){
          commit('publications', response.data);
        })
        .catch(function(){
        })
    },
    getUserPublication: ({commit}) =>{
      instance.get('/publication/myPub')
        .then(function(response){
          commit('userPublications', response.data);
        })
        .catch(function(){
        })
    },
    getOnePublication: ({commit}) =>{
      let id = this.state.publication.id;
      instance.get(`/publication/${id}`)
        .then(function(response){
          commit('publications', response.data);
        })
        .catch(function(){
        })
    },
    deletePost: ({commit}) =>{
      let id = this.state.publication.id
      instance.get(`/publication/${id}`)
      if (publication != ""){
        instance.delete(`/publication/${id}`)
        .then(function(response){
          commit(response);
        })
        .catch(function(error){
          commit(error);
        })
      } else {
        
      }
      
    },
  }
})

export default store
