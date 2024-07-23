<template>
  <SharedArea :chartData="chartData" :properties="properties" />
</template>

<script>
import SharedArea from "@/components/MainAreaChart.vue";

export default {
  components: {
    SharedArea,
  },
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      properties: [
        { prop: "visits", color: "#DA70D6" },
        { prop: "article_views", color: "#FF7F50" },
        { prop: "return_visits", color: "#FFD700" },
        { prop: "audio_play", color: "#20B2AA" },
        { prop: "video_play", color: "#6B8E23" },
      ],
    };
  },
};
</script>
