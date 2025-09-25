// Chart data
const chartData = {
  yearly: {
    labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [
      {
        label: "Low Compliance",
        data: [28, 35, 37, 36, 39, 37, 40, 38, 42],
        backgroundColor: "#ef4444",
        borderRadius: 4,
        maxBarThickness: 40,
      },
      {
        label: "Moderate Compliance",
        data: [49, 55, 65, 63, 56, 70, 59, 72, 61],
        backgroundColor: "#f97316",
        borderRadius: 4,
        maxBarThickness: 40,
      },
      {
        label: "High Compliance",
        data: [23, 25, 22, 16, 28, 30, 33, 33, 25],
        backgroundColor: "#22c55e",
        borderRadius: 4,
        maxBarThickness: 40,
      },
    ],
  },
  quarterly: {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Low Compliance",
        data: [33, 37, 38, 40],
        backgroundColor: "#ef4444",
        borderRadius: 4,
        maxBarThickness: 60,
      },
      {
        label: "Moderate Compliance",
        data: [56, 63, 67, 62],
        backgroundColor: "#f97316",
        borderRadius: 4,
        maxBarThickness: 60,
      },
      {
        label: "High Compliance",
        data: [23, 23, 32, 29],
        backgroundColor: "#22c55e",
        borderRadius: 4,
        maxBarThickness: 60,
      },
    ],
  },
  monthly: {
    labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [
      {
        label: "Low Compliance",
        data: [28, 35, 37, 36, 39, 37, 40, 38, 42],
        backgroundColor: "#ef4444",
        borderRadius: 4,
        maxBarThickness: 40,
      },
      {
        label: "Moderate Compliance",
        data: [49, 55, 65, 63, 56, 70, 59, 72, 61],
        backgroundColor: "#f97316",
        borderRadius: 4,
        maxBarThickness: 40,
      },
      {
        label: "High Compliance",
        data: [23, 25, 22, 16, 28, 30, 33, 33, 25],
        backgroundColor: "#22c55e",
        borderRadius: 4,
        maxBarThickness: 40,
      },
    ],
  },
  weekly: {
    labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"],
    datasets: [
      {
        label: "Low Compliance",
        data: [25, 30, 32, 35, 38, 40, 37, 39],
        backgroundColor: "#ef4444",
        borderRadius: 4,
        maxBarThickness: 40,
      },
      {
        label: "Moderate Compliance",
        data: [55, 58, 62, 65, 60, 68, 70, 63],
        backgroundColor: "#f97316",
        borderRadius: 4,
        maxBarThickness: 40,
      },
      {
        label: "High Compliance",
        data: [20, 27, 30, 25, 32, 28, 35, 31],
        backgroundColor: "#22c55e",
        borderRadius: 4,
        maxBarThickness: 40,
      },
    ],
  },
};

let chart;
let currentPeriod = "yearly";

// Initialize chart
function initChart() {
  const ctx = document.getElementById("complianceChart").getContext("2d");

  chart = new Chart(ctx, {
    type: "bar",
    data: chartData[currentPeriod],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "white",
          bodyColor: "white",
          cornerRadius: 8,
          displayColors: true,
          callbacks: {
            label: function (context) {
              return context.dataset.label + ": " + context.raw + "%";
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
          ticks: {
            color: "#64748b",
            font: {
              size: 12,
            },
          },
        },
        y: {
          beginAtZero: true,
          max: 80,
          grid: {
            color: "#f1f5f9",
            drawBorder: false,
          },
          border: {
            display: false,
          },
          ticks: {
            color: "#64748b",
            font: {
              size: 12,
            },
            callback: function (value) {
              return value + "%";
            },
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      animation: {
        duration: 750,
        easing: "easeOutQuart",
      },
    },
  });
}

// Update chart data
function updateChart(period) {
  currentPeriod = period;
  chart.data = chartData[period];
  chart.update("active");
}

// Filter dropdown functionality
const filterBtn = document.getElementById("filterBtn");
const filterMenu = document.getElementById("filterMenu");
const filterText = document.getElementById("filterText");
const filterOptions = document.querySelectorAll(".filter-option");

filterBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  filterMenu.classList.toggle("show");
});

document.addEventListener("click", () => {
  filterMenu.classList.remove("show");
});

filterOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    e.stopPropagation();

    // Update active state
    filterOptions.forEach((opt) => opt.classList.remove("active"));
    option.classList.add("active");

    // Update filter text
    filterText.textContent = option.textContent;

    // Update chart
    const period = option.dataset.period;
    updateChart(period);

    // Close dropdown
    filterMenu.classList.remove("show");
  });
});

// Initialize dashboard
document.addEventListener("DOMContentLoaded", function () {
  initChart();
});

// Handle window resize
window.addEventListener("resize", function () {
  if (chart) {
    chart.resize();
  }
});
