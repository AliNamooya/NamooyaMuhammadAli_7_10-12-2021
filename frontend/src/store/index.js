import { createStore } from "vuex";
const axios = require("axios");

//base lien api users
const usersAPI = axios.create({
  baseURL: "http://localhost:3000/api/user",
});

//base lien api post
const postsAPI = axios.create({
  baseURL: "http://localhost:3000/api/post",
});

let user = localStorage.getItem("user");
//si ce n'est pas un user, son userId = -1 et il est renvoyer vers le login
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
  //Sinon on recupère le token
} else {
  try {
    user = JSON.parse(user);
    usersAPI.defaults.headers.common["Authorization"] = user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: "",
    };
  }
}

const store = createStore({
  state: {
    status: "",
    user: user,
    userInfos: {
      email: "",
      username: "",
      // rajouter image
    },
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },

    logUser: function (state, user) {
      usersAPI.defaults.headers.common["Authorization"] = user.token;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: "",
      };
      localStorage.removeItem("user");
    },
  },
  actions: {
    createAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        commit;
        usersAPI
          .post("/signup", userInfos)
          .then(function (response) {
            commit("setStatus", "created");
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_create");
            reject(error);
          });
      });
    },

    login: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        usersAPI
          .post("/login", userInfos)
          .then(function (response) {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "error_login");
            reject(error);
          });
      });
    },

    // afficher les informations de l'utilisateur
    getUserInfos: ({ commit }, userInfos) => {
      usersAPI
        .get("/me")
        .then(function () {
          commit("userInfos", userInfos.data);
        })
        .catch(function () {});
    },

    showPosts: ({ commit }) => {
      postsAPI
        .get("/")
        .then(function (response) {
          commit("userInfos", response.data);
        })
        .catch(function () {});
    },
  },
  modules: {},
});

export default store;
