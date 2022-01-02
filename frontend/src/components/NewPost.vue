<template>
  <div class="card">
    <!-- <img src="" alt=""> -->
    <div class="form-row">
      <input
        v-model="title"
        class="form-row__input"
        type="text"
        placeholder="Titre"
      />
    </div>

    <div class="form-row">
      <input
        v-model="content"
        class="form-row__input"
        type="text"
        placeholder="Commentaire"
      />
    </div>

    <div class="add_image">
      <button type="button" class="button btn-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-image"
          viewBox="0 0 16 16"
        >
          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
          <path
            d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"
          ></path>
        </svg>
        Importer une image
      </button>
    </div>

    <button @click="postComment()" class="button">Poster</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NewPost",
  // computed: {
  //   validatedFields: function () {
  //       if (this.title != "" && this.content != "") {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //   },
  //}
  data: function () {
    return {
      title: "",
      content: "",
    };
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  methods: {
    postComment: function () {
      this.$store
        .dispatch("createPost", {
          title: this.title,
          content: this.content,
          // attachement: this.attachement
        })
        .then(
          function (response) {
            console.log(response);
          },
          function (error) {
            console.log(error);
          }
        );
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 20px;
}

h2 {
  font-size: 1rem;
}

.add_image {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
}

.btn-primary {
  width: 50%;
}

svg {
  margin-right: 5px;
}

.form-row {
  margin: 0 0 20px 0;
}
</style>
