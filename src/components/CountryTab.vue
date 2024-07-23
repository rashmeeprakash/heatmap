<template>
  <h2 class="text-dark text-center">
    <font-awesome-icon icon="flag" /><u>Country</u>
  </h2>
  <div id="countries" class="m-2 d-inline-flex">
    <div style="width: 25%">
      <BaseElements
        :start-date="startDate"
        :end-date="endDate"
        @date-range-changed="updateDateRange"
        @division-changed="updateDateRange"
        @service-changed="updateDateRange"
      />
    </div>
    <div style="width: 75%" class="d-flex flex-column">
      <WorldMap style="background-color: #283347" :chart-data="chartData" />
      <hr />
      <AreaChart id="splines" :chart-data="chartData" />
      <hr />
      <AgGridVue id="tbls" class="m-2" :chart-data="chartData" />
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import BaseElements from "./BaseElements";
import AreaChart from "./CountryTab/AreaChart.vue";
import WorldMap from "./CountryTab/WorldMap.vue";
import AgGridVue from "./CountryTab/AgGridVue.vue";

export default {
  components: { BaseElements, AreaChart, WorldMap, AgGridVue },
  data() {
    return {
      startDate: moment().subtract(1, "month").format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
      divSelected: [],
      serviceSelected: [],
      chartData: [],
    };
  },
  watch: {
    startDate(newStartDate) {
      this.loadData(
        newStartDate,
        this.endDate,
        this.divSelected,
        this.serviceSelected
      );
    },
    endDate(newEndDate) {
      this.loadData(
        this.startDate,
        newEndDate,
        this.divSelected,
        this.serviceSelected
      );
    },
    divSelected(newDivSelected) {
      this.loadData(
        this.startDate,
        this.endDate,
        newDivSelected,
        this.serviceSelected
      );
    },
    serviceSelected(newServiceSelected) {
      this.loadData(
        this.startDate,
        this.endDate,
        this.divSelected,
        newServiceSelected
      );
    },
  },
  methods: {
    updateDateRange({ startDate, endDate, divSelected, serviceSelected }) {
      this.startDate = startDate;
      this.endDate = endDate;
      this.divSelected = divSelected;
      this.serviceSelected = serviceSelected;
      this.loadData(
        this.startDate,
        this.endDate,
        this.divSelected,
        this.serviceSelected
      );
    },
    loadData(startDate, endDate, divSelected, serviceSelected) {
      const baseURL =
        window.location.hostname === "localhost"
          ? "http://localhost:3001/api"
          : "https://opr-voa.azurewebsites.net/api";
      if (!baseURL) {
        console.error("VUE_APP_API_BASE_URL is not defined");
        return;
      }
      const url = `${baseURL}/country?startDate=${moment(startDate).format(
        "YYYY-MM-DD"
      )}&endDate=${moment(endDate).format("YYYY-MM-DD")}`;
      console.log(url);
      this.axios
        .get(url)
        .then((response) => {
          if (divSelected.length === 0 && serviceSelected.length === 0)
            this.chartData = response.data;
          else {
            const filteredData = response.data.filter(
              (rd) =>
                divSelected.includes(rd.division) &&
                serviceSelected.includes(rd.service)
            );
            this.chartData = filteredData;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.loadData(
      this.startDate,
      this.endDate,
      this.divSelected,
      this.serviceSelected
    );
  },
};
</script>

<style>
/* Add your component-specific styles here */
</style>
