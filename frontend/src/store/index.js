import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import PostService from '../services/PostService';
import Api from '../services/Api';
import Auth from '../services/Auth';
import axios from 'axios'


// Create a new store instance
const store = createStore({
  strict: true,
  state: {
    status:'',
    user: {},
    users: [],
    token: null,
    isLoggedIn: false,
    isLoading: false,
    message: "",
    error: "",

    publication:{},
    publications:[],
    userPublication:{},
    userPublications:[],
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  getters: {
    posts(state) {
      return state.posts;
    },
    post(state) {
      return state.post;
    },
    users(state) {
      return state.users;
    },
    user(state) {
      return state.user;
    },
    messageRetour(state) {
      return state.message;
    },
    errorMessage(state) {
      return state.error;
    },
    isLogged(state) {
      return state.isLoggedIn;
    },
  },
  mutations: {
    // users
    set_token(state, token) {
      state.token = token;
      if (token) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
    delete_token(state) {
      state.token = null;
      state.user = '';
      state.isLoggedIn = false;
    },
    set_user(state, user) {
      state.user = user;
    },
    get_user_by_id(state, user) {
      state.user = user;
    },
    get_user(state, users) {
      state.users = users;
    },
    update_account(state, id, user) {
      Object.assign(
        state.users.find((element) => element.id === id),
        user
      );
      state.message = "compte modifié";
    },
    delete_account(state, id) {
      state.users = [...state.users.filter((element) => element.id !== id)];
      state.message = "compte supprimé";
    },
    log_out(state) {
      sessionStorage.clear();
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
      state.message = "";
      state.error = "";
    },
    // end users

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
    //users
    setToken({ commit }, token) {
      commit('set_token', token);
    },
    deleteToken({ commit }, token) {
      commit('delete_token', token);
    },
    logout({ commit }) {
      commit('log_out');
    },
    setUser({ commit }, user) {
      commit('set_user', user);
    },
    getUsers({ commit }) {
      Auth.getUsers().then((response) => {
        const users = response.data;
        commit('get_user', users);
      });
    },
    getUserById({ commit }) {
      let id = this.state.user.id;
      Auth.getUserById(id).then((response) => {
        const user = response.data;
        commit('get_user_by_id', user);
      });
    },
    deleteAccount({ commit }, id) {
      Auth.deleteAccount(id).then(() => {       
          commit('delete_account', id);
      })
    },
    updateAccount({ commit }, data) {
      let id = this.state.user.id;
      axios
        .put(`${Api}.users/accounts/${id}`, data, {
          headers: { Authorization: this.state.token },
        })
        .then((response) => {
          const newUser = response.data;
          commit("update_account", id, newUser);
        })
        .then (() => {
          PostService.getPosts().then((response) => {
          const posts = response.data;
          commit('get_posts', posts);
        })
      })
    },
    // end users
  }
})

export default store