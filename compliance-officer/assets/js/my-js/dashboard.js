document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");
    if (!token) {
        // No login token, redirect to login
        window.location.href = "login.html";
    }

    try {
        const response = await fetch(`${baseUrl}/compliance-officer/dashboard-cards`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        document.getElementById("total-marchants").textContent = result.data.total_merchants;
        document.getElementById("overdue-ptsp").textContent = result.data.overdue_ptsps;
        document.getElementById("average-compliance").textContent = result.data.average_compliance_rate;
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    try {
        const response = await fetch(`${baseUrl}/compliance-officer/compliance-alert`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();
        const container = document.getElementById("priority-alerts");

        if (result.status === "success" && result.data.length > 0) {
            // filter PTSPs with tax liabilities
            const liabilities = result.data.filter(item =>
                parseFloat(item.total_liability) > 0 || parseFloat(item.overdue_liability) > 0
            );

            if (liabilities.length === 0) {
                container.innerHTML += `<p class="text-muted small">No priority alerts at this time</p>`;
            }

            liabilities.forEach(alert => {
                // Badge + circle colors: high if overdue, else medium
                const isOverdue = parseFloat(alert.overdue_liability) > 0;
                const circleColor = isOverdue ? "bg-danger" : "bg-warning";
                const badgeColor = isOverdue ? "bg-danger" : "bg-secondary";
                const priority = isOverdue ? "high" : "medium";

                // Build alert item
                const div = document.createElement("div");
                div.className = "d-flex align-items-center p-3 mb-2 bg-light rounded";

                div.innerHTML = `
                    <span class="${circleColor} rounded-circle" style="width: 12px; height: 12px; min-width: 12px;"></span>
                    <div class="flex-grow-1 ms-3">
                        <h6 class="mb-1 fw-bold">${alert.provider_name}</h6>
                        <p class="text-muted small mb-0">
                            Tax liability of ₦${parseFloat(alert.total_liability).toLocaleString()}
                        </p>
                    </div>
                    <div class="text-end">
                        <span class="badge ${badgeColor}">${priority}</span>
                        <p class="text-muted small mb-0 mt-1">${alert.period_start}</p>
                    </div>
                `;

                container.appendChild(div);
            });
        } else {
            container.innerHTML += `<p class="text-muted small">No priority alerts found</p>`;
        }
    } catch (error) {
        console.error("Error fetching priority alerts:", error);
    }



    try {
        const response = await fetch(`${baseUrl}/compliance-officer/${localStorage.getItem("email")}/recent-activities`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        const container = document.querySelector("#recent-activity");

        if (result.status === "success" && result.data.length > 0) {
            // Clear existing placeholder activities
            container.innerHTML = `
                <h5 class="card-title mb-1">My Recent Activity</h5>
                <p class="text-muted small mb-4">Your recent compliance actions</p>
            `;

            result.data.forEach(activity => {
                // Choose badge color based on action or status
                let badgeColor = "bg-primary"; 
                if (activity.action_type.includes("verify")) badgeColor = "bg-success";
                if (activity.action_type.includes("flag")) badgeColor = "bg-warning";
                if (activity.action_type.includes("update") && activity.detail.toLowerCase().includes("non-compliant")) badgeColor = "bg-danger";

                // Format time
                const time = new Date(activity.performed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                // Build activity item
                const div = document.createElement("div");
                div.className = "d-flex align-items-start mb-3";
                div.innerHTML = `
                    <span class="${badgeColor} rounded-circle me-3" 
                        style="width: 8px; height: 8px; min-width: 8px; margin-top: 6px;">
                    </span>
                    <div>
                        <span class="text-muted small me-2">${time}</span>
                        <span>${activity.detail}</span>
                    </div>
                `;

                container.appendChild(div);
            });

        } else {
            container.innerHTML = `
                <h5 class="card-title mb-1">My Recent Activity</h5>
                <p class="text-muted small mb-4">No recent compliance actions</p>
            `;
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }



});







