
document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        // No login token, redirect to login
        window.location.href = "login.html";
    }

    // Array of month names
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const now = new Date();
    const currentMonth = now.getMonth(); // 0 = January, 11 = December
    const monthSelect = document.getElementById("monthSelect");
    // const resultsDiv = document.getElementById("tax-liabilities-sum");

    // Populate the select
    for (let i = 0; i <= currentMonth; i++) {
        const option = document.createElement("option");
        option.value = i + 1; // Month number (1–12)
        option.text = monthNames[i];

        if (i === currentMonth) {
            option.selected = true;
        }

        monthSelect.appendChild(option);
    }

    fetchTaxLiabilities(monthSelect.value);

    monthSelect.addEventListener("change", function () {
        fetchTaxLiabilities(this.value);
    });

    try {
        const response = await fetch(`${baseUrl}/providers/count`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        document.getElementById("ptsp-pssp-count").textContent = result.data.count;

    } catch (error) {
        console.error("Error fetching data:", error);
    }

    try {
        const response = await fetch(`${baseUrl}/providers/active/count`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        document.getElementById("active-ptsp-pssp-count").textContent = result.data.count;

    } catch (error) {
        console.error("Error fetching data:", error);
    }


    try {
        const response = await fetch(`${baseUrl}/tax-liabilities?month=${selectedMonth}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        document.getElementById("tax-liabilities-sum").textContent = result.data.total_amount;

    } catch (error) {
        console.error("Error fetching data:", error);
    }


        
    try {
        const response = await fetch(`${baseUrl}/roles`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        const roleselect = document.getElementById("userRole");

        result.data.forEach(role => {
            const option = document.createElement("option");
            option.value = role.id;
            option.textContent = role.name.charAt(0).toUpperCase() + role.name.slice(1);
            roleselect.appendChild(option);
        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }


});



// Function to fetch tax liabilities
async function fetchTaxLiabilities(month) {
    try {
        const response = await fetch(`${baseUrl}/tax-liabilities?month=${month}`);
        if (!response.ok) throw new Error("Failed to fetch");

        const result = await response.json();

        document.getElementById("tax-liabilities-sum").textContent = result.data.total_amount;

} catch (error) {
            resultsDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
        }
}



document.getElementById("add-user-btn").addEventListener("click", async () => {
    
    const payload = {
        name: document.getElementById("userName").value,
        email: document.getElementById("userEmail").value,
        role_id: document.getElementById("userRole").value,
        department: document.getElementById("userDepartment").value
    };  

    console.log("Adding user with data:", payload);

    try {
        const response = await fetch(`${baseUrl}/admin/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        alert(result.message || "User added successfully");

    } catch (error) {
        console.error("Error adding user:", error);
    }

});