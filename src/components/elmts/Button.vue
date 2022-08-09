<template>
  <div>
    <div
      :class="[
        'gradient',
        { 'gradient--extra-large': extraLarge },
        { 'gradient--large': large },
        { 'gradient--small-phone': small }
      ]"
    >
      <button
        :class="[
          { 'extra-large-button': extraLarge },
          { 'large-button': large },
          { 'small-button-phone': small },
          { 'small-text': smallText }
        ]"
        @click="onClick"
      >
        <img
          v-if="img"
          :class="[{ 'is-small-on-phone-img': small }]"
          :src="img"
          alt="répondre"
        >
        {{ text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: { type: String, default: "" },
    onClick: { type: Function, default: () => {} },
    extraLarge: { type: Boolean, default: false },
    large: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    smallText: { type: Boolean, default: false },
    img: { type: String, default: "" }
  }
};
</script>

<style lang="scss" scoped>
  $border-size: 6px;
  $width-button: 200px;
  $height-button: 50px;

  $width-extra-large-button: 320px;
  $height-extra-large-button: 70px;
  $width-large-button: 266px;

  $height-phone-button: 46px;
  $width-phone-button: 150px;
  $border-size-phone: 8px;

  button {
    @include flex(row, inherit, center);
    z-index: 1;
    color: $color-gradient-1;
    background-color: $color-bg;
    border: none;
    padding: 5px 10px;
    border-radius: inherit;
    width: calc(#{$width-button} - #{$border-size});
    height: calc(#{$height-button} - #{$border-size});
    font-size: 20px;
    text-transform: uppercase;
    outline: none;
    cursor: inherit;
    transition: 1000ms;
    img {
      width: 25px;
      height: 25px;
      margin-right: 15px;
    }
  }
  .small-text {
    font-size: 13px;
  }
  .extra-large-button {
    width: calc(#{$width-extra-large-button} - #{$border-size});
    height: calc(#{$height-extra-large-button} - #{$border-size});
    padding: 5px 20px;
    font-size: 18px;
    @include breakpoint(800) {
      width: calc(#{$width-large-button} - #{$border-size});
      height: calc(#{$height-extra-large-button} - #{$border-size});
      font-size: 15px;
      font-weight: bold;
    }
  }
  .large-button {
    width: calc(#{$width-large-button} - #{$border-size});
    font-size: 18px;
  }
  .small-button-phone {
    width: calc(#{$width-phone-button} - #{$border-size-phone});
    height: calc(#{$height-phone-button} - #{$border-size-phone});
    font-size: 14px;
  }
  .is-small-on-phone-img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .gradient {
    position: relative;
    z-index: 0;
    border-radius: 60px;
    background-color: $color-gradient-2;
    background-image: $gradient-01;
    width: $width-button;
    height: $height-button;
    @include flex(row, center, center);
    cursor: pointer;
    transition: 1000ms;
    &:hover {
      background-color: $color-gradient-1;
      background-image: $gradient-02;
      button {
        color: $color-gradient-2;
      }
    }
    &--extra-large {
      border-radius: 40px;
      height: $height-extra-large-button;
      width: $width-extra-large-button;
      @include breakpoint(800) {
        height: $height-extra-large-button;
        width: $width-large-button;
      }
    }
    &--large {
      width: $width-large-button;
    }
    &--small-phone {
      height: $height-phone-button;
      width: $width-phone-button;
    }
  }
</style>