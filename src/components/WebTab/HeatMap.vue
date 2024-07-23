<template>
  <SharedHeatMap
    :chartData="chartData"
    divisionProp="division"
    serviceProp="service"
    profileNameProp="account_url"
    reportDateProp="report_date"
    videoViewsProp="visits"
  />
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
