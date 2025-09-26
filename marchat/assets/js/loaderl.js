let transactionChartInstance = null;
let revenueChartInstance = null;

function showLoadingOverlay() {
  document.getElementById("switchOverlay").classList.remove("hidden");
}

function hideLoadingOverlay() {
  document.getElementById("switchOverlay").classList.add("hidden");
}

function formatToNaira(amount) {
  if (!amount) return "₦0";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatLargeNumber(num) {
  if (!num) return "0";
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

function checkAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

function loadAccountSwitcher() {
  const accounts = JSON.parse(localStorage.getItem("all_accounts") || "[]");
  const activeAccount = JSON.parse(
    localStorage.getItem("default_account") || "{}"
  );
  const switcher = document.getElementById("accountSwitcher");

  if(switcher){
    switcher.innerHTML = "";
  }

  if (accounts.length === 0) {
    switcher.innerHTML = '<option value="">No accounts available</option>';
    return;
  }

  accounts.forEach((account) => {
    const option = document.createElement("option");
    option.value = account.id;
    option.textContent = account.business_name || `Account ${account.id}`;
    if (account.id === activeAccount.id) {
      option.selected = true;
    }
    switcher.appendChild(option);
  });
}

async function switchAccount(accountId) {
  if (!checkAuth()) return;

  showLoadingOverlay();

  try {
    // POST request to backend
    const response = await fetch(
      "https://arafatfootballacademy.com/fusion/backend/marchant/auth/accounts/switch",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id: accountId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to switch account");
    }

    const data = await response.json();
    console.log("Switch response:", data);

    if (data && data.account) {
      localStorage.setItem("default_account", JSON.stringify(data.account));
      localStorage.setItem("token", data.token);

      let accounts = JSON.parse(localStorage.getItem("all_accounts") || "[]");
      accounts = accounts.map((acc) =>
        acc.id == data.account.id ? data.account : acc
      );
      localStorage.setItem("all_accounts", JSON.stringify(accounts));

      await loadDashboardData(data.account);
    } else {
      console.warn("No account object returned from switch API");
    }
  } catch (error) {
    console.error("Error switching account:", error);
  } finally {
    hideLoadingOverlay();
  }
}

const idCode = JSON.parse(localStorage.getItem("default_account"));

// console.log(idCode);

async function loadDashboardData(account) {
  if (!account || !account.id) {
    console.error("Invalid account data");
    return;
  }

  // console.log(account);

  const merchantId = account.id;
  const token = localStorage.getItem("token");

  try {
    const [
      statusResponse,
      volumeResponse,
      revenueResponse,
      liabilitiesResponse,
      transactionTrendResponse,
      revenueTrendResponse,
    ] = await Promise.all([
      axios.get(`${baseUrl}/marchant/${merchantId}/status`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${baseUrl}/marchant/${idCode.marchant_number}/transaction-volume`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${baseUrl}/marchant/${idCode.marchant_number}/revenue`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${baseUrl}/marchant/${idCode.marchant_number}/tax-liabilities-amount`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${baseUrl}/marchant/${idCode.marchant_number}/transaction-trend`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${baseUrl}/marchant/${idCode.marchant_number}/revenue-trend`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    if (statusResponse.data.status === "success") {
      document.getElementById("compliance_status").textContent =
        statusResponse.data.data.compliance_status || "Unknown";
      document.getElementById("compliance_message").textContent =
        statusResponse.data.data.compliance_status === "compliant"
          ? "All obligations current"
          : "Action required";
    }

    if (volumeResponse.data.status === "success") {
      const volume = volumeResponse.data.data.total_volume || 0;
      document.getElementById("total_volume").textContent =
        formatToNaira(volume);
      document.getElementById("volume_period").textContent = "This month";
    }

    if (liabilitiesResponse.data.status === "success") {
      const liability = liabilitiesResponse.data.data.total_tax_liability || 0;
      document.getElementById("liabilities").textContent = liability;
    }

    if (revenueResponse.data.status === "success") {
      let revenue = 0;
      if (Array.isArray(revenueResponse.data.data)) {
        revenue = revenueResponse.data.data.reduce(
          (sum, item) => sum + (parseFloat(item.total_revenue) || 0),
          0
        );
      } else if (typeof revenueResponse.data.data === "object") {
        revenue = parseFloat(revenueResponse.data.data.total_revenue) || 0;
      }

      document.getElementById("total_revenue").textContent =
        formatToNaira(revenue);
      document.getElementById("revenue_trend").textContent =
        "+7.5% from last month";
    }
  } catch (error) {
    document.getElementById("compliance_status").textContent = "Error";
    document.getElementById("total_volume").textContent = "Error";
    document.getElementById("liabilities").textContent = "Error";
    document.getElementById("total_revenue").textContent = "Error";
  }
}

async function initDashboard() {
  if (!checkAuth()) return;

  loadAccountSwitcher();

  const activeAccount = JSON.parse(
    localStorage.getItem("default_account") || "{}"
  );

  console.log(activeAccount)

  if (!activeAccount.id) {
    const accounts = JSON.parse(localStorage.getItem("all_accounts") || "[]");
    if (accounts.length > 0) {
      localStorage.setItem("default_account", JSON.stringify(accounts[0]));
      await loadDashboardData(accounts[0]);
    }
  } else {
    await loadDashboardData(activeAccount);
  }

  document
    .getElementById("accountSwitcher")
    .addEventListener("change", function () {
      switchAccount(this.value);
    });
}

// document.addEventListener("DOMContentLoaded", initDashboard);

$(document).ready(function() {

  function fetchCardSummary() {
    $.ajax({
        url: baseUrl + '/marchant/MCH-20250918-001/dashboard-cards',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.status === 'success') {
                $('#compliance_status').text("Compliant");
                $('#compliance_message').text("All obligations current");
                $('#total_volume').text(response.data.total_volume);
                $('#liabilities').text(formatToNaira(response.data.total_tax_liability));
                $('#total_revenue').text(formatToNaira(response.data.total_revenue));
                $('#volume_period').text('This month');
                $('#liability_status').text('Payment status updated');
                $('#revenue_trend').text('Trends calculated');
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

  
});
