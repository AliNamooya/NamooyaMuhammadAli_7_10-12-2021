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

//base lien api comments
const commentsAPI = axios.create({
  baseURL: "http://localhost:3000/api/comment",
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
    usersAPI.defaults.headers.common["Authorization"] = "Bearer " + user.token;
    postsAPI.defaults.headers.common["Authorization"] = "Bearer " + user.token;
    commentsAPI.defaults.headers.common["Authorization"] =
      "Bearer " + user.token;
  } catch (ex) {
    user = {
      userId: -1,
      token: "",
    };
  }
}

//création du store
const store = createStore({
  state: {
    status: "",
    user: user,
    //sert de stockage pour les datas de l'api
    userInfos: {
      userId: "",
      email: "",
      username: "",
      isAdmin: false,
    },
    //sert de stockage pour les datas de l'api
    postInfos: {
      id: "",
      content: "",
      attachement: "",
    },
    //sert de stockage pour les datas de l'api
    commentInfos: {
      id: "",
      content: "",
    },
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },

    logUser: function (state, user) {
      usersAPI.defaults.headers.common["Authorization"] =
        "Bearer " + user.token;
      postsAPI.defaults.headers.common["Authorization"] =
        "Bearer " + user.token;
      commentsAPI.defaults.headers.common["Authorization"] =
        "Bearer " + user.token;

      //le token et userId sont inserer dans le localstorage
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    //met a jour les données stocker du state
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    //met a jour les données stocker du state
    postInfos: function (state, postInfos) {
      state.postInfos = postInfos;
    },
    //met a jour les données stocker du state
    commentInfos: function (state, commentInfos) {
      state.commentInfos = commentInfos;
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
    //---------------------POST-----------------------------

    getAllPosts: ({ commit }) => {
      postsAPI
        .get("/")
        .then(function (response) {
          commit("postInfos", response.data);
        })
        .catch(function () {});
    },

    getUserPosts: ({ commit }) => {
      postsAPI
        .get("/" + user.userId)
        .then(function (response) {
          commit("postInfos", response.data);
        })
        .catch(function () {});
    },

    createPost: ({ commit }, postInfos) => {
      return new Promise((resolve, reject) => {
        commit;
        let formData = new FormData();
        formData.append("content", postInfos.content);
        formData.append("attachement", postInfos.attachement);
        postsAPI
          .post("/create", formData)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },

    //---------------------Commentaire-----------------------------

    getAllComments: ({ commit }) => {
      commentsAPI
        .get("/")
        .then(function (response) {
          commit("commentInfos", response.data);
        })
        .catch(function () {});
    },
  },
  modules: {},
});

export default store;
