async function renderRevenueChart() {
  try {
    const id = JSON.parse(localStorage.getItem("default_account"));
    const response = await fetch(`https://arafatfootballacademy.com/fusion/backend/marchants/${id.marchant_number}/revenue-trend`);
    const result = await response.json();

    if (result.status !== "success") {
      throw new Error("Failed to fetch revenue data");
    }

    const labels = result.data.map(item => item.month_name);
    const revenues = result.data.map(item => parseFloat(item.total_revenue));

    const ctx = document.getElementById("revenueChart").getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Revenue",
            data: revenues,
            borderColor: "#17a2b8",
            backgroundColor: "#17a2b8",
            tension: 0.4,
            pointBackgroundColor: "#17a2b8",
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
              },
            },
            grid: {
              color: "#e5e7eb",
            },
          },
          x: {
            grid: {
              color: "#e5e7eb",
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Error loading revenue chart:", error);
  }
}

renderRevenueChart();

async function renderTransactionChart() {
  try {
    const id = JSON.parse(localStorage.getItem("default_account"));
    const response = await fetch(`https://arafatfootballacademy.com/fusion/backend/marchants/${id.marchant_number}/transaction-volume-chart`);
    const result = await response.json();

    if (result.status !== "success") {
      throw new Error("Failed to fetch revenue data");
    }

    const labels = result.data.map(item => item.month_name);
    const revenues = result.data.map(item => parseFloat(item.transaction_volume));

    const ctx = document.getElementById("transactionChart").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Revenue",
            data: revenues,
            borderColor: "#17a2b8", 
            backgroundColor: "#17a2b8",
            tension: 0.4,
            pointBackgroundColor: "#17a2b8",
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
              },
            },
            grid: {
              color: "#e5e7eb",
            },
          },
          x: {
            grid: {
              color: "#e5e7eb",
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Error loading revenue chart:", error);
  }
}
renderTransactionChart();