<template>
  <SharedTrends :chartData="chartData" :metrics="metrics" />
</template>

<script>
import SharedTrends from "@/components/MainTotalsTrends.vue";

export default {
  components: {
    SharedTrends,
  },
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      metrics: [
        {
          name: "Video Views",
          property: "insight_video_views",
          color: "#da70d6",
        },
        {
          name: "Insight Engagements",
          property: "insight_engagements",
          color: "#ff7f50",
        },
        { name: "Reactions", property: "reactions", color: "#20B2AA" },
        { name: "Comments", property: "comments", color: "#6B8E23" },
        { name: "Shares", property: "shares", color: "#FFD700" },
      ],
    };
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
