import { createStore } from "vuex";
const axios = require("axios");

//API-------------------------------------
//base lien api users
const usersAPI = axios.create({
  baseURL: "http://localhost:3000/api/user",
});

//base lien api post
const postsAPI = axios.create({
  baseURL: "http://localhost:3000/api/post",
});

//-------------------------------------

let user = localStorage.getItem("user"); //récupération du token
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
      // attachement: '',
    },

    postInfos: {
      title: "",
      content: "",
      // attachement: '',
    },
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },

    logUser: function (state, user) {
      usersAPI.defaults.headers.common["Authorization"] = user.token;
      //le token et userId sont inserer dans le localstorage
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
    getUserInfos: ({ commit }) => {
      usersAPI
        .get("/me")
        .then(function (response) {
          commit("userInfos", response.data);
        })
        .catch(function () {});
    },
    //--------------------------POST----------------------------------
    //statut 200 OK mais pas de data en retour
    getAllPosts: ({ commit }) => {
      postsAPI
        .get("/", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem(user.token),
          },
        })
        .then(function (response) {
          console.log(response);
          commit("post", response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // status 403 (Forbidden), network = unauthorized request
    createPost: ({ commit }) => {
      console.log(user.token);

      commit;
      return new Promise((resolve, reject) => {
        user = JSON.parse(user);
        usersAPI.defaults.headers.common["Authorization"] = user.token;
        postsAPI
          .post("/create", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem(user.token),
            },
          })
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },

    // deletePost: (postId) => {
    //   postsAPI.get("/" + postId).then((response) => {
    //     this.result.splice(postId);
    //     console.log(this.result);
    //   });
    // },
  },
  modules: {},
});

export default store;
