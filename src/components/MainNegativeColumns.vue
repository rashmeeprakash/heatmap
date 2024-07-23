<template>
  <div>
    <highcharts
      :constructor-type="'stockChart'"
      class="hc"
      :options="chartOptions"
      ref="chart"
    ></highcharts>
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
    properties: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          backgroundColor: "#fbfcf8",
          type: "column",
          zoomType: "x",
          height: "100%",
        },
        title: {
          text: "Fans Change",
          align: "center",
        },
        accessibility: {
          enabled: false,
        },
        exporting: {
          enabled: true,
          buttons: {
            contextButton: {
              menuItems: [
                "viewFullscreen",
                "printChart",
                "separator",
                "downloadPNG",
                "downloadJPEG",
                "separator",
                "downloadPDF",
                "downloadCSV",
              ],
            },
          },
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: true,
          itemStyle: {
            color: "#000",
          },
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
        xAxis: {
          tickInterval: 2,
          categories: [],
          labels: {
            style: {
              color: "#000",
            },
          },
          lineColor: "#000",
          lineWidth: 3,
          showLastLabel: false,
          startOnTick: true,
          endOnTick: true,
        },
        yAxis: {
          gridLineColor: "#fbfcf8",
          lineColor: "#000",
          lineWidth: 3,
          showFirstLabel: false,
          labels: {
            style: {
              color: "#000",
            },
            formatter() {
              const numericSymbols = ["K", "M", "G", "T", "P", "E"];

              if (this.value >= 1000) {
                const symbolIndex = Math.floor(Math.log10(this.value) / 3);
                const scaledValue = this.value / Math.pow(1000, symbolIndex);
                const symbol = numericSymbols[symbolIndex - 1];
                return `${scaledValue}${symbol}`;
              }

              return this.value;
            },
          },
          title: {
            text: "",
          },
          opposite: false,
        },
        tooltip: {
          backgroundColor: "#fbfcf8",
          style: { color: "#000" },
          formatter() {
            return (
              `<b><u>${moment(this.x).format(
                "ddd, MMM D YYYY"
              )}</u></b><br/><br/>` +
              this.points
                .map(
                  (point) => `${point.series.name}: ${point.y.toLocaleString()}`
                )
                .join("<br/>")
            );
          },
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            borderRadius: "25%",
          },
        },
        series: [],
      },
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
      const categories = [
        ...new Set(
          this.fullData
            .map((dt) => moment(dt.report_date).format("ll"))
            .sort(
              (a, b) => moment(a, "ll").valueOf() - moment(b, "ll").valueOf()
            )
        ),
      ];

      const transformedData = this.getPropertiesSeries();

      this.chartOptions.xAxis.categories = categories;
      this.chartOptions.series = transformedData;
    },
    getPropertiesSeries() {
      return this.properties.map(({ prop, color, yAxis }) => {
        const groupedData = this.fullData.reduce((acc, item) => {
          const date = item.report_date;
          if (!acc[date]) {
            acc[date] = {};
          }
          acc[date][prop] = (acc[date][prop] || 0) + item[prop];
          return acc;
        }, {});

        const aggregatedValues = Object.entries(groupedData).map(
          ([date, values]) => ({
            name: moment(date).format("lll"),
            y: values[prop],
          })
        );

        return {
          name: prop
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          data: aggregatedValues,
          color: color,
          yAxis: yAxis || 0,
        };
      });
    },
  },
};
</script>
