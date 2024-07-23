<template>
  <SharedPie :chartData="chartData" :properties="properties" />
</template>

<script>
import SharedPie from "@/components/MainPieChart.vue";

export default {
  components: {
    SharedPie,
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
        "visits",
        "return_visits",
        "article_views",
        "audio_play",
        "video_play",
      ],
    };
  },
};
</script>
