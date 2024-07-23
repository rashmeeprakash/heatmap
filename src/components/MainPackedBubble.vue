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
export default {
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
    mainProp: {
      type: String,
      default: "division",
    },
    subProp: {
      type: String,
      default: "service",
    },
    valueProp: {
      type: String,
      default: "insight_engagements",
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          backgroundColor: "#fbfcf8",
          type: "packedbubble",
          // width: "100%",
          height: "100%",
        },
        title: {
          text: "Engagements",
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
        tooltip: {
          useHTML: true,
          pointFormat: "<b>{point.name}:</b> {point.value}",
        },
        plotOptions: {
          packedbubble: {
            minSize: "1%",
            maxSize: "50%",
            zMin: 0,
            zMax: 100,
            layoutAlgorithm: {
              gravitationalConstant: 0.05,
              splitSeries: true,
              seriesInteraction: false,
              dragBetweenSeries: true,
              parentNodeLimit: true,
            },
            dataLabels: {
              enabled: true,
              format: "{point.name}",
              style: {
                color: "black",
                textOutline: "none",
                fontWeight: "normal",
              },
            },
          },
        },
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
      const getMaxValue = Math.max(
        ...this.fullData.map((d) => d[this.valueProp])
      );
      const result = Object.values(
        this.fullData.reduce((acc, item) => {
          const mainProp = item[this.mainProp];
          const subProp = item[this.subProp];
          const valueProp = item[this.valueProp];
          if (!acc[mainProp]) acc[mainProp] = { name: mainProp, data: {} };
          if (!acc[mainProp].data[subProp]) acc[mainProp].data[subProp] = 0;
          acc[mainProp].data[subProp] += valueProp;
          return acc;
        }, {})
      ).map(({ name, data }) => ({
        name,
        data: Object.entries(data).map(([name, value]) => ({ name, value })),
      }));
      this.chartOptions.plotOptions.packedbubble.zMax = getMaxValue;
      this.chartOptions.series = result;
    },
  },
};
</script>
