<template>
  <Modal class="modal__create">
    <h3 v-if="!oldContact">
      Créer un contact
    </h3>
    <h3 v-else>
      Modifier un contact
    </h3>
    <form>
      <select
        v-model="categoryId"
        name="categories"
        class="modal__categories"
        @click="getCategoryId"
      >
        <option
          hidden
          disabled
          selected
          value="null"
        >
          Choisissez une categorie
        </option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      <input
        v-model="firstname"
        type="text"
        placeholder="prénom du contact"
      >
      <input
        v-model="lastname"
        type="text"
        placeholder="nom du contact"
      >
      <input
        v-model="email"
        type="email"
        placeholder="email du contact"
      >
      <input
        v-model="phone"
        type="tel"
        placeholder="téléphone du contact"
      >
      <ErrorMessage
        :errors="errors"
      />
      <Button
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
import { mapGetters, mapActions, mapState } from 'vuex';
import ContactsService from "@/services/ContactsService";
import validateInputMixin from "@/mixins/validateInputMixin";

export default {
  name: "ModalCreateUpdateContact",
  components: {
    Modal,
    Button,
    ErrorMessage
  },
  mixins: [validateInputMixin],
  props: {
    categories: { type: Array, default: null },
    oldContact: { type: Object, default: null },
  },
  data() {
    return {
      errors: [],
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      categoryId: null
    };
  },
  computed: {
    ...mapGetters('user', [
      'groupId',
      'userId'
    ]),
    textButton() {
      if (this.oldContact) {
        return "Modifier le contact";
      } else {
        return "Créer le contact";
      }
    }
  },
  watch: {
    oldContact() {
      this.updateContactWidthOldOne();
    }
  },
  mounted() {
    this.updateContactWidthOldOne();
  },
  methods: {
    ...mapActions('modal', [
      'updateOpen'
    ]),
    ...mapActions('contacts', [
      'updateContacts'
    ]),
    getCategoryId(event) {
      this.categoryId = event.target.value;
    },
    updateContactWidthOldOne() {
      if (this.oldContact) {
        this.firstname = this.oldContact.firstname;
        this.lastname = this.oldContact.lastname;
        this.email = this.oldContact.email;
        this.phone = this.oldContact.phone;
        this.categoryId = this.oldContact.categoryId;
      }
    },
    afterUpdateCreateContact() {
      ContactsService.getContacts(this.groupId).then(response => {
        this.updateContacts(response);
        this.updateOpen({ open: false });
        this.firstname = "";
        this.lastname = "";
        this.email = "";
        this.phone = "";
        this.categoryId = null;
      });
    },
    submit(event) {
      event.preventDefault();
      this.errors = [];

      if(
        this.firstname !== "" &&
        this.lastname !== "" &&
        this.email !== "" &&
        this.phone !== ""
      ) {
        let emailMin;
        if (this.validEmail(this.email)) {
          emailMin = this.email.toLowerCase();
        } else {
          this.errors.push("Adresse e-mail invalide");
          return;
        }

        if (!this.validName(this.firstname)) {
          this.errors.push("Prénom invalide");
          return;
        }

        if (!this.validName(this.lastname)) {
          this.errors.push("Nom invalide");
          return;
        }

        if (!this.validPhone(this.phone)) {
          this.errors.push("téléphone invalide");
          return;
        }

        if (this.oldContact) {
          ContactsService.updateContact(this.firstname, this.lastname, emailMin, this.phone, this.categoryId, this.userId, this.oldContact.id)
          .then(() => {
            this.afterUpdateCreateContact();
          });
        } else {
          ContactsService.createContact(this.firstname, this.lastname, emailMin, this.phone, this.categoryId, this.groupId, this.userId)
          .then(() => {
            this.afterUpdateCreateContact();
          });
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
    &__categories {
      background-color: $color-bg-line-1;
      outline: none;
      font-family: $police-1;
      color: $color-gradient-2;
      border: 2px solid;
      padding: 8px;
      border-radius: 15px;
      margin-bottom: 25px;
      cursor: pointer;
    }
    &__button {
      margin-top: 30px;
      margin-bottom: 20px;
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
    &::placeholder {
      color: $color-gradient-1-placeholder;
      font-family: $police-1;
    }
    &:nth-of-type(2n) {
      color: $color-gradient-2;
      &::placeholder {
        color: $color-gradient-2-placeholder;
        font-family: $police-1;
      }
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
    input {
      width: 220px;
      font-size: 15px;
    }
  }
</style>