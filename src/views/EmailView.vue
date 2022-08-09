<template>
  <div class="email container">
    <div class="email__menu">
      <router-link
        :to="`/${$route.params.lang === 'fr' ? 'en' : 'fr'}/email`"
      >
        {{ $route.params.lang === "fr" ? "en" : "fr" }}
      </router-link>
    </div>
    <TitlePage />
    <Email
      class="email__email"
      :button-is-visible="true"
    />
  </div>
</template>

<script>
import Email from "@/components/home/Email";
import TitlePage from "@/components/elmts/TitlePage";

export default {
  name: 'EmailView',
  components: {
    Email,
    TitlePage
  }
};
</script>

<style lang="scss" scoped>
  .email {
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
    &__email {
      margin-top: 510px !important;
      z-index: 1;
      border: none;
    }
  }

  @include breakpoint(1279) {
    .email {
      &__email {
        margin-top: 532px !important;
      }
    }
  }

  @include breakpoint(500) {
    .email {
      &__email {
        margin-top: 374px !important;
      }
    }
  }
</style>
