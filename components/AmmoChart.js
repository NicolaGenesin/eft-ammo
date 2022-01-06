import React from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Box, Button } from "@chakra-ui/react";

Chart.register(ChartDataLabels);
const defaultLegendClickHandler = Chart.defaults.plugins.legend.onClick;

const pointStyles = [
  {
    pointStyle: "circle",
    filled: false,
  },
  {
    pointStyle: "circle",
    filled: true,
  },
  {
    pointStyle: "circle",
    filled: true,
  },
  {
    pointStyle: "cross",
  },
  {
    pointStyle: "cross",
    filled: true,
  },
  {
    pointStyle: "cross",
    filled: true,
  },
  {
    pointStyle: "rect",
  },
  {
    pointStyle: "rect",
    filled: true,
  },
  {
    pointStyle: "rect",
    filled: true,
  },
  {
    pointStyle: "rectRounded",
  },
  {
    pointStyle: "rectRounded",
    filled: true,
  },
  {
    pointStyle: "rectRounded",
    filled: true,
  },
  {
    pointStyle: "star",
  },
  {
    pointStyle: "star",
    filled: true,
  },
  {
    pointStyle: "star",
    filled: true,
  },
  {
    pointStyle: "triangle",
  },
  {
    pointStyle: "triangle",
    filled: true,
  },
  {
    pointStyle: "triangle",
    filled: true,
  },
  {
    pointStyle: "retRot",
  },
  {
    pointStyle: "retRot",
    filled: true,
  },
  {
    pointStyle: "retRot",
    filled: true,
  },
  {
    pointStyle: "crossRot",
  },
  {
    pointStyle: "crossRot",
    filled: true,
  },
  {
    pointStyle: "crossRot",
    filled: true,
  },
];

const stringToColor = (str) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = "#";
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};

export default function AmmoChart({ results }) {
  let myChart;

  const data = { datasets: [], labels: [] };

  Object.keys(results).forEach((category, index) => {
    const ammosForCategory = results[category];

    data.labels.push(...ammosForCategory.map((ammo) => ammo.name));

    const style = pointStyles[index];
    const item = {
      label: category,
      pointStyle: style.pointStyle,
      data: ammosForCategory.map((ammo) => {
        return {
          x: ammo.damage,
          y: ammo.penValue,
          name: ammo.name,
        };
      }),
      pointRadius: 8,
      pointHoverRadius: 12,
    };

    if (style.filled) {
      item.backgroundColor = stringToColor(category);
    } else {
      item.backgroundColor = "rgba(0,0,0,0)";
      item.borderColor = stringToColor(category);
    }

    data.datasets.push(item);
  });

  React.useEffect(() => {
    const config = {
      type: "scatter",
      data,
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            align: "end",
            anchor: "end",
            color: function (context) {
              // if (context.dataset.borderColor) {
              //   return context.dataset.borderColor;
              // }
              // return context.dataset.backgroundColor;
              return "#ffffff";
            },
            font: function (context) {
              var w = context.chart.width;
              return {
                size: w < 512 ? 12 : 14,
                // weight: "bold",
              };
            },
            formatter: function (value, context) {
              return value.name;
            },
          },
          tooltip: {
            usePointStyle: true,
            callbacks: {
              label: (context) => {
                return context.raw.name;
              },
            },
          },
          legend: {
            position: "top",
            labels: {
              usePointStyle: true,
              generateLabels: (chart) => {
                const datasets = chart.data.datasets;
                const {
                  labels: { usePointStyle, pointStyle, textAlign, color },
                } = chart.legend.options;

                const legendItems = chart
                  ._getSortedDatasetMetas()
                  .map((meta) => {
                    const style = meta.controller.getStyle(
                      usePointStyle ? 0 : undefined
                    );

                    return {
                      text: datasets[meta.index].label,
                      fillStyle: style.backgroundColor,
                      fontColor: color,
                      hidden: !meta.visible,
                      lineCap: style.borderCapStyle,
                      lineDash: style.borderDash,
                      lineDashOffset: style.borderDashOffset,
                      lineJoin: style.borderJoinStyle,
                      strokeStyle: style.borderColor,
                      pointStyle: pointStyle || style.pointStyle,
                      rotation: style.rotation,
                      textAlign: textAlign || style.textAlign,
                      datasetIndex: meta.index,
                    };
                  });

                legendItems.push({
                  text:
                    !chart.legend.hideAll ||
                    typeof chart.legend.hideAll === "undefined"
                      ? "Hide All"
                      : "Show All",
                  fontColor: color,
                  fillStyle: "turquoise", // Box color
                  strokeStyle: "turquoise", // LineCollor around box
                });

                return legendItems;
              },
            },
            onClick: (evt, legendItem, legend) => {
              const type = legend.chart.config.type;
              let allLegendItemsState = [];

              if (
                legendItem.text === "Hide All" ||
                legendItem.text === "Show All"
              ) {
                if (typeof legend.hideAll === "undefined") {
                  legend.hideAll = false;
                }

                legend.chart.data.datasets.forEach((dataset, i) => {
                  legend.chart.setDatasetVisibility(i, legend.hideAll);
                });

                legend.hideAll = !legend.hideAll;
                legend.chart.update();

                return;
              }

              defaultLegendClickHandler(evt, legendItem, legend);

              allLegendItemsState = legend.chart.data.datasets.map(
                (e, i) => legend.chart.getDatasetMeta(i).hidden
              );

              if (allLegendItemsState.every((el) => !el)) {
                legend.hideAll = false;
                legend.chart.update();
              } else if (allLegendItemsState.every((el) => el)) {
                legend.hideAll = true;
                legend.chart.update();
              }
            },
          },
          title: {
            display: false,
          },
        },
        scales: {
          y: {
            type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            position: "left",
            ticks: {
              color: "#ff00ff",
            },
          },
          y2: {
            type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
            position: "right",
            reverse: false,
            ticks: {
              color: "#ff00ff",
            },
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
      },
    };

    myChart = new Chart(document.getElementById("line-chart"), config);
  }, []);
  return (
    <Box>
      <canvas id="line-chart" />
    </Box>
  );
}
