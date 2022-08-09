<template>
  <div class="contact">
    <div class="contact__top">
      <div>
        <p>Contact :</p>
        <p>{{ contact.firstname }} {{ contact.lastname }}</p>
      </div>
      <div class="contact__top__actions">
        <img
          src="@/assets/images/edit.svg"
          alt="modifier le contact"
          @click="openUpdateContact"
        >
        <img
          src="@/assets/images/trash.svg"
          alt="supprimer le contact"
          @click="tryToDelete"
        >
      </div>
    </div>
    <div class="contact__bottom">
      <div>
        <p>Numéro :</p>
        <p>{{ contact.phone }}</p>
      </div>
      <div>
        <p>email :</p>
        <p>{{ contact.email }}</p>
      </div>
      <div>
        <p>Catégorie :</p>
        <p>{{ contact.name_category }}</p>
      </div>
    </div>
    <ModalWarning
      v-if="modal.type === 'warning' + contact.id"
      :warning="'Voulez-vous vraiment supprimer le contact ?'"
      @continue="deleteContact"
    />
    <ModalCreateUpdateContact
      v-if="modal.type === 'update-contact' + contact.id"
      :categories="categoriesContact"
      :old-contact="contact"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import ContactsService from "@/services/ContactsService";
import ModalWarning from "@/components/modal/ModalWarning";
import ModalCreateUpdateContact from "@/components/modal/ModalCreateUpdateContact";

export default {
  name: "Contact",
  components: {
    ModalWarning,
    ModalCreateUpdateContact
  },
  props: {
    contact: { type: Object, default: null }
  },
  computed: {
    ...mapGetters('user', [
      'userId',
      'groupId'
    ]),
    ...mapState('modal', {
      modal: state => state.modal
    }),
    ...mapState('categories', {
      categoriesContact: state => state.categoriesContact
    }),
  },
  methods: {
    ...mapActions('contacts', [
      'updateContacts'
    ]),
    ...mapActions('modal', [
      'updateOpen'
    ]),
    tryToDelete() {
      this.updateOpen({ open: true, type: "warning" + this.contact.id });
    },
    openUpdateContact() {
      this.updateOpen(
        { open: true, type: "update-contact" + this.contact.id }
      );
    },
    deleteContact() {
      ContactsService.deleteContact(this.userId, this.contact.id)
      .then(() => {
        ContactsService.getContacts(this.groupId)
        .then(response => {
          this.updateOpen({ open: false });
          this.updateContacts(response);
        })
        .catch(() => {
          this.updateOpen({ open: false });
          this.updateContacts([]);
        });
      });
    }
  },
};
</script>

<style lang="scss" scoped>
  .contact {
    text-transform: uppercase;
    margin: 20px 0px;
    p {
      margin: 5px 0px;
      color: $color-gradient-2;
      &:first-of-type {
        background: $gradient-main;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    &__top {
      @include flex(row, center, space-between);
      border-bottom: 2px solid $color-gradient-1;
      p {
        color: $color-gradient-1;
      }
      &__actions {
        @include flex(row, center, flex-end);
        img {
          width: 25px;
          height: 25px;
          margin: 5px 0px;
          margin-left: 5px;
          object-fit: contain;
          cursor: pointer;
          &:first-of-type {
            width: 28px;
            height: 28px;
          }
        }
      }
      div {
        @include flex(row, center, flex-start);
        p {
          &:first-of-type {
            width: 150px;
          }
        }
      }
    }
    &__bottom {
      margin-top: 5px;
      div {
        @include flex(row, center, flex-start);
        p {
          &:first-of-type {
            width: 150px;
          }
        }
      }
    }
  }

  @include breakpoint(500) {
    .contact {
      margin: 15px 0px;
      p {
        font-size: 14px;
        margin: 3px 0px;
      }
      &__top {
        img {
          width: 23px;
          height: 23px;
          &:first-of-type {
            width: 26px;
            height: 26px;
          }
        }
        div {
          p {
            font-size: 15px;
            &:first-of-type {
              width: 100px;
            }
          }
        }
      }
      &__bottom {
        div {
          p {
            &:first-of-type {
              width: 100px;
            }
          }
        }
      }
    }
  }
</style>