<template>
  <!-- <Header /> -->
  <div id="container">
    <router-view />
  </div>

  <!-- <router-link to="/login">Login</router-link> -->
  <!-- <router-link to="/about">About</router-link> -->
</template>

<script>
// import Header from "./components/Header.vue";   importer sur la page des posts et non sur app sinon ce sera visible sur toutes les pages
export default {
  name: "App",
  components: {
    // Header,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap");

/* reset css */

/* ------------- */

* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  max-width: 100%;
  width: 100%;
}

#container {
  display: flex;
  justify-content: center;
  align-items: center;
}
body {
  background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
img {
  max-width: 100%;
  border-radius: 8px;
}
.card {
  max-width: 100%;
  width: 540px;
  background: white;
  border-radius: 16px;
  padding: 32px;
}
.card__title {
  text-align: center;
  font-weight: 800;
}
.card__subtitle {
  text-align: center;
  color: #666;
  font-weight: 500;
}
.button {
  background: #2196f3;
  color: white;
  border-radius: 8px;
  font-weight: 800;
  font-size: 15px;
  border: none;
  width: 100%;
  padding: 16px;
  transition: 0.4s background-color;
}
.card__action {
  color: #2196f3;
  text-decoration: underline;
}
.card__action:hover {
  cursor: pointer;
}
.button:hover {
  cursor: pointer;
  background: #1976d2;
}
.button--disabled {
  background: #cecece;
  color: #ececec;
}
.button--disabled:hover {
  cursor: not-allowed;
  background: #cecece;
}
</style>
