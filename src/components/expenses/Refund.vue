<template>
  <div class="refund">
    <div class="refund__left">
      <p>{{ refund.refunderFirstname }} {{ refund.refunderLastname }}</p>
      <p>doit à</p>
      <p>{{ refund.refundedFirstname }} {{ refund.refundedLastname }}</p>
    </div>
    <div class="refund__right">
      <p>{{ refund.refund.toFixed(2) }} €</p>
      <LoaderCircle
        v-if="isUpdating"
        class="refund__loader"
      />
      <div
        v-else
        class="refund__right__check"
      >
        <p>marquer comme payé</p>
        <img
          src="@/assets/images/check.svg"
          alt="marquer comme payé"
          @click="refundExpense"
        >
      </div>
    </div>
  </div>
</template>

<script>
import ExpensesService from "@/services/ExpensesService";
import { mapGetters, mapActions } from 'vuex';
import LoaderCircle from "@/components/elmts/LoaderCircle";

export default {
  name: "Refund",
  components: {
    LoaderCircle
  },
  props: {
    refund: { type: Object, default: () => {} }
  },
  data() {
    return {
      isUpdating: false
    };
  },
  computed: {
    ...mapGetters('user', [
      'groupId',
      'userId'
    ])
  },
  methods: {
    ...mapActions('expenses', [
      'updateExpenses',
      'updateBalancedList',
      'updateRefundList'
    ]),
    refundExpense() {
      this.isUpdating = true;
      const listUsersIds = [this.refund.userIdRefunded];
      const dateNow  = new Date();
      const date =
        dateNow.getFullYear() +
        "-" +
        (parseInt(dateNow.getMonth()) + 1).toString() +
        "-" +
        dateNow.getUTCDate();

      let time = dateNow.toISOString().slice(0, 19).replace('T', ' ');
      time = time.split(" ")[1];

      const refundDateToSend = `${date} ${time}`;

      ExpensesService.createExpense(
        "Remboursement",
        this.refund.refund,
        this.refund.userIdRefunder,
        this.groupId, 
        1,
        listUsersIds,
        refundDateToSend,
        this.userId
      )
      .then(() => {
        ExpensesService.deleteRefund(this.userId, this.refund.id)
        .then((response) => {
          ExpensesService.getExpenses(this.groupId).then(expenses => {
            this.updateExpenses(expenses);
            ExpensesService.getBalancedList(this.groupId)
              .then(balancedList => {
                this.updateBalancedList(balancedList);
                ExpensesService.getRefundList(this.groupId)
                  .then(refundList => {
                    this.updateRefundList(refundList);
                    this.isUpdating = false;
                  });
              });
          });
        });
      }).catch((err) => {
        this.errors.push(err.response.data.message);
      });
    }
  },
};
</script>

<style lang="scss" scoped>
  .refund {
    width: calc(100% - 30px) !important;
    background-color: $color-bg-line-2;
    margin: 10px 0px;
    padding: 0px 15px;
    border-radius: 10px;
    @include flex(row, center, space-between);
    &__left {
      @include flex(row, center, flex-start);
      p {
        margin-right: 10px;
        &:first-of-type {
          color: $color-gradient-1;
          text-transform: uppercase;
        }
        &:last-of-type {
          color: $color-gradient-2;
          text-transform: uppercase;
        }
      }
    }
    &__loader {
      position: relative;
      top: 0;
      left: 0;
      width: 30px;
      height: 30px;
    }
    &__right {
      width: 25%;
      @include flex(row, center, space-between);
      p {
        color: $color-gradient-1;
        text-transform: uppercase;
      }
      &__check {
        @include flex(row, center, flex-end);
        width: 120px;
        cursor: pointer;
        p {
          text-align: right;
          color: $color-gradient-2;
          text-transform: initial;
          margin-right: 10px;
          font-size: 12px;
        }
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
  }

  @include breakpoint(800) {
    .refund {
      &__left {
        @include flex(column, flex-start, center);
        margin: 10px 0px;
        p {
          margin: 3px 0px;
        }
      }
      &__right {
        width: 25%;
        @include flex(column, flex-end, center);
        p {
          margin: 10px 0px;
        }
        &__check {
          p {
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>