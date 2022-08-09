<template>
  <div class="email container">
    <div
      class="email__version"
    >
      <p>
        L’application est en cours de développement et sera disponible courant <strong>Mai 2022</strong>, pile avant tes vacances de rêves de cet été !
      </p>
      <p>
        Tu veux être informé dès la sortie de l'application ?
      </p>
      <p>
        En échange de ta confiance, tu obtiendras <strong>un badge d’ambassadeur</strong> à côté de ton nom dans l’application, lors de ta première connexion, indiquant que tu as été un des tout premiers à tester cette application et à <strong>rejoindre la communauté.</strong>
      </p>
    </div>
    <Button
      class="email__button"
      :text="'Je veux être informé'"
      :large="true"
      :on-click="onClickGoEmail"
    />
  </div>
</template>

<script>
import Button from "@/components/elmts/Button";

export default {
  name: 'EmailAsk',
  components: {
    Button
  },
  methods: {
    onClickGoEmail() {
      this.$router.push({ name: "CollectEmails" });
    }
  }
};
</script>

<style lang="scss" scoped>
.email {
  width: 700px;
  padding: 90px 80px;
  padding-bottom: 75px;
  border-bottom: 2px solid $color-police-main;
  @include flex(column, center, flex-start);
  text-align: left;
  &__version {
    width: 100%;
    @include flex(column, center, flex-start);
  }
  img {
    margin: 20px 0px;
    width: 420px;
  }
  p {
    width: 100%;
  }
  span {
    text-decoration: underline;
    font-weight: bold;
  }
  &__button {
    margin: 20px;
  }
}

@include breakpoint(1279) {
  .email {
    width: 600px;
    padding: 60px 80px;
    padding-bottom: 55px;
    img {
      max-width: 400px;
      width: 100%;
    }
  }
}

@include breakpoint(800) {
  .email {
    width: 90%;
    padding: 50px 0px;
    padding-bottom: 45px;
  }
}
</style>