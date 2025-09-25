// const HeaderHtml = `<div class="app-header-inner">
//           <button class="app-toggler" type="button" aria-label="app toggler">
//             <span></span>
//             <span></span>
//             <span></span>
//           </button>
//           <div class="app-header-start">
//             <form
//               class="d-none d-md-flex align-items-center h-100 w-lg-250px w-xxl-300px position-relative"
//               action="index.html#"
//             >
//               <button
//                 type="button"
//                 class="btn btn-sm border-0 position-absolute start-0 ms-3 p-0"
//               >
//                 <i class="fi fi-rr-search"></i>
//               </button>
//               <input
//                 type="text"
//                 class="form-control rounded-5 ps-5"
//                 placeholder="Search anything's"
//                 data-bs-toggle="modal"
//                 data-bs-target="#searchResultsModal"
//               />
//             </form>
//           </div>
//           <div class="app-header-end">
//             <div class="px-lg-3 px-2 ps-0 d-flex align-items-center">
//               <div class="dropdown">
//                 <button
//                   class="btn btn-icon btn-action-gray rounded-circle waves-effect waves-light position-relative"
//                   id="ld-theme"
//                   type="button"
//                   data-bs-auto-close="outside"
//                   aria-expanded="false"
//                   data-bs-toggle="dropdown"
//                 >
//                   <i class="fi fi-rr-brightness scale-1x theme-icon-active"></i>
//                 </button>
//                 <ul class="dropdown-menu dropdown-menu-end">
//                   <li>
//                     <button
//                       type="button"
//                       class="dropdown-item d-flex gap-2 align-items-center"
//                       data-bs-theme-value="light"
//                       aria-pressed="false"
//                     >
//                       <i
//                         class="fi fi-rr-brightness scale-1x"
//                         data-theme="light"
//                       ></i>
//                       Light
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       type="button"
//                       class="dropdown-item d-flex gap-2 align-items-center"
//                       data-bs-theme-value="dark"
//                       aria-pressed="false"
//                     >
//                       <i class="fi fi-rr-moon scale-1x" data-theme="dark"></i>
//                       Dark
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       type="button"
//                       class="dropdown-item d-flex gap-2 align-items-center"
//                       data-bs-theme-value="auto"
//                       aria-pressed="true"
//                     >
//                       <i
//                         class="fi fi-br-circle-half-stroke scale-1x"
//                         data-theme="auto"
//                       ></i>
//                       Auto
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <div class="vr my-3"></div>
//             <div
//               class="d-flex align-items-center gap-sm-2 gap-0 px-lg-4 px-sm-2 px-1"
//             >
//               <div class="dropdown text-end">
//                 <button
//                   type="button"
//                   class="btn btn-icon btn-action-gray rounded-circle waves-effect waves-light"
//                   data-bs-toggle="dropdown"
//                   data-bs-auto-close="outside"
//                   aria-expanded="true"
//                 >
//                   <i class="fi fi-rr-bell"></i>
//                 </button>
//                 <div
//                   class="dropdown-menu dropdown-menu-lg-end p-0 w-300px mt-2"
//                 >
//                   <div
//                     class="px-3 py-3 border-bottom d-flex justify-content-between align-items-center"
//                   >
//                     <h6 class="mb-0">
//                       Notifications
//                       <span class="badge badge-sm rounded-pill bg-primary ms-2"
//                         >9</span
//                       >
//                     </h6>
//                     <i class="bi bi-x-lg cursor-pointer"></i>
//                   </div>
//                   <div class="p-2" style="height: 300px" data-simplebar>
//                     <ul
//                       class="list-group list-group-hover list-group-smooth list-group-unlined"
//                     >
//                       <li
//                         class="list-group-item d-flex justify-content-between align-items-center"
//                       >
//                         <div
//                           class="avatar avatar-xs avatar-status-success rounded-circle me-1"
//                         >
//                           <img src="https://www.gravatar.com/avatar/?d=mp&s=200" alt="" />
//                         </div>
//                         <div class="ms-2 me-auto">
//                           <h6 class="mb-0">Emma Smith</h6>
//                           <small class="text-body d-block"
//                             >Need to update the details.</small
//                           >
//                           <small
//                             class="text-muted position-absolute end-0 top-0 mt-2 me-3"
//                             >7 hr ago</small
//                           >
//                         </div>
//                       </li>
//                       <li
//                         class="list-group-item d-flex justify-content-between align-items-center"
//                       >
//                         <div
//                           class="avatar avatar-xs bg-success rounded-circle text-white"
//                         >
//                           D
//                         </div>
//                         <div class="ms-2 me-auto">
//                           <h6 class="mb-0">Design Team</h6>
//                           <small class="text-body d-block"
//                             >Check your shared folder.</small
//                           >
//                           <small
//                             class="text-muted position-absolute end-0 top-0 mt-2 me-3"
//                             >6 hr ago</small
//                           >
//                         </div>
//                       </li>
//                       <li
//                         class="list-group-item d-flex justify-content-between align-items-center"
//                       >
//                         <div
//                           class="avatar avatar-xs bg-dark rounded-circle text-white"
//                         >
//                           <i class="fi fi-rr-lock"></i>
//                         </div>
//                         <div class="ms-2 me-auto">
//                           <h6 class="mb-0">Security Update</h6>
//                           <small class="text-body d-block"
//                             >Password successfully set.</small
//                           >
//                           <small
//                             class="text-muted position-absolute end-0 top-0 mt-2 me-3"
//                             >5 hr ago</small
//                           >
//                         </div>
//                       </li>
//                       <li
//                         class="list-group-item d-flex justify-content-between align-items-center"
//                       >
//                         <div
//                           class="avatar avatar-xs bg-info rounded-circle text-white"
//                         >
//                           <i class="fi fi-rr-shopping-cart"></i>
//                         </div>
//                         <div class="ms-2 me-auto">
//                           <h6 class="mb-0">Invoice #1432</h6>
//                           <small class="text-body d-block"
//                             >has been paid Amount: $899.00</small
//                           >
//                           <small
//                             class="text-muted position-absolute end-0 top-0 mt-2 me-3"
//                             >5 hr ago</small
//                           >
//                         </div>
//                       </li>
//                       <li
//                         class="list-group-item d-flex justify-content-between align-items-center"
//                       >
//                         <div
//                           class="avatar avatar-xs bg-danger rounded-circle text-white"
//                         >
//                           R
//                         </div>
//                         <div class="ms-2 me-auto">
//                           <h6 class="mb-0">Emma Smith</h6>
//                           <small class="text-body d-block"
//                             >added you to Dashboard Analytics</small
//                           >
//                           <small
//                             class="text-muted position-absolute end-0 top-0 mt-2 me-3"
//                             >5 hr ago</small
//                           >
//                         </div>
//                       </li>
//                       <li
//                         class="list-group-item d-flex justify-content-between align-items-center"
//                       >
//                         <div
//                           class="avatar avatar-xs avatar-status-success rounded-circle me-1"
//                         >
//                           <img src="https://www.gravatar.com/avatar/?d=mp&s=200" alt="" />
//                         </div>
//                         <div class="ms-2 me-auto">
//                           <h6 class="mb-0">Olivia Clark</h6>
//                           <small class="text-body d-block"
//                             >You can now view the “Report”.</small
//                           >
//                           <small
//                             class="text-muted position-absolute end-0 top-0 mt-2 me-3"
//                             >4 hr ago</small
//                           >
//                         </div>
//                       </li>
//                       <li
//                         class="list-group-item d-flex justify-content-between align-items-center"
//                       >
//                         <div
//                           class="avatar avatar-xs avatar-status-danger rounded-circle me-1"
//                         >
//                           <img src="https://www.gravatar.com/avatar/?d=mp&s=200" alt="" />
//                         </div>
//                         <div class="ms-2 me-auto">
//                           <h6 class="mb-0">Isabella Walker</h6>
//                           <small class="text-body d-block"
//                             >@Isabella please review.</small
//                           >
//                           <small
//                             class="text-muted position-absolute end-0 top-0 mt-2 me-3"
//                             >2 hr ago</small
//                           >
//                         </div>
//                       </li>
//                     </ul>
//                   </div>
//                   <div class="p-2">
//                     <a
//                       href="javascript:void(0);"
//                       class="btn w-100 btn-primary waves-effect waves-light"
//                       >View all notifications</a
//                     >
//                   </div>
//                 </div>
//               </div>
//               <a
//                 href="calendar.html"
//                 class="btn btn-icon btn-action-gray rounded-circle waves-effect waves-light"
//               >
//                 <i class="fi fi-rr-calendar"></i>
//               </a>
//             </div>
//             <div class="vr my-3"></div>
//             <div class="dropdown text-end ms-sm-3 ms-2 ms-lg-4">
//               <a
//                 href="index.html#"
//                 class="d-flex align-items-center py-2"
//                 data-bs-toggle="dropdown"
//                 data-bs-auto-close="outside"
//                 aria-expanded="true"
//               >
//                 <div class="text-end me-2 d-none d-lg-inline-block">
//                   <div class="fw-bold text-dark">siaa.o</div>
//                   <small class="text-body d-block lh-sm">
//                     <i class="fi fi-rr-angle-down text-3xs me-1"></i> marchant
//                   </small>
//                 </div>
//                 <div
//                   class="avatar avatar-sm rounded-circle avatar-status-success"
//                 >
//                   <img src="https://www.gravatar.com/avatar/?d=mp&s=200" alt="" />
//                 </div>
//               </a>
//               <ul class="dropdown-menu dropdown-menu-end w-225px mt-1">
//                 <li class="d-flex align-items-center p-2">
//                   <div class="avatar avatar-sm rounded-circle">
//                     <img src="https://www.gravatar.com/avatar/?d=mp&s=200" alt="" />
//                   </div>
//                   <div class="ms-2">
//                     <div class="fw-bold text-dark" id="username"></div>
//                     <small class="text-body d-block lh-sm" id="email"
//                       ></small
//                     >
//                   </div>
//                 </li>
//                 <li>
//                   <div class="dropdown-divider my-1"></div>
//                 </li>
              
               
               
              
//                 <li>
//                   <div class="dropdown-divider my-1"></div>
//                 </li>
//                 <li>
//                   <a
//                     class="dropdown-item d-flex align-items-center gap-2 text-danger"
//                     href="login.html"
//                   >
//                     <i class="fi fi-sr-exit scale-1x"></i> Log Out
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>`;
// document.getElementById("header").innerHTML = HeaderHtml;

// const sidebarHtml = `<aside class="app-menubar" id="menubar">
//          <div class="app-navbar-brand">
//           <a class="navbar-brand-logo" href="#">
//             <img src="assets/images/logo.png" alt=" Dashboard Logo"  />
//           </a>
//           <a class="navbar-brand-mini visible-light" href="#">
//             <img
//               src="assets/images/logo-text.png"
//               alt="Dashboard Logo"
//             />
//           </a>
//         </div>
//         <nav class="app-navbar" data-simplebar>
//           <ul class="menubar">
//             <li class="menu-item ">
//               <a class="menu-link" href="dashboard.html">
//                 <i class="fi fi-rr-apps"></i>
//                 <span class="menu-label">Dashboard</span>
//               </a>
              
//             </li>
            
//             <li class="menu-item">
//               <a class="menu-link" href="monitor.html">
//                 <i class="fas fa-database"></i>
//                 <span class="menu-label">Ingestion Monitor</span>
//               </a>
//             </li>
//             <li class="menu-item">
//               <a class="menu-link" href="Merchant.html">
//                 <i class="fas fa-exchange-alt"></i>

//                 <span class="menu-label">Transaction Hub</span>
//               </a>
//             </li>
//             <li class="menu-item">
//               <a class="menu-link" href="tax-alert2.html">
//                 <i class="fas fa-cog"></i>
//                 <span class="menu-label">Integration Status</span>
//               </a>
//             </li>
//           </ul>
//         </nav>
//         <div class="app-footer">
//           <a
//             href="javascript:void(0)"
//             class="btn btn-outline-light waves-effect btn-shadow btn-app-nav w-100"
//           >
//             <i class="fi fi-rs-interrogation text-primary"></i>
//             <span class="nav-text">Help and Support</span>
//           </a>
//         </div>
//       </aside>`;
// document.getElementById("sidebsr").innerHTML = sidebarHtml;

// function handleLogout(e) {
//   e.preventDefault();
//   localStorage.clear();
//   sessionStorage.clear();
//   window.location.href = "login.html";
// }

// document.getElementById("logoutBtn").addEventListener("click", handleLogout);
// document
//   .getElementById("sidebarLogout")
//   .addEventListener("click", handleLogout);

// const baseUrl = "https://arafatfootballacademy.com/fusion/backend";


// async function loadUser() {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     console.log("No token found, redirecting to login.");
//     window.location.replace("login.html");
//     return;
//   }

//   try {
//     const userRes = await axios.get(`${baseUrl}/profile`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//    const user = userRes.data.data;
//    console.log(userRes);
//     localStorage.setItem("user", JSON.stringify(user));

//     if (document.getElementById("username")) {
//       document.getElementById("username").textContent = user.name;
//     }
//     if (document.getElementById("email")) {
//       document.getElementById("email").textContent = user.email;
//     }

//     if (document.getElementById("username1")) {
//       document.getElementById("username1").textContent = user.name;
//     }
//   } catch (err) {
//     console.error("Token expired", err);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   }
// }

// document.addEventListener("DOMContentLoaded", loadUser);


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
            <li class="menu-item ">
              <a class="menu-link" href="dashboard.html">
                <i class="fi fi-rr-apps"></i>
                <span class="menu-label">Dashboard</span>
              </a>
              
            </li>
            
            <li class="menu-item">
              <a class="menu-link" href="monitor.html">
                <i class="fas fa-database"></i>
                <span class="menu-label">Ingestion Monitor</span>
              </a>
            </li>
             <li class="menu-item">
              <a class="menu-link" href="tax.html">
                <i class="fi fi-rr-tax"></i>
                <span class="menu-label">Tax Assessments</span>
              </a>
            </li>
            <li class="menu-item">
              <a class="menu-link" href="Merchant.html">
                <i class="fas fa-users"></i>

                <span class="menu-label">Merchants</span>
              </a>
            </li>
            <li class="menu-item">
              <a class="menu-link" href="transactions_hub.html">
                <i class="fas fa-exchange-alt"></i>

                <span class="menu-label">Transactions Hub</span>
              </a>
            </li>
            <li class="menu-item">
              <a class="menu-link" href="transaction_integration.html">
                <i class="fas fa-cog"></i>
                <span class="menu-label">Integration Status</span>
              </a>
            </li>
          </ul>
        </nav>
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
      document.getElementById("username").textContent = user.agent_name;
    }
    if (document.getElementById("email")) {
      document.getElementById("email").textContent = user.agent_email;
    }

    if (document.getElementById("username1")) {
      document.getElementById("username1").textContent = user.agent_name;
    }
  } catch (err) {
    console.error("Token expired", err);
    localStorage.removeItem("user");
  }
}

document.addEventListener("DOMContentLoaded", loadUser);

