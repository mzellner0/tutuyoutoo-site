<template>
  <div
    v-if="name"
    :class="[
      'info',
      { 'info--is-blue': isBlue },
      { 'info--border-bot': isBorderBot },
      { 'info--border-top': isBorderTop },
      { 'info__password-inputs': type === 'password' && isUpdatingValue }
    ]"
  >
    <p
      v-if="!isUpdatingValue && type === 'password'"
      @click="changeUpdatePassword"
    >
      {{ valueToShow }}
    </p>
    <p
      v-else-if="!isUpdatingValue"
      @click="changeUpdateValue"
    >
      {{ valueToShow }}
    </p>
    <input
      v-if="isUpdatingValue && type === 'birthday'"
      v-model="valueForm"
      type="date"
      @keyup.enter="changeUpdateValue"
    >
    <div v-else-if="isUpdatingValue && type === 'password'">
      <input
        v-model="oldPassword"
        type="password"
        placeholder="Ancien mot de passe"
        @keyup.enter="changeUpdatePassword"
      >
      <input
        v-model="newPassword"
        type="password"
        placeholder="Nouveau mot de passe"
        @keyup.enter="changeUpdatePassword"
      >
      <input
        v-model="checkPassword"
        type="password"
        placeholder="Vérifier le nouveau mot de passe"
        @keyup.enter="changeUpdatePassword"
      >
    </div>
    <input
      v-else-if="isUpdatingValue"
      v-model="valueForm"
      type="text"
      @keyup.enter="changeUpdateValue"
    >
    <img
      v-if="type === 'password'"
      :src="getImageInput"
      alt="edit"
      @click="changeUpdatePassword"
    >
    <img
      v-else
      :src="getImageInput"
      alt="edit"
      @click="changeUpdateValue"
    >
  </div>
</template>

<script>
import userMixin from "@/mixins/userMixin";
import validateInputMixin from "@/mixins/validateInputMixin";

export default {
  name: "Info",
  mixins: [userMixin, validateInputMixin],
  props: {
    name: { type: String, default: null },
    isBorderTop: { type: Boolean, default: false },
    isBorderBot: { type: Boolean, default: false },
    isBlue: { type: Boolean, default: false },
    type: { type: String, default: null }
  },
  emits: ["get-errors-message"],
  data() {
    return {
      valueForm: "",
      oldEmailValue: null,
      isUpdatingValue: false,
      firstLoad: true,
      valueToShow: null,
      oldPassword: "",
      newPassword: "",
      checkPassword: "",
      errors: []
    };
  },
  computed: {
    getImageInput() {
      if (this.isUpdatingValue) {
        return require('@/assets/images/validate.svg');
      } else {
        return require('@/assets/images/edit.svg');
      }
    }
  },
  watch: {
    name: function() {
      this.updateValueToShow();
    }
  },
  mounted() {
    this.updateValueToShow();
  },
  methods: {
    updateErrorMessage(message) {
      this.errors.push(message);
      this.$emit("get-errors-message", this.errors);
    },
    resetErrorMessage(message) {
      this.errors = [];
      this.$emit("get-errors-message", this.errors);
    },
    updateValueToShow() {
      if (this.name) {
        if (this.type === 'birthday') {
          this.valueToShow = this.name.split('-').reverse().toString().replaceAll(',', '/');
        } else {
          this.valueToShow = this.name;
        }
      }
    },
    changeUpdateValue() {
      this.resetErrorMessage();
      if (this.firstLoad) {
        this.valueForm = this.name ? this.name : "";
        this.firstLoad = false;
      }
      if (this.isUpdatingValue) {
        this.updateUserValue();
        this.callApiUpdateUser()
        .then()
        .catch(err => {
          this.updateErrorMessageWithServerInfo(err);
        });
      }
      this.isUpdatingValue = !this.isUpdatingValue;
    },
    resetEmail() {
      if (this.oldEmailValue) {
        this.valueForm = this.oldEmailValue;
        this.updateUser({...this.user,
          email: this.oldEmailValue
        });
        this.oldEmailValue = null;
      }
    },
    updateErrorMessageWithServerInfo(err) {
      this.resetEmail();
      this.updateErrorMessage(err.response.data.message);
      if (err.response.data.error) {
        this.errors[0] += ", il vous manque :";
        if (err.response.data.error.includes("min")) {
          this.updateErrorMessage("- au moins 8 caractères");
        }
        if (err.response.data.error.includes("uppercase")) {
          this.updateErrorMessage("- au moins une majuscule");
        }
        if (err.response.data.error.includes("lowercase")) {
          this.updateErrorMessage("- au moins une minuscule");
        }
        if (err.response.data.error.includes("digits")) {
          this.updateErrorMessage("- au moins un chiffre");
        }
      }
    },
    changeUpdatePassword() {
      this.resetErrorMessage();
      if (this.isUpdatingValue) {
        if (this.newPassword !== "" && this.checkPassword !== "" && this.checkPassword === this.newPassword) {
          this.callApiUpdatePasswordUser(
            this.newPassword,
            this.oldPassword
          ).then((res) => {
            this.newPassword = "";
            this.oldPassword = "";
            this.checkPassword = "";
            this.updateErrorMessage("Le mot de passe à bien été mis à jour.");
          }).catch(err => {
            this.updateErrorMessageWithServerInfo(err);
          });
        } else if (this.newPassword !== this.checkPassword) {
          this.updateErrorMessage("Les deux champs ne sont pas identiques");
        }
      }
      this.isUpdatingValue = !this.isUpdatingValue;
    },
    updateUserValue() {
      switch(this.type) {
        case 'firstname':
          if (this.validName(this.valueForm)) {
            this.updateUser({...this.user,
              firstname: this.valueForm
            });
          } else {
            this.valueForm = this.user.firstname;
            this.updateErrorMessage("Prénom invalide");
          }
          break;
        case 'lastname':
          if (this.validName(this.valueForm)) {
            this.updateUser({...this.user,
              lastname: this.valueForm
            });
          } else {
            this.valueForm = this.user.lastname;
            this.updateErrorMessage("Nom invalide");
          }
          break;
        case 'email':
          if (this.validEmail(this.valueForm)) {
            this.oldEmailValue = this.user.email;
            const emailMin = this.valueForm.toLowerCase();
            this.updateUser({...this.user,
              email: emailMin
            });
          } else {
            this.valueForm = this.user.email;
            this.updateErrorMessage("Adresse e-mail invalide");
          }
          break;
        case 'phraseDescription':
          this.updateUser({...this.user,
            phraseDescription: this.valueForm
          });
          break;
        case 'birthday':
          if (this.validBirthday(this.valueForm)) {
            this.updateUser({...this.user,
              birthday: this.valueForm
            });
          } else {
            this.valueForm = this.user.birthday;
            this.updateErrorMessage("Date de naissance invalide");
          }
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .info {
  height: 49px;
  background-color: $color-bg-line-1;
  color: $color-gradient-1;
  @include flex(row, center, space-between);
  width: 100%;
  &--border-top {
    border-radius: 10px 10px 0px 0px;
  }
  &--is-blue {
    color: $color-gradient-2;
    background-color: $color-bg-line-2;
  }
  &--border-bot {
    border-radius: 0px 0px 10px 10px;
  }
  p {
    margin: 0;
    padding: 15px 20px;
  }
  img {
    width: 28px;
    height: 28px;
    margin-right: 14px;
    object-fit: contain;
    cursor: pointer;
  }
  input {
    margin-left: 15px;
    padding: 5px 10px;
    border-radius: 20px;
    border: none;
    width: calc(100% - 100px);
    background-color: $color-bg-line-3;
    &::-webkit-datetime-edit-text { color: $color-gradient-1; padding: 0 0.1em; }
    &::-webkit-datetime-edit-month-field { color: $color-gradient-1; }
    &::-webkit-datetime-edit-day-field { color: $color-gradient-1; }
    &::-webkit-datetime-edit-year-field { color: $color-gradient-1; }
    &::-webkit-calendar-picker-indicator { filter: invert(1) brightness(0.8); }
  }
  &__password-inputs {
    height: 130px;
    input {
      margin-top: 5px;
      margin-bottom: 5px;
      &::placeholder {
        color: $color-gradient-2-placeholder;
      }
    }
  }
}

@include breakpoint(1279) {
  .info {
    height: 55px;
    &__password-inputs {
      height: 130px;
    }
  }
}
</style>