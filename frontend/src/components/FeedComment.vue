<template>
  <section>
    <div class="card" v-for="p in post" :key="p">
      <div class="card_top">
        <h2>{{ p.User }}</h2>
        <!-- <div  v-if="p.User.isAdmin === true" class="delete">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div> -->
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
