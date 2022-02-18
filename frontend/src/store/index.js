import { createStore } from 'vuex'

import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/'
});

const store = createStore({
  state: {
  },
  actions: {
    createAccount: ({commit}, userInfos) =>{
      return new Promise((resolve, reject) =>{
        commit;
        instance.post('/signup', userInfos)
        .then(function(response){
          resolve(response);
        })
        .catch(function(error){
          reject(error);
        })
      })
    }
  }
})

export default store
