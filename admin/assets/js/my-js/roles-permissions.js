
document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        // No login token, redirect to login
        window.location.href = "login.html";
    }

    // try {
    //     const response = await fetch(`${baseUrl}/users/admin/count`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         }
    //     });
    //     if (!response.ok) throw new Error("Network response was not ok");

    //     const result = await response.json();

    //     const text = result.data.count > 1 ? "users" : "user";

    //     document.getElementById("admin-users-count").textContent = result.data.count + " " + text;

    // } catch (error) {
    //     console.error("Error fetching data:", error);
    // }

    // try {
    //     const response = await fetch(`${baseUrl}/users/executive/count`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         }
    //     });
    //     if (!response.ok) throw new Error("Network response was not ok");

    //     const result = await response.json();

    //     const text = result.data.count > 1 ? "users" : "user";

    //     document.getElementById("executive-ussers-count").textContent = result.data.count + " " + text;

    // } catch (error) {
    //     console.error("Error fetching data:", error);
    // }

    // try {
    //     const response = await fetch(`${baseUrl}/users/ptsp_pssp/count`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         }
    //     });
    //     if (!response.ok) throw new Error("Network response was not ok");

    //     const result = await response.json();

    //     const text = result.data.count > 1 ? "users" : "user";

    //     document.getElementById("ptsp-pssp-users-count").textContent = result.data.count + " " + text;

    // } catch (error) {
    //     console.error("Error fetching data:", error);
    // }

    // try {
    //     const response = await fetch(`${baseUrl}/users/marchant/count`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         }
    //     });
    //     if (!response.ok) throw new Error("Network response was not ok");

    //     const result = await response.json();

    //     const text = result.data.count > 1 ? "users" : "user";

    //     document.getElementById("marchant-users-count").textContent = result.data.count + " " + text;

    // } catch (error) {
    //     console.error("Error fetching data:", error);
    // }

    // try {
    //     const response = await fetch(`${baseUrl}/users/marchant/count`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         }
    //     });
    //     if (!response.ok) throw new Error("Network response was not ok");

    //     const result = await response.json();

    //     const text = result.data.count > 1 ? "users" : "user";

    //     document.getElementById("compliance-officer-count").textContent = result.data.count + " " + text;

    // } catch (error) {
    //     console.error("Error fetching data:", error);
    // }


    try {
        const response = await fetch(`${baseUrl}/permissions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();
      const container = document.getElementById("permissionsContainer");

      result.data.forEach(category => {
        // Create category wrapper
        const col = document.createElement("div");
        col.className = "col-md-6";

        col.innerHTML = `
          <div class="border rounded p-3">
            <h6 class="fw-semibold">
              ${category.category_name}
              <span class="text-muted">(0/${category.permissions.length})</span>
            </h6>
            <div id="perm-${category.category_id}"></div>
          </div>
        `;

        container.appendChild(col);

        // Insert permissions into the category
        const permContainer = col.querySelector(`#perm-${category.category_id}`);

        category.permissions.forEach(perm => {
          const wrapper = document.createElement("div");
          wrapper.className = "form-check mb-2";
          wrapper.innerHTML = `
            <input class="form-check-input" type="checkbox" id="perm-${perm.permission_id}" value="${perm.permission_id}">
            <label class="form-check-label ms-2" for="perm-${perm.permission_id}">
              ${perm.name.replace(/_/g, " ")}
            </label>
            <div class="small text-muted ms-4">${perm.description}</div>
          `;
          permContainer.appendChild(wrapper);
        });
      });
    } catch (error) {
      
    }

});



document.getElementById("create-role-btn").addEventListener("click", async (e) => {
  e.preventDefault();

  const roleName = document.getElementById("roleName").value.trim();
  const description = document.querySelector("textarea").value.trim();

  const checked = document.querySelectorAll("input[type=checkbox]:checked");
  const permissions = Array.from(checked)
  .map(cb => cb.value)
  .filter(v => v !== "on" && !isNaN(v));
// const permissions = Array.from(checked).map(cb => cb.value); // collect permission_id values

  const payload = {
    role_name: roleName,
    description: description,
    permissions: permissions
  };

  console.log("Payload to send:", payload);

  try {
    const response = await fetch(`${baseUrl}/roles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error("Network response was not ok");

    const result = await response.json();
    alert(result.message);
    window.location.reload();
    // console.log("Role created successfully:", result);
  } catch (error) {
    console.error("Error creating role:", error);
  }


});



