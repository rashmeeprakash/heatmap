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
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === 'flag' }"
          @click="changeTab('flag')"
          ><font-awesome-icon icon="flag"
        /></a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === 'fb' }"
          @click="changeTab('fb')"
          ><font-awesome-icon
            :icon="{ prefix: 'fab', iconName: 'facebook' }"
          />(WIP)</a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link disabled"
          :class="{ active: activeTab === 'twitter' }"
          @click="changeTab('twitter')"
          ><font-awesome-icon
            :icon="{ prefix: 'fab', iconName: 'square-x-twitter' }"
        /></a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link disabled"
          :class="{ active: activeTab === 'yt' }"
          @click="changeTab('yt')"
          ><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'youtube' }"
        /></a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link disabled"
          :class="{ active: activeTab === 'instagram' }"
          @click="changeTab('instagram')"
          ><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram' }"
        /></a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link disabled"
          :class="{ active: activeTab === 'telegram' }"
          @click="changeTab('telegram')"
          ><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'telegram' }"
        /></a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link disabled"
          :class="{ active: activeTab === 'podcast' }"
          @click="changeTab('podcast')"
          ><font-awesome-icon :icon="{ prefix: 'fas', iconName: 'podcast' }"
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
