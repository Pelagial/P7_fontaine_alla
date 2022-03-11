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
    token: null,
    user: {},
    isLoggedIn: false,
    isLoading: false,

    posts: [],
    users: [],
    post: {},
    message: "",
    error: "",
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

    // posts

    get_posts(state, posts) {
      (state.posts = posts), (state.isLoading = false);
    },
    get_posts_by_id(state, post) {
      state.post = post;
      state.isLoading = false;
    },
    add_post(state, post) {
      state.posts = [post, ...state.posts];
      state.message = "post créé";
    },
    delete_post(state, id) {
      state.posts = [...state.posts.filter((element) => element.id !== id)];
      state.message = "post supprimé";
    },
    // end posts
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
        .put(`http://localhost:5000/api/users/accounts/${id}`, data, {
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

    //posts
    getPosts({ commit }) {
      PostService.getPosts().then((response) => {
        const posts = response.data;
        commit('get_posts', posts);
      });
    },
    getPostById({ commit }, id) {
      PostService.getPostById(id).then((response) => {
        const post = response.data;
        commit('get_posts_by_id', post);
      });
    },
    createPost({ commit }, post) {
      PostService.createPost(post)
        .then((response) => {
          const post = response.data;
          commit('add_post', post);
        })
        .then(() => {
          PostService.getPosts().then((response) => {
            const posts = response.data;
            commit('get_posts', posts);
          });
        });
    },
    deletePost({ commit }, id) {
      PostService.deletePost(id)
        .then(() => {
          commit('delete_posts', id);
        })
        .then(() => {
          PostService.getPosts().then((response) => {
            const posts = response.data;
            commit('get_posts', posts);
          });
        });
    },
    // end posts
  }
})

export default store