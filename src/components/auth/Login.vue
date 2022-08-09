<template>
  <LoaderCircle v-if="isLoginLoading" />
  <form v-else>
    <input
      v-model="email"
      type="email"
      placeholder="e-mail"
    >
    <ToggleSeePassword
      @get-see-password="getToggleSeePassword"
    />
    <input
      v-if="!seePassword"
      v-model="password"
      type="password"
      placeholder="mot de passe"
      autocomplete="on"
    >
    <input
      v-else
      v-model="password"
      type="text"
      placeholder="mot de passe"
      autocomplete="on"
    >
    <ErrorMessage
      :errors="errors"
    />
    <Button
      class="form__button"
      :text="'Connexion'"
      :on-click="submit"
    />
    <router-link
      class="form__link"
      to="/signup"
    >
      Pas encore inscrit ?
    </router-link>
  </form>
</template>

<script>
import AuthService from "@/services/AuthService";
import Button from "@/components/elmts/Button";
import ErrorMessage from "@/components/elmts/ErrorMessage";
import ToggleSeePassword from "@/components/elmts/ToggleSeePassword";
import userMixin from "@/mixins/userMixin";
import LoaderCircle from "@/components/elmts/LoaderCircle";

export default {
  name: "Login",
  components: {
    Button,
    ErrorMessage,
    ToggleSeePassword,
    LoaderCircle
  },
  mixins: [userMixin],
  data() {
    return {
      email: "",
      password: "",
      errors: [],
      seePassword: false,
      isLoginLoading: false
    };
  },
  methods: {
    getToggleSeePassword() {
      this.seePassword = !this.seePassword;
    },
    submit(event) {
      event.preventDefault();
      this.errors = [];
      
      if (this.email !== "" && this.password !== "") {
        const emailMin = this.email.toLowerCase();

        this.isLoginLoading = true;

        AuthService.login(emailMin, this.password)
        .then(res => {
          this.isLoginLoading = false;
          this.afterSign(res);
        })
        .catch(err => {
          this.isLoginLoading = false;
          this.errors.push(err.response.data.message);
        });
      } else {
        this.errors.push("Tous les champs doivent être complétés");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  form {
    @include flex(column, center, center);
  }
  input {
    background-color: transparent;
    color: $color-gradient-1;
    border: solid 3px;
    padding: 10px 20px;
    border-radius: 60px;
    margin: 5px 10px;
    font-family: $police-1;
    outline: none;
    font-size: 18px;
    width: 300px;
    &:nth-of-type(2n) {
      color: $color-gradient-2;
      &::placeholder {
        color: $color-gradient-2-placeholder;
        font-family: $police-1;
      }
    }
    &::placeholder {
      color: $color-gradient-1-placeholder;
      font-family: $police-1;
    }
  }
  .form {
    &__button {
      margin-top: 40px;
    }
    &__link {
      color: $color-gradient-2;
      text-decoration: none;
      cursor: pointer;
      margin-top: 10px;
      font-size: 15px;
    }
  }

  @include breakpoint(500) {
    input {
      width: 220px;
      font-size: 15px;
    }
  }
</style>