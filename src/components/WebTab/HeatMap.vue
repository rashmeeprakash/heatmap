<template>
  <SharedHeatMap :chartData="chartData" />
</template>

<script>
import SharedHeatMap from "@/components/MainHeatMap.vue";

export default {
  components: {
    SharedHeatMap,
  },
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
