let transactionChartInstance = null;
let revenueChartInstance = null;

function showLoadingOverlay() {
  const overlay = document.getElementById("switchOverlay");
  if (overlay) overlay.classList.remove("hidden");
}

function hideLoadingOverlay() {
  const overlay = document.getElementById("switchOverlay");
  if (overlay) overlay.classList.add("hidden");
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
  const activeAccount = JSON.parse(localStorage.getItem("default_account") || "{}");
  const switcher = document.getElementById("accountSwitcher");

  if (!switcher) return;

  switcher.innerHTML = "";

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

    if (!response.ok) throw new Error("Failed to switch account");

    const data = await response.json();

    if (data && data.account) {
      localStorage.setItem("default_account", JSON.stringify(data.account));
      localStorage.setItem("token", data.token);

      let accounts = JSON.parse(localStorage.getItem("all_accounts") || "[]");
      accounts = accounts.map((acc) =>
        acc.id == data.account.id ? data.account : acc
      );
      localStorage.setItem("all_accounts", JSON.stringify(accounts));

      fetchCardSummary();
    } else {
      console.warn("No account object returned from switch API");
    }
  } catch (error) {
    console.error("Error switching account:", error);
  } finally {
    hideLoadingOverlay();
  }
}

async function fetchProfile() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await fetch(`${baseUrl}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();

    if (result.status === "success" && result.data) {
      localStorage.setItem("profile_data", JSON.stringify(result.data));
      return result.data;
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
  }

  return null;
}

async function fetchCardSummary() {
  let marchant_number = JSON.parse(localStorage.getItem("default_account"));
  const token = localStorage.getItem("token");

  if (!marchant_number || !marchant_number.marchant_number) {
    const profile = await fetchProfile();
    if (profile && profile.marchant_number) {
      marchant_number = profile;
    } else {
      console.error("Merchant number not found even after profile fetch.");
      return;
    }
  }

  $.ajax({
    url: `${baseUrl}/marchant/${marchant_number.marchant_number}/dashboard-cards`,
    method: "GET",
    dataType: "json",
    headers: { Authorization: `Bearer ${token}` },
    success: function (response) {
      if (response.status === "success" && response.data) {
        $("#compliance_status").text("Compliant");
        $("#compliance_message").text("All obligations current");
        $("#total_volume").text(formatToNaira(response.data.total_volume));
        $("#liabilities").text(formatToNaira(response.data.total_tax_liability));
        $("#total_revenue").text(formatToNaira(response.data.total_revenue));
        $("#volume_period").text("This month");
        $("#liability_status").text("Payment status updated");
        $("#revenue_trend").text("Trends calculated");
      } else {
        console.error("Error: API response status is not success");
      }
    },
    error: function (xhr, status, error) {
      console.error("error:", status, error);
    },
  });
}

async function initDashboard() {
  if (!checkAuth()) return;

  loadAccountSwitcher();

  const activeAccount = JSON.parse(localStorage.getItem("default_account") || "{}");

  if (!activeAccount.id) {
    const accounts = JSON.parse(localStorage.getItem("all_accounts") || "[]");
    if (accounts.length > 0) {
      localStorage.setItem("default_account", JSON.stringify(accounts[0]));
    }
  }

  await fetchCardSummary();

  const switcher = document.getElementById("accountSwitcher");
  if (switcher) {
    switcher.addEventListener("change", function () {
      switchAccount(this.value);
    });
  }
}

$(document).ready(initDashboard);
