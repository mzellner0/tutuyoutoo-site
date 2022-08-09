<template>
  <LoaderCircle v-if="isSignupLoading" />
  <div
    v-else-if="!success"
    class="poll container"
  >
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
    <label for="answer">
      {{ $tr[$route.params.lang].poll1 }}
    </label>
    <textarea
      id="answer"
      v-model="content"
      name="answer"
    />
    <ErrorMessage
      :errors="errors"
    />
    <Button
      class="poll__button"
      :text="$tr[$route.params.lang].pollbutton"
      :large="true"
      :on-click="submit"
    />
  </div>
  <div
    v-else
    class="poll__success container"
  >
    <p>
      {{ $tr[$route.params.lang].poll2 }}
    </p>
    <Button
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
import PollService from "@/services/PollService";
export default {
  name: 'Poll',
  components: {
    Button,
    ErrorMessage,
    LoaderCircle
  },
  mixins: [validateInputMixin],
  data() {
    return {
      firstname: "",
      email: "",
      content: "",
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
        this.email !== "" &&
        this.content !== ""
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

        PollService.createAnswer(this.firstname, emailMin, this.content)
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
.poll {
  width: 700px;
  padding: 0px 80px;
  padding-bottom: 80px;
  margin: auto;
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
    padding: 20px;
    p {
      margin-bottom: 20px;
    }
  }
  label {
    margin: 20px 0px;
    width: 100%;
    text-align: left;
  }
  textarea {
    background-color: transparent;
    color: $color-gradient-1;
    border: solid 3px;
    padding: 15px 20px;
    border-radius: 30px;
    font-family: $police-1;
    font-size: 18px;
    width: calc(100% - 45px);
    min-height: 300px;
    outline: none;
    resize: none;
    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: $color-gradient-2;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: $color-gradient-1;
    }
  }
}

@include breakpoint(1279) {
  .poll {
    width: 600px;
    padding: 0px 60px;
    padding-bottom: 60px;
  }
}

@include breakpoint(800) {
  .poll {
    width: 86%;
    padding: 0px;
    padding-bottom: 60px;
  }
}
</style>