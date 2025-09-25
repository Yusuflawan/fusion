async function renderRevenueChart() {
  try {
    const user_me = JSON.parse(localStorage.getItem("default_account"));
    // console.log(user_me.marchant_number);
    // const id = 1;
    const response = await fetch(`https://arafatfootballacademy.com/fusion/backend/marchants/${user_me?.marchant_number}/transaction-volume-chart`); 
    const result = await response.json();

    // console.log("here",result);

    if (result.status !== "success") {
      throw new Error("Failed to fetch revenue data");
    }

    const labels = result.data.map(item => item.month_name);
    const revenues = result.data.map(item => item.revenue_amount);

    const cty = document.getElementById("revenueChart").getContext("2d");

    new Chart(cty, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Revenue",
            data: revenues,
            borderColor: "#10b981", 
            backgroundColor: "#10b981",
            tension: 0.4,
            pointBackgroundColor: "#10b981",
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
            reverse: true, // Flip axis
            beginAtZero: false,
            ticks: {
              callback: function (value) {
                return value.toLocaleString(); // Format numbers
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