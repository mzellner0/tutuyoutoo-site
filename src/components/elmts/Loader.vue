<template>
  <PercentBar :percentage="percentage" />
</template>

<script>
import { mapState } from 'vuex';
import PercentBar from '@/components/elmts/PercentBar'

export default {
  name: "Loader",
  components: {
    PercentBar
  },
  computed: {
    ...mapState('loader', {
      percentage: state => state.percentage
    })
  }
};
</script>