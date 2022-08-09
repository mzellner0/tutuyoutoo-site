<template>
  <div class="loader" />
</template>

<script>
export default {
  name: "LoaderCircle"
};
</script>

<style lang="scss" scoped>
  @keyframes turn {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }
  .loader {
    position: absolute;
    top: 20vh;
    left: calc(50% - 20px);
    background: transparent;
    height: 40px;
    width: 40px;
    border-radius: 100%;
    border-top: 5px solid $color-gradient-1;
    border-right: 5px solid $color-gradient-2;
    border-bottom: 5px solid $color-gradient-1;
    border-left: 5px solid $color-gradient-2;
    animation: turn 1200ms linear infinite;
  }
</style>