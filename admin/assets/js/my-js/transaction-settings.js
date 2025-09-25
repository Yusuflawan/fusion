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
      },
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const result = await response.json();
    const tbody = document.querySelector("table tbody"); // target tbody

    tbody.innerHTML = ""; // clear old rows

    result.data.forEach((tier) => {
      // Badge color
      const badgeClass = tier.status === "active" ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger";

      // Unique modal ID per tier
      const modalId = `editTierModal${tier.id}`;

      const row = document.createElement("tr");
    row.innerHTML = `
    <td>${tier.tier_name}</td>
    <td>${("₦" + tier.min_amount + " - " + "₦" + tier.max_amount) || "N/A"}</td>
    <td>${tier.flat_rate}%</td>
    <td>₦${tier.percentage_rate}</td>
    <td>${tier.description || "-"}</td>
    <td>
      <span class="badge ${badgeClass} rounded-pill">${tier.status}</span>
    </td>
    <td>
      <!-- Edit Button -->
      <button class="btn btn-sm btn-outline-primary me-1" data-bs-toggle="modal" data-bs-target="#${modalId}">
        <i class="bi bi-pencil"></i>
      </button>

      <!-- Edit Tier Modal -->
      <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit ${tier.tier_name}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Tier Name</label>
                    <input type="text" class="form-control" value="${tier.tier_name}">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Transaction Range</label>
                    <input type="text" class="form-control" value="${tier.range || ""}">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Rate (%)</label>
                    <input type="number" class="form-control" step="0.1" value="${tier.percentage_rate}">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Fixed Fee (₦)</label>
                    <input type="number" class="form-control" value="${tier.flat_rate}">
                  </div>
                  <div class="col-12">
                    <label class="form-label fw-semibold">Description</label>
                    <input type="text" class="form-control" value="${tier.description || ""}">
                  </div>
                  <div class="col-12">
                    <label class="form-label fw-semibold">Status</label>
                    <select class="form-select">
                      <option ${tier.status === "active" ? "selected" : ""}>Active</option>
                      <option ${tier.status === "inactive" ? "selected" : ""}>Inactive</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
              <button class="btn btn-dark">Save Changes</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Test + Delete -->
      <button class="btn btn-sm btn-success me-1">Test</button>
      <button class="btn btn-sm btn-danger"><i class="bi bi-trash"></i></button>
    </td>
  `;

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
