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

  // Keep the jsDelivr stylesheet present without observing or reordering <head>.
  // A previous live MutationObserver could retrigger itself by moving this link.
  (function ensureTftStylesheet(){
    if (window.__TFT_STYLESHEET_CHECKED__) return;
    window.__TFT_STYLESHEET_CHECKED__ = true;

    const href = "https://cdn.jsdelivr.net/gh/TrueFinancialTalent/odoo-custom-assets@main/style.css";
    const isTftStylesheet = (link) => {
      try {
        const url = new URL(link.getAttribute("href") || "", window.location.href);
        return url.hostname.includes("jsdelivr.net") &&
          url.pathname.includes("/TrueFinancialTalent/odoo-custom-assets") &&
          url.pathname.endsWith("/style.css");
      } catch (_err) {
        return false;
      }
    };

    const addStylesheetIfMissing = () => {
      const hasStylesheet = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
        .some(isTftStylesheet);
      if (hasStylesheet) return;

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", addStylesheetIfMissing, { once: true });
    } else {
      addStylesheetIfMissing();
    }
  })();
