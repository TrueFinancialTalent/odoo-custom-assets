// Scroll blur effect for navbar
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

// On DOM ready
document.addEventListener('DOMContentLoaded', function () {
    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    });

    // Remove Odoo nav elements injected by theme
    const odooNavs = document.querySelectorAll(
        'header.o_top_fixed_element, nav.o_colored_level, .o_main_navbar, #o_main_nav'
    );
    odooNavs.forEach(nav => nav.remove());
});
