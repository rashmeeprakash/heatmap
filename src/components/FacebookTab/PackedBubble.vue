<!-- PackedBubble.vue -->
<template>
  <SharedPackedBubble
    :chartData="chartData"
    mainProp="division"
    subeProp="service"
    valueProp="insight_engagements"
  />
</template>

<script>
import SharedPackedBubble from "@/components/MainPackedBubble.vue";

export default {
  components: {
    SharedPackedBubble,
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
