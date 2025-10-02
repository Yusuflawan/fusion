document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");
    if (!token) {
        // No login token, redirect to login
        window.location.href = "login.html";
    }

    try {
      const response = await fetch(`${baseUrl}/compliance-officer/compliance-alert`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();

      if (result.status === "success") {
        // Summary calculations
        const totalAlerts = result.data.length;
        const overdueAlerts = result.data.filter(a => parseFloat(a.overdue_liability) > 0);
        const highPriority = overdueAlerts.length > 0 ? overdueAlerts[0] : null;

        // Update summary UI
        document.getElementById("active-alerts").textContent = totalAlerts;
        document.getElementById("overdue").textContent = overdueAlerts.length;
        document.getElementById("high-priority").textContent = highPriority 
          ? `${highPriority.provider_name} – ₦${parseFloat(highPriority.overdue_liability).toLocaleString()} overdue`
          : "None";

        renderAlerts(result.data);
      } else {
        document.getElementById("alerts-container").innerHTML =
          `<p class="text-muted">No compliance alerts found.</p>`;
      }
    } catch (error) {
      console.error("Error fetching compliance alerts:", error);
      document.getElementById("alerts-container").innerHTML =
        `<p class="text-danger">Failed to load compliance alerts.</p>`;
    }

    function formatCurrency(amount) {
        if (!amount || isNaN(amount)) return "₦0";
        const num = parseFloat(amount);
        if (num >= 1000000) return "₦" + (num / 1000000).toFixed(2) + "M";
        if (num >= 1000) return "₦" + (num / 1000).toFixed(2) + "K";
        return "₦" + num.toFixed(2);
    }

    function renderAlerts(data) {
        const container = document.getElementById("alerts-container");
        container.innerHTML = "";

        data.forEach(alert => {
        const isOverdue = parseFloat(alert.overdue_liability) > 0;

        const priorityBadge = isOverdue
            ? `<span class="badge bg-danger me-1">high priority</span><span class="badge bg-warning text-dark me-1">overdue payment</span>`
            : `<span class="badge bg-info me-1">low priority</span><span class="badge bg-primary me-1">new merchant</span>`;

        const html = `
            <div class="p-3 mb-3 rounded" style="background:${isOverdue ? '#fff5f5' : '#f5f9ff'}; border-left:5px solid ${isOverdue ? '#dc3545' : '#0d6efd'};">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                ${priorityBadge}
                <span class="badge bg-dark">${alert.provider_status}</span>
                <h6 class="fw-bold mt-2 mb-2">${alert.provider_name}</h6>
                <p class="mb-1 text-muted">
                    ${isOverdue 
                    ? `PTSP failed to remit ${formatCurrency(alert.overdue_liability)} in collected taxes`
                    : `Total Tax Liability: ${formatCurrency(alert.total_liability)}`
                    }
                </p>
                <small class="text-muted">
                    Created: ${alert.created_at} | Period: ${alert.period_start} | Compliance Rate: ${alert.compliance_rate}%
                </small>
                </div>
                <div class="text-end">
                
                </div>
            </div>
            </div>
        `;

        container.innerHTML += html;
        });
    }

});

// text end
{/* <a href="#" class="me-3 text-primary">Investigate</a>
<a href="#" class="me-3 text-success">Resolve</a>
<a href="#" class="text-muted">View Details</a> */}