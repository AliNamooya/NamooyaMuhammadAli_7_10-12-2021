<template>
  <!-- <Header /> -->
  <div id="container">
    <router-view />
  </div>
</template>

<script>
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

#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  width: 100%;
  background-image: linear-gradient(62deg, #fbab7e 0%, #f7ce68 100%);
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
  padding: 10px 32px 10px 32px;
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
  background: #1bb3eb;
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

/* Form */
.form-row {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}
.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}
.form-row__input::placeholder {
  color: #aaaaaa;
  text-align: center;
}

.card_top_left {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-style {
  background-color: rgba(128, 128, 128, 0.255);
}

.input-group-text {
  cursor: pointer;
}

.bi-x {
  color: red;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

@media screen and (max-width: 576px) {
  .card_container {
    width: 90%;
    align-items: center;
  }

  .card {
    width: 90%;
  }
}
</style>
