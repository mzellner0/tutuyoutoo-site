<template>
  <div class="redirection">
    <p>{{ $tr[$route.params.lang].loading }}</p>
  </div>
</template>

<script>

export default {
  name: 'DownloadRedirectView',
  mounted() {
   window.location.href = this.tryOpenLink();
  },
  methods: {
    tryOpenLink() {
      return this.isOnIOS()
        ? 'https://apps.apple.com/fr/app/tutuyoutoo/id1623327908'
        : this.isOnAndroid() ?
          'https://play.google.com/store/apps/details?id=com.tutuyoutoo.app'
        : 'https://tutuyoutoo.com/fr/';
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
  .redirection {
    margin: 20px;
  }
</style>
