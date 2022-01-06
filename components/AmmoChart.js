import React from "react";
import Chart from "chart.js/auto";
import { Box } from "@chakra-ui/react";

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
  console.log(results);

  const data = { datasets: [], labels: [] };

  Object.keys(results).forEach((category, index) => {
    const ammosForCategory = results[category];

    data.labels.push(...ammosForCategory.map((ammo) => ammo.name));

    const style = pointStyles[index];
    const item = {
      label: category,
      pointStyle: style.pointStyle,
      borderColor: stringToColor(category),
      backgroundColor: stringToColor(category),
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
          tooltip: {
            usePointStyle: true,
            callbacks: {
              label: (context) => {
                return `${context.dataset.label} - ${context.raw.name}`;
              },
            },
          },
          legend: {
            position: "top",
            labels: {
              usePointStyle: true,
            },
          },
          title: {
            display: true,
            text: "Chart.js Scatter Multi Axis Chart",
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
            reverse: true,
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
    const myChart = new Chart(document.getElementById("line-chart"), config);
  }, []);
  return (
    <Box>
      <canvas id="line-chart" />
    </Box>
  );
}
