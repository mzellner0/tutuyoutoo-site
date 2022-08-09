<template>
  <Modal class="modal__create">
    <h3 v-if="!oldGroup">
      Créer un groupe
    </h3>
    <h3 v-else>
      Modifier un groupe
    </h3>
    <form>
      <input
        v-model="name"
        type="text"
        placeholder="nom du groupe"
      >

      <LoaderCircle
        v-if="waitingUser"
        class="modal__loader"
      />
      <div
        v-else-if="oldGroup && !waitingUser"
        class="modal__old-users"
      >
        <p>
          Utilisateurs déjà dans le groupe (vous pouvez supprimer ceux qui ne sont pas associés à un comtpe) :
        </p>
        <ul>
          <li
            v-for="user in usersInGroup"
            :key="user.id"
          >
            <p>{{ user.firstname }} {{ user.lastname }}</p>
            <img
              v-if="user.isTemp === 1"
              src="@/assets/images/trash.svg"
              alt="supprimer l'utilisateur associé à aucun compte"
              @click="deleteTempUser(user)"
            >
          </li>
        </ul>
      </div>

      <ErrorMessage
        :errors="errorsUsers"
        class="modal__errors"
      />

      <div
        class="modal__new-users"
      >
        <div>
          <p>Ajouter des personnes (autre que vous <span v-if="oldGroup">ou que les autres utilisateurs déjà présents</span>) dans le groupe :</p>
          <img
            src="@/assets/images/white-plus.svg"
            alt="ajouter une personne dans le groupe"
            @click="addUser"
          >
        </div>
        <div
          v-for="(user, index) in newUsers"
          :key="index"
        >
          <input
            v-model="user.firstname"
            type="text"
            placeholder="Prénom"
          >
          <input
            v-model="user.lastname"
            type="text"
            placeholder="Nom"
          >
        </div>
      </div>

      <ToggleSeePassword
        v-if="!oldGroup"
        @get-see-password="getToggleSeePassword"
      />

      <input
        v-if="!seePassword && !oldGroup"
        v-model="password"
        type="password"
        placeholder="mot de passe"
        autocomplete="on"
        @input="onChangePassword"
      >
      <input
        v-else-if="!oldGroup"
        v-model="password"
        type="text"
        placeholder="mot de passe"
        autocomplete="on"
      >
      <input
        v-if="!seePassword && !oldGroup"
        v-model="checkPassword"
        type="password"
        placeholder="confirmation du mot de passe"
        autocomplete="on"
      >
      <input
        v-else-if="!oldGroup"
        v-model="checkPassword"
        type="text"
        placeholder="confirmation du mot de passe"
        autocomplete="on"
      >
      <ErrorMessage
        :errors="errors"
        class="modal__errors"
      />
      <LoaderCircle
        v-if="waiting"
        class="modal__loader"
      />
      <Button
        v-else
        class="modal__button"
        :text="textButton"
        :on-click="submit"
        :large="true"
      />
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
import validateInputMixin from "@/mixins/validateInputMixin";
import UserService from "@/services/UserService";
import LoaderCircle from "@/components/elmts/LoaderCircle";

export default {
  name: "ModalCreateUpdateGroup",
  components: {
    Modal,
    Button,
    ErrorMessage,
    ToggleSeePassword,
    LoaderCircle
  },
  mixins: [validateInputMixin],
  props: {
    oldGroup: { type: Object, default: null }
  },
  data() {
    return {
      name: "",
      waiting: false,
      password: "",
      checkPassword: "",
      errors: [],
      waitingUser: false,
      errorsUsers: [],
      seePassword: false,
      newUsers: [
        {
          firstname: "",
          lastname: ""
        }
      ]
    };
  },
  computed: {
    ...mapGetters('user', [
      'userId'
    ]),
    ...mapState('groups', [
      'usersInGroup'
    ]),
    ...mapState('user', {
      user: state => state.user
    }),
    textButton() {
      if (this.oldGroup) {
        return "Modifier le groupe";
      } else {
        return "Créer le groupe";
      }
    }
  },
  watch: {
    oldGroup() {
      this.errors = [];
      this.errorsUsers = [];
      this.getUserInOldGroup();
      this.name = this.oldGroup.name;
    }
  },
  mounted() {
    this.errors = [];
    this.errorsUsers = [];
    if (this.oldGroup) {
      this.getUserInOldGroup();
      this.name = this.oldGroup.name;
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
    addUser() {
      this.newUsers.push({ firstname: "", lastname: "" });
    },
    getToggleSeePassword() {
      this.seePassword = !this.seePassword;
    },
    onChangePassword() {
      this.errors = [];
      this.errorsUsers = [];
      if (this.password.length < 8) {
        this.errors.push("Le mot de passe n'est pas assez long");
      }
      if (!this.validPasswordMin(this.password)) {
        this.errors.push(
          "Le mot de passe doit contenir au moins une minuscule"
        ); 
      }
      if (!this.validPasswordMaj(this.password)) {
        this.errors.push(
          "Le mot de passe doit contenir au moins une majuscule"
        ); 
      }
      if (!this.validPasswordDigit(this.password)) {
        this.errors.push(
          "Le mot de passe doit contenir au moins un nombre"
        ); 
      }
    },
    deleteTempUser(user) {
      this.errors = [];
      this.errorsUsers = [];
      this.waiting = true;
      UserService.deleteUserTemp(user.userId, this.userId)
      .then(() => {
        const newUserInGroup = this.usersInGroup.filter(
          userOldList => userOldList.userId !== user.userId);
        this.updateUsersInGroup(newUserInGroup);
        this.waiting = false;
      })
      .catch((err) => {
        this.errorsUsers.push(err.response.data.message);
        const modal = document.querySelector(".modal__window");
        this.waiting = false;
        modal.scrollTo(0, modal.scrollHeight);
      });
    },
    getUserInOldGroup(callback) {
      this.waitingUser = true;
      GroupsService.getUsers(this.oldGroup.id)
      .then(response => {
        this.waitingUser = false;
        this.updateUsersInGroup(response);
        if (callback) {
          callback();
        }
      })
      .catch(() => {
        this.waitingUser = false;
        this.updateUsersInGroup([]);
      });
    },
    afterAddingNewGroup() {
      GroupsService.getGroups(this.userId).then(response2 => {
        this.updateGroups(response2);
        this.waiting = false;
        this.newUsers = [
          {
            firstname: "",
            lastname: ""
          }
        ];
        this.name = "",
        this.password = "",
        this.checkPassword = "",
        this.updateOpen({ open: false });
      });
    },
    createGroup(newUsersValid) {
      GroupsService.createGroup(this.name, this.password, this.userId)
      .then((response1) => {
        this.updateUser({...this.user,
          groupActif: response1.groupId
        });
        if (newUsersValid.length > 0) {
          UserService.createTempUsers(newUsersValid, response1.groupId, this.userId)
          .then(() => {
            this.afterAddingNewGroup();
          });
        } else {
          this.afterAddingNewGroup();
        }
      })
      .catch(err => {
        this.waiting = false;
        this.errors.push(err.response.data.message);
        if (err.response.data.error) {
          this.errors[0] += ", il vous manque :";
          if (err.response.data.error.includes("min")) {
            this.errors.push("- au moins 8 caractères");
          }
          if (err.response.data.error.includes("uppercase")) {
            this.errors.push("- au moins une majuscule");
          }
          if (err.response.data.error.includes("lowercase")) {
            this.errors.push("- au moins une minuscule");  
          }
          if (err.response.data.error.includes("digits")) {
            this.errors.push("- au moins un chiffre");
          }
        }
      });
    },
    updateGroup(newUsersValid) {
      GroupsService.updateGroup(this.name, this.oldGroup.id, this.userId)
      .then(() => {
        this.updateUser({...this.user,
          groupActif: this.oldGroup.id
        });
        if (newUsersValid.length > 0) {
          UserService.createTempUsers(newUsersValid, this.oldGroup.id, this.userId)
          .then(() => {
            this.getUserInOldGroup(this.afterAddingNewGroup);
          });
        } else {
          this.afterAddingNewGroup();
        }
      })
      .catch(err => {
        this.waiting = false;
        this.errors.push(err.response.data.message);
      });
    },
    submit(event) {
      event.preventDefault();
      this.errors = [];
      this.errorsUsers = [];

      if(
        this.name !== "" &&
        (
          (
            this.password !== "" &&
            this.checkPassword !== ""
          ) ||
          this.oldGroup
        )
      ) {

        if (this.password !== this.checkPassword && !this.oldGroup) {
          this.errors.push("Les deux mots de passe ne sont pas identiques");
          return;
        }

        let newUsersValid = [];
        for (let user of this.newUsers) {
          if (
            (user.firstname !== "" || user.lastname !== "") &&
            (!this.validName(user.firstname) ||
            !this.validName(user.lastname))
          ) {
            this.errors.push("L'un des noms des personnes du groupe est invalide");
            return;
          } else if (user.firstname !== "" && user.lastname !== "") {
            newUsersValid.push(user);
          }
        }

        this.waiting = true;
        if (this.oldGroup) {
          this.updateGroup(newUsersValid);
        } else {
          this.createGroup(newUsersValid);
        }

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
    &__loader {
      position: relative;
      top: auto;
      left: auto;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    &__button {
      margin-top: 30px;
      margin-bottom: 20px;
    }
    &__errors {
      width: 400px;
      color: $color-gradient-1;
    }
    &__old-users {
      color: $color-gradient-2;
      width: 340px;
      p {
        text-align: left;
      }
      ul {
        padding-left: 18px;
        font-style: none
      }
      li {
        @include flex(row, baseline, space-between);
        position: relative;
        p {
          position: relative;
          margin: 5px 0px;
          &::before {
            content: "";
            position: absolute;
            width: 7px;
            height: 7px;
            background-color: $color-gradient-2;
            border-radius: 100%;
            top: 6px;
            left: -18px;
          }
        }
      }
      img {
        width: 25px;
        height: 25px;
        margin-left: 5px;
        cursor: pointer;
      }
    }
    &__new-users {
      width: 340px;
      div {
        @include flex(row, center, space-between);
        &:nth-of-type(2n) {
          input {
            color: $color-gradient-1;
            &::placeholder {
              color: $color-gradient-1-placeholder;
            }
          }
        }
      }
      img {
        width: 20px;
        height: 20px;
        object-fit: contain;
        cursor: pointer;
      }
      p {
        margin: 10px 0px;
      }
      input {
        width: 50%;
        margin: 5px 0px;
        color: $color-gradient-2;
        &::placeholder {
          color: $color-gradient-2-placeholder;
        }
        &:first-of-type {
          margin-right: 5px;
        }
        &:last-of-type {
          margin-left: 5px;
        }
      }
    }
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
    }
    form {
      margin-top: 20px;
    }
  }

  @include breakpoint(500) {
    .modal {
      &__new-users {
        width: 260px;
      }
      &__errors {
        width: 330px;
      }
      &__old-users {
        width: 260px;
      }
    }
    input {
      width: 220px;
      font-size: 15px;
    }
  }
</style>