<template>
  <div class="result">
    <div class="result__list">
      <p>Résultat :</p>
      <ul>
        <li
          v-for="(participant, index) in listWinnersOrdered"
          :key="index"
          class="result__user"
        >
          <p>
            {{ index + 1 }}.
            {{ getParticipant(participant).firstname }}
            {{ getParticipant(participant).lastname }}
          </p>
        </li>
      </ul>
    </div>
    <Button
      :text="'Faire un autre tirage'"
      :on-click="submit"
      class="result__button"
      :large="true"
    />
  </div>
</template>

<script>
import Button from "@/components/elmts/Button";
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
  name: "Result",
  components: {
    Button
  },
  props: {
    listWinnersOrdered: { type: Array, default: null }
  },
  emits: ["reset"],
  computed: {
    ...mapState('groups', [
      'usersInGroup'
    ])
  },
  methods: {
    submit() {
      this.$emit("reset");
    },
    getParticipant(id) {
      return this.usersInGroup.filter(participant =>  {
        return participant.userId === id;
      })[0];
    }
  }
};
</script>

<style lang="scss" scoped>
  .result {
    @include flex(column, center, center);
    margin-top: 20px;
    p {
      margin: 0px;
    }
    ul {
      padding: 0px;
      margin: 0;
    }
    &__user {
      margin: 10px 0px;
      @include flex(row, center, flex-start);
      color: $color-gradient-1;
      &:nth-child(2n) {
        color: $color-gradient-2;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
    &__list {
      background-color: $color-bg-line-1;
      border: 2px solid $color-gradient-1;
      width: 330px;
      padding: 20px 30px;
      border-radius: 20px;
    }
    &__button {
      margin: 20px 0px;
    }
  }

  @include breakpoint(500) {
    .result {
      margin-top: 10px;
      width: 100%;
      &__list {
        width: calc(100% - 40px);
        padding: 20px 20px;
        border-radius: 15px;
      }
    }
  }
</style>