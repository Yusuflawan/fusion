
document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        // No login token, redirect to login
        window.location.href = "../login.html";
    }

    try {
        const response = await fetch(`${baseUrl}/users/admin/count`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        const text = result.data.count > 1 ? "users" : "user";

        document.getElementById("admin-users-count").textContent = result.data.count + " " + text;

    } catch (error) {
        console.error("Error fetching data:", error);
    }

    try {
        const response = await fetch(`${baseUrl}/users/executive/count`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        const text = result.data.count > 1 ? "users" : "user";

        document.getElementById("executive-ussers-count").textContent = result.data.count + " " + text;

    } catch (error) {
        console.error("Error fetching data:", error);
    }

    try {
        const response = await fetch(`${baseUrl}/users/ptsp_pssp/count`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        const text = result.data.count > 1 ? "users" : "user";

        document.getElementById("ptsp-pssp-users-count").textContent = result.data.count + " " + text;

    } catch (error) {
        console.error("Error fetching data:", error);
    }

    try {
        const response = await fetch(`${baseUrl}/users/marchant/count`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        const text = result.data.count > 1 ? "users" : "user";

        document.getElementById("marchant-users-count").textContent = result.data.count + " " + text;

    } catch (error) {
        console.error("Error fetching data:", error);
    }

    try {
        const response = await fetch(`${baseUrl}/users/marchant/count`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        const text = result.data.count > 1 ? "users" : "user";

        document.getElementById("compliance-officer-count").textContent = result.data.count + " " + text;

    } catch (error) {
        console.error("Error fetching data:", error);
    }



});

