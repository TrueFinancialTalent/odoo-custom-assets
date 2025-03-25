// Scroll blur effect for navbar
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
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
