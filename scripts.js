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

// TFT navigation overlay and accordion behavior.
(function wireTftNavigation(){
  "use strict";

  function wire() {
    const nav = document.getElementById("tft-nav");
    const btn = document.getElementById("tft-hamburger");
    const overlay = document.getElementById("tft-overlay");
    const closeBtn = document.getElementById("tft-close");
    if (!nav || !btn || !overlay || !closeBtn || nav.dataset.navWired === "true") return;

    function setOpen(open) {
      overlay.setAttribute("data-open", open ? "true" : "false");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("tft-nav-open", open);
    }

    function toggle() {
      setOpen(overlay.getAttribute("data-open") !== "true");
    }

    btn.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();
      toggle();
    }, { passive: false });

    closeBtn.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
    }, { passive: false });

    overlay.addEventListener("click", function(e){
      const accordionHeader = e.target.closest(".tft-accordion-header");
      if (accordionHeader) {
        e.preventDefault();
        e.stopPropagation();
        const accordion = accordionHeader.closest(".tft-accordion");
        if (!accordion) return;

        const isOpen = accordion.getAttribute("data-open") === "true";
        overlay.querySelectorAll(".tft-accordion").forEach((item) => {
          item.setAttribute("data-open", "false");
        });
        accordion.setAttribute("data-open", isOpen ? "false" : "true");
        return;
      }

      if (e.target.closest("a")) setOpen(false);
      e.stopPropagation();
    });

    document.addEventListener("keydown", function(e){
      if (e.key === "Escape") setOpen(false);
    });

    nav.dataset.navWired = "true";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wire, { once: true });
  } else {
    wire();
  }
  setTimeout(wire, 500);
  setTimeout(wire, 1500);
  window.addEventListener("load", wire, { once: true });
})();
