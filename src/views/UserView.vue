<template>
  <LoaderCircle v-if="loadingCircleUser" />
  <div
    v-else
    class="profile"
  >
    <input
      id="photo-user-file"
      type="file"
      @change="uploadImage"
    >
    <label
      v-if="!loading"
      for="photo-user-file"
    >
      <img
        v-if="user.imageUrl"
        :src="user.imageUrl"
        alt="photo de profil"
        class="profile__user-photo"
      >
    </label>
    <Loader
      v-else-if="loading"
      class="profile__loader"
    />
    <div class="profile__infos">
      <Info
        :name="user.firstname"
        :type="'firstname'"
        :is-border-top="true"
        @get-errors-message="getErrorsMessage"
      />
      <Info
        :name="user.lastname"
        :type="'lastname'"
        :is-blue="true"
        @get-errors-message="getErrorsMessage"
      />
      <Info
        :name="user.phraseDescription"
        :type="'phraseDescription'"
        @get-errors-message="getErrorsMessage"
      />
      <Info
        :name="user.email"
        :type="'email'"
        :is-blue="true"
        @get-errors-message="getErrorsMessage"
      />
      <Info
        :name="user.birthday"
        :type="'birthday'"
        @get-errors-message="getErrorsMessage"
      />
      <Info
        :name="'Modifier le mot de passe'"
        :is-border-bot="true"
        :is-blue="true"
        :type="'password'"
        @get-errors-message="getErrorsMessage"
      />
      <ErrorMessage
        :errors="errors"
      />
      <div class="profile__buttons-logout">
        <Button
          :text="'Déconnexion'"
          :on-click="logout"
          :large="true"
          class="profile__button-logout"
        />
        <Button
          :text="'Supprimer mon compte'"
          :large="true"
          :on-click="tryToDelete"
          class="profile__button-logout"
        />
        <ModalWarning
          v-if="modal.type === 'warning'"
          :warning="'Voulez-vous vraiment supprimer votre compte ?'"
          @continue="deleteAccount"
        />
      </div>
    </div>
  </div>
</template>

<script>
import userMixin from "@/mixins/userMixin";
import Info from "@/components/profile/Info";
import Button from "@/components/elmts/Button";
import Loader from "@/components/elmts/Loader";
import ErrorMessage from "@/components/elmts/ErrorMessage";
import { mapState, mapActions } from 'vuex';
import LoaderCircle from "@/components/elmts/LoaderCircle";
import ModalWarning from "@/components/modal/ModalWarning";

export default {
  name: "UserView",
  components: {
    Info,
    Button,
    ErrorMessage,
    Loader,
    LoaderCircle,
    ModalWarning
  },
  mixins: [userMixin],
  data() {
    return {
      errors: []
    };
  },
  computed: {
    ...mapState('modal', {
      modal: state => state.modal
    }),
    ...mapState('loader', {
      loading: state => state.loading,
      loadingCircleUser: state => state.loadingCircleUser
    })
  },
  methods: {
    ...mapActions('modal', [
      'updateOpen'
    ]),
    uploadImage(event) {
      this.callApiUpdatePhotoUser(event.target.files[0]);
    },
    getErrorsMessage(payload) {
      this.errors = payload;
    },
    tryToDelete() {
      this.updateOpen({ open: true, type: "warning" });
    }
  }
};
</script>

<style lang="scss" scoped>
  #photo-user-file {
    display: none;
  }
  .profile {
    margin-top: 150px;
    @include flex(row, center, center);
    &__user-photo {
      margin-top: -120px;
      width: 200px;
      height: 200px;
      object-fit: cover;
      border-radius: 100%;
      border: $color-gradient-1 3px solid;
      cursor: pointer;
      transition: 200ms;
      &:hover {
        transform: scale(1.02);
      }
    }
    &__loader {
      margin-top: -120px;
    }
    &__infos {
      width: 600px;
      border-radius: 8px;
      margin-left: 40px;
    }
    &__button-logout {
      margin-right: 20px;
    }
    &__buttons-logout {
      margin-top: 30px;
      margin-bottom: 60px;
      @include flex(row, center, flex-start);
    }
  }

  @include breakpoint(1279) {
    .profile {
      margin-top: 300px;
      @include flex(column, center, center);
      &__user-photo {
        width: 160px;
        height: 160px;
      }
      &__infos {
        @include flex(column, center, center);
        width: 90%;
        margin-left: 0px;
        margin-top: 40px;
      }
      &__button-logout {
        margin-right: 0px;
        margin-bottom: 15px;
      }
      &__buttons-logout {
        margin-top: 20px;
        margin-bottom: 45px;
        @include flex(column, center, center);
      }
    }
  }
</style>