<template>
  <div class="d-flex flex-column">
    <div style="background-color: #fbfbf9">
      <button
        type="button"
        class="m-2 btn btn-light visits"
        style="background-color: #da70d6"
        @click="loadData('visits')"
      >
        Visits
      </button>
      <button
        type="button"
        class="m-2 btn btn-light article_views"
        style="background-color: #ff7f50"
        @click="loadData('article_views')"
      >
        Article Views
      </button>
      <button
        type="button"
        class="m-2 btn btn-light audio_play"
        style="background-color: #20b2aa"
        @click="loadData('audio_play')"
      >
        Audio Play
      </button>
      <button
        type="button"
        class="m-2 btn btn-light video_play"
        style="background-color: #6b8e23"
        @click="loadData('video_play')"
      >
        Video Play
      </button>
    </div>
    <SharedMap
      :chartData="chartData"
      :currentDataType="currentDataType"
      :colorSettings="colorSettings"
    />
  </div>
</template>

<script>
import SharedMap from "@/components/MainMapChart.vue";

export default {
  components: {
    SharedMap,
  },
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentDataType: "visits",
      colorSettings: {
        visits: {
          maxColor: "#DA70D6",
          stops: [
            [0, "#fff"],
            [0.01, "#FDF9FD"],
            [0.05, "#FAF0FA"],
            [0.2, "#F5E1F5"],
            [1, "#DA70D6"],
          ],
        },
        article_views: {
          maxColor: "#FF7F50",
          stops: [
            [0, "#fff"],
            [0.01, "#FFEFE8"],
            [0.05, "#FFD7C1"],
            [0.2, "#FFB598"],
            [1, "#FF7F50"],
          ],
        },
        audio_play: {
          maxColor: "#20B2AA",
          stops: [
            [0, "#fff"],
            [0.01, "#E5F9F7"],
            [0.05, "#CCF2EF"],
            [0.2, "#99E5DE"],
            [1, "#20B2AA"],
          ],
        },
        video_play: {
          maxColor: "#6B8E23",
          stops: [
            [0, "#fff"],
            [0.01, "#F0F5E5"],
            [0.05, "#E1EBCC"],
            [0.2, "#C3D699"],
            [1, "#6B8E23"],
          ],
        },
      },
    };
  },
  methods: {
    loadData(dataType) {
      this.currentDataType = dataType;
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
