<template>
  <div class="categories">
    <div class="categories__title">
      <div
        class="categories__title__left"
        @click="toggleCategories"
      >
        <h4>Catégories</h4>
        <div
          :class="[
            'categories__title__arrow',
            { 'categories__title__arrow--open': categoriesIsOpen }
          ]"
        />
        <p v-if="!categoriesIsOpen">
          {{ activeCategory.name }}
        </p>
      </div>
      <div class="categories__title__right">
        <img
          src="@/assets/images/white-trash.svg"
          alt="supprimer une catégorie"
          @click="openModal('categorie-delete')"
        >
        <img
          src="@/assets/images/white-plus.svg"
          alt="ajouter une catégorie"
          @click="openModal('categorie-create')"
        >
      </div>
    </div>
    <ul
      :style="{ 'transition': transitionList + 'ms' }"
      class="categories__list"
    >
      <li
        :class="{ 'category-active': activeCategory.index === -1 }"
        @click="changeCategoryActive(-1, 'Tout')"
      >
        Tout
      </li>
      <li
        v-for="(category, index) in categories"
        :key="index"
        :class="{ 'category-active': activeCategory.index === index }"
        @click="changeCategoryActive(index, category.name)"
      >
        {{ category.name }}
      </li>
    </ul>
    <ModalCreateCategory
      v-if="modal.type === 'categorie-create'"
      :type="type"
    />
    <ModalDeleteCategory
      v-if="modal.type === 'categorie-delete'"
      :type="type"
      :categories="categories"
      :deleting-category="deletingCategory"
      @get-deleting-category="getDeletingCategory"
    />
    <ModalWarning
      v-if="modal.type === 'warning-category'"
      :warning="'Voulez-vous vraiment supprimer le cette catégorie ? Attention, cela supprimera les posts de la catégorie associée !'"
      @continue="deleteCategory"
    />
  </div>
</template>

<script>
import ModalCreateCategory from "@/components/modal/ModalCreateCategory";
import ModalDeleteCategory from "@/components/modal/ModalDeleteCategory";
import ModalWarning from "@/components/modal/ModalWarning";
import { mapActions, mapState } from 'vuex';

export default {
  name: "Categories",
  components: {
    ModalCreateCategory,
    ModalDeleteCategory,
    ModalWarning
  },
  props: {
    categories: { type: Array, default: null },
    activeCategory: { type: Object, default: null },
    type: { type: String, default: null }
  },
  emits: ["get-active-category"],
  data() {
    return {
      categoriesIsOpen: false,
      transitionList: 200,
      deletingCategory: null
    };
  },
  computed: {
    ...mapState('modal', {
      modal: state => state.modal
    })
  },
  methods: {
    ...mapActions('modal', [
      'updateOpen'
    ]),
    toggleCategories() {
      this.categoriesIsOpen = !this.categoriesIsOpen;
      if (!this.categoriesIsOpen) {
        this.hideCategoriesList();
      } else {
        this.showCategoriesList();
      }
    },
    hideCategoriesList() {
      const list = document.querySelector(".categories__list");
      list.style.transform = "translateY(-50px)";
      list.style.opacity = "0";
      setTimeout(() => {
        list.style.display = "none";
      }, this.transitionList);
    },
    showCategoriesList() {
      const list = document.querySelector(".categories__list");
      list.style.display = "block";
      setTimeout(() => {
        list.style.transform = "translateY(0px)";
        list.style.opacity = "1";
      }, 10);
    },
    getDeletingCategory(payload) {
      if (payload) {
        this.deletingCategory = payload.id;
      }
    },
    deleteCategory() {
      this.updateOpen({ open: true, type: "categorie-delete" });
    },
    openModal(type) {
      this.deletingCategory = null;
      this.updateOpen({ open: true, type: type });
    },
    changeCategoryActive(index, name) {
      this.$emit("get-active-category", { index: index, name: name });
    }
  }
};
</script>

<style lang="scss" scoped>
  .categories {
    width: 100%;
    @include flex(column, flex-start, center);
    &__title {
      @include flex(row, center, space-between);
      padding-bottom: 8px;
      width: 100%;
      border-bottom: 2px solid;
      h4 {
        margin: 0px;
        text-align: left;
        font-weight: normal;
        font-size: 20px;
      }
      &__left {
        cursor: pointer;
        @include flex(row, center, flex-start);
        p {
          margin: 0;
          margin-left: 30px;
          color: $color-gradient-1;
          font-weight: bold
        }
      }
      &__right {
        @include flex(row, flex-end, center);
        img {
          cursor: pointer;
          margin-left: 10px;
          width: 20px;
          height: 20px;
        }
      }
      &__arrow {
        margin-left: 12px;
        width: 0; 
        height: 0; 
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid $color-police-main;
        transform: rotateZ(180deg);
        transition: 200ms;
        &--open {
          transform: rotateZ(0deg);
        }
      }
    }
    &__list {
      list-style: none;
      padding: 8px 0px;
      padding-left: 20px;
      width: calc(100% - 20px);
      border-bottom: 2px solid;
      margin: 0;
      transform: translateY(-50px);
      opacity: 0;
      display: none;
    }
    li {
      margin: 8px 0px;
      cursor: pointer;
    }
    .category-active {
      color: $color-gradient-1;
      font-weight: bold;
    }
  }
</style>