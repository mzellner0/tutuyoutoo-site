<template>
  <div class="home container">
    <div class="home__menu">
      <router-link
        class="form__link"
        :to="`/${$route.params.lang === 'fr' ? 'en' : 'fr'}`"
      >
        {{ $route.params.lang === "fr" ? "en" : "fr" }}
      </router-link>
    </div>
    <a :href="tryOpenLink()" @click="clickOnDownload">
      <Button
        class="home__button"
        :text="$tr[$route.params.lang].help1button1"
        :small-text="true"
      />
    </a>
    <div
      class="home__top"
      :style="{ 'background-image': `url(${getImageBg()})` }"
    >
      <img
        class="home__top__logo"
        src="@/assets/images/logo2.png"
        alt="logo"
      >
      <div class="home__title">
        <img
          src="@/assets/images/tutuyoutoo.svg"
          alt="Tutuyoutoo"
        >
        <p>{{ $tr[$route.params.lang].subtitle }}</p>
      </div>
    </div>
    <Intro class="home__intro" />
    <Articles />
    <DownloadApp />
    <Features />
    <!-- <Email id="email-section" /> -->
    <Help :short="true" />
    <Social />
    <Story />
    <Features class="home__features" />
    <DownloadApp :is-last="true" />
    <!-- <Help class="home__help" /> -->
  </div>
</template>

<script>
import Intro from "@/components/home/Intro";
import Features from "@/components/home/Features";
import responsiveMixin from "@/mixins/responsiveMixin";
import Help from "@/components/home/Help";
import Email from "@/components/home/Email";
import Story from "@/components/home/Story";
import Social from "@/components/home/Social";
import Button from "@/components/elmts/Button";
import DownloadApp from "@/components/home/DownloadApp";
import Articles from "@/components/home/Articles";

export default {
  name: 'HomeView',
  components: {
    Intro,
    DownloadApp,
    Features,
    Help,
    Story,
    Email,
    Button,
    Social,
    Articles
  },
  mixins: [responsiveMixin],
  methods: {
    tryOpenLink() {
      return this.isOnIOS()
        ? 'https://apps.apple.com/fr/app/tutuyoutoo/id1623327908'
        : this.isOnAndroid() ?
          'https://play.google.com/store/apps/details?id=com.tutuyoutoo.app'
        : '#download';
    },
    clickOnDownload() {
      fbq(
        'trackCustom',
        'clickDownload',
        {
          device: navigator.userAgent
        }
      );
    },
    getImageBg() {
      if (this.isOnDesktop) {
        return require('../assets/images/bg-line-1-desktop.png');
      } else if (this.isOnTablet) {
        return require('../assets/images/bg-line-1-tablet.png');
      } else if (this.isOnPhone) {
        return require('../assets/images/bg-line-1-phone.png');
      }
    },
    isOnAndroid() {
      return /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    },
    isOnIOS() {
      return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform)
      // iPad on iOS 13 detection
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    }
  }
};
</script>

<style lang="scss" scoped>
  .home {
    margin-bottom: 100px;
    &__menu {
      position: fixed;
      top: 30px;
      right: 20px;
      z-index: 10;
      a {
        background-color: $color-bg;
        border: 2px solid $color-police-main;
        color: $color-police-main;
        padding: 10px;
        border-radius: 10px;
        font-size: 15px;
        cursor: pointer;
        width: 20px;
      }
    }
    &__top {
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      text-align: center;
      background-repeat: no-repeat;
      background-size: cover;
      height: 1170px;
      background-position: bottom;
      &__logo {
        margin-top: $space-top-bot;
        width: 180px;
      }
    }
    &__title {
      p {
        margin-top: 0px;
      }
      img {
        // font-size: 70px;
        margin: 15px 0px;
        width: 540px;
      }
    }
    &__intro {
      margin-top: 360px;
      z-index: 1;
    }
    &__features {
      max-width: 700px;
      margin-top: 0;
    }
    &__help {
      border: none;
      padding-bottom: 0;
    }
    &__button {
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 5;
    }
  }

  @include extraLargeScreen() {
    .home {
      &__top {
        background-position: top;
        background-size: 100% 1070px;
      }
    }
  }

  @include breakpoint(1279) {
    .home {
      &__intro {
        margin-top: 340px;
      }
      &__title {
        img {
          width: 430px;
        }
      }
    }
  }

  @include breakpoint(500) {
    .home {
      &__top {
        background-repeat: no-repeat;
        background-size: cover;
        height: 545px;
        background-position: bottom;
        &__logo {
          width: 140px;
        }
      }
      &__intro {
        margin-top: 360px;
      }
      &__title {
        img {
          width: 260px;
        }
        p {
          font-size: 12px;
        }
      }
    }
  }
</style>
