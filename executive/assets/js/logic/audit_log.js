
document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        // No login token, redirect to login
        window.location.href = "login.html";
    }

    try {
        const response = await fetch(`${baseUrl}/audit-logs/count`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        document.getElementById("total-activities-count").textContent = result.data.count;

    } catch (error) {
        console.error("Error fetching data:", error);
    }

    try {
        const response = await fetch(`${baseUrl}/audit-logs/failed-logins/count`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        document.getElementById("failed-login-count").textContent = result.data.count;

    } catch (error) {
        console.error("Error fetching data:", error);
    }

    
    try {
        const response = await fetch(`${baseUrl}/audit-logs`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        const tableBody = document.querySelector("table tbody");
        tableBody.innerHTML = ""; // clear old rows

        result.data.forEach(log => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td class="pe-0">
                    <div class="form-check">
                        <input class="form-check-input" data-checkbox type="checkbox">
                    </div>
                </td>
                <td>
                    <div class="d-flex align-items-center mw-175px">
                        <div class="ms-2">${new Date(log.performed_at).toLocaleString()}</div>
                    </div>
                </td>
                <td>${log.user_email !== "0" ? log.user_email : "Unknown User"}</td>
                <td>${log.action_type}</td>
                <td>
                    <span class="badge bg-primary-subtle text-primary">${log.role_name ?? "N/A"}</span>
                </td>
                <td>${log.detail}</td>
                <td class="text-end">
                    <span class="badge ${log.status === "success" ? "bg-success" : "bg-danger"}">
                        ${log.status}
                    </span>
                </td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }



});


