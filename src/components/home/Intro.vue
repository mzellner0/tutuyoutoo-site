<template>
  <div class="intro container">
    <img
      src="@/assets/images/home/traveler.svg"
      alt="voyageur"
    >
    <div class="intro__text">
      <h2>{{ $tr[$route.params.lang].introTitle }}</h2>
      <ul>
        <li>{{ $tr[$route.params.lang].intro1 }}</li>
        <li>{{ $tr[$route.params.lang].intro2 }}</li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Intro'
};
</script>

<style lang="scss" scoped>
.intro {
  width: 900px;
  padding: 0px 80px;
  padding-bottom: 100px;
  border-bottom: 2px solid $color-police-main;
  @include flex(row, flex-end, space-between);
  img {
    height: 360px;
  }
  &__text {
    width: 500px;
    h2 {
      font-size: 20px;
    }
    ul {
      padding-left: 20px;
      margin: 0;
      margin-bottom: 20px;
      li {
        font-size: 17px;
        color: $color-gradient-1;
        margin: 20px 0px;
        &:nth-of-type(2n) {
          color: $color-gradient-2;
        }
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
}

@include breakpoint(1279) {
  .intro {
    width: 600px;
    padding: 0px 60px;
    padding-bottom: 70px;
    @include flex(column, center, space-between);
    img {
      height: 220px;
    }
    &__text {
      width: 100%;
      margin-top: 40px;
      ul {
        margin-bottom: 0px;
      }
    }
  }
}

@include breakpoint(800) {
  .intro {
    width: 90%;
    padding: 0px;
    padding-bottom: 50px;
    align-items: flex-start;
    &__text {
      margin-top: 30px;
    }
  }
}

@include breakpoint(500) {
  .intro {
    img {
      height: 160px;
      margin-top: -67px;
    }
  }
}
</style>