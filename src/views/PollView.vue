<template>
  <div class="poll container">
    <div class="poll__menu">
      <router-link
        :to="`/${$route.params.lang === 'fr' ? 'en' : 'fr'}/poll`"
      >
        {{ $route.params.lang === "fr" ? "en" : "fr" }}
      </router-link>
    </div>
    <TitlePage />
    <Poll class="poll__poll" />
  </div>
</template>

<script>
import Poll from "@/components/home/Poll";
import TitlePage from "@/components/elmts/TitlePage";

export default {
  name: 'PollView',
  components: {
    Poll,
    TitlePage
  }
};
</script>

<style lang="scss" scoped>
  .poll {
    &__menu {
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
    &__poll {
      margin-top: 580px;
      z-index: 1;
    }
  }

  @include breakpoint(1279) {
    .poll {
      &__poll {
        margin-top: 587px;
      }
    }
  }

  @include breakpoint(500) {
    .poll {
      &__poll {
        margin-top: 424px;
      }
    }
  }
</style>
