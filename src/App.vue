<template>
  <div id="container">
    <NavBar @tab-change="updateActiveTab" :activeTab="activeTab" />
    <router-view></router-view>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
  data() {
    return {
      activeTab: "",
    };
  },
  methods: {
    updateActiveTab(tab) {
      this.activeTab = tab;
      if (this.$route.path !== `/${tab}`) {
        this.$router.push(`/${tab}`);
      }
    },
  },
  watch: {
    $route(to) {
      this.activeTab = to.path.replace("/", "");
    },
  },
  mounted() {
    const path = this.$route.path.replace("/", "");
    if (path === "") {
      this.$router.push("/web");
    } else {
      this.activeTab = path;
    }
  },
};
</script>

<style>
body {
  margin: 0;
  background-color: #fbfbf9 !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
</style>
