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
  },
  data() {
    return {
      chartOptions: {
        chart: {
          backgroundColor: "#fbfcf8",
          type: "scatter",
          zoomType: "xy",
          height: "100%",
        },
        title: {
          text: "Reactions, Comments & Shares",
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
          type: "datetime",
        },
        yAxis: [
          {
            opposite: false,
            title: {
              text: "Reactions",
            },
          },
          {
            opposite: true,
            title: {
              text: "Comments & Shares",
            },
          },
        ],
        plotOptions: {
          scatter: {
            marker: {
              radius: 2.5,
              symbol: "circle",
              states: {
                hover: {
                  enabled: true,
                  lineColor: "rgb(100,100,100)",
                },
              },
            },
            states: {
              hover: {
                marker: {
                  enabled: false,
                },
              },
            },
          },
        },
        tooltip: {
          backgroundColor: "#fbfcf8",
          style: { color: "#000" },
          formatter() {
            const addCommas = (value) => {
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            };
            return `
            <b><u>${moment(this.key).format("ll")}</u></b> <br><br>
            <b>${this.series.name}</b>: ${addCommas(this.y)}
            `;
          },
          useHTML: true,
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
      const filteredData = this.fullData.map((item) => ({
        division: item.division,
        service: item.service,
        report_date: item.report_date,
        reactions: item.reactions,
        comments: item.comments,
        shares: item.shares,
      }));

      const convertData = (data, key, color, symbol, yAxis) => ({
        name: key,
        color: color,
        marker: {
          symbol: symbol,
        },
        yAxis: yAxis,
        data: data.map((item) => [
          new Date(item.report_date).getTime(),
          item[key],
        ]),
      });

      const keys = [
        { key: "reactions", color: "#20B2AA", symbol: "circle", yAxis: 0 },
        { key: "comments", color: "#6B8E23", symbol: "triangle", yAxis: 1 },
        { key: "shares", color: "#FFD700", symbol: "square", yAxis: 1 },
      ];

      const converted = keys.map(({ key, color, symbol, yAxis }) =>
        convertData(filteredData, key, color, symbol, yAxis)
      );

      this.chartOptions.series = converted;
      //   console.log(JSON.stringify(this.chartOptions));
    },
  },
};
</script>
