<template>
  <LoaderCircle v-if="isSignupLoading" />
  <form v-else>
    <input
      v-model="firstname"
      type="text"
      placeholder="prénom"
    >
    <input
      v-model="lastname"
      type="text"
      placeholder="nom"
    >
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
      @input="onChangePassword"
    >
    <input
      v-else
      v-model="password"
      type="test"
      placeholder="mot de passe"
      autocomplete="on"
      @input="onChangePassword"
    >
  
    <input
      v-if="!seePassword"
      v-model="checkPassword"
      type="password"
      placeholder="confirmation du mot de passe"
      autocomplete="on"
    >
    <input
      v-else
      v-model="checkPassword"
      type="text"
      placeholder="confirmation du mot de passe"
      autocomplete="on"
    >

    <p class="form__birthday">
      Date de naissance :
    </p>
    <input
      v-model="birthday"
      type="date"
      placeholder="date de naissance"
    >
    <ErrorMessage
      :errors="errors"
    />
    <Button
      class="form__button"
      :text="'S\'inscrire'"
      :on-click="submit"
    />
    <router-link
      class="form__link"
      to="/login"
    >
      Déjà inscrit ?
    </router-link>
  </form>
</template>

<script>
import Button from "@/components/elmts/Button";
import ErrorMessage from "@/components/elmts/ErrorMessage";
import AuthService from "@/services/AuthService";
import validateInputMixin from "@/mixins/validateInputMixin";
import userMixin from "@/mixins/userMixin";
import ToggleSeePassword from "@/components/elmts/ToggleSeePassword";
import LoaderCircle from "@/components/elmts/LoaderCircle";

export default {
  name: "Signup",
  components: {
    Button,
    ErrorMessage,
    ToggleSeePassword,
    LoaderCircle
  },
  mixins: [userMixin, validateInputMixin],
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      checkPassword: "",
      birthday: "",
      errors: [],
      seePassword: false,
      isSignupLoading: false
    };
  },
  methods: {
    onChangePassword() {
      this.errors = [];
      if (this.password.length < 8) {
        this.errors.push("Le mot de passe n'est pas assez long");
      }
      if (!this.validPasswordMin(this.password)) {
        this.errors.push(
          "Le mot de passe doit contenir au moins une minuscule"
        ); 
      }
      if (!this.validPasswordMaj(this.password)) {
        this.errors.push(
          "Le mot de passe doit contenir au moins une majuscule"
        ); 
      }
      if (!this.validPasswordDigit(this.password)) {
        this.errors.push(
          "Le mot de passe doit contenir au moins un nombre"
        ); 
      }
    },
    getToggleSeePassword() {
      this.seePassword = !this.seePassword;
    },
    submit(event) {
      event.preventDefault();
      this.errors = [];

      if(
        this.firstname !== "" &&
        this.lastname !== "" &&
        this.password !== "" &&
        this.checkPassword !== "" &&
        this.birthday !== "" &&
        this.email !== ""
      ) {
        let emailMin;
        if (this.validEmail(this.email)) {
          emailMin = this.email.toLowerCase();
        } else {
          this.errors.push("Adresse e-mail invalide");
          return;
        }

        if (!this.validName(this.firstname)) {
          this.errors.push("Prénom invalide");
          return;
        }

        if (!this.validName(this.lastname)) {
          this.errors.push("Nom invalide");
          return;
        }

        if (!this.validBirthday(this.birthday)) {
          this.errors.push("Date de naissance invalide");
          return;
        }

        if (this.password !== this.checkPassword) {
          this.errors.push("Les deux mots de passe ne sont pas identiques");
          return;
        }

        this.isSignupLoading = true;

        AuthService.signup(this.firstname, this.lastname, emailMin, this.password, this.birthday)
        .then(res => {
          this.isSignupLoading = false;
          this.afterSign(res);
        })
        .catch(err => {
          this.isSignupLoading = false;
          this.errors.push(err.response.data.message);
          if (err.response.data.error) {
            this.errors[0] += ", il vous manque :";
            if (err.response.data.error.includes("min")) {
              this.errors.push("- au moins 8 caractères");
            }
            if (err.response.data.error.includes("uppercase")) {
              this.errors.push("- au moins une majuscule");
            }
            if (err.response.data.error.includes("lowercase")) {
              this.errors.push("- au moins une minuscule");  
            }
            if (err.response.data.error.includes("digits")) {
              this.errors.push("- au moins un chiffre");
            }
          }
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
    min-height: 18px;
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

    &::-webkit-datetime-edit-text { color: $color-gradient-2; padding: 0 0.1em; }
    &::-webkit-datetime-edit-month-field { color: $color-gradient-2; }
    &::-webkit-datetime-edit-day-field { color: $color-gradient-2; }
    &::-webkit-datetime-edit-year-field { color: $color-gradient-2; }
    &::-webkit-calendar-picker-indicator { filter: invert(1) brightness(0.8); }
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
      margin-bottom: 30px;
      font-size: 15px;
    }
    &__birthday {
      width: 100%;
      color: $color-gradient-2;
      margin: 0;
      margin-top: 5px;
      padding-left: 25px;
      text-align: left;
    }
  }

  @include breakpoint(500) {
    input {
      width: 220px;
      font-size: 15px;
    }
  }
</style>