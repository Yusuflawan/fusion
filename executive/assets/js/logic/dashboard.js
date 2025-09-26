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

    const [
      totalRevenueRes,
      activeMerchantsRes,
      complianceRateRes,
    ] = await Promise.all([
      axios.get(`${baseUrl}/executive/total-revenue?state_id=${stateId}&period=${period}`),
      axios.get(`${baseUrl}/executive/compliance/count?state_id=${stateId}`),
      axios.get(`${baseUrl}/executive/compliance-rate?state_id=${stateId}&period=${period}`),
    ]);

    console.log(complianceRateRes.data)

    // Compliance Status
    if (totalRevenueRes.data.status === "success") {
      totalRevenue.textContent = formatToNaira(totalRevenueRes.data.data.revenue);
    } else {
      totalRevenue.textContent = "N/A";
    }

    // Transaction Volume
    if (activeMerchantsRes.data?.status === "success") {
      activeMerchants.textContent = formatToNaira(activeMerchantsRes.data.data.total_marchants);
    // activeMerchants.textContent = "text";
    } else {
      activeMerchants.textContent = "N/A";
    }

    // Revenue
    if (complianceRateRes.data?.status === "success") {
      complianceRate.textContent = formatToNaira(complianceRateRes.data.data.total_assessments);
    } else {
      complianceRate.textContent = "N/A";
    }
  } catch (error) {
    // totalRevenue.textContent = "Error";
    // complianceRate.textContent = "Error";
    // activeMerchants.textContent = "Error";
  }
}

function formatToNaira(num) {
  const n = Number(num) || 0;
  if (n >= 1_000_000_000) return `₦${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `₦${(n / 1_000).toFixed(1)}K`;
  return `₦${n.toLocaleString()}`;
}

loadData();