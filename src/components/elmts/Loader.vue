<template>
  <div class="loader-bar">
    <div
      class="loader-bar__percentage"
      :style="{ width: percentage + '%' }"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "Loader",
  computed: {
    ...mapState('loader', {
      percentage: state => state.percentage
    })
  }
};
</script>

<style lang="scss" scoped>
  .loader-bar {
    width: 150px;
    height: 5px;
    background-color: transparent;
    border: 2px solid $color-gradient-2;
    border-radius: 30px;
    padding: 4px;
    &__percentage {
      transition: 200ms;
      width: 100%;
      height: 100%;
      border-radius: 30px;
      background-image: $gradient-main;
    }
  }
</style>