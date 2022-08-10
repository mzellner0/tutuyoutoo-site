<template>
  <a :href="tryOpenLink()" @click="clickOnDownload">
    <Button
      class="button"
      :text="$tr[$route.params.lang].help1button1"
      :small-text="true"
    />
  </a>
</template>

<script>
import Button from "@/components/elmts/Button";

export default {
  name: 'DownloadButton',
  components: {
    Button,
  },
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
  .button {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 5;
  }
</style>
