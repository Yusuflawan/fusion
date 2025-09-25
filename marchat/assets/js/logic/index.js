const baseUrl = "https://arafatfootballacademy.com/fusion/backend";
const userId = JSON.parse(localStorage.getItem("active_account"));
const user_id = userId.id;
const complianceStatus = document.querySelector("#compliance_status");
const totalVolume = document.querySelector("#total_volume");
const totalRevenue = document.querySelector("#total_revenue");
const liabilities = document.querySelector("#liabilities");

async function loadData() {
  try {
    complianceStatus.textContent = "Loading...";
    totalVolume.textContent = "...";
    totalRevenue.textContent = "...";
    liabilities.textContent = "...";


    const [
      statusRes,
      volumeRes,
      revenueRes,
      liabilitiesRes
    ] = await Promise.all([
      axios.get(`${baseUrl}/marchant/${user_id}/status`),
      axios.get(`${baseUrl}/marchant/${user_id}/transaction-volume`),
      axios.get(`${baseUrl}/marchant/${user_id}/revenue`),
      axios.get(`${baseUrl}/marchant/${user_id}/tax-liabilities-amount`)
    ]);

    if (statusRes.data?.status === "success") {
      const status = statusRes.data.data.compliance_status || "Unknown";
      complianceStatus.textContent =
        status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    } else {
      complianceStatus.textContent = "N/A";
    }

    if (volumeRes.data?.status === "success") {
      totalVolume.textContent = formatToNaira(volumeRes.data.data.total_volume);
    } else {
      totalVolume.textContent = "N/A";
    }

     if (liabilitiesRes.data?.status === "success") {
      liabilities.textContent = formatToNaira(liabilitiesRes.data.data.total_tax_liability);
    } else {
      liabilities.textContent = "N/A";
    }

    if (revenueRes.data?.status === "success") {
      const total = revenueRes.data.data.reduce(
        (acc, item) => acc + parseFloat(item.total_revenue),
        0
      );
      totalRevenue.textContent = formatToNaira(total);
    } else {
      totalRevenue.textContent = "N/A";
    }
  } catch (error) {
    complianceStatus.textContent = "Error";
    totalVolume.textContent = "Error";
    totalRevenue.textContent = "Error";
    liabilities.textContent = "Error";
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

