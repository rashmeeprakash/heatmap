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
          headerName: "Profile Name",
          field: "profile_name",
          width: 275,
        },
        {
          headerName: "Video Views",
          field: "insight_video_views",
          sort: "desc",
          valueFormatter: this.addCommas,
        },
        {
          headerName: "Video Views(30 sec)",
          field: "insight_video_views_30",
          valueFormatter: this.addCommas,
        },
        {
          headerName: "Engagement",
          field: "insight_engagements",
          valueFormatter: this.addCommas,
        },
        {
          headerName: "Reactions",
          field: "reactions",
          valueFormatter: this.addCommas,
        },
        {
          headerName: "Comments",
          field: "comments",
          valueFormatter: this.addCommas,
        },
        {
          headerName: "Shares",
          field: "shares",
          valueFormatter: this.addCommas,
        },
        {
          headerName: "Change in Followers",
          field: "fans_change",
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
          const key = `${item.service}-${item.profile_name}`;
          if (!aggregatedMap[key]) {
            aggregatedMap[key] = {
              service: item.service,
              profile_name: item.profile_name,
              insight_video_views: 0,
              insight_video_views_30: 0,
              insight_engagements: 0,
              reactions: 0,
              comments: 0,
              shares: 0,
              fans_change: 0,
            };
          }
          aggregatedMap[key].insight_video_views += item.insight_video_views;
          aggregatedMap[key].insight_video_views_30 +=
            item.insight_video_views_30;
          aggregatedMap[key].insight_engagements += item.insight_engagements;
          aggregatedMap[key].reactions += item.reactions;
          aggregatedMap[key].comments += item.comments;
          aggregatedMap[key].shares += item.shares;
          aggregatedMap[key].fans_change += item.fans_change;

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
