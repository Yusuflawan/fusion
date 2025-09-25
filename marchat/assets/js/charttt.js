const id = JSON.parse(localStorage.getItem("user"));
async function renderTransactionChart() {
  try {
    const response = await fetch(`https://arafatfootballacademy.com/fusion/backend/marchants/${id}/revenue-trend`); 
    const result = await response.json();

    // console.log(result);

    if (result.status !== "success") {
      throw new Error("Failed to fetch data");
    }

    const labels = result.data.map(item => item.month_name);
    const volumes = result.data.map(item => item.transaction_volume);

    const ctx = document.getElementById("transactionChart").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Volume",
            data: volumes,
            backgroundColor: "#3b82f6",
            borderRadius: 5,
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
              stepSize: 50, 
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Error loading chart data:", error);
  }
}

renderTransactionChart();