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

// Fill obfuscated TFT footer contact fields wherever the shared footer appears.
(function wireTftFooterContact(){
  "use strict";

  function text(codes) {
    return codes.map(function(code){ return String.fromCharCode(code); }).join("");
  }

  function fillFooterContact() {
    document.querySelectorAll('.footer-address[data-address="obfuscated"]').forEach(function(address){
      address.innerHTML = text([52,52,48,32,78,32,66,97,114,114,97,110,99,97,32,65,118,101,32,35,57,49,50,57]) + '<br/>' + text([67,111,118,105,110,97,44,32,67,65,32,57,49,55,50,51]);
    });

    document.querySelectorAll('.footer-phone-link[data-phone="obfuscated"]').forEach(function(phone){
      phone.textContent = text([40,57,52,57,41,32,51,49,51,45,50,54,55,48]);
      phone.href = 'tel:' + text([43,49,57,52,57,51,49,51,50,54,55,48]);
    });

    document.querySelectorAll('.footer-email-link[data-email="obfuscated"]').forEach(function(email){
      const value = text([67,111,110,110,101,99,116,64,84,114,117,101,70,105,110,97,110,99,105,97,108,84,97,108,101,110,116,46,99,111,109]);
      email.textContent = value;
      email.href = 'mailto:' + value;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fillFooterContact, { once: true });
  } else {
    fillFooterContact();
  }
  setTimeout(fillFooterContact, 100);
  setTimeout(fillFooterContact, 500);
  window.addEventListener("load", fillFooterContact, { once: true });
})();
