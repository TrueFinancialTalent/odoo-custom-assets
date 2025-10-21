// Scroll blur effect for navbar
window.addEventListener("scroll", function () {
    const navbar = document.querySelector("#custom-navbar");
    if (navbar) {
      if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });
  
  // Mobile menu toggle
  function toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu) {
      mobileMenu.classList.toggle("active");
    }
  }
  
  // DOM ready logic
  document.addEventListener("DOMContentLoaded", function () {
    // Close mobile menu when clicking a nav link
    document.querySelectorAll(".mobile-menu .nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        const mobileMenu = document.getElementById("mobileMenu");
        if (mobileMenu) {
          mobileMenu.classList.remove("active");
        }
      });
    });
  });

  // ChatGPT's JavaScript Guardian - ensures our CSS stays last
  // This runs from GitHub (once) instead of Odoo embedded code (twice)
  (function ensureMyCssIsLast(){
    // Idempotent guard - prevents running twice
    if (window.__TFT_GUARD_RAN__) return;
    window.__TFT_GUARD_RAN__ = true;
    const href1 = "https://raw.githubusercontent.com/TrueFinancialTalent/odoo-custom-assets/main/style.css";
    const href2 = "https://cdn.jsdelivr.net/gh/TrueFinancialTalent/odoo-custom-assets/style.css";
    function bumpToEnd(link){
      if (link && link.parentNode) { link.parentNode.removeChild(link); document.head.appendChild(link); }
    }
    function isMine(l){ const h=(l.getAttribute('href')||''); return h.includes("odoo-custom-assets") && h.endsWith("style.css"); }

    const mo = new MutationObserver(()=> {
      document.querySelectorAll('link[rel="stylesheet"]').forEach(l=>{
        const h = l.getAttribute('href') || '';
        // If Odoo drops a new CSS after mine, push mine to the end again
        if (!isMine(l) && (h.includes("web.assets_frontend") || h.includes(".css"))) {
          const mine = [...document.querySelectorAll('link[rel="stylesheet"]')].filter(isMine).pop();
          bumpToEnd(mine);
        }
      });
    });

    window.addEventListener('load', () => {
      // ensure at least one of your sheets is present and last
      let mine = [...document.querySelectorAll('link[rel="stylesheet"]')].find(l => isMine(l));
      if (!mine) {
        const l = document.createElement("link"); l.rel="stylesheet"; l.href=href2; document.head.appendChild(l);
        mine = l;
      }
      bumpToEnd(mine);
      mo.observe(document.head, { childList:true, subtree:true });
    });
  })();
