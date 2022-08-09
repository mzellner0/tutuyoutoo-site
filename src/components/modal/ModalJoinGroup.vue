<template>
  <Modal class="modal__create">
    <h3>Rejoindre un groupe</h3>
    <form v-if="firstStep">
      <input
        v-model="idGroup"
        type="text"
        placeholder="id du groupe"
      >

      <ToggleSeePassword
        @get-see-password="getToggleSeePassword"
      />

      <input
        v-if="!seePassword"
        v-model="password"
        type="password"
        placeholder="mot de passe"
        autocomplete="on"
      >
      <input
        v-else
        v-model="password"
        type="text"
        placeholder="mot de passe"
        autocomplete="on"
      >
      <ErrorMessage
        :errors="errors"
      />
      <LoaderCircle
        v-if="waiting"
        class="modal__loader"
      />
      <Button
        v-else
        class="modal__button"
        :text="'Rejoindre le groupe'"
        :on-click="submit"
        :large="true"
      />
    </form>
    <form v-else>
      <p>Es-tu l'un d'entre eux ? (Vous prendrez la place de ce nom)</p>
      <div
        v-for="user in getUserSelectable"
        :key="user.userId"
        class="modal__users"
      >
        <input
          :id="user.userId + 'pays'"
          v-model="userForYou"
          type="radio"
          :value="user.userId"
          name="userForYou"
        >
        <label :for="user.userId + 'pays'">{{ user.firstname }} {{ user.lastname }}</label>
      </div>

      <ErrorMessage
        :errors="errors"
      />
      <LoaderCircle
        v-if="waiting"
        class="modal__loader"
      />
      <div
        v-else
        class="modal__buttons"
      >
        <Button
          class="modal__button"
          :text="'Oui'"
          :on-click="selectUser"
        />
        <Button
          class="modal__button"
          :text="'Non'"
          :on-click="closeModal"
        />
      </div>
    </form>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal";
import Button from "@/components/elmts/Button";
import ErrorMessage from "@/components/elmts/ErrorMessage";
import GroupsService from "@/services/GroupsService";
import { mapGetters, mapActions, mapState } from 'vuex';
import ToggleSeePassword from "@/components/elmts/ToggleSeePassword";
import LoaderCircle from "@/components/elmts/LoaderCircle";
import UserService from "@/services/UserService";

export default {
  name: "ModalJoinGroup",
  components: {
    Modal,
    Button,
    ErrorMessage,
    ToggleSeePassword,
    LoaderCircle
  },
  data() {
    return {
      idGroup: null,
      password: "",
      errors: [],
      seePassword: false,
      waiting: false,
      firstStep: true,
      userForYou: null
    };
  },
  computed: {
    ...mapGetters('user', [
      'userId',
      'groupId'
    ]),
    ...mapState('groups', [
      'usersInGroup'
    ]),
    ...mapState('user', {
      user: state => state.user
    }),
    getUserSelectable() {
      return this.usersInGroup.filter(user => user.isTemp == 1);
    }
  },
  methods: {
    ...mapActions('groups', [
      'updateGroups',
      'updateUsersInGroup'
    ]),
    ...mapActions('modal', [
      'updateOpen'
    ]),
    ...mapActions('user', [
      'updateUser'
    ]),
    getToggleSeePassword() {
      this.seePassword = !this.seePassword;
    },
    closeModal(event) {
      event.preventDefault();
      this.updateOpen({ open: false });
    },
    selectUser(event) {
      event.preventDefault();
      this.errors = [];

      if (!this.userForYou) {
        this.errors.push("Vous devez séléctionnez quelq'un !");
      }

      this.waiting = true;
      UserService.updateAUserInAGroup(this.userForYou, this.userId, this.groupId, false)
      .then((response) => {
        this.waiting = false;
        this.updateOpen({ open: false });
      });
    },
    submit(event) {
      event.preventDefault();
      this.errors = [];

      if(
        this.idGroup &&
        this.password !== ""
      ) {
        this.waiting = true;
        GroupsService.joinGroup(this.idGroup, this.password, this.userId)
        .then((response1) => {
          this.updateUser({...this.user,
            groupActif: response1.groupId
          });
          GroupsService.getGroups(this.userId).then(response2 => {
            this.updateGroups(response2);
            GroupsService.getUsers(response1.groupId)
            .then(response => {
              this.waiting = false;
              this.updateUsersInGroup(response);

              const usersTemp = response.filter(user => user.isTemp == 1);
              if (usersTemp.length > 0) {
                this.firstStep = false;
              } else {
                this.updateOpen({ open: false });
              }
            })
            .catch(() => {
              this.waiting = false;
              this.updateUsersInGroup([]);
            });
          });
        })
        .catch(err => {
          this.waiting = false;
          this.errors.push(err.response.data.message);
        });
      } else {
        this.errors.push("Tous les champs doivent être complétés");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .modal {
    &__create {
      h3 {
        border-bottom: 2px solid;
        padding-bottom: 10px;
        font-weight: bold;
      }
    }
    &__button {
      margin-top: 30px;
      margin-bottom: 20px;
    }
    &__buttons {
      @include flex(row, center, center);
      div {
        margin: 20px 5px;
      }
    }
    &__loader {
      position: relative;
      top: auto;
      left: auto;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    &__users {
      @include flex(row, center, flex-start);
      width: 50%;
      input {
        width: auto;
        cursor: pointer;
      }
      label {
        cursor: pointer;
      }
    }
  }
  p {
    margin: 0px;
    margin-top: 0px;
    margin-bottom: 15px;
    text-align: center;
    color: $color-gradient-1;
  }
  form {
    @include flex(column, center, center);
    margin-top: 30px;
  }
  input {
    background-color: transparent;
    color: $color-gradient-1;
    border: solid 3px;
    padding: 10px 20px;
    border-radius: 60px;
    margin: 5px 10px;
    font-family: $police-1;
    outline: none;
    font-size: 18px;
    width: 300px;
    &:nth-of-type(2n) {
      color: $color-gradient-2;
      &::placeholder {
        color: $color-gradient-2-placeholder;
        font-family: $police-1;
      }
    }
    &::placeholder {
      color: $color-gradient-1-placeholder;
      font-family: $police-1;
    }
  }

  @include breakpoint(1279) {
    .modal {
      &__create {
        h3 {
          text-align: center;
        }
      }
      &__button {
        margin-top: 20px;
        margin-bottom: 10px;
      }
      &__buttons {
        @include flex(column, center, center);
        margin-top: 20px;
        margin-bottom: 20px;
        .modal__button {
          margin-top: 5px;
          margin-bottom: 5px;
        }
      }
      &__users {
        width: 270px;
      }
    }
    form {
      margin-top: 20px;
    }
  }

  @include breakpoint(500) {
    input {
      width: 220px;
      font-size: 15px;
    }
  }
</style>