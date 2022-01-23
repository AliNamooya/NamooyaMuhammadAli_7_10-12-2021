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

    <button @click="logout()" class="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        class="bi bi-box-arrow-right"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
        ></path>
        <path
          fill-rule="evenodd"
          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
        ></path>
      </svg>
    </button>
  </nav>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/");
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
  padding-left: 0;
}
.margin_right {
  margin-right: 15%;
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
  width: 50px;
}

.logo {
  width: 150px;
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
