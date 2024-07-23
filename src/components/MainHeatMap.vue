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
  data() {
    return {
      chartOptions: {
        chart: {
          backgroundColor: "#fbfcf8",
          type: "heatmap",
          plotBorderWidth: 1,
          height: "100%",
          margin: [0, 0, 0, 0],
        },
        title: { text: "Views", align: "center" },
        exporting: {
          enabled: true,
        },
        credits: { enabled: false },
        legend: { enabled: true, itemStyle: { color: "#000" } },
        rangeSelector: { enabled: false },
        navigator: { enabled: false },
        scrollbar: { enabled: false },
        xAxis: {
          categories: [
            "America",
            "South & Central Asia",
            "News Network",
            "Eurasia",
            "East Asia",
            "Africa",
            "English",
          ],
        },
        yAxis: {
          categories: [
            "Jun 16, 2024",
            "Jun 23, 2024",
            "Jun 30, 2024",
            "Jul 7, 2024",
            "Jul 14, 2024",
          ],
          reversed: false,
        },
        accessibility: {
          point: {
            descriptionFormat:
              "{(add index 1)}. {series.xAxis.categories.(x)} {series.yAxis.categories.(y)}, {value}.",
          },
        },
        colorAxis: { min: 0, minColor: "#FFFFFF", maxColor: "#DA70D6" },
        tooltip: { style: { color: "#000" } },
        series: [
          {
            name: "Video Views",
            borderWidth: 1,
            data: [
              [0, 0, 75059],
              [0, 1, 493747],
              [0, 2, 449083],
              [0, 3, 490321],
              [0, 4, 429733],
              [1, 0, 103570],
              [1, 1, 340369],
              [1, 2, 383821],
              [1, 3, 452833],
              [1, 4, 511894],
              [2, 0, 1361371],
              [2, 1, 4394413],
              [2, 2, 4518221],
              [2, 3, 4581342],
              [2, 4, 4623790],
              [3, 0, 231918],
              [3, 1, 976761],
              [3, 2, 791173],
              [3, 3, 1010918],
              [3, 4, 1065976],
              [4, 0, 2186104],
              [4, 1, 7183474],
              [4, 2, 7521511],
              [4, 3, 7750003],
              [4, 4, 7846560],
              [5, 0, 225868],
              [5, 1, 857518],
              [5, 2, 897654],
              [5, 3, 908779],
              [5, 4, 933288],
              [6, 0, 284781],
              [6, 1, 2015884],
              [6, 2, 1168136],
              [6, 3, 1088461],
              [6, 4, 1403736],
            ],
            dataLabels: { enabled: true, color: "#000000" },
          },
        ],
        responsive: {
          rules: [
            {
              condition: { maxWidth: 500 },
              chartOptions: {
                yAxis: { labels: { format: "{substr value 0 1}" } },
              },
            },
          ],
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
};
</script>
