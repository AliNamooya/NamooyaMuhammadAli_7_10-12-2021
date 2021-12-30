<template>
  <nav>
    <ul>
      <li class="margin_right">
        <a @click="homeRedirect()">Home</a>
      </li>
      <li>
        <a @click="profileRedirect()">Profile</a>
      </li>
    </ul>
    <div class="logo">
      <img
        @click="homeRedirect()"
        src="../assets/icon-left-font-monochrome-white.png"
        alt="logo"
      />
    </div>

    <button @click="logout()" class="button">Déconnexion</button>
  </nav>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
    profileRedirect: function () {
      this.$router.push("/profile");
    },
    homeRedirect: function () {
      this.$router.push("/wall");
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  background-color: #313638;
  width: 100%;
  position: relative;
  top: 0;
  padding: 20px;
  margin-bottom: 50px;
}

ul {
  display: flex;
  flex-direction: row;
}
.margin_right {
  margin-right: 40px;
}
li {
  list-style: none;

  a {
    color: white !important;
    text-decoration: none;
    font-weight: 500;
  }
}
a:hover {
  color: #fbab7e;
  cursor: pointer;
}

button {
  width: 15%;
}

.logo {
  width: 15%;
}
img {
  object-fit: cover;
  height: 50px;
  width: 100%;
}
img:hover {
  cursor: pointer;
}
</style>
