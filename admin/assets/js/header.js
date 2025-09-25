// const baseUrl = "http://localhost:8080/fusion/backend";
const baseUrl = "https://arafatfootballacademy.com/fusion/backend";

const HeaderHtml = `<div class="app-header-inner">
  <button class="app-toggler" type="button" aria-label="app toggler">
    <span></span>
    <span></span>
    <span></span>
  </button>
  
  <div class="app-header-end">
    <div class="px-lg-3 px-2 ps-0 d-flex align-items-center"></div>
    <div class="vr my-3"></div>
    <div class="dropdown text-end ms-sm-3 ms-2 ms-lg-4">
      <a
        href="#"
        class="d-flex align-items-center py-2"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
      >
        <div class="text-end me-2 d-none d-lg-inline-block">
          <div class="fw-bold text-dark" id="username"></div>
          <small class="text-body d-block lh-sm" id="role">
            <i class="fi fi-rr-angle-down text-3xs me-1"></i>
          </small>
        </div>
        <div class="avatar avatar-sm rounded-circle avatar-status-success">
          <img src="https://www.gravatar.com/avatar/?d=mp&s=200" alt="" />
        </div>
      </a>
      <ul class="dropdown-menu dropdown-menu-end w-225px mt-1">
        <li class="d-flex align-items-center p-2">
          <div class="avatar avatar-sm rounded-circle">
            <img src="https://www.gravatar.com/avatar/?d=mp&s=200" alt="" />
          </div>
          <div class="ms-2">
            <div class="fw-bold text-dark" id="username1"></div>
            <small class="text-body d-block lh-sm" id="email"></small>
          </div>
        </li>
        <li><div class="dropdown-divider my-1"></div></li>
        <li>
          <button class="dropdown-item d-flex align-items-center gap-2 text-danger" id="logoutBtn">
            <i class="fi fi-sr-exit scale-1x"></i> Log Out
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>`;

document.getElementById("header").innerHTML = HeaderHtml;

const sidebarHtml = `<aside class="app-menubar" id="menubar">
  <div class="app-navbar-brand">
          <a class="navbar-brand-logo" href="#">
            <img src="assets/images/logo.png" alt="GXON Admin Dashboard Logo"  />
          </a>
          <a class="navbar-brand-mini visible-light" href="#">
            <img
              src="assets/images/logo-text.png"
              alt="Admin Dashboard Logo"
            />
          </a>
        </div>
  <nav class="app-navbar" data-simplebar>
    <ul class="menubar">
      <li class="menu-item"><a class="menu-link" href="dashboard.html"><i class="fi fi-rr-apps"></i><span class="menu-label">Dashboard</span></a></li>
      <li class="menu-item"><a class="menu-link" href="user.html"><i class="fi fi-rr-users"></i><span class="menu-label">User management</span></a></li>
      <li class="menu-item"><a class="menu-link" href="roles.html"><i class="fi fi-rr-shield-keyhole"></i><span class="menu-label">Role & Access Control</span></a></li>
      <li class="menu-item"><a class="menu-link" href="PTSP.html"><i class="fi fi-rr-user-add"></i><span class="menu-label">PTSP Management</span></a></li>
      <li class="menu-item"><a class="menu-link" href="data.html"><i class="fi fi-rr-database"></i><span class="menu-label">Data Ingestion Monitor</span></a></li>
      <li class="menu-item"><a class="menu-link" href="transactions.html"><i class="fi fi-rr-time-past"></i><span class="menu-label">Transactions Hub</span></a></li>
      <li class="menu-item"><a class="menu-link" href="tax_assesments.html"><i class="fi fi-rr-file-invoice-dollar"></i><span class="menu-label">Tax Assesments</span></a></li>
      <li class="menu-item"><a class="menu-link" href="audit.html"><i class="fi fi-rr-time-past"></i><span class="menu-label">Audit Log</span></a></li>
      <li class="menu-item"><a class="menu-link" href="taxconfig.html"><i class="fi fi-rr-file-invoice-dollar"></i><span class="menu-label">Tax Configuration</span></a></li>
    </ul>
  </nav>
  <div class="app-footer">
    <a href="javascript:void(0)" class="btn btn-outline-light waves-effect btn-shadow btn-app-nav w-100" id="footerLogout">
      <i class="fi fi-rr-sign-out text-danger"></i>
      <span class="nav-text">Sign Out</span>
    </a>
  </div>
</aside>`;

document.getElementById("sidebsr").innerHTML = sidebarHtml;

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const footerLogout = document.getElementById("footerLogout");

  function handleLogout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "login.html";
  }

  logoutBtn.addEventListener("click", handleLogout);
  footerLogout.addEventListener("click", handleLogout);
});

async function loadUser() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No token found, redirecting to login.");
    window.location.replace("login.html");
    return;
  }

  try {
    const userRes = await axios.get(`${baseUrl}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = userRes.data.data;

    localStorage.setItem("user", JSON.stringify(user));

    if (document.getElementById("username")) {
      document.getElementById("username").textContent = user.name;
    }
    if (document.getElementById("email")) {
      document.getElementById("email").textContent = user.email;
    }

    if (document.getElementById("username1")) {
      document.getElementById("username1").textContent = user.name;
    }
  } catch (err) {
    console.error("Token expired", err);
    localStorage.removeItem("user");
  }
}

document.addEventListener("DOMContentLoaded", loadUser);
