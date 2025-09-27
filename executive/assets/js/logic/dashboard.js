const baseUrl = "https://arafatfootballacademy.com/fusion/backend";

const totalRevenue = document.querySelector("#total_revenue");
const activeMerchants = document.querySelector("#active_merchants");
const complianceRate = document.querySelector("#compliance_rate");

const stateId = 32;
const period = "last_30_days";

async function loadData() {
  try {
    totalRevenue.textContent = "Loading...";
    activeMerchants.textContent = "...";
    complianceRate.textContent = "...";

    const res = await axios.get(`${baseUrl}/executive/dashboard-cards`);
    const { status, data } = res.data;

    if (status === "success" && data) {
      totalRevenue.textContent = formatToNaira(data.total_revenue);
      activeMerchants.textContent = data.active_merchants.toLocaleString();
      complianceRate.textContent = `${data.compliance_rate}%`;
    } else {
      totalRevenue.textContent = "N/A";
      activeMerchants.textContent = "N/A";
      complianceRate.textContent = "N/A";
    }
  } catch (error) {
    console.error("Error loading dashboard data:", error);
    totalRevenue.textContent = "Error";
    activeMerchants.textContent = "Error";
    complianceRate.textContent = "Error";
  }
}

function formatToNaira(num) {
  const n = Number(num) || 0;
  if (n >= 1_000_000_000) return `₦${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `₦${(n / 1_000).toFixed(1)}K`;
  return `₦${n.toLocaleString()}`;
}

// loadData();

document.addEventListener("DOMContentLoaded", loadData);
