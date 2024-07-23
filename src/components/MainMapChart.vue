<template>
  <div>
    <highcharts
      :constructor-type="'mapChart'"
      :options="chartOptions"
      ref="highcharts"
    ></highcharts>
  </div>
</template>

<script>
export default {
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
    currentDataType: {
      type: String,
      default: "",
    },
    colorSettings: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          map: "myMapName",
        },
        title: {
          text: "",
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
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: "bottom",
          },
        },
        colorAxis: {
          type: "logarithmic",
          allowNegativeLog: true,
        },
        tooltip: {
          formatter() {
            return `<b>${this.point.country}</b>: ${this.point[
              this.series.colorKey
            ].toLocaleString()}`;
          },
        },
        series: [
          {
            data: [],
            joinBy: ["name", "country"],
            name: "",
            colorKey: "",
            dataLabels: {
              enabled: false,
            },
          },
        ],
      },
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
    currentDataType: {
      handler(newType, oldType) {
        if (newType !== oldType) {
          this.updateChartData(this.chartData);
        }
      },
    },
  },
  created() {
    this.updateChartData(this.chartData);
  },
  methods: {
    updateChartData(data) {
      const countryNameMapping = {
        "United States": "United States of America",
        "Russian Federation": "Russia",
      };

      let newData = data.reduce((acc, curr) => {
        let countryName = countryNameMapping[curr.country] || curr.country;
        const foundIndex = acc.findIndex(
          (item) => item.country === countryName
        );
        if (foundIndex !== -1) {
          acc[foundIndex][this.currentDataType] += curr[this.currentDataType];
        } else {
          const newDataEntry = { country: countryName };
          newDataEntry[this.currentDataType] = curr[this.currentDataType];
          acc.push(newDataEntry);
        }
        return acc;
      }, []);

      let minData = Math.min(...newData.map((v) => v[this.currentDataType]));
      const maxData = Math.max(...newData.map((v) => v[this.currentDataType]));
      if (minData === 0) minData = 1;

      const { maxColor, stops } = this.colorSettings[this.currentDataType];

      this.chartOptions.title.text = this.currentDataType
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      this.chartOptions.series[0].name = this.chartOptions.title.text;
      this.chartOptions.series[0].colorKey = this.currentDataType;
      this.chartOptions.series[0].data = newData;
      this.chartOptions.colorAxis.min = minData;
      this.chartOptions.colorAxis.max = maxData;
      this.chartOptions.colorAxis.minColor = "#fff";
      this.chartOptions.colorAxis.maxColor = maxColor;
      this.chartOptions.colorAxis.stops = stops;

      // Update the chart
      if (this.$refs.highcharts) {
        this.$refs.highcharts.chart.update(this.chartOptions);
      }
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
