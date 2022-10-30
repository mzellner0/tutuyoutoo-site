<template>
  <div class="storage container">
    <LangButton :link="`storage/${$route.params.groupId}/${$route.params.userId}/${$route.params.groupName}?tk=${$route.query.tk}`" />
    <h2>{{ `${$tr[$route.params.lang].storageTitle} ${$route.params.groupName} :` }}</h2>
    <div class="storage__download">
      <label for="upload-files">
        {{ $tr[$route.params.lang].storageAddFiles }}
      </label>
    </div>
    <input
      type="file"
      id="upload-files"
      multiple
      @change="addFiles"
      accept="image/png, image/jpeg, image/jpg, image/gif, video/mpeg, video/mp4, mpeg, video/webm, image/webp"
    />
    <p>{{ `(${$tr[$route.params.lang].storageType})` }}</p>
    <p :class="[
      { 'storage__infos--size-to-big': fileTooBig && replayAnim }
    ]">
      {{ `(${$tr[$route.params.lang].storageSize})` }}
    </p>
    <div
      :class="[
        'storage__infos',
        { 'storage__infos--size-to-big': sizeToBig && replayAnim }
      ]"
    >
      <p>
        {{ `${$tr[$route.params.lang].storageSizeLeft1} ${sizeLeft.toFixed(2)} Mb ${$tr[$route.params.lang].storageSizeLeft2}` }}
      </p>
      <p>
        {{ `${$tr[$route.params.lang].storageSizeFiles} : ${(totalSize * 0.000001).toFixed(2)} Mb` }}
      </p>
      <PercentBar
        :percentage="totalSize == 0
          ? 0
          : (totalSize * 0.000001) / sizeLeft * 100
        "
        class="percent"
      />
    </div>
    <p v-if="showDoneMessage" class="storage__done">
      {{ $tr[$route.params.lang].storageDone }}
    </p>
    <ImagesList
      :style="{
        'pointerEvents': files.length === thumbnails.length
          ? 'auto' :  'none'
      }"
      :files="files"
      @delete-image="deleteImage"
    />
    <Button
      v-if="
      files.length != 0 &&
      !loading &&
      files.length === thumbnails.length
    "
      :text="$tr[$route.params.lang].storageUpload"
      :on-click="uploadFilesToServer"
      :extra-large="true"
      :small-text="true"
    />
    <Loader
      v-else-if="loading"
    />
  </div>
</template>

<script>

import LangButton from "@/components/elmts/LangButton";
import Button from "@/components/elmts/Button";
import Loader from "@/components/elmts/Loader";
import PercentBar from "@/components/elmts/PercentBar";
import ImagesList from "@/components/storage/ImagesList";
import { mapState, mapActions } from 'vuex';

export default {
  name: 'StorageView',
  components: {
    Button,
    LangButton,
    Loader,
    PercentBar,
    ImagesList
  },
  data() {
    return {
      files: [],
      totalSize: 0,
      replayAnim: true,
      showDoneMessage: false,
      maxSizeImage: 30000000,
      maxSizeVideo: 200000000,
      fileTooBig: false,
      thumbnails: []
    }
  },
  computed: {
    ...mapState('loader', {
      loading: state => state.loading
    }),
    ...mapState('storage', {
      sizeLeft: state => state.sizeLeft
    }),
    sizeToBig() {
      return this.totalSize == 0
        ? false
        : (this.totalSize * 0.000001) / this.sizeLeft * 100 > 100;
    }
  },
  mounted() {
    this.getSizeLeft({ userId: this.$route.params.userId });
  },
  methods: {
    ...mapActions('storage', [
      'uploadFiles',
      'getSizeLeft'
    ]),
    createThumbnailVideo(file, name) {
      var canvas = document.createElement('canvas');
      var video = document.createElement('video');
      const source = document.createElement('source');
      video.appendChild(source);

      const context = canvas.getContext('2d');
      const urlRef = URL.createObjectURL(file);

      source.setAttribute('src', urlRef);
      video.setAttribute('crossorigin', 'anonymous');

      video.currentTime = 0.1;
      video.load();

      video.addEventListener('loadedmetadata', () => {
        canvas.width = 400;
        canvas.height = (video.videoHeight * 400) / video.videoWidth;
      });

      video.addEventListener('loadeddata', () => {
        context.drawImage(
          video,
          0,
          0,
          400,
          (video.videoHeight * 400) / video.videoWidth
        );

        canvas.toBlob((blob) => {
          if (!blob) {
            return;
          }
          let newName = name.replace("mp4", "jpg");
          newName = newName.replace("MP4", "jpg");
          const newFile = new File(
            [blob],
            newName,
            {
              type: 'image/jpeg',
            }
          );
          this.thumbnails.push({
            "file": newFile,
            "name": newName,
            "urlRef": urlRef
          });
          video.remove();
          canvas.remove();
        }, 'image/jpeg', 0.1)
      });
    },
    createThumbnailImage(file, name) {
      var canvas = document.createElement('canvas');
      var image = new Image;

      const context = canvas.getContext('2d');
      const urlRef = URL.createObjectURL(file);
      image.src = urlRef;

      image.onload = () => {
        canvas.width = 400;
        canvas.height = (image.height * 400) / image.width;
        context.drawImage(
          image,
          0,
          0,
          400,
          (image.height * 400) / image.width
        );
        canvas.toBlob((blob) => {
          if (!blob) {
            return;
          }
          let newName;
          if (
            name.slice(-4) == "webp" ||
            name.slice(-4) == "webm" ||
            name.slice(-4) == "jpeg"
          ) {
            newName = `${name.substring(0, name.length - 4)}jpg`;
          } else {
            newName = `${name.substring(0, name.length - 3)}jpg`;
          }
          const newFile = new File(
            [blob],
            newName,
            {
              type: 'image/jpeg',
            }
          );
          this.thumbnails.push({
            "file": newFile,
            "name": newName,
            "urlRef": urlRef
          });
          canvas.remove();
        }, 'image/jpeg', 0.2)
      }
    },
    addFiles(event) {
      this.fileTooBig = false;
      Array.from(event.target.files).map(
        file => {
          if (
            (
              file.name.slice(-3).toLowerCase() === 'mp4' &&
              file.size <= this.maxSizeVideo
            ) ||
            (
              file.name.slice(-3).toLowerCase() != "mp4" &&
              file.size <= this.maxSizeImage
            )
          ) {
            this.totalSize += file.size;

            const year = file.lastModifiedDate.getFullYear();
            const month = (file.lastModifiedDate.getMonth() + 1).toString();
            const day = (file.lastModifiedDate.getDate()).toString();
            const date = `${year}-${month.length < 2 ? "0" + month : month}-${day.length < 2 ? "0" + day : day}_00:00:00`;

            let name = `${Date.now()}user${this.$route.query.user}`;
            if (
              file.name.slice(-4) == "webp" ||
              file.name.slice(-4) == "webm" ||
              file.name.slice(-4) == "jpeg"
            ) {
              name = `${name}date${date}.${file.name.slice(-4)}`.toLowerCase();
            } else {
              name = `${name}date${date}.${file.name.slice(-3)}`.toLowerCase();
            }

            if (file.name.slice(-3).toLowerCase() === 'mp4') {
              this.createThumbnailVideo(file, name);
            } else {
              this.createThumbnailImage(file, name);
            }

            this.files.push({
              name: name,
              url: URL.createObjectURL(file),
              file: file
            });
          } else {
            this.fileTooBig = true;
            this.replayAnim = false;
            setTimeout(() => {
              this.replayAnim = true;
            }, 100)
          }
        }
      );
    },
    uploadFilesToServer() {
      this.replayAnim = false;
      setTimeout(() => {
        this.replayAnim = true;
      }, 100)
      if (!this.sizeToBig) {
        sessionStorage.setItem("tk", this.$route.query.tk);
        this.uploadFiles({
          files: this.files,
          thumbnails: this.thumbnails,
          groupId: this.$route.params.groupId,
          userId: this.$route.params.userId
        }).then(() => {
          this.getSizeLeft({ userId: this.$route.params.userId });
          this.files = [];
          this.thumbnails.map(thumbnail => {
            URL.revokeObjectURL(thumbnail.urlRef);
          });
          this.thumbnails = [];
          this.totalSize = 0;
          this.showDoneMessage = true;
          setTimeout(() => {
            this.showDoneMessage = false;
          }, 2000)
        });
      }
    },
    deleteImage(index) {
      this.totalSize -= this.files[index].file.size;
      let nameToRemove = this.files[index].name;
      this.files = this.files.filter(
        file => file.name != nameToRemove
      );
      nameToRemove = nameToRemove.replace("mp4", "jpg");
      nameToRemove = nameToRemove.replace("MP4", "jpg");
      this.thumbnails = this.thumbnails.filter(
        thumbnail => thumbnail.name != nameToRemove
      );
    }
  }
};
</script>

<style lang="scss" scoped>
  .storage {
    margin-top: 100px;
    margin-bottom: 100px;
    width: 80%;
    margin-left: 10%;
    position: relative;
    h2 {
      width: 100%;
      padding-bottom: 15px;
      border-bottom: 2px solid $color-police-main;
      margin: 0;
      margin-bottom: 25px;
    }
    input {
      display: none;
    }
    p {
      font-size: 14px;
      margin: 0;
      margin-top: 5px;
    }
    &__done {
      margin-top: 20px !important;
      color: $color-gradient-1;
      font-size: 20px !important;
      background-color: $color-bg-line-1;
      padding: 10px;
      border-radius: 10px;
    }
    &__infos {
      margin-top: 10px;
      text-align: center;
      @include flex(column, center, center);
      color: $color-gradient-2;
      transition: 400ms;
      .percent {
        margin-top: 10px;
      }
      &--size-to-big {
        color: $color-gradient-1;
        animation: incorrect 150ms 2;
      }
    }
    &__images {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
      flex-wrap: wrap;
      @include flex(row, center, center);
      img {
        height: 200px;
        width: 200px;
        object-fit: cover;
      }
      &--img {
        position: relative;
        margin: 0 2px;
      }
      &--delete {
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
    &__download {
      position: relative;
      z-index: 0;
      border-radius: 60px;
      background-color: $color-gradient-2;
      background-image: $gradient-01;
      width: 300px;
      height: 50px;
      @include flex(row, center, center);
      cursor: pointer;
      transition: 1000ms;
      &:hover {
        background-color: $color-gradient-1;
        background-image: $gradient-02;
        label {
          color: $color-gradient-2;
        }
      }
      label {
        @include flex(row, inherit, center);
        z-index: 1;
        color: $color-gradient-1;
        background-color: $color-bg;
        border: none;
        padding: 5px 10px;
        border-radius: inherit;
        width: 274px;
        height: 34px;
        font-size: 18px;
        text-transform: uppercase;
        outline: none;
        cursor: inherit;
        transition: 1000ms;
      }
    }
  }
</style>
