<template>
  <div class="login container">
    <TopAuth :title="'Connectez-vous'" />
    <Login class="login__form" />
  </div>
</template>

<script>
import Login from "@/components/auth/Login";
import TopAuth from "@/components/auth/TopAuth";

export default {
  name: 'LoginView',
  components: {
    Login,
    TopAuth
  }
};
</script>

<style lang="scss" scoped>
  .login {
    &__form {
      margin-top: 350px;
    }
  }

  @include breakpoint(1279) {
    .login {
      &__form {
        margin-top: 300px;
      }
    }
  }

  @include breakpoint(500) {
    .login {
      &__form {
        margin-top: 220px;
      }
    }
  }
</style>
