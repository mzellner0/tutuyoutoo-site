<template>
  <div class="percent-bar">
    <div
      class="percent-bar__percentage"
      :style="{ width: percentage + '%' }"
    />
  </div>
</template>

<script>

export default {
  name: "PercentBar",
  props: {
    percentage: { type: Number, default: 0 }
  }
};
</script>

<style lang="scss" scoped>
  .percent-bar {
    width: 150px;
    height: 5px;
    background-color: transparent;
    border: 2px solid $color-gradient-2;
    border-radius: 30px;
    padding: 4px;
    overflow: hidden;
    &__percentage {
      transition: 200ms;
      width: 100%;
      height: 100%;
      border-radius: 30px;
      background-image: $gradient-main;
    }
  }
</style>