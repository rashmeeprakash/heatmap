<template>
  <div id="navs" class="m-2">
    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === 'web' }"
          @click="changeTab('web')"
          ><font-awesome-icon icon="globe"
        /></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    activeTab: String, // Receive activeTab as a prop from parent (App.vue)
  },
  methods: {
    changeTab(tab) {
      this.$emit("tab-change", tab);
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
