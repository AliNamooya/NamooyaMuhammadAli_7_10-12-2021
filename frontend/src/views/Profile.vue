<template>
  <Header />

  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
  </div>

  <Comment />
</template>

<script>
import { mapState } from "vuex";
import Header from "../components/Header.vue";
import Comment from "../components/Comment.vue";
export default {
  name: "Profile",
  components: {
    Header,
    Comment,
  },
  mounted: function () {
    console.log(this.$store.state.user); //renvoie le userId et le token
    //on se deconnect automatiquement si le user n'a pas de compte
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/login");
      return;
    }
    //on affiche les informations du user
    this.$store.dispatch("getUserInfos");
  },
  computed: {
    ...mapState({
      user: "postInfos",
    }),
  },
  methods: {
    // fontion liée au bouton deconnexion
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}
</style>
