<template>
  <div class="help container">
    <div
      v-if="short"
      class="help__version"
    >
      <p v-html="$tr[$route.params.lang].help2p1"></p>
    </div>
    <div
      v-else
      class="help__version"
    >
      <p v-html="$tr[$route.params.lang].help3p1"></p>
      <img
        :src="require(
          `@/assets/images/home/${
            $route.params.lang === 'fr' ?
              'help' :
              'help-en'
          }.gif`
        )"
        alt="help"
      >
      <p v-html="$tr[$route.params.lang].help3p2"></p>
      <p v-html="$tr[$route.params.lang].help3p3"></p>
      <p v-html="$tr[$route.params.lang].help3p4"></p>
      <p v-html="$tr[$route.params.lang].help3p5"></p>
    </div>
    <Button
      class="help__button"
      :text="$tr[$route.params.lang].help2button"
      :extra-large="true"
      :on-click="onClickGoPoll"
    />
  </div>
</template>

<script>
import Button from "@/components/elmts/Button";

export default {
  name: 'Help',
  components: {
    Button
  },
  props: {
    short: { type: Boolean, default: false }
  },
  methods: {
    onClickGoPoll() {
      this.$router.push({ name: "Poll" });
    }
  }
};
</script>

<style lang="scss" scoped>
.help {
  width: 900px;
  padding: 90px 80px;
  padding-bottom: 75px;
  border-bottom: 2px solid $color-police-main;
  text-align: center;
  @include flex(column, center, flex-start);
  &__version {
    width: 100%;
    @include flex(column, center, flex-start);
  }
  img {
    margin: 20px 0px;
    width: 420px;
  }
  /deep/ span {
    text-decoration: underline;
    font-weight: bold;
  }
  &__button {
    margin: 20px;
  }
}

@include breakpoint(1279) {
  .help {
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
  .help {
    width: 90%;
    padding: 50px 0px;
    padding-bottom: 45px;
  }
}
</style>