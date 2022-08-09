<template>
  <div class="expense">
    <div class="expense__top">
      <div class="expense__left">
        <h3>{{ expense.name_expenses }}</h3>
        <p>Payé par {{ expense.firstname }} {{ expense.lastname }}</p>
      </div>
      <div class="expense__right">
        <div class="expense__right__info">
          <p>{{ expense.expense }} €</p>
          <p>{{ getDate(expense.date_expense) }}</p>
        </div>
        <div class="expense__right__actions">
          <img
            v-if="expense.isRefund === 0"
            src="@/assets/images/edit.svg"
            alt="modifier la dépense"
            @click="openUpdateExpense"
          >
          <img
            src="@/assets/images/trash.svg"
            alt="supprimer la dépense"
            @click="tryToDelete"
          >
        </div>
      </div>
    </div>
    <div class="expense__bottom">
      <p v-if="expense.isRefund === 0">
        {{ expense.listUsersAttached.length }} Participant(s) :
      </p>
      <p v-else>
        Remboursment pour :
      </p>
      <ul>
        <li
          v-for="(user, index) in expense.listUsersAttached"
          :key="index"
        >
          {{ user.firstname }} {{ user.lastname }}
        </li>
      </ul>
    </div>
    <ModalWarning
      v-if="modal.type === 'warning' + expense.id"
      :warning="warningMessage"
      @continue="deleteExpense"
    />
    <ModalAddExpense
      v-if="modal.type === 'update-expense' + expense.id"
      :old-expense="expense"
    />
  </div>
</template>

<script>
import ExpensesService from "@/services/ExpensesService";
import { mapGetters, mapActions, mapState } from 'vuex';
import ModalWarning from "@/components/modal/ModalWarning";
import ModalAddExpense from "@/components/modal/ModalAddExpense";
import expensesMixin from "@/mixins/expensesMixin";

export default {
  name: "Expense",
  components: {
    ModalWarning,
    ModalAddExpense
  },
  mixins: [expensesMixin],
  props: {
    expense: { type: Object, default: () => {} }
  },
  computed: {
    ...mapGetters('user', [
      'groupId',
      'userId'
    ]),
    ...mapState('modal', {
      modal: state => state.modal
    }),
    warningMessage() {
      if (this.expense.isRefund === 1) {
        return 'Voulez-vous vraiment supprimer le remboursement ?';
      } else {
        return 'Voulez-vous vraiment supprimer la dépense ?';
      }
    },
  },
  methods: {
    ...mapActions('modal', [
      'updateOpen'
    ]),
    openUpdateExpense() {
      this.updateOpen(
        { open: true, type: "update-expense" + this.expense.id }
      );
    },
    tryToDelete() {
      this.updateOpen({ open: true, type: "warning" + this.expense.id });
    },
    deleteExpense() {
      ExpensesService.deleteExpense(this.userId, this.expense.id, this.groupId)
      .then(() => {
        this.updateAllExpenses(() => {
          this.updateOpen({ open: false });
        }, () => {
          this.updateOpen({ open: false });
        });
      });
    },
    getDate(date) {
      return date.split(" ")[0];
    },
  },
};
</script>

<style lang="scss" scoped>
  .expense {
    border-bottom: 2px dotted;
    width: 100%;
    padding: 15px 0px;
    p {
      margin: 0;
    }
    ul {
      margin: 0;
    }
    &__top {
      @include flex(row, center, space-between);
      padding-bottom: 15px;
    }
    &__bottom {
      padding-top: 15px;
      border-top: 2px dotted;
      padding-left: 20px;
      p {
        margin-bottom: 5px
      }
    }
    &__left {
      @include flex(row, center, flex-start);
      h3 {
        margin-right: 40px;
        font-size: 18px;
        width: 255px;
      }
      p {
        text-transform: uppercase;
      }
    }
    &__right {
      @include flex(row, center, flex-end);
      p {
        margin: 0px 20px;
      }
      &__actions {
        width: 65px;
        @include flex(row, center, flex-end);
        img {
          margin-left: 10px;
          cursor: pointer;
        }
      }
      &__info {
        @include flex(row, center,  space-between);
        width: 260px;
      }
    }
  }

  @include breakpoint(960) {
    .expense {
      &__bottom {
        p {
          font-size: 14px;
        }
        li {
          font-size: 14px;
        }
        ul {
          padding-left: 25px;
        }
      }
      &__left {
        @include flex(column, flex-start, center);
        margin-right: 15px;
        h3 {
          margin-right: 20px;
          font-size: 16px;
          width: auto;
          font-weight: bold;
        }
        p {
          font-size: 13px;
        }
      }
      &__right {
        p {
          margin: 0px 5px;
          &:first-of-type {
            font-weight: bold;
          }
          &:last-of-type {
            font-size: 13px;
          }
        }
        &__actions {
          width: auto;
          img {
            margin-left: 5px;
            width: 25px;
            height: 25px;
            object-fit: contain;
          }
        }
        &__info {
          @include flex(column, flex-end,  center);
          width: auto;
        }
      }
    }
  }
</style>