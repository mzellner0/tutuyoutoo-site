<template>
  <div
    v-if="isSignupLoading"
    class="email container"
  >
    <LoaderCircle />
  </div>
  <div
    v-else-if="!success"
    class="email container"
  >
    <p
      class="email__info"
      v-html="$tr[$route.params.lang].help1p1"
    />
    <p
      class="email__info"
      v-html="$tr[$route.params.lang].help1p2"
    />
    <input
      v-model="firstname"
      type="text"
      :placeholder="$tr[$route.params.lang].firstname"
    >
    <input
      v-model="email"
      type="email"
      :placeholder="$tr[$route.params.lang].email"
    >
    <ErrorMessage
      :errors="errors"
    />
    <Button
      class="email__button"
      :text="$tr[$route.params.lang].help1button2"
      :large="true"
      :on-click="submit"
    />
  </div>
  <div
    v-else
    :class="['email', { 'email__success': buttonIsVisible }, 'container']"
  >
    <p>
      {{ $tr[$route.params.lang].helpResponse }}
    </p>
    <Button
      v-if="buttonIsVisible"
      :text="$tr[$route.params.lang].back"
      :extra-large="true"
      :on-click="onClickGoBack"
    />
  </div>
</template>

<script>
import Button from "@/components/elmts/Button";
import ErrorMessage from "@/components/elmts/ErrorMessage";
import LoaderCircle from "@/components/elmts/LoaderCircle";
import validateInputMixin from "@/mixins/validateInputMixin";
import CollectEmailsService from "@/services/CollectEmailsService";
export default {
  name: 'Email',
  components: {
    Button,
    ErrorMessage,
    LoaderCircle
  },
  mixins: [validateInputMixin],
  props: {
    buttonIsVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      firstname: "",
      email: "",
      errors: [],
      isSignupLoading: false,
      success: false
    };
  },
  methods: {
    submit(event) {
      event.preventDefault();
      this.errors = [];

      if(
        this.firstname !== "" &&
        this.email !== ""
      ) {
        let emailMin;
        if (this.validEmail(this.email)) {
          emailMin = this.email.toLowerCase();
        } else {
          this.errors.push(this.$tr[this.$route.params.lang].pollError2);
          return;
        }

        if (!this.validName(this.firstname)) {
          this.errors.push(this.$tr[this.$route.params.lang].pollError3);
          return;
        }

        this.isSignupLoading = true;

        CollectEmailsService.addEmail(this.firstname, emailMin)
        .then(res => {
          this.isSignupLoading = false;
          this.success = true;
        })
        .catch(err => {
          this.isSignupLoading = false;
          this.errors.push(err.response.data.message);
        });
      } else {
        this.errors.push(this.$tr[this.$route.params.lang].pollError1);
      }
    },
    onClickGoBack() {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>

<style lang="scss" scoped>
.email {
  width: 700px;
  padding: 80px 80px;
  position: relative;
  margin: auto;
  border-bottom: 2px solid $color-police-main;
  /deep/ .loader {
    top: calc(50% - 25px);
  }
  input {
    background-color: transparent;
    color: $color-gradient-1;
    border: solid 3px;
    padding: 10px 20px;
    border-radius: 60px;
    margin: 5px 0px;
    font-family: $police-1;
    outline: none;
    font-size: 18px;
    width: calc(100% - 45px);
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
  }
  &__button {
    margin: 20px 0px;
  }
  &__success {
    p {
      margin-bottom: 30px;
    }
  }
  &__info {
    margin: 15px 0px;
    width: 100%;
    text-align: left;
    &:last-of-type {
      margin-bottom: 30px;
    }
  }
}

@include breakpoint(1279) {
  .email {
    width: 600px;
    padding: 60px 60px;
  }
}

@include breakpoint(800) {
  .email {
    width: 86%;
    padding: 60px 0px;
  }
}
</style>