<template>
  <div class="card_container">
    <div class="card">
      <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
      <h1 class="card__title" v-else>Inscription</h1>
      <p class="card__subtitle" v-if="mode == 'login'">
        Tu n'as pas encore de compte ?
        <span class="card__action" @click="switchToCreateAccount()"
          >Créer un compte</span
        >
      </p>
      <p class="card__subtitle" v-else>
        Tu as déjà un compte ?
        <span class="card__action" @click="switchToLogin()">Se connecter</span>
      </p>
      <div class="form-row">
        <input
          v-model="email"
          class="form-row__input"
          type="text"
          placeholder="Adresse mail"
        />
      </div>
      <div class="form-row" v-if="mode == 'create'">
        <input
          v-model="username"
          class="form-row__input"
          type="text"
          placeholder="Username"
        />
      </div>
      <div class="form-row">
        <input
          v-model="password"
          class="form-row__input"
          type="password"
          placeholder="Mot de passe"
        />
      </div>
      <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
        Adresse mail et/ou mot de passe invalide
      </div>
      <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
        Adresse mail déjà utilisée ou non conforme
      </div>
      <div class="form-row">
        <button
          @click="login()"
          class="button"
          :class="{ 'button--disabled': !validatedFields }"
          :disabled="!validatedFields"
          v-if="mode == 'login'"
        >
          <span v-if="status == 'loading'">Connexion en cours...</span>
          <!-- spinner -->

          <span v-else>Connexion</span>
        </button>
        <button
          @click="createAccount()"
          class="button"
          :class="{ 'button--disabled': !validatedFields }"
          :disabled="!validatedFields"
          v-else
        >
          <span v-if="status == 'loading'">Création en cours...</span>
          <!-- spinner -->
          <span v-else>Créer mon compte</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Login",
  data: function () {
    return {
      mode: "login",
      email: "",
      username: "",
      password: "",
    };
  },
  //Si on se deconnect pas, on peut pas aller sur la page login
  mounted: function () {
    if (this.$store.state.user.userId != -1) {
      this.$router.push("/wall");
      return;
    }
  },
  computed: {
    validatedFields: function () {
      if (this.mode == "create") {
        if (this.email != "" && this.username != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(["status"]),
  },

  methods: {
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    login: function () {
      const self = this;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(
          function () {
            self.$router.push("/wall"); //une fois logger on nous renvoie vers les posts
          },
          function (error) {
            console.log(error);
          }
        );
    },
    createAccount: function () {
      const self = this;
      this.$store
        .dispatch("createAccount", {
          email: this.email,
          username: this.username,
          password: this.password,
        })
        .then(
          function () {
            self.login(); //connexion automatique apres creation du compte
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
.card_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
}
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
}
</style>
