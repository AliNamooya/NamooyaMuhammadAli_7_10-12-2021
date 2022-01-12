<template>
  <div class="card">
    <!-- <img src="" alt=""> -->
    <div class="form-row">
      <input
        v-model="postInfos.title"
        class="form-row__input"
        type="text"
        placeholder="Titre"
      />
    </div>

    <div class="form-row">
      <input
        v-model="postInfos.content"
        class="form-row__input"
        type="text"
        placeholder="Commentaire"
      />
    </div>

    <div class="form-row">
      <input
        class="form-row__input"
        type="file"
        placeholder="Image"
        @change="addImage"
      />
    </div>

    <button @click="addNewPost()" class="button">Poster</button>
  </div>
</template>

<script>
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
      postInfos: {
        title: "",
        content: "",
        attachement: "",
      },
    };
  },

  methods: {
    addImage(event) {
      console.log(event);
      this.attachement = event.target.files[0];
    },

    addNewPost: function () {
      this.$store
        .dispatch("createPost", {
          title: this.postInfos.title,
          content: this.postInfos.content,
          attachement: "",
        })
        .then(
          function (response) {
            window.location.reload();
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
