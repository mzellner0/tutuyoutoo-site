<template>
  <div class="select-users">
    <div class="select-users__users">
      <p>Séléctionnez les participants :</p>
      <div class="select-users__user select-users__user--white">
        <input
          id="select-all"
          type="checkbox"
          name="select-all"
          :checked="selectAll"
          @click="selectAllUsers"
        >
        <label for="select-all">Tout séléctionner</label>
      </div>
      <div
        v-for="user in usersInGroup"
        :key="user.userId"
        class="select-users__user"
      >
        <input
          :id="user.userId"
          v-model="usersRandom"
          type="checkbox"
          :value="user.userId"
          name="userRandom"
          :checked="selectAll"
          @click="selectAll = false"
        >
        <label
          :for="user.userId"
        >
          {{ user.firstname }} {{ user.lastname }}
        </label>
      </div>
    </div>
    <Button
      :text="'C\'est parti !'"
      :on-click="submit"
      class="select-users__button"
    />
  </div>
</template>

<script>
import Button from "@/components/elmts/Button";
import { mapGetters, mapState, mapActions } from 'vuex';

export default {
  name: "SelectUser",
  components: {
    Button
  },
  emits: ["get-users-who-participate"],
  data() {
    return {
      usersRandom: [],
      selectAll: false
    };
  },
  computed: {
    ...mapState('groups', [
      'usersInGroup'
    ])
  },
  methods: {
    selectAllUsers() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.usersRandom = this.usersInGroup.map(user => user.userId);
      } else {
        this.usersRandom = [];
      }
    },
    submit() {
      this.$emit("get-users-who-participate", this.usersRandom);
    }
  },
};
</script>

<style lang="scss" scoped>
  .select-users {
    @include flex(column, center, center);
    margin-top: 20px;
    p {
      margin: 0px;
    }
    &__user {
      margin: 10px 0px;
      @include flex(row, center, flex-start);
      input {
        cursor: pointer;
        margin-right: 10px;
      }
      label {
        cursor: pointer;
        color: $color-gradient-1;
      }
      &:nth-child(2n) {
        label {
          color: $color-gradient-2;
        }
      }
      &--white {
        label {
          color: $color-police-main !important;
        }
      }
    }
    &__users {
      background-color: $color-bg-line-1;
      width: 330px;
      padding: 20px 30px;
      border-radius: 20px;
    }
    &__button {
      margin: 20px 0px;
    }
  }

  @include breakpoint(500) {
    .select-users {
      margin-top: 10px;
      width: 100%;
      &__users {
        width: calc(100% - 40px);
        padding: 20px 20px;
        border-radius: 15px;
      }
    }
  }
</style>