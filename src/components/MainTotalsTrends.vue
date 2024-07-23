<template>
  <div class="w-100 clearfix d-flex">
    <div
      v-for="(metric, index) in metrics"
      :key="index"
      class="card float-start flex-fill"
    >
      <div class="card-header">{{ metric.name }}</div>
      <div class="card-body w-100 clearfix d-flex">
        <h6
          class="float-start align-self-center"
          :style="{ color: metric.color, width: '35%' }"
        >
          {{ formatNumber(metric.value) }}
        </h6>
        <highcharts
          style="width: 65%"
          :constructor-type="'stockChart'"
          class="hc float-start align-self-center"
          :options="getChartOptions(metric.property)"
          ref="chart"
        ></highcharts>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
    metrics: {
      type: Array,
      default: () => [
        { name: "Visits", property: "visits", color: "#da70d6" },
        { name: "Article Views", property: "article_views", color: "#ff7f50" },
        { name: "Return Visits", property: "return_visits", color: "#ffd700" },
        { name: "Audio Play", property: "audio_play", color: "#20b2aa" },
        { name: "Video Play", property: "video_play", color: "#6b8e23" },
      ],
    },
  },
  data() {
    return {
      fullData: [],
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
  created() {
    this.updateChartData(this.chartData);
  },
  methods: {
    updateChartData(data) {
      this.fullData = data;
      this.metrics.forEach((metric) => {
        metric.value = this.fullData.reduce(
          (acc, item) => acc + item[metric.property],
          0
        );
      });
    },
    getChartOptions(property) {
      const categories = [
        ...new Set(
          this.fullData.map((dt) => moment(dt.report_date).format("ll"))
        ),
      ];

      const groupedData = this.fullData.reduce((acc, item) => {
        const date = item.report_date;
        if (!acc[date]) {
          acc[date] = {};
        }
        acc[date][property] = (acc[date][property] || 0) + item[property];
        return acc;
      }, {});

      const aggregatedValues = Object.entries(groupedData).map(
        ([date, values]) => ({
          name: moment(date).format("lll"),
          y: values[property],
        })
      );

      const seriesName = property
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      const color = this.metrics.find(
        (metric) => metric.property === property
      )?.color;

      return {
        chart: {
          type: "areaspline",
          height: "45%",
        },
        rangeSelector: {
          enabled: false,
        },
        navigator: {
          enabled: false,
        },
        scrollbar: {
          enabled: false,
        },
        accessibility: {
          enabled: false,
        },
        title: {
          text: "",
        },
        xAxis: {
          visible: false,
          categories: categories,
        },
        yAxis: {
          visible: false,
        },
        legend: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
        tooltip: {
          backgroundColor: "#fbfcf8",
          style: { color: "#000" },
          formatter: function () {
            return (
              `<b><u>${moment(this.x).format("MMM D YYYY")}</u></b><br/>` +
              this.points
                .map((point) => `${point.y.toLocaleString()}`)
                .join("<br/>")
            );
          },
          shared: false,
          useHTML: true,
        },
        plotOptions: {
          series: {
            fillOpacity: 0,
            marker: {
              enabled: false,
              states: {
                hover: {
                  enabled: true,
                },
              },
            },
          },
        },
        series: [
          {
            name: seriesName,
            data: aggregatedValues,
            color: color,
          },
        ],
      };
    },
    formatNumber(value) {
      const numericSymbols = ["K", "M", "B", "T", "P", "E"];

      if (value >= 1000) {
        const symbolIndex = Math.floor(Math.log10(value) / 3);
        const scaledValue = value / Math.pow(1000, symbolIndex);
        const symbol = numericSymbols[symbolIndex - 1];
        return `${scaledValue.toFixed(1)}${symbol}`;
      }

      return value.toString();
    },
  },
};
</script>

<style scoped>
.card {
  margin: 1rem;
}
</style>
