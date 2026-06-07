/* ===========================
   SMOOTH SCROLL FUNCTIONALITY
   =========================== */

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const elementPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Alternative smooth scroll using CSS (for browsers that don't support JavaScript)
// This is handled by html { scroll-behavior: smooth; } in the CSS file

// Scroll performance optimization
let scrollTimer = null;
window.addEventListener('scroll', () => {
    if (scrollTimer !== null) {
        return;
    }

    scrollTimer = setTimeout(() => {
        // Add any scroll-based animations here
        scrollTimer = null;
    }, 100);
}, { passive: true });
