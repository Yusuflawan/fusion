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
        url: `https://arafatfootballacademy.com/fusion/backend/provider/${count_id}/marchants-aggregate`,
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            const data = response.data;
            if (response.status === 'success') {

                $('#totalMerchants').text(data.total_merchants.toLocaleString());
                $('#totalTransactions').text(data.total_transactions.toLocaleString());
                $('#totalVolume').text(parseFloat(data.transaction_volume).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'NGN',
                    minimumFractionDigits: 2
                }));
                $('#withholdingTax').text(data.total_wht.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'NGN',
                    minimumFractionDigits: 0
                }));
            }
        },
        error: function(xhr, status, error) {
            console.error('AJAX error:', status, error);
        }
    });
  }
  
  // Initial fetch
  fetchCardSummary();

});