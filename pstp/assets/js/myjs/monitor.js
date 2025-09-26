const user = JSON.parse(localStorage.getItem("user"));
const successful = document.getElementById("successful");
const failed = document.getElementById("failed");
const partial = document.getElementById("partial");
const tbody = document.getElementById("batchTableBody");
const count_id = user.provider_id;

$.ajax({
    url: `https://arafatfootballacademy.com/fusion/backend/provider/${count_id}/batches`, // Replace with your API endpoint
    method: 'GET',
    dataType: 'json',
    success: function(response) {
        if (response.status === 'success') {
            populateTable(response.data);
        } else {
            console.error('Error: API response status is not success');
        }
    },
    error: function(xhr, status, error) {
        console.error('AJAX error:', status, error);
    }
});

// Populate table with data
function populateTable(data) {
    const tbody = $('#batchTableBody');
    tbody.empty();

    data.forEach(item => {
        const formattedAmount = parseFloat(item.total_amount).toLocaleString('en-US', {
            style: 'currency',
            currency: 'NGN', // Assuming NGN based on large amounts and provider "Opay"
            minimumFractionDigits: 2
        });

        const row = `
            <tr>
                <td>${item.batch_id}</td>
                <td>${item.created_at}</td>
                <td>${item.total_transactions}</td>
                <td>${item.processing_time}</td>
                <td>${item.error_count}</td>
                <td><span class="badge bg-success">${item.status.toUpperCase()}</span></td>
                <td>
                    <button class="btn btn-sm btn-primary me-1">View</button>
                    <button class="btn btn-sm btn-secondary">Download</button>
                </td>
            </tr>
        `;
        tbody.append(row);
    });
}

function fetchBatchStats() {
    $.ajax({
        url: `https://arafatfootballacademy.com/fusion/backend/provider/${count_id}/ingestion/cards`, // Replace with your API endpoint
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.status === 'success') {
                updateUI(response.data);
            } else {
                console.error('Error: API response status is not success');
            }
        },
        error: function(xhr, status, error) {
            console.error('AJAX error:', status, error);
        }
    });
}

// Function to format seconds to a readable time format (e.g., "59m 59s")
function formatProcessingTime(seconds) {
    const absSeconds = Math.abs(seconds); // Handle negative value
    const minutes = Math.floor(absSeconds / 60);
    const remainingSeconds = Math.round(absSeconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
}

// Update UI with data
function updateUI(data) {
    $('#totalBatches').text(data.total_batches.toLocaleString());
    $('#successful').text(data.successful_batches.toLocaleString());
    $('#failed').text(data.failed_batches.toLocaleString());
    $('#partial').text('0'); // No partial data in response
    $('#totalRecords').text(data.total_transactions.toLocaleString()); // Update Total Records
    $('#avgTime').text(formatProcessingTime(data.avg_processing_time_seconds)); // Update Avg Time
}

fetchBatchStats();