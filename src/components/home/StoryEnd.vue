<template>
  <div class="story">
    <h2 v-html="$tr[$route.params.lang].storyEndTitle1"></h2>
    <p v-html="$tr[$route.params.lang].storyEnd1"></p>
    <img
      :src="require('@/assets/images/home/hero.gif')"
      alt="plage"
    >
  </div>
</template>

<script>
export default {
  name: "StoryEnd"
};
</script>

<style lang="scss" scoped>
.story {
  width: 700px;
  padding: 80px 80px;
  padding-bottom: 0px;
  text-align: left;
  @include flex(column, center, flex-start);
  img {
    margin: 0px;
    margin-top: 20px;
    width: 420px;
  }
  h2, p {
    width: 100%;
  }
  h2 {
    text-decoration: underline;
    font-size: 20px;
  }
  h3 {
    margin-top: 40px;
    text-align: center;
  }
  // /deep/ span {
  //     font-family: $police-2;
  //     font-style: italic;
  // }
  &__profile {
    @include flex(column, center, center);
    margin-top: 0px;
    margin-bottom: 0px;
    img {
      object-fit: contain;
      max-width: 200px;
      border-radius: 100%;
      margin: 20px 0px;
      border: 5px solid $color-gradient-1;
    }
  }
}

@include breakpoint(1279) {
  .story {
    width: 600px;
    padding: 60px 80px;
    padding-bottom: 0px;
    img {
      max-width: 400px;
      width: 100%;
    }
    &__profile {
      img {
        max-width: 150px;
        margin: 10px 0px;
        border: 4px solid $color-gradient-1;
      }
    }
  }
}

@include breakpoint(800) {
  .story {
    width: 90%;
    padding: 50px 0px;
    padding-bottom: 0px;
  }
}
</style>