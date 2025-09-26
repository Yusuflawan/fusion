const totalBatches = document.getElementById("totalBatches");
const user = JSON.parse(localStorage.getItem("user"));
const successful = document.getElementById("successful");
const failed = document.getElementById("failed");
const partial = document.getElementById("partial");
const tbody = document.getElementById("batchTableBody");
const count_id = user.provider_id;

$(document).ready(function() {

  function fetchCardSummary() {
    $.ajax({
        url: `https://arafatfootballacademy.com/fusion/backend/provider/${count_id}/dashboard-cards`,
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            const data = response.data;
            if (response.status === 'success') {

                $('#totalSubmissions').text(data.transactions.total_transactions.toLocaleString());
                $('#successRate').text(parseFloat(data.success_rate).toFixed(2) + '%');
                $('#errorCount').text(parseFloat(data.failed_rate).toFixed(2) + '%');
                $('#compliceScore').text(data.compliance.compliance_rate);
                    } else {
                console.error('Error: API response status is not success');
            }
        },
        error: function(xhr, status, error) {
            console.error('AJAX error:', status, error);
        }
    });
  }
  
  // Initial fetch
  fetchCardSummary();

    async function renderTransactionChart() {
        try {
            // AJAX fetch version (uncomment and modify URL/count_id as needed)
            
            const response = await fetch(`https://arafatfootballacademy.com/fusion/backend/provider/${count_id}/hourly-transactions`);
            const result = await response.json();

            if (result.status !== "success") {
            throw new Error("Failed to fetch transaction data");
            }
            

            // Format hours as 12-hour clock (e.g., "12 AM", "1 AM", "12 PM")
            const labels = result.data.map(item => {
            const hour = item.transaction_hour;
            const period = hour < 12 ? "AM" : "PM";
            const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
            return `${displayHour} ${period}`;
            });
            const amounts = result.data.map(item => parseFloat(item.total_amount));

            const ctx = document.getElementById("submissionChart").getContext("2d");

            new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                {
                    label: "Transaction Amount",
                    data: amounts,
                    backgroundColor: "#17a2b8", // Matches UI's info color
                    borderColor: "#17a2b8",
                    borderWidth: 1
                }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                legend: {
                    display: false
                }
                },
                scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                    callback: function (value) {
                        return value.toLocaleString("en-US", { style: "currency", currency: "NGN" });
                    }
                    },
                    grid: {
                    color: "#e5e7eb"
                    }
                },
                x: {
                    grid: {
                    display: false // Hide x-axis grid for cleaner look
                    },
                    ticks: {
                    maxRotation: 45,
                    minRotation: 45 // Rotate labels for readability
                    }
                }
                }
            }
            });
        } catch (error) {
            console.error("Error loading transaction chart:", error);
        }
    }

    renderTransactionChart();
  
});