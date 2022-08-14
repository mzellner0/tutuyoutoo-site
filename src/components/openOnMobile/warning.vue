<template>
  <div class="warning">
    <h4>{{ $tr[$route.params.lang].openOnMobile }}</h4>
  </div>
</template>

<script>

export default {
  name: "WarningOpen",
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