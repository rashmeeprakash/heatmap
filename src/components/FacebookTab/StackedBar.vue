<template>
  <SharedArea :chartData="chartData" :properties="properties" />
</template>

<script>
import SharedArea from "@/components/MainStackedBar.vue";

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
        { prop: "shares", color: "#FFD700" },
        { prop: "comments", color: "#6B8E23" },
        { prop: "reactions", color: "#20B2AA" },
      ],
    };
  },
};
</script>
