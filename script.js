document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            // A simple toggle. For a real app, we'd add CSS classes to show/hide
            if(navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
                if(navActions) navActions.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(10, 14, 23, 0.95)';
                navLinks.style.padding = '2rem';
                
                if(navActions) {
                    navActions.style.display = 'flex';
                    navActions.style.position = 'absolute';
                    navActions.style.top = 'calc(100% + 200px)';
                    navActions.style.left = '0';
                    navActions.style.width = '100%';
                    navActions.style.justifyContent = 'center';
                    navActions.style.background = 'rgba(10, 14, 23, 0.95)';
                    navActions.style.paddingBottom = '2rem';
                }
            }
        });
    }

    // Sticky Navbar Styling on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // Number Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const animateCounters = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const suffix = stat.getAttribute('data-suffix') || '';
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    // Format number (e.g. 50000 -> 50K)
                    let displayValue = Math.ceil(current);
                    if(target >= 1000) {
                        displayValue = (current / 1000).toFixed(1).replace('.0', '') + 'K';
                    }
                    stat.innerText = displayValue + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    let displayTarget = target;
                    if(target >= 1000) {
                        displayTarget = (target / 1000).toFixed(1).replace('.0', '') + 'K';
                    }
                    stat.innerText = displayTarget + suffix;
                }
            };
            updateCounter();
        });
    };

    // Intersection Observer for scroll animations (Stats & Reveal)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If it's the hero stats, run the counter
                if (entry.target.classList.contains('hero-stats') && !hasCounted) {
                    animateCounters();
                    hasCounted = true;
                }
                
                // Add fade-in class
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Initial state for fade-in elements
    const fadeElements = document.querySelectorAll('.glass-panel, .section-header, .feature-item');
    fadeElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
    
    // Also observe the hero stats specifically for the number counter
    const heroStats = document.querySelector('.hero-stats');
    if(heroStats) observer.observe(heroStats);
});
