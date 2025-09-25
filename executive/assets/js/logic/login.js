
const baseUrl = "https://arafatfootballacademy.com/fusion/backend";
// const baseUrl = "http://localhost:8080/fusion/backend";

// handle message display
function displayMessage(message, color) {
    const msg = document.getElementById("message");
    if (msg) {
        msg.textContent = message;
        msg.style.color = color;
        setTimeout(() => {
            msg.textContent = "";
        }, 3000);
    }
}

document.getElementById("login-form").addEventListener("submit", async(e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        displayMessage("All fields are required", "red")
        return;
    }

    try {
        const response = await fetch(`${baseUrl}/executive/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                email: email,
                password: password }
            )
        });

        if (!response.ok) {
            throw new Error("Login failed. Please check your credentials.");
        }

        const data = await response.json();
        if(data.status && data.status === "error") {
            throw new Error(data.message || "Login failed. Please try again.");
        }

        localStorage.setItem("token", data.token);
        const token = data.token;
        displayMessage(data.message || "Login successful!", "green");

        // Fetch profile data after successful login
        await getProfile(token);

        // Redirect to dashboard after a short delay to show the success message
        setTimeout(() => {
            window.location.href = "dashboard.html"; // Redirect to dashboard or desired page
        }, 1000);
    } catch (error) {
        displayMessage(error.message || "An error occurred during login.", "red");
        console.error("Error during login:", error);
    }

});


// get profile data
async function getProfile(token) {
    // const token = localStorage.getItem("token");
    if (!token) {
        displayMessage("You are not logged in.", "red");
        return;
    }

    try {
        const response = await fetch(`${baseUrl}/profile`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch profile data.");
        }

        const result = await response.json();
        if(result.status && result.status === "error") {
            throw new Error(result.message || "Failed to fetch profile data.");
        }

        const data = result.data;

        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);

        // return data.role;
        
    } catch (error) {
        displayMessage(error.message || "An error occurred while fetching profile data.", "red");
        console.error("Error fetching profile:", error);
    }
}