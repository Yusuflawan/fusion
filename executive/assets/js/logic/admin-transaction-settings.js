
document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        // No login token, redirect to login
        window.location.href = "../login.html";
    }

try {
    const response = await fetch(`${baseUrl}/tiers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const result = await response.json();
    const tbody = document.querySelector("table tbody"); // target tbody

    tbody.innerHTML = ""; // clear old rows

    result.data.forEach((tier, index) => {
        // Badge color
        const badgeClass = tier.status === "active" 
            ? "bg-success-subtle text-success" 
            : "bg-danger-subtle text-danger";

        // Unique modal id per row (to avoid duplicate IDs)
        const modalId = `disableTierModal${tier.id}`;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${tier.tier_name}</td>
            <td>₦${tier.threshold}</td>
            <td>₦${tier.commission_amount}</td>
            <td>
                <span class="badge ${badgeClass}">${tier.status}</span>
            </td>
            <td class="text-center">
                <!-- Disable Button Trigger -->
                <button class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#${modalId}">
                    <i class="bi bi-x-circle"></i>
                </button>

                <!-- Disable Tier Modal -->
                <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content text-center p-3">

                            <!-- Danger Icon -->
                            <div class="mt-3">
                                <i class="bi bi-x-circle-fill text-danger" style="font-size: 3rem;"></i>
                            </div>

                            <!-- Title -->
                            <div class="modal-header border-0 d-block">
                                <h5 class="modal-title fw-bold mt-2" id="${modalId}Label">Disable Tier</h5>
                            </div>

                            <!-- Body -->
                            <div class="modal-body">
                                <p class="text-muted">You are about to disable this tier, would you like to proceed?</p>
                            </div>

                            <!-- Footer -->
                            <div class="modal-footer border-0 justify-content-center">
                                <button type="button" class="btn btn-danger px-4">Proceed</button>
                                <button type="button" class="btn btn-outline-danger px-4" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Edit and Delete -->
                <button class="btn btn-sm btn-warning">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });

} catch (error) {
    console.error("Error fetching data:", error);
}


});