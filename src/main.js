import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Highcharts from "highcharts";
import Stock from "highcharts/modules/stock";
import Drilldown from "highcharts/modules/drilldown";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";
import MapModule from "highcharts/modules/map";
import HighchartsHeatMap from "highcharts/modules/heatmap";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsVue from "highcharts-vue";
import mapDataWorld from "@highcharts/map-collection/custom/world.geo.json";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import VueAxios from "vue-axios";
import moment from "moment";
import DateRangePicker from "vue3-daterange-picker";
import { getCode } from "country-list";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faGlobe,
  faFlag,
  faPodcast,
  faCalendar,
  faFileCsv,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faFacebook,
  faSquareXTwitter,
  faYoutube,
  faInstagram,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";

// Add icons to the library
library.add(
  faGlobe,
  faFlag,
  faFacebook,
  faSquareXTwitter,
  faYoutube,
  faInstagram,
  faTelegram,
  faPodcast,
  faCalendar,
  faFileCsv
);

// Create the Vue app instance
const app = createApp(App);

// Use Axios for HTTP requests
app.use(VueAxios, axios);
app.config.globalProperties.axios = axios;

// Use moment.js as a global property
app.config.globalProperties.$moment = moment;

// Make getCode from country-list available globally
app.config.globalProperties.$getCode = getCode;

// Enable Highcharts and its modules
Stock(Highcharts);
Drilldown(Highcharts);
HighchartsMore(Highcharts);
HighchartsHeatMap(Highcharts);
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);
HighchartsAccessibility(Highcharts);
MapModule(Highcharts);
Highcharts.maps["myMapName"] = mapDataWorld;
app.use(HighchartsVue);

// Register the DateRangePicker component
app.component("DateRangePicker", DateRangePicker);

// Register the FontAwesomeIcon component
app.component("font-awesome-icon", FontAwesomeIcon);

// Use the router
app.use(router);

// Mount the app to the DOM
app.mount("#app");
