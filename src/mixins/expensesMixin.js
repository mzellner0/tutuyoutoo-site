import ExpensesService from "@/services/ExpensesService";
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('user', [
      'groupId'
    ]),
  },
  methods: {
    ...mapActions('expenses', [
      'updateExpenses',
      'updateBalancedList',
      'updateRefundList'
    ]),
    updateAllExpenses(callbackSuccess, callbackError) {
      ExpensesService.getExpenses(this.groupId)
      .then(expenses => {
        this.updateExpenses(expenses);
        ExpensesService.getBalancedList(this.groupId)
        .then(balancedList => {
          this.updateBalancedList(balancedList);
          ExpensesService.getRefundList(this.groupId)
          .then(refundList => {
            this.updateRefundList(refundList);
            callbackSuccess();
          });
        });
      })
      .catch(() => {
        this.updateExpenses([]);
        callbackError();
      });
    }
  }
};