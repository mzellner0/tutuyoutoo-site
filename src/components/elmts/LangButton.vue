<template>
  <div class="menu">
    <router-link
      :to="`/${$route.params.lang === 'fr' ? 'en' : 'fr'}`"
    >
      {{ $route.params.lang === "fr" ? "en" : "fr" }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'LangButton',
};
</script>

<style lang="scss" scoped>
  .menu {
    position: fixed;
    top: 30px;
    right: 20px;
    z-index: 10;
    a {
      background-color: $color-bg;
      border: 2px solid $color-police-main;
      color: $color-police-main;
      padding: 10px;
      border-radius: 10px;
      font-size: 15px;
      cursor: pointer;
      width: 20px;
    }
  }
</style>
