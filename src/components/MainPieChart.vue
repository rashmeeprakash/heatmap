<template>
  <div>
    <div
      v-for="(chartOptions, index) in chartOptionsList"
      :key="index"
      class="chart-container"
    >
      <highcharts :options="chartOptions" class="hc"></highcharts>
    </div>
  </div>
</template>

<script>
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
      fullData: [],
    };
  },
  computed: {
    chartOptionsList() {
      if (this.fullData.length === 0) {
        return [];
      }

      return this.getPropertiesSeries();
    },
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
    },
    getPropertiesSeries() {
      const chartOptionsList = this.properties.map((prop) => {
        const propData = this.fullData.reduce((acc, item) => {
          const { division, service } = item;
          const key = division.toLowerCase();

          if (!acc[key]) {
            acc[key] = {
              name: division,
              id: key,
              data: [],
            };
          }

          acc[key].data.push({
            name: service,
            y: item[prop],
          });

          return acc;
        }, {});

        const transformedData = Object.values(propData);
        const drills = transformedData.map((item) => {
          const aggregatedData = item.data.reduce((result, { name, y }) => {
            if (!result[name]) {
              result[name] = 0;
            }
            result[name] += y;
            return result;
          }, {});

          const transformedChartData = Object.entries(aggregatedData).map(
            ([name, totalY]) => [name, totalY]
          );

          return {
            name: item.name,
            id: item.name,
            data: transformedChartData,
          };
        });

        return {
          chart: {
            type: "pie",
            backgroundColor: "#fbfcf8",
            spacingTop: 20,
            spacingBottom: 20,
            spacingLeft: 20,
            spacingRight: 20,
            height: 300,
          },
          accessibility: {
            enabled: false,
          },
          credits: {
            enabled: false,
          },
          legend: {
            enabled: false,
            itemStyle: {
              color: "#ffffff",
            },
          },
          rangeSelector: {
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
          navigator: {
            enabled: false,
          },
          scrollbar: {
            enabled: false,
          },
          title: {
            text: prop
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
            style: {
              color: "#000",
              fontSize: "14px",
              fontWeight: "bold",
            },
          },
          plotOptions: {
            pie: {
              colors: [
                "#DA70D6",
                "#FFD700",
                "#6B8E23",
                "#FF7F50",
                "#20B2AA",
                "#FF8C00",
                "#483D8B",
                "#2E8B57",
                "#FF69B4",
                "#1E90FF",
              ],
              dataLabels: {
                enabled: true,
                format: "<b>{point.name}</b>",
                style: {
                  color: "#000",
                },
              },
              tooltip: {
                pointFormat: "<b>{point.percentage:.2f}%</b>",
              },
            },
          },
          series: [
            {
              name: prop
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
              data: Object.values(propData).map(({ name, data }) => ({
                name,
                y: data.reduce((sum, { y }) => sum + y, 0),
                drilldown: name,
              })),
            },
          ],
          drilldown: {
            series: drills,
          },
        };
      });
      return chartOptionsList;
    },
  },
};
</script>

<style>
.chart-container {
  width: 50%;
  float: left;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fbfcf8;
}
</style>
