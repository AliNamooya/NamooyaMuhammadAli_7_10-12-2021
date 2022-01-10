<template>
  <section>
    <div class="card" v-for="p in post" :key="p">
      <div class="card_top">
        <!-- <h2>{{ p.User.username }}</h2>  ca crash lorsque je reload la page -->
        <h2>{{ p.User }}</h2>
        <!-- v-if="admin == true || user.userId == this.$store.state.user.userId" -->
      </div>
      <h3 class="card__title">{{ p.title }}</h3>
      <img :src="p.attachement" alt="photo" />
      <p class="card__subtitle">
        {{ p.content }}
      </p>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "FeedComment",

  mounted: function () {
    console.log(this.$store.state.user);
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getAllPosts");
  },
  computed: {
    ...mapState({
      post: "postInfos",
      user: "userInfos",
    }),
  },
};
</script>

<style scoped>
section {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card {
  margin-bottom: 20px;
  padding-top: 10px;
}

.card_top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

h2 {
  font-size: 1rem;
}

svg {
  color: red;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.delete {
  width: 5%;
}

img {
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.btn-secondary {
  background-color: rgba(128, 128, 128, 0.612);
  border-radius: 35%;
}

.btn-secondary:active {
  background-color: rgba(128, 128, 128, 0.845);
}

.bi-hand-thumbs-up {
  color: white;
}
</style>
