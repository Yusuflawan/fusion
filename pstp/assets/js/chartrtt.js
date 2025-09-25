const ctt = document.getElementById("submissionChart").getContext("2d");
const submissionChart = new Chart(ctt, {
  type: "bar",
  data: {
    labels: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"],
    datasets: [
      {
        label: "Submissions",
        data: [8000, 12000, 16000, 19000, 17000, 19000, 21000],
        backgroundColor: "#2d8cff",
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5500,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
});
// percent

document.addEventListener("DOMContentLoaded", function () {
  const progressBars = document.querySelectorAll(".progress-bar");
  progressBars.forEach((bar) => {
    const value = bar.getAttribute("data-value");
    bar.style.width = "0%";
    setTimeout(() => {
      bar.style.width = value + "%";
    }, 300);
  });
});
