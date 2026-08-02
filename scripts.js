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
      overlay.setAttribute("aria-hidden", open ? "false" : "true");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("tft-nav-open", open);

      if ("inert" in overlay) {
        overlay.inert = !open;
      }

      if (open) {
        closeBtn.focus({ preventScroll: true });
      } else if (document.activeElement && overlay.contains(document.activeElement)) {
        btn.focus({ preventScroll: true });
      }
    }

    function toggle() {
      setOpen(overlay.getAttribute("data-open") !== "true");
    }

    overlay.setAttribute("aria-hidden", overlay.getAttribute("data-open") === "true" ? "false" : "true");
    btn.setAttribute("aria-expanded", overlay.getAttribute("data-open") === "true" ? "true" : "false");
    if ("inert" in overlay) {
      overlay.inert = overlay.getAttribute("data-open") !== "true";
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

// Normalize navigation links that still came across from the original static mockup as placeholders.
(function wireTftNavLinks(){
  "use strict";

  function wire() {
    document.querySelectorAll('#tft-nav a.tft-link').forEach(function(link){
      if (link.textContent.trim().toLowerCase() === 'home') {
        link.setAttribute('href', '/');
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wire, { once: true });
  } else {
    wire();
  }
  window.addEventListener("load", wire, { once: true });
})();

// Normalize footer links that still came across from the original static mockup as placeholders.
(function wireTftFooterLinks(){
  "use strict";

  function wire() {
    document.querySelectorAll('.tft-site-footer a.tft-footer-link').forEach(function(link){
      if (link.textContent.trim().toLowerCase() === 'cookie policy') {
        link.setAttribute('href', '/cookie-policy');
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", wire, { once: true });
  } else {
    wire();
  }
  window.addEventListener("load", wire, { once: true });
})();
