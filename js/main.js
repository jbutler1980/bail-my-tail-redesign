document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
            const hamburger = mobileMenuBtn.querySelector('.hamburger');

            if (hamburger) {
                hamburger.classList.toggle('active');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && !e.target.closest('.navbar') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                // Close mobile menu if open
                if (navMenu) navMenu.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
                
                // Scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData.entries());
            
            // Basic form validation
            if (!formObject.name || !formObject.email || !formObject.message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Form submission backend not yet configured.
            // Direct users to phone contact so no messages are silently lost.
            showNotification('For immediate assistance please call us: Flint 810-234-5776 | Detroit 313-345-9255', 'info');
            contactForm.reset();
        });
    }

    // Notification System
    function showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Add notification to page
        document.body.appendChild(notification);

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '1rem 2rem',
            borderRadius: '5px',
            color: 'white',
            backgroundColor: type === 'success' ? '#28a745' : type === 'info' ? '#0056b3' : '#dc3545',
            boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
            zIndex: '1000',
            animation: 'slideIn 0.5s ease-out forwards'
        });

        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease-out forwards';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe elements for scroll animations
    document.querySelectorAll('.service-card, .faq-item, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(el);
    });
});