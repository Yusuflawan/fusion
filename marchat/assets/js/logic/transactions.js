// const baseUrl = "https://arafatfootballacademy.com/fusion/backend";
const user_id = JSON.parse(localStorage.getItem("default_account"));
const transaction_id = user_id.marchant_number;
const tbody = document.querySelector("#tbody");

// console.log("here",user_id);

async function loadTransactions() {
  try {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="text-center text-muted">Loading...</td>
      </tr>
    `;

    const response = await axios.get(
      `${baseUrl}/marchant/${transaction_id}/transactions`
    );
    const transactions = response.data.data;

    // console.log(transactions);

    tbody.innerHTML = "";

    if (!transactions || transactions.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" class="text-center text-muted">No transactions found</td>
        </tr>
      `;
      return;
    }

    transactions.forEach((txn) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          ${txn?.created_at ? txn.created_at.split(" ")[0] : ""}<br />
          <small class="text-muted">
            ${txn?.created_at ? txn.created_at.split(" ")[1] : ""}
          </small>
        </td>
        <td>${txn.payment_reference}</td>
        <td>₦${Number(txn.amount).toLocaleString()}</td>
        <td>${txn.terminal_number}</td>
        <td>${txn.transaction_type}</td>
        <td>${txn.location || "-"}</td>
        <td>${txn.issuing_bank || "-"}</td>
        <td>${txn.wht || "-"}</td>
        <td>₦${Number(txn.commission || 0).toLocaleString()}</td>
        <td>${txn.ptsp_charge || "-"}</td>
        <td>
          <span class="badge ${
            txn.status.toLowerCase() === "success"
              ? "bg-success"
              : txn.status.toLowerCase() === "failed"
              ? "bg-danger"
              : "bg-warning text-dark"
          }">
            ${txn.status}
          </span>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading transactions:", error);
    tbody.innerHTML = `
      <tr>
        <td colspan="9" class="text-center text-danger">
          Failed to load transactions
        </td>
      </tr>
    `;
  }
}

loadTransactions();
