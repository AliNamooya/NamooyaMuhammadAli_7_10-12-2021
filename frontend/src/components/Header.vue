<template>
  <nav>
    <ul>
      <li class="margin_right">
        <a href="#">Home</a>
      </li>
      <li>
        <a href="#">Profile</a>
      </li>
    </ul>
    <div class="logo">
      <img src="../assets/icon-left-font-monochrome-white.png" alt="logo" />
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
  position: fixed;
  top: 0;
  padding: 20px;
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
    color: white;
    text-decoration: none;
    font-weight: 500;
  }
}
a:hover {
  color: #fbab7e;
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
</style>
