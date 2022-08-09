<template>
  <LoaderCircle v-if="isContactsLoading" />
  <div
    v-else-if="user.groupActif"
    class="contacts container"
  >
    <div class="contacts__actions">
      <div class="contacts__action">
        <img
          v-if="isOnDesktop"
          src="@/assets/images/blue-plus.svg"
          alt="plus"
          @click="openModal('contact')"
        >
        <img
          v-else
          src="@/assets/images/white-plus.svg"
          alt="plus"
          @click="openModal('contact')"
        >
        <p
          v-if="isOnDesktop"
          @click="openModal('contact')"
        >
          Ajouter un contact
        </p>
      </div>
    </div>
    <Categories
      class="contacts__categories"
      :categories="categoriesContact"
      :active-category="categoryActiveContact"
      :type="'contact'"
      @get-active-category="getActiveCategory"
    />
    <ContactsList />
    <ModalCreateUpdateContact
      v-if="modal.type === 'contact'"
      :categories="categoriesContact"
    />
  </div>
  <p
    v-else
    class="warning-no-group"
  >
    Vous devez séléctionner un groupe pour accéder à cette section
  </p>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import Categories from "@/components/elmts/Categories";
import ContactsList from "@/components/contacts/ContactsList";
import ModalCreateUpdateContact from "@/components/modal/ModalCreateUpdateContact";
import CategoriesService from "@/services/CategoriesService";
import ContactsService from "@/services/ContactsService";
import LoaderCircle from "@/components/elmts/LoaderCircle";
import responsiveMixin from "@/mixins/responsiveMixin";

export default {
  name: "ContactsView",
  components: {
    Categories,
    ContactsList,
    ModalCreateUpdateContact,
    LoaderCircle
  },
  mixins: [responsiveMixin],
  data() {
    return {
      isContactsLoading: true
    };
  },
  computed: {
    ...mapState('user', {
      user: state => state.user
    }),
    ...mapState('modal', {
      modal: state => state.modal
    }),
    ...mapState('categories', {
      categoriesContact: state => state.categoriesContact,
      categoryActiveContact: state => state.categoryActiveContact
    }),
    ...mapGetters('user', [
      'groupId'
    ])
  },
  mounted() {
    CategoriesService.getCategoriesContact(this.groupId).then(response => {
      this.updateCategoriesContact(response);
    })
    .catch(() => {
      this.updateCategoriesContact([]);
    });
    ContactsService.getContacts(this.groupId).then(response => {
      this.updateContacts(response);
      this.isContactsLoading = false;
    })
    .catch(() => {
      this.updateContacts([]);
      this.isContactsLoading = false;
    });
  },
  methods: {
    ...mapActions('modal', [
      'updateOpen'
    ]),
    ...mapActions('categories', [
      'updateCategoriesContact',
      'updateCategoryContact'
    ]),
    ...mapActions('contacts', [
      'updateContacts'
    ]),
    openModal(type) {
      this.updateOpen({ open: true, type: type });
    },
    getActiveCategory(payload) {
      this.updateCategoryContact(payload);
    }
  },
};
</script>

<style lang="scss" scoped>
  .contacts {
    width: 800px;
    margin: 120px auto;
    &__actions {
      width: 100%;
    }
    &__action {
      cursor: pointer;
      color: $color-gradient-2;
      @include flex(row, center, flex-start);
      img {
        margin-right: 5px;
      }
      p {
        margin: 8px 0px;
      }
    }
    &__categories {
      margin-top: 20px;
    }
  }
  @include breakpoint(1279) {
    .contacts {
      width: 90%;
      margin: 160px auto;
      margin-bottom: 70px;
      &__action {
        position: fixed;
        right: 20px;
        bottom: 20px;
        background: $color-bg-line-1;
        border: 4px solid $color-police-main;
        box-shadow: 0px 0px 10px rgba(24, 22, 27, 0.205);
        @include flex(row, center, center);
        width: 50px;
        height: 50px;
        border-radius: 100%;
        z-index: 3;
        img {
          margin: 0;
          width: 25px;
          height: 25px;
        }
      }
    }
  }
</style>