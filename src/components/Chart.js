import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { styled } from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartWrapper = styled.section`
  max-width: 800px;
  min-width: 400px;
  min-height: 300px;
`;

const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position: "top",
    labels: {
      font: {
        size: "15px",
      },
      color: "white",
    },
  },
  title: {
    display: true,
    text: "Game history",
    font: { size: 20 },
    color: "#E7F6F2",
  },

  plugins: {
    tooltip: {
      titleColor: "white",
      callbacks: {
        title: function (context) {
          return "Generation: " + context[0].label;
        },
      },
    },
  },

  scales: {
    x: {
      grid: { display: false },
      title: {
        display: true,
        text: "Generation count",
        color: "white",
        font: { size: 15 },
      },
      ticks: {
        font: { size: 15 },
        color: "white",
      },
    },
    y: {
      grid: { display: false },
      title: {
        display: true,
        text: "Population size",
        color: "white",
        font: { size: 15 },
      },
      ticks: {
        font: { size: 15 },
        color: "white",
        stepSize: 1,
      },
    },
  },
};

function Chart({ populationHistory, generationHistory }) {
  const labels = generationHistory;
  const data = {
    labels,
    datasets: [
      {
        label: "Population",
        data: populationHistory,
        borderColor: "#f77f00",
        backgroundColor: "#E7F6F2",
      },
    ],
  };

  return (
    <ChartWrapper>
      <Bar options={options} data={data} />
    </ChartWrapper>
  );
}

export default Chart;
