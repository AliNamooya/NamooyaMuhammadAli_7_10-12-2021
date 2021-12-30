<template>
  <section>
    <div class="card">
      <div class="card_top">
        <h2>UsernameTest</h2>
        <div class="delete">
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
      <!-- <img src="" alt=""> -->
      <h3 class="card__title">Titre du commentaire</h3>
      <p class="card__subtitle">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
        accumsan nisi quis rutrum feugiat. Phasellus pharetra sem eros, non
        congue lorem faucibus sit amet. Phasellus tincidunt lorem lorem, et
        dapibus augue imperdiet vitae.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "Comment",

  // a revoir Rajouter token-----------------------------
  // mounted({ commit }) {
  // this.$store.dispatch("getAllPosts");
  // },
  //---------------------------------------
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
</style>
