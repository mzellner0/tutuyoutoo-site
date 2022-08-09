<template>
  <div
    v-if="expenses"
    class="expenses-list"
  >
    <div class="expenses-list__total">
      <p>Total des dépenses : <span>{{ total.toFixed(2) }} €</span></p>
      <p>
        Total des dépenses payées par tout le groupe : 
        <span>{{ totalAllGroup.toFixed(2) }} €</span>
      </p>
      <p>
        Mon coût total : 
        <span>{{ totalUser.toFixed(2) }} €</span>
      </p>
    </div>

    <Expense
      v-for="(expense, index) in expenses"
      :key="expense.id"
      :expense="expense"
      :class="[
        'expenses-list__color-1', 
        { 'expenses-list__color-2': index % 2 !== 0 },
        { 'expenses-list__color-3': expense.isRefund === 1 }
      ]"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Expense from "@/components/expenses/Expense";

export default {
  name: "ExpensesList",
  components: {
    Expense
  },
  computed: {
    ...mapGetters('user', [
      'userId'
    ]),
    ...mapState('expenses', {
      expenses: state => state.expenses
    }),
    ...mapState('groups', [
      'usersInGroup',
    ]),
    total() {
      const expensesArray = this.expenses.map((expense) => {
        if (expense.isRefund === 0) {
          return expense.expense;
        } else {
          return 0;
        }
      });
      return expensesArray.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    },
    totalAllGroup() {
      const expensesArray = this.expenses.map((expense) => {
        if (
          expense.isRefund === 0 &&
          expense.listUsersAttached.length === this.usersInGroup.length
        ) {
          return expense.expense;
        } else {
          return 0;
        }
      });
      return expensesArray.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    },
    totalUser() {
      const expensesArray = this.expenses.map((expense) => {
        if (
          expense.isRefund === 0 &&
          expense.userId == this.userId &&
          expense.listUsersAttached.map(user => user.userId.toString()).includes(this.userId)
        ) {
          return expense.expense / expense.listUsersAttached.length;
        } else if (
          expense.isRefund === 0 &&
          expense.listUsersAttached.map(user => user.userId.toString()).includes(this.userId)
        ) {
          return expense.expense / expense.listUsersAttached.length;
        } else {
          return 0;
        }
      });
      return expensesArray.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    }
  },
};
</script>

<style lang="scss" scoped>
  .expenses-list {
    margin-top: 30px;
    &__total {
      @include flex(column, flex-start, center);
      width: 100%;
      margin-bottom: 10px;
      p {
        margin: 5px 0px;
        color: $color-gradient-2;
      }
      span {
        font-weight: bold;
      }
    }
    &__color-1 {
      color: $color-gradient-1-darker;
    }
    &__color-2 {
      color: $color-gradient-1-lighter;
    }
    &__color-3 {
      color: $color-police-main;
    }
  }

  @include breakpoint(960) {
    .expenses-list {
      margin-top: 15px;
    }
  }
</style>