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


});


