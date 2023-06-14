<template>
  <div
    :class="[
      'features__container',
      { 'features__container--isNotTitle': !isTitle }
    ]"
  >
    <h2 v-if="isTitle">
      {{ $tr[$route.params.lang].titleFeatures }}
    </h2>
    <ul class="features">
      <li
        v-for="(feature, index) in features"
        :key="index"
      >
        <div
          v-if="feature.alt != 'contacts'"
          class="features__text"
        >
          <h3>
            {{ feature.title }}
          </h3>
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
          <h3>
            {{ feature.title }}
          </h3>
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
  props: {
    isTitle: { type: Boolean, default: true }
  },
  computed: {
    features() {
      return [
        {
          img: "phone-group.webp",
          bg: "money.svg",
          alt: "gestion des groupes",
          texts: [
            this.$tr[this.$route.params.lang].feature0
          ],
          title: this.$tr[this.$route.params.lang].feature0Title
        },
        {
          img: "phone-calendar.webp",
          alt: "calendrier",
          texts: [
            this.$tr[this.$route.params.lang].feature5
          ],
          title: this.$tr[this.$route.params.lang].feature5Title
        },
        {
          img: "phone-expense.webp",
          alt: "equilibre",
          texts: [
            this.$tr[this.$route.params.lang].feature1a
          ],
          title: this.$tr[this.$route.params.lang].feature1aTitle
        },
        {
          img: "phone-balance.webp",
          alt: "dépenses",
          texts: [
            this.$tr[this.$route.params.lang].feature1b
          ],
          title: this.$tr[this.$route.params.lang].feature1bTitle
        },
       {
          img: "phone-refund.webp",
          alt: "remboursements",
          texts: [
            this.$tr[this.$route.params.lang].feature1c,
            this.$tr[this.$route.params.lang].feature1d,
            this.$tr[this.$route.params.lang].feature1e
          ],
          title: this.$tr[this.$route.params.lang].feature1cTitle
        },
        {
          img: "phone-chat.webp",
          alt: "chat",
          texts: [
            this.$tr[this.$route.params.lang].feature14
          ],
          title: this.$tr[this.$route.params.lang].feature14Title
        },
        {
          img: "phone-podium.webp",
          alt: "podium",
          texts: [
            this.$tr[this.$route.params.lang].feature13a,
            this.$tr[this.$route.params.lang].feature13b,
            this.$tr[this.$route.params.lang].feature13c
          ],
          title: this.$tr[this.$route.params.lang].feature13Title
        },
        {
          img: "phone-proposition.webp",
          alt: "propositions",
          texts: [
            this.$tr[this.$route.params.lang].feature2
          ],
          title: this.$tr[this.$route.params.lang].feature2Title
        },
        {
          img: "phone-pool.webp",
          alt: "sondages",
          texts: [
            this.$tr[this.$route.params.lang].feature3
          ],
          title: this.$tr[this.$route.params.lang].feature3Title
        },
        {
          img: "phone-documents.webp",
          alt: "liste des sacs",
          texts: [
            this.$tr[this.$route.params.lang].feature17a,
            this.$tr[this.$route.params.lang].feature17b,
            this.$tr[this.$route.params.lang].feature17c
          ],
          title: this.$tr[this.$route.params.lang].feature17Title
        },
        {
          img: "phone-list-bag.webp",
          alt: "liste des sacs",
          texts: [
            this.$tr[this.$route.params.lang].feature9
          ],
          title: this.$tr[this.$route.params.lang].feature9Title
        },
        {
          img: "phone-list-shop.webp",
          alt: "liste de course",
          texts: [
            this.$tr[this.$route.params.lang].feature10
          ],
          title: this.$tr[this.$route.params.lang].feature10Title
        },
        {
          img: "phone-contact.webp",
          alt: "contacts",
          texts: [
            this.$tr[this.$route.params.lang].feature6a,
            this.$tr[this.$route.params.lang].feature6b
          ],
          title: this.$tr[this.$route.params.lang].feature6Title
        },
        {
          img: "phone-random-result.webp",
          alt: "dés",
          texts: [
            this.$tr[this.$route.params.lang].feature7
          ],
          title: this.$tr[this.$route.params.lang].feature7Title
        },
        {
          img: "phone-photos.webp",
          alt: "photos",
          texts: [
            this.$tr[this.$route.params.lang].feature15
          ],
          title: this.$tr[this.$route.params.lang].feature15Title
        },
        // {
        //   img: "phone-album.webp",
        //   alt: "albums",
        //   texts: [
        //     this.$tr[this.$route.params.lang].feature16a,
        //     this.$tr[this.$route.params.lang].feature16b,
        //     this.$tr[this.$route.params.lang].feature16c,
        //     this.$tr[this.$route.params.lang].feature16d
        //   ],
        //   title: this.$tr[this.$route.params.lang].feature16Title
        // },
        {
          img: "phone-notif.webp",
          alt: "notification",
          texts: [
            this.$tr[this.$route.params.lang].feature4
          ],
          title: this.$tr[this.$route.params.lang].feature4Title
        },
        // {
        //   img: "phone-community.webp",
        //   alt: "recommandations",
        //   texts: [
        //     this.$tr[this.$route.params.lang].feature8
        //   ],
        //   title: this.$tr[this.$route.params.lang].feature8Title
        // },
        {
          img: "phone-list-perso.webp",
          alt: "liste de ton sac",
          texts: [
            this.$tr[this.$route.params.lang].feature11
          ],
          title: this.$tr[this.$route.params.lang].feature11Title
        },
        {
          img: "phone-profile.webp",
          alt: "profil",
          texts: [
            this.$tr[this.$route.params.lang].feature12
          ],
          title: this.$tr[this.$route.params.lang].feature12Title
        },
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
$height-image: 600px;
$height-bg: 350px;
.features {
  padding: 0px;
  margin-top: 40px;
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
    &--isNotTitle {
      margin-top: 20px !important;
    }
    h2 {
      text-align: center;
      text-transform: uppercase;
      border-bottom: 2px solid #fff2d198;
      padding-bottom: 20px;
      width: 95%;
      margin-left: 2.5%;
    }
    h3 {
      font-weight: bold;
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
      top: 8px;
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
    margin-top: 20px;
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
      &--isNotTitle {
        margin-top: 10px !important;
      }
    }
    &__text {
      margin-top: 30px;
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
      &--isNotTitle {
        margin-top: 0px !important;
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
      margin-top: 20px;
      &::before {
        top: 10px;
        width: 5px;
        height: 5px;
      }
    }
  }
}
</style>