<template>
  <div class="card">
    <!-- <img src="" alt=""> -->

    <div class="form-row">
      <input
        v-model="postInfos.content"
        class="form-row__input"
        type="text"
        placeholder="Quoi de neuf ?"
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

    addNewPost() {
      this.$store
        .dispatch("createPost", {
          content: this.postInfos.content,
          attachement: this.attachement,
        })
        .then(
          (response) => {
            this.$store.dispatch("getAllPosts");
            console.log(response);
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
