<template>
  <div class="see-password">
    <img
      src="@/assets/images/eye.svg"
      alt="voir le mot de passe"
      @click="toggleSeePassword"
    >
  </div>
</template>

<script>
export default {
  name: "ToggleSeePassword",
  emits: ["get-see-password"],
  methods: {
    toggleSeePassword() {
      this.$emit("get-see-password");
    }
  }
};
</script>

<style lang="scss" scoped>
  .see-password {
    position: relative;
    width: 300px;
    img {
      width: 40px;
      height: 40px;
      object-fit: contain;
      position: absolute;
      top: 9px;
      right: -10px;
      cursor: pointer;
      z-index: 1;
    }
  }

  @include breakpoint(500) {
    .see-password {
      width: 220px;
      img {
        width: 35px;
        height: 35px;
        top: 10px;
      }
    }
  }
</style>