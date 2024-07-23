<template>
  <div id="filters" class="m-2">
    <DateRangePicker
      ref="picker"
      v-model="dateRange"
      opens="inline"
      show-dropdowns="true"
      auto-apply="true"
      single-date-picker="range"
      :date-range="dateRange"
      :ranges="customRanges"
      @select="handleDateRangeChange"
    >
    </DateRangePicker>

    <label class="typo__label mt-2">Select Divisions:</label>
    <multiselect
      id="divisions"
      class="mt-1"
      v-model="selectedDivisions"
      placeholder="Select Division"
      :options="divisions"
      :multiple="true"
      :close-on-select="false"
      group-values="libs"
      group-label="all"
      :group-select="true"
      :limit="limitNum"
      :limit-text="limitDivisions"
      @close="handleDivisionSelect"
    ></multiselect>

    <label class="typo__label mt-2">Select Services:</label>
    <multiselect
      id="services"
      class="mt-1"
      v-model="selectedServices"
      placeholder="Select Services"
      :options="services"
      :multiple="true"
      :close-on-select="false"
      group-values="libs"
      group-label="all"
      :group-select="true"
      :limit="limitNum"
      :limit-text="limitServices"
      @close="handleServicesSelect"
    ></multiselect>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import DateRangePicker from "vue3-daterange-picker";
import moment from "moment";
import Multiselect from "vue-multiselect";
import axios from "axios";
export default {
  components: { DateRangePicker, Multiselect },
  props: {
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dateRange: {
        startDate: this.startDate,
        endDate: this.endDate,
      },
      limitNum: 3,
      selectedDivisions: [],
      selectedServices: [],
      divisions: [],
      services: [],
      totalDivisions: 0,
      totalServices: 0,
      customRanges: {
        "This Week": [moment().startOf("week")._d, moment().endOf("week")._d],
        "Last Week": [
          moment().subtract(1, "week").startOf("week")._d,
          moment().subtract(1, "week").endOf("week")._d,
        ],
        "This Month": [
          moment().startOf("month")._d,
          moment().endOf("month")._d,
        ],
        "Last Month": [
          moment().subtract(1, "month").startOf("month")._d,
          moment().subtract(1, "month").endOf("month")._d,
        ],
        "This Quarter": [
          moment().startOf("quarter")._d,
          moment().endOf("quarter")._d,
        ],
        "Last Quarter": [
          moment().subtract(1, "quarter").startOf("quarter")._d,
          moment().subtract(1, "quarter").endOf("quarter")._d,
        ],
        "This Year": [moment().startOf("year")._d, moment().endOf("year")._d],
        "Last Year": [
          moment().subtract(1, "year").startOf("year")._d,
          moment().subtract(1, "year").endOf("year")._d,
        ],
      },
    };
  },
  mounted() {
    this.loadData(this.dateRange.startDate, this.dateRange.endDate);
  },
  methods: {
    handleDateRangeChange(value) {
      this.dateRange.startDate = value.startDate;
      this.dateRange.endDate = value.endDate;

      this.$emit("date-range-changed", {
        startDate: this.dateRange.startDate,
        endDate: this.dateRange.endDate,
        divSelected: this.selectedDivisions,
        serviceSelected: this.selectedServices,
      });
    },
    handleDivisionSelect() {
      this.$emit("division-changed", {
        startDate: this.dateRange.startDate,
        endDate: this.dateRange.endDate,
        divSelected: this.selectedDivisions,
        serviceSelected: this.selectedServices,
      });
    },
    handleServicesSelect() {
      this.$emit("service-changed", {
        startDate: this.dateRange.startDate,
        endDate: this.dateRange.endDate,
        divSelected: this.selectedDivisions,
        serviceSelected: this.selectedServices,
      });
    },
    loadData(startDate, endDate) {
      const baseURL =
        window.location.hostname === "localhost"
          ? "http://localhost:3001/api"
          : "https://opr-voa.azurewebsites.net/api";
      if (!baseURL) {
        console.error("VUE_APP_API_BASE_URL is not defined");
        return;
      }
      const url = `${baseURL}/filters?startDate=${moment(startDate).format(
        "YYYY-MM-DD"
      )}&endDate=${moment(endDate).format("YYYY-MM-DD")}`;

      axios
        .get(url)
        .then((response) => {
          this.divisions = [
            {
              all: "Select All/Deselect All",
              libs: [...new Set(response.data.map((d) => d.division))].sort(
                (a, b) => a.localeCompare(b)
              ),
            },
          ];
          this.services = [
            {
              all: "Select All/Deselect All",
              libs: [...new Set(response.data.map((d) => d.service))].sort(
                (a, b) => a.localeCompare(b)
              ),
            },
          ];
          this.selectedDivisions = [
            ...new Set(response.data.map((d) => d.division)),
          ];

          this.selectedServices = [
            ...new Set(response.data.map((d) => d.service)),
          ];

          this.totalDivisions = this.selectedDivisions.length;
          this.totalServices = this.selectedServices.length;
        })
        .catch((error) => {
          console.error("Error loading data:", error);
        });
    },
    limitDivisions(count) {
      let msg =
        this.limitNum + count === this.totalDivisions
          ? "... all divisions selected"
          : `and ${count} other divisions`;
      return msg;
    },
    limitServices(count) {
      let msg =
        this.limitNum + count === this.totalServices
          ? "... all services selected"
          : `and ${count} other services`;
      return msg;
    },
  },
};
</script>
<style
  src="../../node_modules/vue-multiselect/dist/vue-multiselect.css"
></style>
<style>
.daterangepicker.single.show-ranges {
  min-width: 100% !important;
}

.vue-daterange-picker,
.calendars {
  width: 100% !important;
}

.ranges {
  width: 30% !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ranges ul {
  list-style-type: none; /* Removes bullet points */
  padding: 0;
  margin: 0;
  text-align: center; /* Centers text within the list items */
}

.calendars-container {
  width: 70% !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendars-container .drp-calendar {
  padding: 0;
  margin: 0;
  text-align: center;
}

.reportrange-text {
  display: flex;
  justify-content: center;
  align-items: center;
}

.reportrange-text span {
  padding: 0;
  margin: 0;
  text-align: center;
}

/* Add your component-specific styles here */
</style>
