<template>
  <section>
    <div class="card" v-for="p in post" :key="p">
      <div class="card_top">
        <div class="card_top_left">
          <img
            v-if="p.User && p.User.attachement"
            :src="p.User && p.User.attachement"
            alt="Avatar"
            class="avatar"
          />
          <h2>{{ p.User && p.User.username }}</h2>
        </div>

        <div v-if="user.isAdmin" class="delete" @click="deletePost(p.id)">
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
        </div>
      </div>
      <img v-if="p.attachement != null" :src="p.attachement" alt="photo" />
      <p class="card__subtitle">
        {{ p.content }}
      </p>

      <div class="form-row">
        <input
          v-model="p.comment"
          class="form-row__input"
          type="text"
          placeholder="Ajoutez un commentaire"
        />
        <span
          class="input-group-text"
          id="basic-addon1"
          @click="addNewComment(p)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89.471-1.178-1.178.471L5.93 9.363l.338.215a.5.5 0 0 1 .154.154l.215.338 7.494-7.494Z"
            ></path>
          </svg>
        </span>
      </div>

      <div class="comment" v-for="c in comments" :key="c">
        <div v-if="c.postId == p.id" class="card comment-style">
          <div class="card_top">
            <div class="card_top_left">
              <img
                v-if="c.User && c.User.attachement"
                :src="c.User && c.User.attachement"
                alt="Avatar"
                class="avatar"
              />
              <h2>{{ c.User && c.User.username }}</h2>
            </div>

            <div
              v-if="user.isAdmin || c.userId == user.userId"
              class="delete"
              @click="deleteComment(c.id)"
            >
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
            </div>
          </div>

          <p class="card__subtitle">{{ c.content }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
const axios = require("axios");
const postsAPI = axios.create({
  baseURL: "http://localhost:3000/api/post",
});
//base lien api comments
const commentsAPI = axios.create({
  baseURL: "http://localhost:3000/api/comment",
});
export default {
  name: "FeedPosts",
  data: function () {
    return {
      commentInfos: {
        content: "",
      },
    };
  },

  mounted: function () {
    if (this.$store.state.user.userId == -1) {
      this.$router.push("/");
      return;
    }
    this.$store.dispatch("getAllPosts");

    this.$store.dispatch("getAllComments");
  },
  methods: {
    addNewComment(post) {
      let formData = new FormData();
      formData.append("content", post.comment);
      commentsAPI
        .post("/create/" + post.id, formData, {
          headers: {
            Authorization: "Bearer " + this.$store.state.user.token,
          },
        })
        .then(() => {
          this.$store.dispatch("getAllComments");
          post.comment = "";
        });
    },

    deletePost(id) {
      postsAPI
        .delete("/" + id, {
          headers: { Authorization: "Bearer " + this.$store.state.user.token },
        })
        .then(() => {
          window.location.reload();
        });
    },

    deleteComment(id) {
      commentsAPI
        .delete("/" + id, {
          headers: { Authorization: "Bearer " + this.$store.state.user.token },
        })
        .then(() => {
          //rafaichir les comments
          this.$store.dispatch("getAllComments");
        });
    },
  },
  computed: {
    ...mapState({
      post: "postInfos",
      user: "user",
      comments: "commentInfos",
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
}

.card_top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

h2 {
  font-size: 0.9rem;
  color: #666;
}

p {
  color: black;
  font-size: 1.1rem;
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
