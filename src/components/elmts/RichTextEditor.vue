<template>
  <div class="rich-text-editor">
    <div class="rich-text-editor__bar">
      <button @click="putStringStrong">
        <img
          src="@/assets/images/bold.svg"
          alt="mettre le text en gras"
        >
      </button>
      <button @click="putStringItalic">
        <img
          src="@/assets/images/italic.svg"
          alt="mettre le text en italic"
        >
      </button>
      <input
        id="add-image"
        type="file"
        @change="uploadImage"
      >
      <label
        v-if="!loading"
        for="add-image"
      >
        <img
          src="@/assets/images/image.svg"
          alt="ajouter une image"
        >
      </label>
      <Loader
        v-else-if="loading"
        class="profile__loader"
      />
    </div>
    <div
      :class="['rich-text-editor__content', { 'disable': waiting }]"
      contenteditable="true"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import PostsService from "@/services/PostsService";
import Loader from "@/components/elmts/Loader";
import responsiveMixin from "@/mixins/responsiveMixin";

export default {
  name: "RichTextEditor",
  components: {
    Loader
  },
  mixins: [responsiveMixin],
  props: {
    oldPost: { type: Object, default: null }
  },
  emits: ["get-content"],
  data() {
    return {
      content: "",
      isJustePast: false,
      waiting: false
    };
  },
  computed: {
    ...mapState('loader', {
      loading: state => state.loading
    }),
    ...mapGetters('user', [
      'groupId'
    ]),
    maxWidth() {
      if (this.isOnPhone) {
        return "100%";
      } else {
        return "320px";
      }
    }
  },
  mounted() {
    if (this.oldPost) {
      this.content = this.oldPost.content;
      this.updateSizeImage();
    } else {
      this.content = "";
    }
    document.querySelector(".rich-text-editor__content").innerHTML = this.content;
    document.querySelector(".rich-text-editor__content").addEventListener("input", this.onUpdateContent);
    document.querySelector(".rich-text-editor__content").onpaste = () => {
      this.isJustePast = true;
    };
  },
  methods: {
    putStringStrong(event) {
      event.preventDefault();
      document.execCommand("bold");
    },
    putStringItalic(event) {
      event.preventDefault();
      document.execCommand("italic");
    },
    updateSizeImage() {
      let regexStyle = /("max-width:)[-a-zA-Z0-9 ]+(")/g;

      this.content = this.content.replaceAll(regexStyle, (test) => {
        return "\"max-width: " + this.maxWidth + "\"";
      });
    },
    uploadImage(event) {
      const image = event.target.files[0];
      this.waiting = true;
      PostsService.importImagePost(image, this.groupId)
      .then(res => {
        this.content +=  `<img style="max-width: ${this.maxWidth}" src=${res.imageUrl}>`;
        this.$emit("get-content", this.content);
        document.querySelector(".rich-text-editor__content").innerHTML = this.content;
        this.waiting = false;
      });
    },
    updateImages() {
      let regexImage = /(<img src=")[-a-zA-Z0-9()@:;%_\+.~#?&//= ">,|]*\b(">)/g;
      let regexUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:;%_\+.~#?&//=]*)/g;

      this.content = this.content.replaceAll(regexImage, (img) => {
        const newImage = img.replaceAll(regexUrl, url => {
          return url + "?beaufortDSbdOInds215dqsd";
        });
        return newImage.substring(0, newImage.lastIndexOf(">")) + " style=\"max-width: " + this.maxWidth + "\" >";
      });
    },
    updateImagesData() {
      let regexImage = /(<img src="data:image\/png;base64)[-a-zA-Z0-9()@:;%_\+.~#?&//= ,|"]+(>)/g;
      let regexImageData = /(data:image\/png;base64)[-a-zA-Z0-9()@:;%_\+.~#?&//= ,|]+/g;

      let file;

      this.content = this.content.replaceAll(regexImage, (img) => {
        img.replaceAll(regexImageData, url => {
          file = this.dataURLtoFile(url, "image");
          this.waiting = true;
        });
        return "";
      });

      if (file) {
        PostsService.importImagePost(file, this.groupId)
        .then(res => {
          const newUrl = res.imageUrl + "?beaufortDSbdOInds215dqsd";
          this.content +=  `<img style="max-width: ${this.maxWidth}" src=${newUrl}>`;
          this.$emit("get-content", this.content);
          document.querySelector(".rich-text-editor__content").innerHTML = this.content;
          this.waiting = false;
        });
      }
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename + "." + mime.split("/")[1], {type:mime});
    },
    updateLinks() {
      let regexUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b((?!<br><\/p>)(?!http)([-a-zA-Z0-9()@:=><";,%_\+.~#?&//]))*/g;
      this.content = this.content.replaceAll(regexUrl, (url) => {
        if (url.includes("youtube") || url.includes("youtu.be")) {
          if (url.includes("?youtubeembedsKJdskjKSDJKzNJND")) {
            return url;
          } else {
            let regexIdYoutube = /^https?\:\/\/(?:www\.youtube(?:\-nocookie)?\.com\/|m\.youtube\.com\/|youtube\.com\/)?(?:ytscreeningroom\?vi?=|youtu\.be\/|vi?\/|user\/.+\/u\/\w{1,2}\/|embed\/|watch\?(?:.*\&)?vi?=|\&vi?=|\?(?:.*\&)?vi?=)([^#\&\?\n\/<>"']*)/i;

            const idVideo = url.split(regexIdYoutube)[1];

            return "<iframe width=\"" + this.maxWidth + "\" height=\"180\" src=\"https://www.youtube.com/embed/" + idVideo + "?youtubeembedsKJdskjKSDJKzNJND\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
          }
        } else if (url.includes("beaufortDSbdOInds215dqsd")) {
          return url;
        } else {
          let newUrl = url;
          if (url.includes("<br></p>")) {
            newUrl = newUrl.replace("<br></p>", "");
          }
          if (url.includes("?")) {
            return '<a target="_blank" href="' + newUrl + "&beaufortDSbdOInds215dqsd" + '">' + newUrl + "&beaufortDSbdOInds215dqsd" + '</a>';
          } else {
            return '<a target="_blank" href="' + newUrl + "?beaufortDSbdOInds215dqsd" + '">' + newUrl + "?beaufortDSbdOInds215dqsd" + '</a>';
          }
        }
      });
    },
    onUpdateContent() {
      this.content = document.querySelector(".rich-text-editor__content").innerHTML;

      this.content = this.content.replaceAll("<div>", "<p>");
      this.content = this.content.replaceAll("</div>", "</p>");
      this.content = this.content.replaceAll("&nbsp;", " ");

      if (this.isJustePast) {
        this.updateImagesData();
        this.updateImages();
        this.updateLinks();
        document.querySelector(".rich-text-editor__content").innerHTML = this.content;
        this.isJustePast = false;

        //make cursor at the end
        const range = document.createRange();
        const contentEditable = 
          document.querySelector(".rich-text-editor__content");
        range.selectNodeContents(contentEditable);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }

      this.$emit("get-content", this.content);
    }
  },
};
</script>

<style lang="scss" scoped>
  .disable {
    pointer-events: none;
  }
  .rich-text-editor {
    width: 100%;
    position: relative;
    &__content {
      position: relative;
      background-color: transparent;
      color: $color-gradient-1;
      border: solid 3px;
      padding: 10px 20px;
      border-radius: 15px;
      margin: 5px 0px;
      font-family: $police-1;
      outline: none;
      font-size: 16px;
      width: calc(100% - 45px);
    }
    #add-image {
      display: none;
    }
    label {
      cursor: pointer;
      outline: none;
      position: relative;
      margin-left: 5px;
      img {
        width: 30px;
        height: 30px;
        object-fit: contain;
      }
    }
    &__bar {
      @include flex(row, center, flex-start);
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
        position: relative;
        img {
          width: 25px;
          height: 25px;
          object-fit: contain;
        }
      }
    }
  }
</style>