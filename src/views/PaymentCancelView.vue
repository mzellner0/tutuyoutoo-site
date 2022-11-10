<template>
  <div>
    <img src="@/assets/images/payment-error.svg" alt="error" />
    <p>{{ $tr[$route.params.lang].paymentCancel }}</p>
  </div>
</template>

<script>
export default {
  name: "PaymentCancelView"
}
</script>

<style lang="scss" scoped>
div {
  margin-top: 20px;
  @include flex(column, center, center);
  p {
    margin: 5px 0px;
  }
  img {
    width: 60px;
    margin-bottom: 5px;
  }
}
</style>