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
        { name: "Visits", property: "visits", color: "#da70d6" },
        { name: "Article Views", property: "article_views", color: "#ff7f50" },
        { name: "Return Visits", property: "return_visits", color: "#ffd700" },
        { name: "Audio Play", property: "audio_play", color: "#20b2aa" },
        { name: "Video Play", property: "video_play", color: "#6b8e23" },
      ],
    };
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
