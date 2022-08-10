<template>
  <div class="features__container">
    <h2>{{ $tr[$route.params.lang].titleFeatures }}</h2>
    <ul class="features">
      <li
        v-for="(feature, index) in features"
        :key="index"
      >
        <div
          v-if="feature.alt != 'contacts'"
          class="features__text"
        >
          <p
            v-for="(text, indexT) in feature.texts"
            :key="indexT"
          >
            {{ text }}
          </p>
        </div>
        <div
          v-else
          class="features__text"
        >
          <p>
            {{ feature.texts[0] }} <span>{{ feature.texts[1] }}</span>
          </p>
        </div>
        <div class="features__img">
          <img
            :src="require(`@/assets/images/screens/${feature.img}`)"
            :alt="feature.alt"
          >
        </div>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  name: "Features",
  computed: {
    features() {
      return [
        {
          img: "phone-group.webp",
          bg: "money.svg",
          alt: "gestion des groupes",
          texts: [
            this.$tr[this.$route.params.lang].feature0
          ]
        },
        {
          img: "phone-calendar.webp",
          alt: "calendrier",
          texts: [
            this.$tr[this.$route.params.lang].feature5
          ]
        },
        {
          img: "phone-expense.webp",
          alt: "transfert d'argent",
          texts: [
            this.$tr[this.$route.params.lang].feature1a
          ]
        },
        {
          img: "phone-balance.webp",
          alt: "transfert d'argent",
          texts: [
            this.$tr[this.$route.params.lang].feature1b
          ]
        },
       {
          img: "phone-refund.webp",
          alt: "transfert d'argent",
          texts: [
            this.$tr[this.$route.params.lang].feature1c,
            this.$tr[this.$route.params.lang].feature1d,
            this.$tr[this.$route.params.lang].feature1e
          ]
        },
        {
          img: "phone-proposition.webp",
          alt: "proposition d'idées",
          texts: [
            this.$tr[this.$route.params.lang].feature2
          ]
        },
        {
          img: "phone-pool.webp",
          alt: "vote",
          texts: [
            this.$tr[this.$route.params.lang].feature3
          ]
        },
        {
          img: "phone-list-bag.webp",
          alt: "vote",
          texts: [
            this.$tr[this.$route.params.lang].feature9
          ]
        },
        {
          img: "phone-list-shop.webp",
          alt: "vote",
          texts: [
            this.$tr[this.$route.params.lang].feature10
          ]
        },
        {
          img: "phone-contact.webp",
          alt: "contacts",
          texts: [
            this.$tr[this.$route.params.lang].feature6a,
            this.$tr[this.$route.params.lang].feature6b
          ]
        },
        {
          img: "phone-random-result.webp",
          alt: "dés",
          texts: [
            this.$tr[this.$route.params.lang].feature7
          ]
        },
        {
          img: "phone-notif.webp",
          alt: "notification",
          texts: [
            this.$tr[this.$route.params.lang].feature4
          ]
        },
        {
          img: "phone-community.webp",
          alt: "notes",
          texts: [
            this.$tr[this.$route.params.lang].feature8
          ]
        },
        {
          img: "phone-list-perso.webp",
          alt: "vote",
          texts: [
            this.$tr[this.$route.params.lang].feature11
          ]
        },
        {
          img: "phone-profile.webp",
          alt: "vote",
          texts: [
            this.$tr[this.$route.params.lang].feature12
          ]
        },
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
$height-image: 600px;
$height-bg: 350px;
.features {
  padding: 0px;
  list-style: none;
  &--soon {
    opacity: 0.5;
  }
  li {
    @include flex(row, center, space-between);
    &:nth-of-type(2n) {
      flex-direction: row-reverse;
      .features__text {
        margin-left: 50px;
        margin-right: 0px;
      }
      .features__img {
        &::before {
          background-color: $color-bg-line-2;
        }
      }
    }
  }
  &__container {
    width: 900px;
    margin: 0;
    margin-top: 60px;
    padding: 0px 80px;
    padding-bottom: 50px;
    border-bottom: 2px solid $color-police-main;
    h2 {
      text-align: center;
      text-transform: uppercase;
      border-bottom: 2px solid #fff2d198;
      padding-bottom: 20px;
      width: 95%;
      margin-left: 2.5%;
    }
  }
  &__img {
    position: relative;
    img {
      height: $height-image;
      object-fit: contain;
      z-index: 1;
      position: relative;
      filter: saturate(1.3);
    }
    &::before {
      content: "";
      width: 300px;
      z-index: 0;
      height: $height-bg;
      background-color: $color-bg-line-1;
      position: absolute;
      top: calc((#{$height-image} - #{$height-bg}) / 2);
      left: -10px;
      border-radius: 50px;
      opacity: 0.3;
    }
    &::after {
      content: "";
      width: 247px;
      z-index: 0;
      height: 583px;
      position: absolute;
      top: 10px;
      left: 17px;
      border-radius: 39px;
      box-shadow: 0px 0px 20px  rgb(11, 13, 41);
    }
  }
  &__text {
    width: 500px;
    position: relative;
    margin-right: 50px;
    span {
      font-family: $police-2;
      font-style: italic;
    }
    &::before {
      content: "";
      position: absolute;
      left: -25px;
      top: 20px;
      width: 10px;
      height: 10px;
      background-color: $color-police-main;
      border-radius: 100%;
    }
  }
}

$height-image-medium: 500px;
$height-bg-medium: 300px;
@include breakpoint(1279) {
  .features {
    li {
      @include flex(column, center, flex-start);
      &:nth-of-type(2n) {
        flex-direction: column;
        .features__text {
          margin-left: 0px;
        }
      }
    }
    &__container {
      width: 600px;
      padding: 0px 60px;
      padding-bottom: 60px;
      h2 {
        width: 100%;
        border: none;
        padding: 0;
        margin-left: 0;
      }
    }
    &__text {
      width: 100%;
      margin-right: 0px;
    }
    &__img {
      margin: 10px 0px;
      img {
        height: $height-image-medium;
      }
      &::before {
        width: 256px;
        height: $height-bg-medium;
        top: calc((#{$height-image-medium} - #{$height-bg-medium}) / 2);
        border-radius: 30px;
      }
      &::after {
        content: "";
        width: 204px;
        height: 485px;
        top: 9px;
        left: 14px;
        border-radius: 27px;
      }
    }
  }
}

$height-image-small: 450px;
$height-bg-small: 280px;
@include breakpoint(800) {
  .features {
    &__container {
      width: calc(90% - 25px);
      padding: 0px;
      padding-left: 25px;
      padding-bottom: 45px;
      h2 {
        margin-left: -10px;
      }
    }
    &__img {
      margin: 10px 0px;
      margin-left: -23px;
      img {
        height: $height-image-small;
      }
      &::before {
        width: 233px;
        height: $height-bg-small;
        top: calc((#{$height-image-small} - #{$height-bg-small}) / 2);
        border-radius: 20px;
      }
      &::after {
        content: "";
        width: 184px;
        height: 435px;
        top: 9px;
        left: 14px;
        border-radius: 25px;
      }
    }
    &__text {
      &::before {
        top: 22px;
        width: 5px;
        height: 5px;
      }
    }
  }
}
</style>