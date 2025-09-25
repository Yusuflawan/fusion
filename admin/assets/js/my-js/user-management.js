
document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        // No login token, redirect to login
        window.location.href = "login.html";
    }

    try {
        const response = await fetch(`${baseUrl}/admin/users/count`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        document.getElementById("total-users").textContent = result.data.count;

    } catch (error) {
        console.error("Error fetching data:", error);
    }

    try {
        const response = await fetch(`${baseUrl}/admin/users/active/count`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        document.getElementById("active-users-count").textContent = result.data.count;

    } catch (error) {
        console.error("Error fetching data:", error);
    }

    try {
        const response = await fetch(`${baseUrl}/admins/activities/count`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        document.getElementById("user-activities-count").textContent = result.data.count;

    } catch (error) {
        console.error("Error fetching data:", error);
    }

    try {
        const response = await fetch(`${baseUrl}/admins`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();
        const tbody = document.getElementById("users-table-body");
        tbody.innerHTML = ""; // clear existing rows

        result.data.forEach(user => {
            const row = `
            <tr>
                <td class="pe-0">
                <div class="form-check">
                    <input class="form-check-input" data-checkbox type="checkbox">
                </div>
                </td>
                <td>
                <div class="d-flex align-items-center mw-175px">
                    <div class="ms-2">${user.name}</div>
                </div>
                </td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                <span class="badge ${user.status === "active" ? "bg-primary-subtle text-primary" : "bg-danger-subtle text-danger"}">
                    ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
                </td>
                <td>${user.created_at}</td>
            </tr>
            `;
            tbody.insertAdjacentHTML("beforeend", row);
        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }


    document.getElementById("add-user-btn").addEventListener("click", async () => {
        // e.preventDefault();
        const name = document.getElementById("user-name").value;
        const email = document.getElementById("user-email").value;
        const role = document.getElementById("user-role").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`${baseUrl}/admin/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, role, password })
            });
            if (!response.ok) throw new Error("Network response was not ok");
            const result = await response.json();
            alert(result.message || "User added successfully");
            window.location.href = "user.html";

        } catch (error) {
            console.error("Error adding user:", error);
        }
    });



});


