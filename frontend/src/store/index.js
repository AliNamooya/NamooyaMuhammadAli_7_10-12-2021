import { createStore } from "vuex";
const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000/api/user",
});

const store = createStore({
  state: {},
  mutations: {},
  actions: {
    createAccount: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        commit;
        instance
          .post("/signup", userInfos)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
  },
  modules: {},
});

export default store;
