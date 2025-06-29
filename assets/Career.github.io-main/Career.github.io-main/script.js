// JavaScript for mobile menu toggle and scroll animations

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Ensure both elements exist before adding listeners
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            // Toggle a class to show/hide the menu, e.g., 'mobile-menu-hidden'
            mobileMenu.classList.toggle('mobile-menu-hidden');
        });

        // Close mobile menu when a link inside it is clicked
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('mobile-menu-hidden');
            });
        });
    }

    // --- Scroll Animations ---
    const scrollElements = document.querySelectorAll('.scroll-animate');

    // Callback for the Intersection Observer
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (in view)
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing the element once it's visible
                // observer.unobserve(entry.target);
            }
        });
    };
    
    // Options for the observer
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        threshold: 0.1 // triggers when 10% of the element is visible
    };

    // Create a new Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each of the scroll elements
    scrollElements.forEach(el => observer.observe(el));
    
});
