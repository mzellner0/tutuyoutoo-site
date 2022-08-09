<template>
  <div v-if="errors.length > 0">
    <p
      v-for="(error, index) in errors"
      :key="index"
    >
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
    name: "ErrorMessage",
    props: {
      errors: { type: Array, default: () => [] }
    }
};
</script>

<style lang="scss" scoped>
  div {
    margin: 10px 0px;
    margin-bottom: 0px;
  }
  p {
    margin: 5px 30px;
  }
</style>