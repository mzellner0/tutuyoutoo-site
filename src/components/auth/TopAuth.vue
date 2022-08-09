<template>
  <div
    class="top-auth"
    :style="{ 'background-image': `url(${getImageBg()})` }"
  >
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
import responsiveMixin from "@/mixins/responsiveMixin";

export default {
  name: 'TopAuth',
  mixins: [responsiveMixin],
  props: {
    title: { type: String, default: "" }
  },
  methods: {
    getImageBg() {
      if (this.isOnDesktop) {
        return require('../../assets/images/bg-line-2-desktop.png');
      } else if (this.isOnTablet) {
        return require('../../assets/images/bg-line-2-tablet.png');
      } else if (this.isOnPhone) {
        return require('../../assets/images/bg-line-2-phone.png');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .top-auth {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    background-repeat: no-repeat;
    background-size: 100% 350px;
    height: 350px;
    background-position: bottom;
    h1 {
      font-size: 60px;
      margin-top: 180px;
    }
  }

  @include breakpoint(1279) {
    .top-auth {
      background-size: 100% 300px;
      height: 300px;
      h1 {
        font-size: 45px;
        margin-top: 145px;
      }
    }
  }

  @include breakpoint(500) {
    .top-auth {
      background-size: cover;
      height: 200px;
      h1 {
        font-size: 25px;
        margin-top: 110px;
      }
    }
  }
</style>
