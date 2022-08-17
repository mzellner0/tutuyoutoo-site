<template>
  <div class="warning">
    <h4>{{ text }}</h4>
  </div>
</template>

<script>

export default {
  name: "Warning",
  props: {
    text: { type: String, required: true }
  }
};
</script>

<style lang="scss" scoped>
  .warning {
    border-bottom: 2px solid $color-police-main;
    padding-bottom: 60px;
    h4 {
        font-size: 20px;
        text-align: center;
    }
  }

  @include breakpoint(800) {
    .warning {
      padding-bottom: 40px;
    }
  }
</style>