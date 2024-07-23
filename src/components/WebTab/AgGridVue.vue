<template>
  <div class="data-table-container">
    <div class="d-flex justify-content-between">
      <input
        type="text"
        class="mt-2 w-25 form-control-sm"
        id="filter-text-box"
        placeholder="Filter..."
        v-on:input="onFilterTextBoxChanged"
      />
      <button class="btn btn-link" v-on:click="onBtnExport">
        <font-awesome-icon icon="file-csv" />
      </button>
    </div>

    <ag-grid-vue
      :rowData="rowData"
      :columnDefs="colDefs"
      style="width: 100%; height: 750px"
      class="ag-theme-quartz"
      :pagination="true"
      @grid-ready="onGridReady"
    />
  </div>
</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridVue } from "ag-grid-vue3";

export default {
  components: {
    AgGridVue,
  },
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      colDefs: [],
      rowData: [],
      gridApi: null,
    };
  },
  watch: {
    chartData: {
      handler(newChartData, oldChartData) {
        if (newChartData !== oldChartData) {
          this.updateChartData(newChartData);
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.updateChartData(this.chartData);
  },
  methods: {
    onFilterTextBoxChanged() {
      if (this.gridApi) {
        const filterText = document.getElementById("filter-text-box").value;
        this.gridApi.setQuickFilter(filterText);
      }
    },
    onBtnExport() {
      if (this.gridApi) {
        this.gridApi.exportDataAsCsv();
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;
    },
    async updateChartData(data) {
      const aggregatedData = this.aggregateValues(data);

      this.colDefs = [
        { headerName: "Service", field: "service", width: 150 },
        {
          headerName: "Website URL",
          field: "website_url",
          width: 275,
          cellRenderer: this.websiteUrlRenderer,
        },
        {
          headerName: "Visits",
          field: "visits",
          sort: "desc",
          valueFormatter: this.addCommas,
        },
        {
          headerName: "Article Views",
          field: "article_views",
          valueFormatter: this.addCommas,
        },
        {
          headerName: "Video Plays",
          field: "video_play",
          valueFormatter: this.addCommas,
        },
        {
          headerName: "Audio Plays",
          field: "audio_play",
          valueFormatter: this.addCommas,
        },
        {
          headerName: "Time Spent/Visit",
          field: "time_spent_per_visit",
          valueFormatter: this.addCommas,
        },
      ];
      this.rowData = aggregatedData;
    },
    addCommas(params) {
      if (params.value !== undefined && params.value !== null) {
        return params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return params.value;
      }
    },
    aggregateValues(data) {
      const aggregatedRows = Object.values(
        data.reduce((aggregatedMap, item) => {
          const key = `${item.service}-${item.account_url}`;
          if (!aggregatedMap[key]) {
            aggregatedMap[key] = {
              service: item.service,
              website_url: item.account_url,
              visits: 0,
              article_views: 0,
              video_play: 0,
              audio_play: 0,
              time_spent_per_visit: 0,
            };
          }
          aggregatedMap[key].visits += item.visits;
          aggregatedMap[key].article_views += item.article_views;
          aggregatedMap[key].video_play += item.video_play;
          aggregatedMap[key].audio_play += item.audio_play;
          aggregatedMap[key].time_spent_per_visit += item.time_spent_per_visit;

          return aggregatedMap;
        }, {})
      );

      return aggregatedRows;
    },
    websiteUrlRenderer(params) {
      const url = params.value;
      if (url) {
        return `<a href="${url}" target="_blank">${url}</a>`;
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
/* Add scoped styles if needed */
</style>
