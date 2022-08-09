<template>
  <Modal class="modal__expense">
    <h3 v-if="!oldExpense">
      Ajouter une dépense
    </h3>
    <h3 v-else>
      Modifier une dépense
    </h3>
    <form v-if="usersInGroup">
      <input
        v-model="name"
        type="text"
        placeholder="Nom de la dépense"
      >
      <input
        v-model="expenseAmount"
        type="number"
        placeholder="Montant en euro"
      >
      <input
        v-model="expenseDate"
        type="date"
        placeholder="Date du paiment"
      >
      <div class="modal__expense__pay">
        <p>Qui paye ?</p>
        <div
          v-for="user in usersInGroup"
          :key="user.userId"
        >
          <input
            :id="user.userId + 'pays'"
            v-model="userPays"
            type="radio"
            :value="user.userId"
            name="userPays"
          >
          <label :for="user.userId + 'pays'">{{ user.firstname }} {{ user.lastname }}</label>
        </div>
      </div>
      <div class="modal__expense__owe">
        <p>Pour qui ?</p>
        <div>
          <input
            id="select-all"
            type="checkbox"
            name="select-all"
            :checked="selectAll"
            @click="selectAllUsers"
          >
          <label for="select-all">Tout séléctionner</label>
        </div>
        <div
          v-for="user in usersInGroup"
          :key="user.userId"
        >
          <input
            :id="user.userId + 'owe'"
            v-model="usersOwe"
            type="checkbox"
            :value="user.userId"
            name="usersOwe"
            :checked="selectAll"
            @click="selectAll = false"
          >
          <label :for="user.userId + 'owe'">{{ user.firstname }} {{ user.lastname }}</label>
        </div>
      </div>
      <ErrorMessage
        :errors="errors"
      />
      <LoaderCircle
        v-if="waiting"
        class="modal__loader"
      />
      <Button
        v-else
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
import ExpensesService from "@/services/ExpensesService";
import LoaderCircle from "@/components/elmts/LoaderCircle";
import expensesMixin from "@/mixins/expensesMixin";

export default {
  name: "ModalCreateCategory",
  components: {
    Modal,
    Button,
    ErrorMessage,
    LoaderCircle
  },
  mixins: [expensesMixin],
  props: {
    oldExpense: { type: Object, default: null }
  },
  data() {
    return {
      errors: [],
      expenseAmount: "",
      userPays: null,
      usersOwe: [],
      name: "",
      selectAll: false,
      expenseDate: "",
      time: "00:00:00",
      waiting: false
    };
  },
  computed: {
    ...mapGetters('user', [
      'userId',
      'groupId'
    ]),
    ...mapState('groups', [
      'usersInGroup'
    ]),
    textButton() {
      if (this.oldExpense) {
        return "Modifier la dépense";
      } else {
        return "Ajouter la dépense";
      }
    }
  },
  mounted() {
    this.updateDate();
    if (this.oldExpense) {
      const idsUsersOwe = this.oldExpense.listUsersAttached
        .map(user => user.userId);
      this.expenseAmount = this.oldExpense.expense;
      this.userPays = this.oldExpense.userId;
      this.usersOwe = idsUsersOwe;
      this.name = this.oldExpense.name_expenses;

      let newDate = 
        this.oldExpense.date_expense.split(" ")[0].split("/");
      newDate = newDate[2] + "-" + newDate[1] + "-" + newDate[0];
      this.expenseDate = newDate;

      this.time = this.oldExpense.date_expense.split(" ")[1];
    }
  },
  methods: {
    ...mapActions('modal', [
      'updateOpen'
    ]),
    selectAllUsers() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.usersOwe = this.usersInGroup.map(user => user.userId);
      } else {
        this.usersOwe = [];
      }
    },
    updateDate() {
      const dateNow  = new Date();
      const month = (parseInt(dateNow.getMonth()) + 1).toString().length > 2 ?
        (parseInt(dateNow.getMonth()) + 1).toString() :
        "0" + (parseInt(dateNow.getMonth()) + 1).toString();
      const day = dateNow.getUTCDate().toString().length >= 2 ?
        dateNow.getUTCDate().toString() :
        "0" + dateNow.getUTCDate();

      const time = dateNow.toISOString().slice(0, 19).replace('T', ' ');
      this.time = time.split(" ")[1];
      
      this.expenseDate =
        dateNow.getFullYear().toString() + "-" + month + "-" + day;
    },
    createExpense() {
      const expenseDateToSend = `${this.expenseDate} ${this.time}`;
      ExpensesService.createExpense(
        this.name,
        this.expenseAmount,
        this.userPays,
        this.groupId, 
        0,
        this.usersOwe,
        expenseDateToSend,
        this.userId
      )
      .then(() => {
        this.updateAllExpenses(() => {
          this.expenseAmount = "";
          this.userPays = null;
          this.usersOwe = [];
          this.name = "";
          this.selectAll = false;
          this.updateDate();
          this.waiting = false;
          this.updateOpen({ open: false });
        }, () => {});
      })
      .catch((err) => {
        this.errors.push(err.response.data.message);
        this.waiting = false;
      });
    },
    submit(event) {
      event.preventDefault();
      this.errors = [];

      if (
        this.name !== "" &&
        this.userPays &&
        this.usersOwe.length > 0 &&
        this.expenseAmount !== "" &&
        this.expenseDate !== ""
      ) {
        this.waiting = true;
        if (this.oldExpense) {
          ExpensesService.deleteExpense(this.userId, this.oldExpense.id, this.groupId)
          .then(() => {
            this.createExpense();
          });
        } else {
          this.createExpense();
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
    &__loader {
      position: relative;
      top: auto;
      left: auto;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    &__expense {
      form {
        @include flex(column, center, center);
        margin-top: 30px;
      }
      label {
        cursor: pointer
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
        &:nth-of-type(2n) {
          color: $color-gradient-2;
          &::placeholder {
            color: $color-gradient-2-placeholder;
            font-family: $police-1;
          }
        }
        &::placeholder {
          color: $color-gradient-1-placeholder;
          font-family: $police-1;
        }
      }
      h3 {
        border-bottom: 2px solid;
        padding-bottom: 10px;
        font-weight: bold;
      }
      &__pay {
        @include flex(column, flex-start, center);
        width: 80%;
        p {
          margin: 0px;
          margin-top: 25px;
          margin-bottom: 5px;
        }
        div {
          @include flex(row, center, flex-start);
          margin: 5px 0px;
        }
        input {
          width: auto;
          cursor: pointer;
          margin: 0px;
          margin-right: 10px;
        }
      }
      &__owe {
        @include flex(column, flex-start, center);
        width: 80%;
        p {
          margin: 0px;
          margin-top: 20px;
          margin-bottom: 5px;
        }
        div {
          @include flex(row, center, flex-start);
          margin: 5px 0px;
          &:first-of-type {
            label {
              font-weight: bold;
            }
          }
        }
        input {
          width: auto;
          cursor: pointer;
          margin: 0px;
          margin-right: 10px;
        } 
      }
    }
    &__button {
      margin-top: 30px;
      margin-bottom: 20px;
    }
  }

  @include breakpoint(1279) {
    .modal {
      &__expense {
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
    .modal {
      &__expense {
        input {
          width: 220px;
          font-size: 15px;
        }
        &__pay {
          input {
            width: auto;
          }
        }
        &__owe {
          input {
            width: auto;
          } 
        }
      }
    }
  }
</style>