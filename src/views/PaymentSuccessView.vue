<template>
  <div>
    <img src="@/assets/images/payment-success.svg" alt="success" />
    <p>{{ $tr[$route.params.lang].paymentSuccess }}</p>
    <p>{{ $tr[$route.params.lang].paymentEmail }}</p>
  </div>
</template>

<script>
export default {
  name: "PaymentSuccessView"
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