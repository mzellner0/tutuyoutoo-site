<template>
  <div class="images">
    <div
      v-for="(file, index) in files"
      class="images--img"
      @click="deleteImage(index)"
    >
      <div class="images--delete">
        <img src="@/assets/images/trash-white.svg" alt="">
      </div>
      <div class="images--elmt" v-if="
        file.name.slice(-3).toLowerCase() === 'jpg' ||
        file.name.slice(-3).toLowerCase() === 'png' ||
        file.name.slice(-4).toLowerCase() === 'jpeg' ||
        file.name.slice(-3).toLowerCase() === 'gif' ||
        file.name.slice(-4).toLowerCase() === 'webp'
      ">
        <img
          class="info"
          src="@/assets/images/cam.png" alt="cam"
        >
        <img
          :src="file.url"
          alt="storage image"
        >
      </div>
      <div class="images--elmt" v-else-if="
        file.name.slice(-3).toLowerCase() == 'mp4' ||
        file.name.slice(-4).toLowerCase() == 'webm'
      ">
        <img
          class="info"
          src="@/assets/images/video.png" alt="video"
        >
        <video :src="file.url">
        </video> 
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'StorageView',
  props: {
    files: { type: Array, default: () => [] }
  },
  methods: {
    deleteImage(index) {
      this.$emit('delete-image', index)
    }
  }
};
</script>

<style lang="scss" scoped>
  .images {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    @include flex(row, center, center);
    &--elmt {
      z-index: 0;
      position: relative;
      img, video {
        object-fit: cover;
        height: 200px;
        width: 200px;
      }
      .info {
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
        height: 30px;
        object-fit: contain;
        background-color: rgba(0, 0, 0, 0.651);
        padding: 10px;
      }
    }
    &--img {
      position: relative;
      margin: 0 2px;
    }
    &--delete {
      z-index: 1;
      transition: 300ms;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.384);
      width: 200px;
      height: 200px;
      opacity: 0;
      @include flex(row, center, center);
      img {
        height: 50px;
        width: 50px;
        object-fit: contain;
      }
      &:hover {
        cursor: pointer;
        opacity: 1;
      }
    }
  }
</style>
