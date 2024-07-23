<template>
  <div id="webs" class="m-2 d-inline-flex">
    <div style="width: 100%" class="d-flex flex-column">
      <HeatMap id="heatMap" style="width: 100%" />
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import HeatMap from "./WebTab/HeatMap.vue";

export default {
  components: { HeatMap },
};
</script>

<style>
/* Add your component-specific styles here */
</style>
