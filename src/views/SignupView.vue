<template>
  <div class="signup container">
    <TopAuth :title="'Inscrivez-vous'" />
    <Signup class="signup__form" />
  </div>
</template>

<script>
import TopAuth from "@/components/auth/TopAuth";
import Signup from "@/components/auth/Signup";

export default {
  name: 'SignupView',
  components: {
    TopAuth,
    Signup
  }
};
</script>

<style lang="scss" scoped>
  .signup {
    &__form {
      margin-top: 350px;
    }
  }

  @include breakpoint(1279) {
    .signup {
      &__form {
        margin-top: 300px;
      }
    }
  }

  @include breakpoint(500) {
    .signup {
      &__form {
        margin-top: 220px;
      }
    }
  }
</style>
