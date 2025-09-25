
document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        // No login token, redirect to login
        window.location.href = "../login.html";
    }

    // try {
    //     const response = await fetch(`${baseUrl}/users/ptsp_pssp/count`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         }
    //     });
    //     if (!response.ok) throw new Error("Network response was not ok");

    //     const result = await response.json();

    //     document.getElementById("ptsp-pssp-count").textContent = result.data.count;

    // } catch (error) {
    //     console.error("Error fetching data:", error);
    // }


});


