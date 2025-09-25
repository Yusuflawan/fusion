const cty = document.getElementById("performanceChart").getContext("2d");
new Chart(cty, {
  type: "line",
  data: {
    labels: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
    datasets: [
      {
        label: "Performance",
        data: [230, 180, 270, 300, 240, 200, 250],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#3b82f6",
        pointRadius: 4,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 75 },
      },
      x: {
        grid: { display: true },
      },
    },
  },
});
