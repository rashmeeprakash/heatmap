<template>
  <SharedArea :chartData="chartData" :properties="properties" />
</template>

<script>
import SharedArea from "@/components/MainNegativeColumns.vue";

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
      properties: [{ prop: "fans_change", color: "#4d4dff" }],
    };
  },
};
</script>
