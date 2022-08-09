<template>
  <LoaderCircle v-if="isExpensesLoading" />
  <div
    v-else-if="user.groupActif"
    class="expenses container"
  >
    <div class="expenses__menu">
      <div class="expenses__menu--gradient" />
      <router-link
        v-for="(link, index) in listLinks"
        :key="index"
        :to="link.to"
      >
        {{ link.name }}
      </router-link>
    </div>
    <div class="expenses__actions">
      <div class="expenses__action">
        <img
          v-if="isOnDesktop"
          src="@/assets/images/blue-plus.svg"
          alt="plus"
          @click="openModal('expense')"
        >
        <img
          v-else
          src="@/assets/images/white-plus.svg"
          alt="plus"
          @click="openModal('expense')"
        >
        <p
          v-if="isOnDesktop"
          @click="openModal('expense')"
        >
          Ajouter une dépense
        </p>
      </div>
    </div>
    <router-view
      v-if="expenses.length > 0"
      class="container expenses__container"
    />
    <p
      v-else
      class="expenses__warning"
    >
      Aucune dépense.
    </p>
    <ModalAddExpense v-if="modal.type === 'expense'" />
  </div>
  <p
    v-else
    class="warning-no-group"
  >
    Vous devez séléctionner un groupe pour accéder à cette section
  </p>
</template>

<script>
import GroupsService from "@/services/GroupsService";
import ModalAddExpense from "@/components/modal/ModalAddExpense";
import { mapGetters, mapState, mapActions } from 'vuex';
import LoaderCircle from "@/components/elmts/LoaderCircle";
import expensesMixin from "@/mixins/expensesMixin";
import responsiveMixin from "@/mixins/responsiveMixin";

export default {
  name: "ExpensesView",
  components: {
    ModalAddExpense,
    LoaderCircle
  },
  mixins: [expensesMixin, responsiveMixin],
  data() {
    return {
      listLinks: [
        { name: "équilibre", to: "/comptes/equilibre" },
        { name: "Dépenses", to: "/comptes/depenses" },
        { name: "Remboursements", to: "/comptes/remboursements" }
      ],
      isExpensesLoading: true
    };
  },
  computed: {
    ...mapGetters('user', [
      'groupId'
    ]),
    ...mapState('modal', {
      modal: state => state.modal
    }),
    ...mapState('expenses', {
      expenses: state => state.expenses,
      balancedList: state => state.balancedList
    }),
    ...mapState('groups', [
      'usersInGroup',
    ]),
    ...mapState('user', {
      user: state => state.user
    })
  },
  mounted() {
    GroupsService.getUsers(this.groupId)
    .then(response => {
      this.updateUsersInGroup(response);
    });
    this.updateAllExpenses(() => {
      this.isExpensesLoading = false;
    }, () => {});
  },
  methods: {
    ...mapActions('modal', [
      'updateOpen'
    ]),
    ...mapActions('groups', [
      'updateUsersInGroup'
    ]),
    openModal(type) {
      this.updateOpen({ open: true, type: type });
    }
  }
};
</script>

<style lang="scss" scoped>
  .router-link-active {
      text-decoration: underline;
      &::after {
        content: none !important;
      }
  }
  .expenses {
    width: 100%;
    margin: 130px auto;
    &__warning {
      text-align: left;
      width: 900px;
      margin-top: 20px;
    }
    &__menu {
      width: calc(100% - 200px);
      position: fixed;
      top: 78px;
      padding-top: 10px;
      background-color: $color-bg;
      padding-bottom: 10px;
      z-index: 1;
      padding-left: 200px;
      &--gradient {
        position: fixed;
        z-index: 0;
        top: 115px;
        left: 0;
        width: 100%;
        height: 3px;
        background: $gradient-02;
      }
      a {
        margin-right: 25px;
        text-transform: uppercase;
      }
    }
    &__container {
      width: 900px;
    }
    &__actions {
      width: 900px;
      margin-top: 20px;
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
  }
  @include breakpoint(1279) {
    .expenses {
      margin: 170px auto;
      margin-bottom: 70px;
      &__menu {
        padding-left: 0;
        width: 90%;
        top: 137px;
        z-index: 1;
        &--gradient{
          top: 175px;
        }
      }
      &__warning {
        width: 90%;
      }
      &__container {
        width: 90%;
      }
      &__actions {
        width: 90%;
      }
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
  @include breakpoint(500) {
    .expenses {
      &__menu {
        @include flex(row, center, center);
        width: calc(100% - 15px);
        padding-left: 15px;
        padding-top: 10px;
        top: 137px;
        padding-bottom: 8px;
        z-index: 1;
        &--gradient{
          top: 169px;
        }
        a {
          margin-right: 10px;
          text-transform: uppercase;
          font-size: 13px;
        }
      }
    }
  }
</style>