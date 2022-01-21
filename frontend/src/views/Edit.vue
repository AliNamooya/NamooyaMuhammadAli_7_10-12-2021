<template>
  <div id="edit">
    <Header />
    <div class="card">
      <h1 class="card__title">Modification du profil</h1>
      <div class="form-row">
        <input
          v-model="userInfos.username"
          class="form-row__input"
          type="text"
          placeholder="Changer de pseudo"
        />

        <div class="form-row">
          <input
            class="form-row__input"
            type="file"
            placeholder="Photo de profil"
            @change="addImage"
          />
        </div>
        <button @click="editUserInfos()" class="button">Modifier</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "../components/Header.vue";
// const axios = require("axios");
// const usersAPI = axios.create({
//   baseURL: "http://localhost:3000/api/user",
// });
export default {
  name: "Edit",
  components: {
    Header,
  },
  data: function () {
    return {
      userInfos: {
        username: "",
        attachement: "",
      },
    };
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
    addImage(event) {
      this.attachement = event.target.files[0];
    },

    editUserInfos() {
      this.$store
        .dispatch("updateUserInfos", {
          username: this.userInfos.username,
          attachement: this.attachement,
        })
        .then(
          (response) => {
            console.log(response);
            this.$router.push("/profile");
          },
          (error) => {
            console.log(error);
          }
        );
    },
  },
};
</script>

<style scoped>
#edit {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  width: 100%;

  min-height: 100vh;
}
</style>
