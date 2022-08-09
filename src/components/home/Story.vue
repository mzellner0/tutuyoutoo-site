<template>
  <div class="story">
    <h2 v-html="$tr[$route.params.lang].storyTitle1"></h2>
    <p v-html="$tr[$route.params.lang].story1"></p>
    <p v-html="$tr[$route.params.lang].story2"></p>
    <img
      :src="require('@/assets/images/home/plage.gif')"
      alt="plage"
    >
    <p v-html="$tr[$route.params.lang].story3"></p>
    <img
      :src="require('@/assets/images/home/rain.gif')"
      alt="pluie"
    >
    <p v-html="$tr[$route.params.lang].story4"></p>
    <p v-html="$tr[$route.params.lang].story5"></p>
    <p v-html="$tr[$route.params.lang].story6"></p>
    <p v-html="$tr[$route.params.lang].story7"></p>
    <img
      :src="require('@/assets/images/home/friends.gif')"
      alt="amis"
    >
    <h2 v-html="$tr[$route.params.lang].storyTitle2"></h2>
    <p v-html="$tr[$route.params.lang].story8"></p>
    <p v-html="$tr[$route.params.lang].story9"></p>
    <p v-html="$tr[$route.params.lang].story10"></p>
    <p v-html="$tr[$route.params.lang].story11"></p>
    <img
      :src="require('@/assets/images/home/why.gif')"
      alt="pourquoi"
    >
    <p v-html="$tr[$route.params.lang].story12"></p>
    <p v-html="$tr[$route.params.lang].story13"></p>
    <p>
      ...
    </p>
    <p v-html="$tr[$route.params.lang].story14"></p>
    <p v-html="$tr[$route.params.lang].story15"></p>
    <p v-html="$tr[$route.params.lang].story16"></p>
    <img
      :src="require('@/assets/images/home/race.gif')"
      alt="course"
    >
    <p v-html="$tr[$route.params.lang].story17"></p>
    <p v-html="$tr[$route.params.lang].story18"></p>
    <p v-html="$tr[$route.params.lang].story19"></p>
    <p v-html="$tr[$route.params.lang].story20"></p>
    <p v-html="$tr[$route.params.lang].story21"></p>
    <img
      :src="require('@/assets/images/home/desperate.gif')"
      alt="déséspéré"
    >
    <h2 v-html="$tr[$route.params.lang].storyTitle3"></h2>
    <p v-html="$tr[$route.params.lang].story22"></p>
    <img
      :src="require('@/assets/images/home/think.gif')"
      alt="réfléchir"
    >
    <p v-html="$tr[$route.params.lang].story23"></p>
    <p v-html="$tr[$route.params.lang].story24"></p>
    <p v-html="$tr[$route.params.lang].story25"></p>
    <p v-html="$tr[$route.params.lang].story26"></p>
    <p v-html="$tr[$route.params.lang].story27"></p>
    <p v-html="$tr[$route.params.lang].story28"></p>
    <p v-html="$tr[$route.params.lang].story29"></p>
    <p v-html="$tr[$route.params.lang].story30"></p>
    <h2 v-html="$tr[$route.params.lang].storyTitle4"></h2>
    <div class="story__profile" >
      <img
        :src="require('@/assets/images/home/profile.jpg')"
        alt="danser"
      >
      <p v-html="$tr[$route.params.lang].story31"></p>
    </div>
    <p v-html="$tr[$route.params.lang].story32"></p>
    <img
      :src="require('@/assets/images/home/dance.gif')"
      alt="danser"
    >
    <p v-html="$tr[$route.params.lang].story33"></p>
  </div>
</template>

<script>
export default {
  name: "Story"
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
    margin: 20px 0px;
    width: 420px;
  }
  h2, p {
    width: 100%;
  }
  h2 {
    text-decoration: underline;
    font-size: 20px;
  }
  /deep/ span {
      font-family: $police-2;
      font-style: italic;
  }
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