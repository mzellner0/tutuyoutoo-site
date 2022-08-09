<template>
  <div
    v-if="balancedList"
    class="balanced-list"
  >
    <div
      v-for="user in balancedList"
      :key="user.id"
      :class="[
        'balanced-list__user',
        { 'balanced-list__user--blue': Math.sign(user.balanced) == -1 },
        { 'balanced-list__user--white': user.balanced == 0 }
      ]"
    >
      <p>{{ user.firstname }} {{ user.lastname }}</p>
      <div>
        <span v-if="Math.sign(user.balanced) == 1">+</span>
        {{ user.balanced.toFixed(2) }} €
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "Balanced",
  computed: {
    ...mapState('expenses', {
      balancedList: state => state.balancedList
    }),
  }
};
</script>

<style lang="scss" scoped>
  .balanced-list {
    margin-top: 30px;
    position: relative;
    @include flex(column, flex-start, center);
    &::before {
      content: "";
      position: absolute;
      width: 3px;
      background-color: $color-police-main;
      top: 0;
      bottom: 0;
      left: 50%;
    }
    &__user {
      @include flex(row, center, space-between);
      width: 100%;
      border-bottom: 2px dotted;
      color: $color-gradient-1;
      padding: 10px 0px;
      div {
        margin-right: calc(50% - 195px);
        color: $color-bg;
        background-color: $color-gradient-1;
        padding: 10px 5px;
        width: 160px;
        text-align: left;
        padding-left: 30px;
      }
      &--blue {
        color: $color-gradient-2;
        div {
          margin-right: 50%;
          background-color: $color-gradient-2;
          text-align: right;
          padding-right: 30px;
          padding-left: 5px;
        }
      }
      &--white {
        color: $color-police-main;
        div {
          color: $color-police-main;
          background-color: transparent;
        }
      }
    }
  }

  @include breakpoint(800) {
    .balanced-list {
      margin-top: 20px;
      &__user {
        p {
          width: 45%;
          text-align: right;
        }
        div {
          margin-right: calc(50% - 145px);
          width: 120px;
          padding-left: 20px;
          font-size: 15px;
        }
        &--blue {
          @include flex(row-reverse, center, space-between);
          p {
            text-align: left;
          }
          div {
            margin-left: calc(50% - 145px);
            margin-right: 0;
            padding-right: 20px;
            padding-left: 5px;
          }
        }
      }
    }
  }
</style>