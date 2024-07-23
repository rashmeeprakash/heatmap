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
        { prop: "insight_video_views", color: "#DA70D6" },
        { prop: "insight_engagements", color: "#FF7F50" },
        { prop: "reactions", color: "#20B2AA" },
        { prop: "comments", color: "#6B8E23" },
        { prop: "shares", color: "#FFD700" },
      ],
    };
  },
};
</script>
