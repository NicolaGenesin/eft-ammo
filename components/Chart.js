import React from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import annotationPlugin from "chartjs-plugin-annotation";

import { Box, Center } from "@chakra-ui/react";
import getColor from "../utils/getColor";

Chart.defaults.font.size = 14;
Chart.defaults.font.weight = "bold";
Chart.defaults.font.family = "Bender Regular";
Chart.defaults.color = "#dbc59c";
Chart.register(ChartDataLabels);
Chart.register(annotationPlugin);
const defaultLegendClickHandler = Chart.defaults.plugins.legend.onClick;

const lineLabelBackgroundColour = "#70b035";
const annotations = [];

annotations.push({
  type: "box",
  backgroundColor: "transparent",
  borderWidth: 0,
  label: {
    drawTime: "beforeDraw",
    enabled: true,
    color: "rgba(50, 50, 50, 0.2)",
    content: "NoFAM",
    font: {
      size: (ctx) => ctx.chart.chartArea.height / 3,
    },
    position: "center",
  },
});

for (let index = 1; index < 7; index++) {
  annotations.push({
    type: "line",
    scaleID: "y2",
    borderWidth: 1,
    borderColor: "#383932",
    value: index * 10,
    label: {
      borderRadius: 0,
      rotation: "auto",
      position: "end",
      content: `CLASS ${index}`,
      color: "black",
      enabled: true,
      backgroundColor: lineLabelBackgroundColour,
    },
    drawTime: "beforeDraw",
  });
}

annotations.push({
  type: "line",
  scaleID: "x",
  borderWidth: 1,
  borderColor: "green",
  value: 35,
  borderDash: [8, 8],
  label: {
    borderRadius: 0,
    rotation: "auto",
    content: "HEAD",
    position: "start",
    color: "black",
    enabled: true,
    backgroundColor: lineLabelBackgroundColour,
  },
  drawTime: "beforeDraw",
});

annotations.push({
  type: "line",
  scaleID: "x",
  borderWidth: 1,
  borderColor: "green",
  value: 85,
  borderDash: [8, 8],
  label: {
    borderRadius: 0,
    rotation: "auto",
    content: "CHEST",
    position: "start",
    color: "black",
    enabled: true,
    backgroundColor: lineLabelBackgroundColour,
  },
  drawTime: "beforeDraw",
});

const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector("div");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
    tooltipEl.style.borderRadius = "3px";
    tooltipEl.style.color = "#dbc59c";
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.transform = "translate(-50%, 0)";
    tooltipEl.style.transition = "all .1s ease";

    const table = document.createElement("table");
    table.style.margin = "0px";

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const externalTooltipHandler = (context) => {
  // Tooltip Element
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  const ammo = context.tooltip.dataPoints[0].raw;

  const tableHead = document.createElement("thead");

  const tr = document.createElement("tr");
  tr.style.borderWidth = 0;

  const th = document.createElement("th");
  th.style.borderWidth = 0;
  const text = document.createTextNode(`${ammo.category} - ${ammo.name}`);

  th.appendChild(text);
  tr.appendChild(th);
  tableHead.appendChild(tr);

  const tableBody = document.createElement("tbody");
  const lines = [
    {
      key: "damage",
      value: "Damage",
    },
    {
      key: "armorDamage",
      value: "Armor Damage",
    },
    {
      key: "penValue",
      value: "Penetration Value",
    },
    {
      key: "fragChange",
      value: "Frag. Chance",
    },
    {
      key: "class1",
      value: "Class 1",
    },
    {
      key: "class2",
      value: "Class 2",
    },
    {
      key: "class3",
      value: "Class 3",
    },
    {
      key: "class4",
      value: "Class 4",
    },
    {
      key: "class5",
      value: "Class 5",
    },
    {
      key: "class6",
      value: "Class 6",
    },
  ];

  lines.forEach((line, i) => {
    const color = line.key.includes("class")
      ? getColor(ammo[line.key])
      : "green";
    const span = document.createElement("span");
    span.style.background = color;
    span.style.borderColor = color;
    span.style.borderWidth = "2px";
    span.style.marginRight = "10px";
    span.style.height = "10px";
    span.style.width = "10px";
    span.style.display = "inline-block";

    const tr = document.createElement("tr");
    tr.style.backgroundColor = "inherit";
    tr.style.borderWidth = 0;

    const td = document.createElement("td");
    td.style.borderWidth = 0;

    const text = document.createTextNode(`${line.value}: ${ammo[line.key]}`);

    td.appendChild(span);
    td.appendChild(text);
    tr.appendChild(td);
    tableBody.appendChild(tr);
  });

  const tableRoot = tooltipEl.querySelector("table");

  // Remove old children
  while (tableRoot.firstChild) {
    tableRoot.firstChild.remove();
  }

  // Add new children
  tableRoot.appendChild(tableHead);
  tableRoot.appendChild(tableBody);

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + "px";
  tooltipEl.style.top = positionY + tooltip.caretY + "px";
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding =
    tooltip.options.padding + "px " + tooltip.options.padding + "px";
};

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
  },
  {
    pointStyle: "cross",
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
  },
  {
    pointStyle: "star",
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
    pointStyle: "rectRot",
  },
  {
    pointStyle: "rectRot",
    filled: true,
  },
  {
    pointStyle: "rectRot",
    filled: true,
  },
  {
    pointStyle: "crossRot",
  },
  {
    pointStyle: "crossRot",
  },
  {
    pointStyle: "crossRot",
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

let myChart;

export default function AmmoChart({ results, classDefeated }) {
  React.useEffect(() => {
    const data = { datasets: [], labels: [] };

    Object.keys(results).forEach((category, index) => {
      const ammosForCategory = results[category];

      data.labels.push(...ammosForCategory.map((ammo) => ammo.name));

      const style = pointStyles[index];
      const item = {
        label: category,
        pointStyle: style.pointStyle,
        data: ammosForCategory
          .filter((ammo) => {
            if (classDefeated) {
              if (classDefeated * 10 > ammo.penValue) {
                return false;
              } else {
                return true;
              }
            } else {
              return true;
            }
          })
          .map((ammo) => {
            return {
              x: ammo.damage,
              y: ammo.penValue,
              ...ammo,
              category,
            };
          }),
        pointRadius: 8,
        pointHoverRadius: 12,
      };

      if (!myChart) {
        item.hidden = category !== "5.45x39 mm";
      }

      if (style.filled) {
        item.backgroundColor = stringToColor(category);
      } else {
        item.backgroundColor = "rgba(0,0,0,0)";
        item.borderColor = stringToColor(category);
      }

      data.datasets.push(item);
    });

    if (myChart) {
      const hiddenDatasets = [];
      for (let i = 0; i < myChart.data.datasets.length; i++) {
        if (!myChart.isDatasetVisible(i)) {
          hiddenDatasets.push(myChart.data.datasets[i]);
        }
      }

      data.datasets.forEach((newSet, index) => {
        if (hiddenDatasets.find((hidden) => hidden.label === newSet.label)) {
          newSet.hidden = true;
        }
      });

      myChart.data.datasets = data.datasets;
      myChart.update("none");
    } else {
      const config = {
        type: "scatter",
        data,
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            annotation: {
              annotations,
            },
            datalabels: {
              align: "end",
              anchor: "end",
              color: function (context) {
                return "#dbc59c";
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
              // usePointStyle: true,
              callbacks: {
                label: (context) => {
                  return context.raw.name;
                },
              },
              enabled: false,
              position: "nearest",
              external: externalTooltipHandler,
            },
            legend: {
              position: "top",
              labels: {
                padding: 20,
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
                color: "#dbc59c",
              },
              title: {
                display: true,
                text: "PENETRATION",
                color: "#dbc59c",
              },
              max: 90,
              min: 0,
            },
            y2: {
              type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              position: "right",
              reverse: false,
              grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
              max: 90,
              min: 0,
              display: false,
            },
            x: {
              type: "linear",
              title: {
                display: true,
                text: "DAMAGE",
                color: "#dbc59c",
              },
              ticks: {
                color: "#dbc59c",
              },
              suggestedMin: 30,
              suggestedMin: 80,
            },
          },
        },
      };

      myChart = new Chart(document.getElementById("line-chart"), config);
    }
  }, [classDefeated]);
  return (
    <Center>
      <Box
        resize="both"
        mt="48px"
        w={["100%", "85%", "75%"]}
        height="700px"
        overflow="auto"
        style={{ zIndex: 1 }}
      >
        <canvas id="line-chart" />
      </Box>
    </Center>
  );
}
