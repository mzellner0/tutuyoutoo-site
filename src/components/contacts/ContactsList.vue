<template>
  <div class="contacts-list">
    <div v-if="getPostsWithCategoryActive.length > 0">
      <Contact
        v-for="contact in getPostsWithCategoryActive"
        :key="contact.id"
        :contact="contact"
      />
    </div>
    <p v-else-if="contacts.length > 0">
      Aucun contact sur ce groupe avec cette catégorie !
    </p>
    <p v-else>
      Aucun contact sur ce groupe !
    </p>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import Contact from "@/components/contacts/Contact";

export default {
  name: "ContactsList",
  components: {
    Contact
  },
  computed: {
    ...mapState('contacts', {
      contacts: state => state.contacts
    }),
    ...mapState('categories', {
      categoryActiveContact: state => state.categoryActiveContact
    }),
    getPostsWithCategoryActive() {
      if (this.categoryActiveContact.name === "Tout") {
        return this.contacts;
      } else {
        return this.contacts.filter(contact => contact.name_category === this.categoryActiveContact.name);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .contacts-list {
    width: 100%;
  }
</style>