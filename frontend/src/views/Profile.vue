<template>
  <div id="profile">
    <Header />
    <div class="card">
      <h1 class="card__title">Espace Perso de : {{ user.username }}</h1>
      <p class="card__subtitle">Mon adresse mail est : {{ user.email }}</p>
    </div>
    <NewPost />
    <ProfileComment />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "../components/Header.vue";
import NewPost from "../components/NewPost.vue";
import ProfileComment from "../components/ProfileComment.vue";

export default {
  name: "Profile",
  components: {
    Header,
    NewPost,
    ProfileComment,
  },
  mounted: function () {
    console.log(this.$store.state.user); //renvoie le userId et le token
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
  background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%);
  min-height: 100vh;
}
</style>
