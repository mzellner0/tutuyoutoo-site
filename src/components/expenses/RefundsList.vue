<template>
  <div class="refunds-list">
    <div
      v-if="refundList.length > 0"
      class="refunds-list__container"
    >
      <Refund
        v-for="refund in refundList"
        :key="refund.id"
        :refund="refund"
      />
    </div>
    <p v-else>
      Plus d'embrouille ! Tout le monde est remboursé.
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Refund from '@/components/expenses/Refund';

export default {
  name: "Refunds",
  components: {
    Refund
  },
  computed: {
    ...mapState('expenses', {
      refundList: state => state.refundList
    })
  }
};
</script>

<style lang="scss" scoped>
  .refunds-list {
    margin-top: 30px;
    p {
      width: 100%;
      text-align: left;
    }
    &__container {
      width: 100%;
    }
  }

  @include breakpoint(960) {
    .refunds-list {
      margin-top: 15px;
    }
  }
</style>