document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        // No login token, redirect to login
        window.location.href = "login.html";
    }

    try {
        const response = await fetch(`${baseUrl}/compliance-officer/ptsp-cards`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();

        document.getElementById("alicensed-ptsp").textContent = result.data.licensed_ptsps;
        document.getElementById("active-ptsp").textContent = result.data.active_ptsps;
        document.getElementById("compliance-review").textContent = result.data.under_review_ptsps;
        document.getElementById("suspended").textContent = result.data.suspended_ptsps;
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    try {
        const response = await fetch(`${baseUrl}/compliance-officer/providers`, {
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

        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }

    await loadProviders();

    // try {
    //     const response = await fetch(`${baseUrl}/compliance-officer/providers`, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //     }
    //     });

    //     if (!response.ok) throw new Error("Network response was not ok");

    //     const result = await response.json();
    //     const container = document.querySelector("tbody"); // target the table body

    //     container.innerHTML = ""; // clear old rows

    //     result.data.forEach(provider => {
    //     const row = document.createElement("tr");

    //     row.innerHTML = `
    //         <td class="text-nowrap">
    //         <div class="fw-semibold">${provider.provider_name}</div>
    //         <small class="text-muted">PTSP${provider.id.toString().padStart(3, "0")}</small>
    //         </td>
    //         <td>
    //         <div><small class="text-muted">License:</small> <strong>${provider.license_number ?? "N/A"}</strong></div>
    //         <div><small class="text-muted">Expires:</small> ${provider.license_expiry_date ?? "N/A"}</div>
    //         <div><small class="text-muted">Issued:</small> ${provider.license_issue_date ?? "N/A"}</div>
    //         </td>
    //         <td>
    //         <div class="small">${provider.provider_email}</div>
    //         <div><small class="text-muted">${provider.agent_email ?? ""}</small></div>
    //         </td>
    //         <td class="text-center">
    //         <span class="badge bg-dark rounded-pill d-block mb-1">${provider.status}</span>
    //         <span class="badge ${provider.license_status === "active" ? "bg-success" : provider.license_status === "expired" ? "bg-danger" : "bg-warning"} rounded-pill d-block">
    //             ${provider.license_status}
    //         </span>
    //         </td>
    //         <td class="text-center">
    //         <div class="fw-bold ${provider.compliance_rate >= 80 ? "text-success" : "text-warning"} mb-1">${provider.compliance_rate}%</div>
    //         <div class="progress mx-auto" style="height: 6px; width: 80px;">
    //             <div class="progress-bar ${provider.compliance_rate >= 80 ? "bg-success" : "bg-warning"}" style="width: ${provider.compliance_rate}%"></div>
    //         </div>
    //         </td>
    //         <td class="text-end">
    //         <div class="fw-semibold">₦${Number(provider.transaction_volume_this_month).toLocaleString()}</div>
    //         <small class="text-muted d-block">Monthly</small>
    //         </td>
    //         <td class="text-end">
    //         <div class="fw-semibold text-success">₦${Number(provider.tax_liability_this_month).toLocaleString()}</div>
    //         <small class="text-muted d-block">This period</small>
    //         </td>
    //         <td class="text-center">
    //         <div class="fw-semibold">${provider.marchant_count}</div>
    //         <small class="text-muted d-block">merchants</small>
    //         </td>
    //         <td class="text-center">
    //         <div class="d-flex gap-1 justify-content-center flex-nowrap">
    //             <button class="btn btn-sm btn-outline-primary" title="View Details">
    //             <i class="fas fa-eye"></i>
    //             </button>
    //             <button class="btn btn-sm btn-outline-secondary" title="Audit">
    //             <i class="fas fa-clipboard-check"></i>
    //             </button>
    //             <button class="btn btn-sm btn-outline-warning" title="Investigate">
    //             <i class="fas fa-search"></i>
    //             </button>
    //         </div>
    //         </td>
    //     `;

    //     container.appendChild(row);
    //     });

    // } catch (error) {
    //     console.error("Error fetching data:", error);
    // }


});









// small helpers
const escapeHtml = (unsafe) =>
  String(unsafe ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const formatCurrency = (v) => {
  const n = Number(v || 0);
  return '₦' + n.toLocaleString('en-NG', {maximumFractionDigits: 0});
};

const formatCurrencyDecimal = (v) => {
  const n = Number(v || 0);
  return '₦' + n.toLocaleString('en-NG', {minimumFractionDigits:2, maximumFractionDigits:2});
};

// remove previously created provider modals (useful on hot reload)
function removeProviderModals() {
  document.querySelectorAll('.provider-modal').forEach(el => el.remove());
}

// build and append a View Details modal for a provider
function buildViewModal(provider) {
  const id = `viewModal-${provider.id}`;
  const modal = document.createElement('div');
  modal.className = 'modal fade provider-modal';
  modal.id = id;
  modal.tabIndex = -1;
  modal.setAttribute('aria-labelledby', `${id}-label`);
  modal.innerHTML = `
  <div class="modal-dialog modal-normalsm">
    <div class="modal-content">
      <div class="modal-header border-0 pb-0">
        <div>
          <h5 class="modal-title fw-bold" id="${id}-label">${escapeHtml(provider.provider_name)} — Details</h5>
          <p class="text-muted small mb-0">Managing ${escapeHtml(provider.provider_name)} - ${escapeHtml(provider.license_number || 'N/A')}</p>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body pt-3">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label fw-semibold small">PTSP Name</label>
            <input type="text" class="form-control" value="${escapeHtml(provider.provider_name)}" readonly>
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold small">License Number</label>
            <input type="text" class="form-control bg-light" value="${escapeHtml(provider.license_number || 'N/A')}" readonly>
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Email</label>
            <input type="email" class="form-control" value="${escapeHtml(provider.provider_email)}" readonly>
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Agent Email</label>
            <input type="text" class="form-control" value="${escapeHtml(provider.agent_email || '')}" readonly>
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Current Status</label>
            <input type="text" class="form-control bg-light" value="${escapeHtml(provider.status)}" readonly>
          </div>
          <div class="col-md-6">
            <label class="form-label fw-semibold small">Compliance Score</label>
            <input type="text" class="form-control bg-light" value="${escapeHtml(String(provider.compliance_rate || '0'))}%" readonly>
          </div>
        </div>
      </div>
      <div class="modal-footer border-0">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

// build and append an Audit modal for a provider
function buildAuditModal(provider) {
  const id = `auditModal-${provider.id}`;
  const modal = document.createElement('div');
  modal.className = 'modal fade provider-modal';
  modal.id = id;
  modal.tabIndex = -1;
  modal.setAttribute('aria-labelledby', `${id}-label`);
  modal.innerHTML = `
  <div class="modal-dialog modal-normalsm">
    <div class="modal-content">
      <div class="modal-header">
        <div class="text-start">
          <h5 class="modal-title fw-semibold" id="${id}-label">Audit PTSP</h5>
          <p class="text-muted small mb-0">Managing ${escapeHtml(provider.provider_name)} - ${escapeHtml(provider.license_number || 'N/A')}</p>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="auditForm-${provider.id}">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label fw-semibold small">PTSP Name</label>
              <input type="text" class="form-control" id="audit_ptspName_${provider.id}" value="${escapeHtml(provider.provider_name)}" readonly>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-semibold small">License Number</label>
              <input type="text" class="form-control bg-light" id="audit_license_${provider.id}" value="${escapeHtml(provider.license_number || 'N/A')}" readonly>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-semibold small">Email</label>
              <input type="email" class="form-control bg-light" id="audit_email_${provider.id}" value="${escapeHtml(provider.provider_email)}" readonly>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-semibold small">Phone</label>
              <input type="text" class="form-control bg-light" id="audit_phone_${provider.id}" value="${escapeHtml(provider.agent_phone || '')}" readonly>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-semibold small">Current Status</label>
              <input type="text" class="form-control bg-light" id="audit_status_${provider.id}" value="${escapeHtml(provider.status)}" readonly>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-semibold small">Compliance Score</label>
              <input type="text" class="form-control bg-light" id="audit_score_${provider.id}" value="${escapeHtml(String(provider.compliance_rate || '0'))}%" readonly>
            </div>
            <div class="col-12">
              <label class="form-label fw-semibold small">Action Notes</label>
              <textarea class="form-control" id="audit_notes_${provider.id}" rows="3" placeholder="Enter notes for verify action..."></textarea>
            </div>
            <div class="col-12">
              <label class="form-label fw-semibold small">Audit Status</label>
              <select class="form-select" id="audit_select_${provider.id}">
                <option value="Compliant">Compliant</option>
                <option value="Non-Compliant">Non-Compliant</option>
                <option value="Pending Review" selected>Pending Review</option>
                <option value="Under Investigation">Under Investigation</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-dark" id="completeAuditBtn-${provider.id}">Complete Audit</button>
      </div>
    </div>
  </div>
  `;
  document.body.appendChild(modal);

  // attach completeAudit handler for this provider's button
  modal.querySelector(`#completeAuditBtn-${provider.id}`).addEventListener('click', async () => {
    const notes = document.getElementById(`audit_notes_${provider.id}`).value;
    const auditStatus = document.getElementById(`audit_select_${provider.id}`).value;

    // Example POST - adjust endpoint to your actual API
    try {
      const res = await fetch(`${baseUrl}/compliance-officer/providers/${provider.id}/audit`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ audit_status: auditStatus, notes })
      });
      const json = await res.json().catch(()=>({ status: 'error' }));
      if (res.ok && json.status !== 'error') {
        // close modal & optionally refresh table
        new bootstrap.Modal(modal).hide();
        // show a simple success UI - you can replace with toast
        alert('Audit completed successfully');
        await loadProviders()(); // refresh the table
      } else {
        alert('Audit submission failed');
        console.error('Audit response', json);
      }
    } catch (err) {
      console.error('Audit request failed', err);
      alert('Failed to submit audit (network error).');
    }
  });

  return modal;
}

// build and append Investigate modal
function buildInvestigateModal(provider) {
  const id = `investigateModal-${provider.id}`;
  const modal = document.createElement('div');
  modal.className = 'modal fade provider-modal';
  modal.id = id;
  modal.tabIndex = -1;
  modal.setAttribute('aria-labelledby', `${id}-label`);
  modal.innerHTML = `
  <div class="modal-dialog modal-normalsm">
    <div class="modal-content">
      <div class="modal-header">
        <div>
          <h5 class="modal-title fw-semibold" id="${id}-label">Investigate PTSP</h5>
          <p class="text-muted small mb-0">Managing ${escapeHtml(provider.provider_name)} - ${escapeHtml(provider.license_number || 'N/A')}</p>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="investigateForm-${provider.id}">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label fw-semibold">PTSP Name</label>
              <input type="text" class="form-control" value="${escapeHtml(provider.provider_name)}" readonly>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-semibold">License Number</label>
              <input type="text" class="form-control bg-light" value="${escapeHtml(provider.license_number || 'N/A')}" readonly>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-semibold">Email</label>
              <input type="email" class="form-control bg-light" value="${escapeHtml(provider.provider_email)}" readonly>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-semibold">Phone</label>
              <input type="text" class="form-control bg-light" value="${escapeHtml(provider.agent_phone || '')}" readonly>
            </div>
            <div class="col-12">
              <label class="form-label fw-semibold">Action Notes</label>
              <textarea class="form-control" id="investigate_notes_${provider.id}" rows="3" placeholder="Describe investigation details..."></textarea>
            </div>
            <div class="col-12">
              <label class="form-label fw-semibold">Investigation Priority</label>
              <select class="form-select" id="investigate_priority_${provider.id}">
                <option value="Low">Low</option>
                <option value="Medium" selected>Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-dark" id="startInvestigationBtn-${provider.id}">Start Investigation</button>
      </div>
    </div>
  </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector(`#startInvestigationBtn-${provider.id}`).addEventListener('click', async () => {
    const notes = document.getElementById(`investigate_notes_${provider.id}`).value;
    const priority = document.getElementById(`investigate_priority_${provider.id}`).value;
    try {
      const res = await fetch(`${baseUrl}/compliance-officer/providers/${provider.id}/investigate`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ notes, priority })
      });
      const json = await res.json().catch(()=>({ status: 'error' }));
      if (res.ok && json.status !== 'error') {
        new bootstrap.Modal(modal).hide();
        alert('Investigation started');
        loadProviders();
      } else {
        alert('Failed to start investigation');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while starting investigation');
    }
  });

  return modal;
}

// main loader: fetch providers, render rows and build modals
async function loadProviders() {
  try {
    const response = await fetch(`${baseUrl}/compliance-officer/providers`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const result = await response.json();

    // target the first table body on page (change selector if multiple tables exist)
    const container = document.querySelector('table.table tbody');
    if (!container) throw new Error('Table body not found on page');

    // clear previous rows and modals
    container.innerHTML = "";
    removeProviderModals();

    result.data.forEach(provider => {
      // ensure numeric values
      const complianceNumeric = Number(provider.compliance_rate) || 0;
      const transVol = provider.transaction_volume_this_month || provider.transaction_volume || 0;
      const taxThis = provider.tax_liability_this_month || 0;

      // create row
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="text-nowrap">
          <div class="fw-semibold">${escapeHtml(provider.provider_name)}</div>
          <small class="text-muted">PTSP${String(provider.id).padStart(3,'0')}</small>
        </td>
        <td>
          <div><small class="text-muted">License:</small> <strong>${escapeHtml(provider.license_number ?? 'N/A')}</strong></div>
          <div><small class="text-muted">Expires:</small> ${escapeHtml(provider.license_expiry_date ?? 'N/A')}</div>
          <div><small class="text-muted">Issued:</small> ${escapeHtml(provider.license_issue_date ?? 'N/A')}</div>
        </td>
        <td>
          <div class="small">${escapeHtml(provider.provider_email)}</div>
          <div><small class="text-muted">${escapeHtml(provider.agent_email ?? '')}</small></div>
        </td>
        <td class="text-center">
          <span class="badge bg-dark rounded-pill d-block mb-1">${escapeHtml(provider.status)}</span>
          </span>
        </td>
        <td class="text-center">
          <div class="fw-bold ${complianceNumeric >= 80 ? 'text-success' : complianceNumeric >= 50 ? 'text-warning' : 'text-danger'} mb-1">
            ${escapeHtml(String(complianceNumeric))}%
          </div>
          <div class="progress mx-auto" style="height: 6px; width: 80px;">
            <div class="progress-bar ${complianceNumeric >= 80 ? 'bg-success' : complianceNumeric >= 50 ? 'bg-warning' : 'bg-danger'}" style="width: ${Math.min(Math.max(complianceNumeric,0),100)}%"></div>
          </div>
        </td>
        <td class="text-end">
          <div class="fw-semibold">${formatCurrency(transVol)}</div>
          <small class="text-muted d-block">Monthly</small>
        </td>
        <td class="text-end">
          <div class="fw-semibold text-success">${formatCurrencyDecimal(taxThis)}</div>
          <small class="text-muted d-block">This period</small>
        </td>
        <td class="text-center">
          <div class="fw-semibold">${Number(provider.marchant_count || 0).toLocaleString()}</div>
          <small class="text-muted d-block">merchants</small>
        </td>
        <td class="text-center">
          <div class="d-flex gap-1 justify-content-center flex-nowrap">
            <button class="btn btn-sm btn-outline-primary btn-view" title="View Details" data-provider-id="${provider.id}">
              <i class="fas fa-eye"></i>
            </button>
            <button class="btn btn-sm btn-outline-secondary btn-audit" title="Audit" data-provider-id="${provider.id}">
              <i class="fas fa-clipboard-check"></i>
            </button>
            <button class="btn btn-sm btn-outline-warning btn-investigate" title="Investigate" data-provider-id="${provider.id}">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </td>
      `;

      container.appendChild(tr);

      // create and append modals for this provider
      const viewModalEl = buildViewModal(provider);
      const auditModalEl = buildAuditModal(provider);
      const investigateModalEl = buildInvestigateModal(provider);

      // attach click handlers to the buttons in the row
      tr.querySelector('.btn-view').addEventListener('click', () => {
        new bootstrap.Modal(viewModalEl).show();
      });
      tr.querySelector('.btn-audit').addEventListener('click', () => {
        new bootstrap.Modal(auditModalEl).show();
      });
      tr.querySelector('.btn-investigate').addEventListener('click', () => {
        new bootstrap.Modal(investigateModalEl).show();
      });
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// // call loader on DOM ready
// document.addEventListener('DOMContentLoaded', loadProviders);

        //   <span class="badge ${provider.license_status === 'active' ? 'bg-success' : provider.license_status === 'expired' ? 'bg-danger' : 'bg-warning'} rounded-pill d-block">
        //     ${escapeHtml(provider.license_status ?? 'N/A')}