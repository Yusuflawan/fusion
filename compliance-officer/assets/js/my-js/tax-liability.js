document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");
    if (!token) {
        // No login token, redirect to login
        window.location.href = "login.html";
    }

    // Format amount with ₦ and abbreviations (K, M, B if needed)
    function formatNaira(amount) {
        if (amount === null || amount === undefined || isNaN(amount)) return "₦0";

        const num = Number(amount);

        if (num >= 1_000_000_000) {
            return `₦${(num / 1_000_000_000).toFixed(1)}B`; // Billions
        } else if (num >= 1_000_000) {
            return `₦${(num / 1_000_000).toFixed(1)}M`; // Millions
        } else if (num >= 1_000) {
            return `₦${(num / 1_000).toFixed(1)}K`; // Thousands
        } else {
            return `₦${num.toLocaleString()}`; // Below 1k, show full
        }
    }

    try {
        const response = await fetch(`${baseUrl}/compliance-officer/tax-liability-cards`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        document.getElementById("total-liabilities").textContent = formatNaira(result.data.total_tax_liabilities);
        document.getElementById("overdue-amount").textContent = formatNaira(result.data.overdue_tax_liabilities);
        document.getElementById("collected-tax-liailities").textContent = formatNaira(result.data.collected_tax_liabilities);
        document.getElementById("collection-rate").textContent = result.data.collection_rate + "%";

    } catch (error) {
        console.error("Error fetching data:", error);
    }


    try {
        const response = await fetch(`${baseUrl}/compliance-officer/tax_assessments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

    } catch (error) {
        console.error("Error fetching data:", error);
    }


    // await loadTaxAssessments(); 

        try {
        const response = await fetch(`${baseUrl}/compliance-officer/tax_assessments`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();
        const tableBody = document.getElementById("taxTableBody");
        tableBody.innerHTML = "";

        result.data.forEach((item, index) => {
            const modalId = `taxModal${index}`;
            const enforceModalId = `enforceModal${index}`;

            // Status badge colors
            let badgeClass = "bg-warning text-dark";
            if (item.status === "paid") badgeClass = "bg-dark";
            else if (item.status === "overdue") badgeClass = "bg-danger";
            else if (item.status === "unpaid") badgeClass = "bg-secondary";

            tableBody.innerHTML += `
              <tr>
                <td>
                  <div class="fw-semibold">${item.marchant_business_name}</div>
                </td>
                <td>${item.tax_period}</td>
                <td class="text-end">${formatNaira(item.total_taxable_amount)}</td>
                <td class="text-end">${formatNaira(item.total_tax_liability)}</td>
                <td>${item.due_date}</td>
                <td>${item.provider_name}</td>
                <td class="text-center">
                  <span class="badge ${badgeClass} rounded-pill">${item.status}</span>
                </td>
                <td class="text-center">
                  <a href="#" class="text-primary text-decoration-none me-2" data-bs-toggle="modal" data-bs-target="#${modalId}">
                    <i class="fas fa-eye me-1"></i>View Details
                  </a>
                  ${item.status === "overdue" ? `
                  <a href="#" class="text-danger text-decoration-none" data-bs-toggle="modal" data-bs-target="#${enforceModalId}">
                    <i class="fas fa-exclamation-circle me-1"></i>Enforce
                  </a>` : ""}
                </td>
              </tr>

              <!-- View Details Modal -->
              <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Tax Liability Details</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                      <div class="row g-3">
                        <div class="col-md-6"><label class="form-label">Merchant</label><input type="text" class="form-control" value="${item.marchant_business_name}" readonly></div>
                        <div class="col-md-6"><label class="form-label">Period</label><input type="text" class="form-control" value="${item.tax_period}" readonly></div>
                        <div class="col-md-6"><label class="form-label">Revenue</label><input type="text" class="form-control" value="${formatNaira(item.total_taxable_amount)}" readonly></div>
                        <div class="col-md-6"><label class="form-label">Tax Liability</label><input type="text" class="form-control" value="${formatNaira(item.total_tax_liability)}" readonly></div>
                        <div class="col-md-6"><label class="form-label">Due Date</label><input type="text" class="form-control" value="${item.due_date}" readonly></div>
                        <div class="col-md-6"><label class="form-label">Status</label><input type="text" class="form-control" value="${item.status}" readonly></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Enforce Modal -->
              ${item.status === "overdue" ? `
              <div class="modal fade" id="${enforceModalId}" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Enforce Tax Collection</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                      <div class="alert alert-danger d-flex align-items-center" role="alert">
                        <i class="fas fa-exclamation-circle me-2"></i>
                        This payment is overdue (Due: ${item.due_date})
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Enforcement Action</label>
                        <select class="form-select">
                          <option>Send Payment Notice</option>
                          <option>Suspend Account</option>
                          <option>Legal Action</option>
                          <option>Payment Plan</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Notes</label>
                        <textarea class="form-control" rows="3"></textarea>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" class="btn btn-danger">Initiate Enforcement</button>
                    </div>
                  </div>
                </div>
              </div>` : ""}
            `;
        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }
    
});







// async function loadTaxAssessments() {

// }

