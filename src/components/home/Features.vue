<template>
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
      <img
        :src="require(`@/assets/images/home/${feature.img}`)"
        :alt="feature.alt"
      >
    </li>
  </ul>
</template>

<script>

export default {
  name: "Features",
  computed: {
    features() {
      return [
        {
          img: "money.svg",
          alt: "transfert d'argent",
          texts: [
            this.$tr[this.$route.params.lang].feature1
          ]
        },
        {
          img: "idea.svg",
          alt: "proposition d'idées",
          texts: [
            this.$tr[this.$route.params.lang].feature2
          ]
        },
        {
          img: "vote.svg",
          alt: "vote",
          texts: [
            this.$tr[this.$route.params.lang].feature3
          ]
        },
        {
          img: "notification.svg",
          alt: "notification",
          texts: [
            this.$tr[this.$route.params.lang].feature4a,
            this.$tr[this.$route.params.lang].feature4b
          ]
        },
        {
          img: "calendar.svg",
          alt: "calendrier",
          texts: [
            this.$tr[this.$route.params.lang].feature5
          ]
        },
        {
          img: "contact.svg",
          alt: "contacts",
          texts: [
            this.$tr[this.$route.params.lang].feature6a,
            this.$tr[this.$route.params.lang].feature6b
          ]
        },
        {
          img: "dice.svg",
          alt: "dés",
          texts: [
            this.$tr[this.$route.params.lang].feature7
          ]
        },
        {
          img: "stars.svg",
          alt: "notes",
          texts: [
            this.$tr[this.$route.params.lang].feature8
          ]
        }
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
.features {
  width: 900px;
  margin: 0;
  margin-top: 60px;
  padding: 0px 80px;
  padding-bottom: 50px;
  border-bottom: 2px solid $color-police-main;
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
    }
  }
  img {
    width: 300px;
    height: 300px;
    object-fit: contain;
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

@include breakpoint(1279) {
  .features {
    width: 600px;
    padding: 0px 60px;
    padding-bottom: 60px;
    li {
      @include flex(column, center, flex-start);
      &:nth-of-type(2n) {
        flex-direction: column;
        .features__text {
          margin-left: 0px;
        }
      }
    }
    &__text {
      width: 100%;
      margin-right: 0px;
    }
    img {
      height: 160px;
      margin: 10px 0px;
    }
  }
}

@include breakpoint(800) {
  .features {
    width: calc(90% - 25px);
    padding: 0px;
    padding-left: 25px;
    padding-bottom: 45px;
    img {
      height: 140px;
      width: 230px;
      margin: 10px 0px;
      margin-left: -12px;
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