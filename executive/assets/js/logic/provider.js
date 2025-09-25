
document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        // No login token, redirect to login
        window.location.href = "login.html";
    }

    try {
        const response = await fetch(`${baseUrl}/providers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();
        const container = document.getElementById("providers-container"); // target row

        container.innerHTML = ""; // clear old cards

        result.data.forEach(provider => {
            const card = document.createElement("div");
            card.className = "col-md-4";

            // Status badge styling
            let statusColor = "text-warning";
            if (provider.status === "approved") statusColor = "text-success";
            else if (provider.status === "declined") statusColor = "text-danger";

            // Fallback email
            const email = provider.provider_email || "Not Provided";

            // Fallback terminal volume
            const terminalVolume = provider.terminal_volume !== "0" ? provider.terminal_volume : "N/A";

            card.innerHTML = `
                <div class="card shadow-sm rounded-3 p-3 h-100">
                    <div class="card-body">
                        <!-- Title and Email -->
                        <h5 class="fw-bold mb-1">${provider.provider_name}</h5>
                        <p class="text-muted small mb-3">${email}</p>

                        <!-- Details -->
                        <div class="row">
                            <div class="col-6">
                                <p class="mb-1 text-muted small">Category</p>
                                <p class="fw-semibold">${provider.provider_type}</p>
                            </div>
                            <div class="col-6">
                                <p class="mb-1 text-muted small">Terminal Volume</p>
                                <p class="fw-semibold">${terminalVolume}</p>
                            </div>
                            <div class="col-6">
                                <p class="mb-1 text-muted small">Request Date</p>
                                <p class="fw-semibold">${new Date(provider.onboarded_at).toLocaleDateString()}</p>
                            </div>
                            <div class="col-6">
                                <p class="mb-1 text-muted small">Status</p>
                                <p class="fw-semibold ${statusColor}" id="status-${provider.id}">${provider.status}</p>
                            </div>
                        </div>

                        <!-- Approve / Decline Buttons -->
                        <div class="d-flex justify-content-between mt-3">
                            <button class="btn btn-success w-50 me-2" data-bs-toggle="modal" data-bs-target="#approveModal-${provider.id}">
                                <i class="fi fi-rr-check me-1"></i> Approve
                            </button>
                            <button class="btn btn-danger w-50" data-bs-toggle="modal" data-bs-target="#declineModal-${provider.id}">
                                <i class="fi fi-rr-cross-circle me-1"></i> Decline
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Approve Modal -->
                <div class="modal fade" id="approveModal-${provider.id}" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content rounded-3 shadow-sm">
                    <div class="modal-header border-0">
                        <h5 class="modal-title fw-bold text-success text-center w-100">Approve PTSP Registration</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body px-4">
                        <p class="mb-3 text-center">You are about to <strong class="text-success">approve</strong>
                        registration for <b>${provider.provider_name}</b>. Please provide reason.</p>
                        <form id="approveForm-${provider.id}">
                        <label class="form-label fw-semibold">Reason for Approval</label>
                        <textarea class="form-control" rows="4" placeholder="Reason" required></textarea>
                        </form>
                    </div>
                    <div class="modal-footer border-0 px-4">
                        <button type="submit" form="approveForm-${provider.id}" class="btn w-100 text-white" style="background:#0A0E4F;">Approve</button>
                    </div>
                    </div>
                </div>
                </div>

                <!-- Decline Modal -->
                <div class="modal fade" id="declineModal-${provider.id}" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content rounded-3 shadow-sm">
                    <div class="modal-header border-0">
                        <h5 class="modal-title fw-bold text-danger text-center w-100">Decline PTSP Registration</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body px-4">
                        <p class="mb-3 text-center">You are about to <strong class="text-danger">decline</strong>
                        registration for <b>${provider.provider_name}</b>. Please provide reason.</p>
                        <form id="declineForm-${provider.id}">
                        <label class="form-label fw-semibold">Reason for Decline</label>
                        <textarea class="form-control" rows="4" placeholder="Reason" required></textarea>
                        </form>
                    </div>
                    <div class="modal-footer border-0 px-4">
                        <button type="submit" form="declineForm-${provider.id}" class="btn w-100 text-white" style="background:#B00020;">Decline</button>
                    </div>
                    </div>
                </div>
                </div>
            `;

            container.appendChild(card);

            // Attach handlers for forms
            const approveForm = card.querySelector(`#approveForm-${provider.id}`);
            approveForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const reason = approveForm.querySelector("textarea").value;

                await handleDecision(provider.id, "approved", reason);
            });

            const declineForm = card.querySelector(`#declineForm-${provider.id}`);
            declineForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const reason = declineForm.querySelector("textarea").value;

                await handleDecision(provider.id, "declined", reason);
            });
        });

        // Function to send approve/decline
        async function handleDecision(providerId, action, reason) {
            try {
                const res = await fetch(`${baseUrl}/providers/${providerId}/decision`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action, reason })
                });

                const data = await res.json();
                if (data.status === "success") {
                    // Update status text without reload
                    const statusEl = document.getElementById(`status-${providerId}`);
                    statusEl.textContent = action;
                    statusEl.className = "fw-semibold " + (action === "approved" ? "text-success" : "text-danger");

                    // Close modal
                    const modal = bootstrap.Modal.getInstance(document.getElementById(
                        action === "approved" ? `approveModal-${providerId}` : `declineModal-${providerId}`
                    ));
                    modal.hide();
                } else {
                    alert("Error: " + data.message);
                }
            } catch (err) {
                console.error("Error:", err);
                alert("Failed to update provider status");
            }
        }

    } catch (error) {
        console.error("Error fetching data:", error);
    }


});


document.getElementById("onboard-provider-btn").addEventListener("click", async () =>{
    if (document.getElementById("password").value != document.getElementById("confirm-password").value) {
        alert("Password do not match");
        return;
    }
    const payload = {
        company_name: document.getElementById("company-name").value,
        company_email: document.getElementById("company-email").value,
        staff_quota: document.getElementById("staff-quota").value,
        agent_name: document.getElementById("agent-name").value,
        agent_email: document.getElementById("agent-email").value,
        agent_phone: document.getElementById("agent-phone").value,
        terminal_volume: document.getElementById("terminaal-volume").value,
        password: document.getElementById("password").value,
        logo: document.getElementById("logo").value,
    };

    console.log(payload);

    // try {
    //     const response = await fetch(`${baseUrl}/auth/register`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(payload)
    //     });

    //     if (!response.ok) {
    //         throw new Error("failed. Please check your...");
    //     }

    //     const data = await response.json();
        
    // } catch (error) {
    //     console.error("Error during login:", error);
    // }

});


