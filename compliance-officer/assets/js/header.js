
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
        <li class="menu-item"><a class="menu-link" href="PTSP.html"><i class="fi fi-rr-map"></i><span class="menu-label">PTSP</span></a></li>
        <li class="menu-item"><a class="menu-link" href="tax-liability.html"><i class="fi fi-rr-shield-check"></i><span class="menu-label">Tax Liability</span></a></li>
        <li class="menu-item"><a class="menu-link" href="audit.html"><i class="fi fi-rr-chart-histogram"></i><span class="menu-label">Audit Trail</span></a></li>
        <li class="menu-item"><a class="menu-link" href="compliance-alert.html"><i class="fi fi-rr-clipboard-list"></i><span class="menu-label">Compliance Alert</span></a></li>
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

document.getElementById("username1").textContent = localStorage.getItem("name");
document.getElementById("username").textContent = localStorage.getItem("name");
document.getElementById("email").textContent = localStorage.getItem("email");

const roleEl = document.getElementById("role");
const roleText = localStorage.getItem("role_name");

// Clear old role text but keep the <i> icon
roleEl.innerHTML = `<i class="fi fi-rr-angle-down text-3xs me-1"></i> ${roleText}`;


document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.querySelector(".dropdown-item.text-danger");

  logoutLink.addEventListener("click", (e) => {
    e.preventDefault(); // prevent default link behavior

    // Clear storage
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to login
    window.location.href = "login.html";
  });
});
