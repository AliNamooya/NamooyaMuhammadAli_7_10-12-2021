<template>
  <div id="profile">
    <Header />
    <div class="card">
      <h1 class="card__title">Espace Perso de : {{ user.username }}</h1>

      <p class="card__subtitle">Mon adresse mail est : {{ user.email }}</p>
      <p v-if="user.isAdmin == true" class="card__subtitle">
        J'ai des droits administrateur
      </p>
      <img
        v-if="user.attachement"
        :src="user.attachement"
        alt="photo de profil"
      />
      <div class="update">
        <button
          @click="switchToEdit()"
          type="button"
          class="button btn-update btn-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
            ></path>
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            ></path>
          </svg>
          Modifier profil
        </button>
      </div>

      <div class="deleteBtn">
        <button
          @click="deleteUserAccount()"
          type="button"
          class="button-delete btn-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
            ></path>
          </svg>
          Supprimer mon compte
        </button>
      </div>
    </div>

    <ProfilePosts />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "../components/Header.vue";
import ProfilePosts from "../components/ProfilePosts.vue";
const axios = require("axios");
const usersAPI = axios.create({
  baseURL: "http://localhost:3000/api/user",
});

export default {
  name: "Profile",
  components: {
    Header,
    ProfilePosts,
  },
  mounted: function () {
    //on se deconnect automatiquement si le user n'a pas de compte
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return; //rerturn pour que le code en bas ne soit pas accessible si le user n'est pas logger
    }
    //on affiche les informations du user

    this.$store.dispatch("getUserInfos");
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  methods: {
    switchToEdit() {
      this.$router.push("/edit");
    },

    deleteUserAccount() {
      //il faut utiliser self car c'est dans un sous ensemble
      const self = this;
      usersAPI
        .delete("/delete", {
          headers: { Authorization: "Bearer " + this.$store.state.user.token },
        })
        .then(() => {
          console.log("deleted");
          self.$store.commit("logout");
          self.$router.push("/");
        });
    },
    // fontion liée au bouton deconnexion
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}

#profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  width: 100%;

  min-height: 100vh;
}

svg {
  margin-right: 5px;
}
.update {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.btn-update {
  width: 35%;
}

.button-delete {
  background: #eb4c1be9;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 60%;
  padding: 16px;
  transition: 0.4s background-color;
}

.deleteBtn {
  display: flex;
  justify-content: center;
}

img {
  margin-bottom: 10px;
}
</style>
