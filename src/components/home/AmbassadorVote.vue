<template>
  <div
    v-if="loading"
    class="vote container"
  >
    <LoaderCircle />
  </div>
  <div
    v-else-if="!success"
    class="vote container"
  >
    <p
      class="vote__info"
      v-html="$tr[$route.params.lang].vote"
    />
    <div
      v-for="(choice, index) in choices"
      :key="index"
      class="vote__choice"
    >
      <input
        :id="choice.value"
        v-model="ambassador"
        type="radio"
        name="ambassador"
        :value="choice.value"
      >
      <label :for="choice.value">{{ choice.name }}</label>
    </div>
    <input
      v-model="email"
      class="vote__input"
      type="email"
      :placeholder="$tr[$route.params.lang].email"
    >
    <ErrorMessage
      :errors="errors"
    />
    <Button
      class="vote__button"
      :text="$tr[$route.params.lang].voteButton"
      :on-click="submit"
    />
  </div>
  <div
    v-else
    :class="['vote', { 'vote__success': buttonIsVisible }, 'container']"
  >
    <p>
      {{ $tr[$route.params.lang].voteResponse }}
    </p>
    <div class="vote__current-result">
      <div
        :class="[
          'vote__current-result__result',
          { 'vote__current-result__result--blue':
            miloPercentage < beaufortPercentage &&
            miloPercentage < dentDeLaitPercentage
          }
        ]"
      >
        <div
          class="fill"
          :style="{
            width: miloPercentage.toString() + '%'
          }"
        />
        <p>Milo :</p>
        <p>{{ listAmbassadorVotes.miloCount }}</p>
      </div>
      <div
        :class="[
          'vote__current-result__result',
          { 'vote__current-result__result--blue':
            beaufortPercentage < miloPercentage &&
            beaufortPercentage < dentDeLaitPercentage
          }
        ]"
      >
        <div
          class="fill"
          :style="{
            width: beaufortPercentage.toString() + '%'
          }"
        />
        <p>Beaufort :</p>
        <p>{{ listAmbassadorVotes.beaufortCount }}</p>
      </div>
      <div
        :class="[
          'vote__current-result__result',
          { 'vote__current-result__result--blue':
            dentDeLaitPercentage < beaufortPercentage &&
            dentDeLaitPercentage < miloPercentage
          }
        ]"
      >
        <div
          class="fill"
          :style="{
            width: dentDeLaitPercentage.toString() + '%'
          }"
        />
        <p>Dent De Lait :</p>
        <p>{{ listAmbassadorVotes.dentDeLaitCount }}</p>
      </div>
    </div>
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
import AmbassadorVoteService from "@/services/AmbassadorVoteService";
import { mapActions, mapState } from 'vuex';
export default {
  name: 'AmbassadorVote',
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
      email: "",
      errors: [],
      loading: false,
      success: false,
      ambassador: "",
      choices: [
        {
          name: "Milo",
          value: "milo"
        },
        {
          name: "Beaufort",
          value: "beaufort"
        },
        {
          name: "Dent De Lait",
          value: "dentdelait"
        }
      ]
    };
  },
  computed: {
    ...mapState('ambassadorVote', {
      listAmbassadorVotes: state => state.listAmbassadorVotes
    }),
    totalCount() {
      return (
        this.listAmbassadorVotes.miloCount +
        this.listAmbassadorVotes.beaufortCount +
        this.listAmbassadorVotes.dentDeLaitCount
      );
    },
    miloPercentage() {
      return this.listAmbassadorVotes.miloCount / this.totalCount * 100;
    },
    beaufortPercentage() {
      return this.listAmbassadorVotes.beaufortCount / this.totalCount * 100;
    },
    dentDeLaitPercentage() {
      return this.listAmbassadorVotes.dentDeLaitCount / this.totalCount * 100;
    }
  },
  methods: {
    ...mapActions('ambassadorVote', [
      'updateListAmbassadorVotes'
    ]),
    submit(event) {
      event.preventDefault();
      this.errors = [];

      if(
        this.ambassador !== "" &&
        this.email !== ""
      ) {
        if (localStorage.getItem('hasAlreadyVote') === 'true') {
          this.errors.push(this.$tr[this.$route.params.lang].voteError1);
          return;
        }
        let emailMin;
        if (this.validEmail(this.email)) {
          emailMin = this.email.toLowerCase();
        } else {
          this.errors.push(this.$tr[this.$route.params.lang].pollError2);
          return;
        }

        this.loading = true;

        AmbassadorVoteService.addVote(this.ambassador, emailMin)
        .then(async res => {
          await this.updateListAmbassadorVotes();
          localStorage.setItem('hasAlreadyVote', 'true');
          this.loading = false;
          this.success = true;
        })
        .catch(err => {
          this.loading = false;
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
.vote {
  width: 700px;
  padding: 80px 80px;
  position: relative;
  margin: auto;
  border-bottom: 2px solid $color-police-main;
  /deep/ .loader {
    top: calc(50% - 25px);
  }
  &__input {
    background-color: transparent;
    color: $color-gradient-1;
    border: solid 3px;
    padding: 10px 20px;
    border-radius: 60px;
    margin: 5px 0px;
    margin-top: 15px;
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
  &__choice {
    @include flex(row, baseline, flex-start);
    width: 100%;
    margin: 5px 0px;
    input {
      margin-right: 10px;;
      cursor: pointer;
    }
    label {
      cursor: pointer;
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
  &__current-result {
    width: 100%;
    margin-bottom: 30px;
    div {
      margin: 10px 0px;
      border-radius: 30px;
    }
    &__result {
      position: relative;
      border: 2px solid $color-gradient-1;
      width: 100%;
      @include flex(row, center, flex-start);
      height: 40px;
      z-index: 1;
      p {
        margin: 10px 0px;
        color: $color-gradient-1;
        &:first-of-type {
          margin-right: 5px;
          padding-left:30px;
        }
      }
      .fill {
        background-color: $color-gradient-1-fade;
        position: absolute;
        top: -12px;
        left: -2px;
        width: 100%;
        height: 44px;
        z-index: 0;
        border: none;
        border-radius: 30px 0px 0px 30px;
      }
      &--blue {
        border: 2px solid $color-gradient-2;
        .fill {
          background-color: $color-gradient-2-fade;
        }
        p {
          color: $color-gradient-2;
        }
      }
    }
  }
  &__info {
    margin: 15px 0px;
    width: 100%;
    text-align: left;
  }
}

@include breakpoint(1279) {
  .vote {
    width: 600px;
    padding: 60px 60px;
  }
}

@include breakpoint(800) {
  .vote {
    width: 86%;
    padding: 60px 0px;
  }
}
</style>