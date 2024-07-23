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
    divisionProp: {
      type: String,
      default: "division",
    },
    serviceProp: {
      type: String,
      default: "service",
    },
    profileNameProp: {
      type: String,
      default: "profile_name",
    },
    reportDateProp: {
      type: String,
      default: "report_date",
    },
    videoViewsProp: {
      type: String,
      default: "insight_video_views",
    },
  },
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
        title: {
          text: "Video Views",
          align: "center",
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
          categories: [],
        },
        yAxis: {
          categories: [],
          reversed: false,
        },
        accessibility: {
          point: {
            descriptionFormat:
              "{(add index 1)}. " +
              "{series.xAxis.categories.(x)} " +
              "{series.yAxis.categories.(y)}, {value}.",
          },
        },
        colorAxis: {
          min: 0,
          minColor: "#FFFFFF",
          maxColor: "#DA70D6",
        },
        tooltip: {
          style: { color: "#000" },
          formatter() {
            const addCommas = (value) => {
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            };
            return (
              `<b>${this.series.xAxis.categories[this.point.x]}</b> had<br>` +
              `<b>${addCommas(this.point.value)}</b> video views on <br>` +
              `<b>${this.series.yAxis.categories[this.point.y]}</b>`
            );
          },
        },
        series: [
          {
            name: "Video Views",
            borderWidth: 1,
            data: [],
            dataLabels: {
              enabled: true,
              color: "#000000",
              formatter() {
                const numericSymbols = ["K", "M", "G", "T", "P", "E"];
                if (this.point.value >= 1000) {
                  const symbolIndex = Math.floor(
                    Math.log10(this.point.value) / 3
                  );
                  const scaledValue =
                    this.point.value / Math.pow(1000, symbolIndex);
                  const symbol = numericSymbols[symbolIndex - 1];
                  return `${Math.ceil(scaledValue)}${symbol}`;
                }
                return this.point.value;
              },
            },
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                yAxis: {
                  labels: {
                    format: "{substr value 0 1}",
                  },
                },
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
  created() {
    this.updateChartData(this.chartData);
  },
  methods: {
    updateChartData(data) {
      this.fullData = data;
      // console.log(this.fullData);
      const filteredData = this.fullData.map((item) => ({
        division: item[this.divisionProp],
        service: item[this.serviceProp],
        profile_name: item[this.profileNameProp],
        report_date: item[this.reportDateProp],
        insight_video_views: item[this.videoViewsProp],
      }));

      const generateDateRanges = (fullData) => {
        const dates = [...new Set(fullData.map((dt) => dt.report_date))].sort();
        const startDate = moment(dates[0]);
        const endDate = moment(dates[dates.length - 1]);

        const diffDays = endDate.diff(startDate, "days");
        const diffMonths = endDate.diff(startDate, "months");

        const sumInsightVideoViews = (start, end, division) =>
          fullData
            .filter(
              (dt) =>
                dt.division === division &&
                moment(dt.report_date).isBetween(start, end, null, "[)")
            )
            .reduce((sum, dt) => sum + dt.insight_video_views, 0);

        const uniqueDivisions = [...new Set(fullData.map((dt) => dt.division))];
        const ranges = [];

        uniqueDivisions.forEach((division) => {
          let current = startDate.clone();

          while (current.isBefore(endDate) || current.isSame(endDate, "day")) {
            let next;
            let format;

            if (diffDays <= 14) {
              next = current.clone().add(1, "day");
              format = "ll";
            } else if (diffMonths <= 6) {
              current.startOf("week");
              next = current.clone().add(1, "week");
              format = "ll";
            } else {
              current.startOf("month");
              next = current.clone().add(1, "month");
              format = "MMMM, YYYY";
            }

            ranges.push({
              division,
              date: current.format(format),
              insight_video_views: sumInsightVideoViews(
                current,
                next,
                division
              ),
            });

            current = next;
          }
        });

        return ranges;
      };

      let yAxis = [
        ...new Set(generateDateRanges(filteredData).map((d) => d.date)),
      ];
      let xAxis = [
        ...new Set(generateDateRanges(filteredData).map((d) => d.division)),
      ];

      this.chartOptions.yAxis.categories = yAxis;
      this.chartOptions.xAxis.categories = xAxis;

      const groupedRanges = generateDateRanges(filteredData).reduce(
        (acc, range) => {
          if (!acc[range.division]) {
            acc[range.division] = [];
          }
          acc[range.division].push(range);
          return acc;
        },
        {}
      );

      const matrix = Object.keys(groupedRanges).flatMap((division) => {
        const divisionIndex = xAxis.indexOf(division);
        return groupedRanges[division].map((range, dateIndex) => [
          divisionIndex,
          dateIndex,
          range.insight_video_views,
        ]);
      });

      this.chartOptions.series[0].data = matrix;
      console.log(JSON.stringify(this.chartOptions));
    },
  },
};
</script>
