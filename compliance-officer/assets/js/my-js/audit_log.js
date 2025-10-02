
document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        // No login token, redirect to login
        window.location.href = "login.html";
    }

    try {
        const response = await fetch(`${baseUrl}/compliance-officer/audit-logs`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        // Total activities
        document.getElementById("total-activities").textContent = result.data.length;

        // Count high impact activities (those mentioning "non-compliant" in details)
        const highImpactCount = result.data.filter(update =>
            update.detail.toLowerCase().includes("non-compliant")
        ).length;
        document.getElementById("high-impact-activities").textContent = highImpactCount;

        const container = document.getElementById("systemUpdates");

        if (result.status === "success" && result.data.length > 0) {
            result.data.forEach(update => {
                // Badge color (based on success/failed)
                let badgeColor = "bg-warning";
                if (update.status === "success") badgeColor = "bg-success";
                if (update.status === "failed") badgeColor = "bg-danger";

                const li = document.createElement("li");
                li.className = "list-group-item";

                li.innerHTML = `
                    <span class="badge ${badgeColor} me-2">&bull;</span>
                    <strong>${update.action_type.replace("_", " ")}</strong><br>
                    <small>${update.detail}</small>
                    <div class="mt-2">
                        <span class="badge bg-secondary">${update.user_type}</span>
                        <span class="float-end text-dark">${update.performed_at}</span>
                    </div>
                `;

                container.appendChild(li);
            });
        } else {
            container.innerHTML = `<li class="list-group-item text-muted">No system updates found</li>`;
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }



});

    // document.getElementById("total-activities-count").textContent = result.data.count;

