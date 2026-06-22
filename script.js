// Scroll Animation Logic
window.addEventListener("scroll", function() {
    const navbar = document.getElementById("myNavbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Mobile Menu Toggle Logic
function toggleMobileMenu() {
    const navbar = document.getElementById("myNavbar");
    const icon = document.getElementById("hamburger-icon");
    const body = document.body;

    navbar.classList.toggle("mobile-active");
    
    // Switch icon between bars and close (X)
    if (navbar.classList.contains("mobile-active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
        body.classList.add("no-scroll");
    } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
        body.classList.remove("no-scroll");
    }
}


document.addEventListener("DOMContentLoaded", function () {

    /* ----------------------------------------------------
       1. SCROLL REVEAL ANIMATION (FOOTER)
    ---------------------------------------------------- */
    const animatedElements = document.querySelectorAll('.scroll-anim');

    if (animatedElements.length > 0) {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    // Optional: Unobserve after showing so it stays visible
                    scrollObserver.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => scrollObserver.observe(el));
    }

    /* ----------------------------------------------------
       2. NEWSLETTER FORM VALIDATION & CUSTOM ALERT
    ---------------------------------------------------- */
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('nlEmailInput');
    const inputGroup = document.getElementById('nlInputGroup');
    const messageBox = document.getElementById('nlMessage');

    // Custom Premium Alert Function
    function showPremiumAlert(message) {
        // Create an alert div dynamically
        const alertBox = document.createElement('div');
        alertBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
        
        // CSS Styles directly applied via JS for the Toast Notification
        Object.assign(alertBox.style, {
            position: 'fixed',
            top: '30px',
            right: '20px',
            backgroundColor: 'rgba(12, 25, 14, 0.95)',
            backdropFilter: 'blur(10px)',
            color: '#39ff14', // Neon Green
            padding: '16px 25px',
            borderRadius: '12px',
            border: '1px solid #39ff14',
            boxShadow: '0 0 20px rgba(57, 255, 20, 0.3)',
            zIndex: '9999',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontWeight: '600',
            fontSize: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transform: 'translateX(150%)', // Hidden off-screen initially
            transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
        });

        // Add to body
        document.body.appendChild(alertBox);

        // Trigger slide-in animation
        setTimeout(() => {
            alertBox.style.transform = 'translateX(0)';
        }, 10);

        // Slide-out and remove after 3.5 seconds
        setTimeout(() => {
            alertBox.style.transform = 'translateX(150%)';
            setTimeout(() => alertBox.remove(), 400); // Wait for animation to finish before removing
        }, 3500);
    }

    // Check if form exists before running
    if (form && emailInput && inputGroup && messageBox) {
        
        // Input Focus glow effect
        emailInput.addEventListener('focus', () => inputGroup.classList.add('focused'));
        emailInput.addEventListener('blur', () => inputGroup.classList.remove('focused'));

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Clear previous states
            inputGroup.classList.remove('error-border', 'success-border');
            messageBox.classList.remove('error-text', 'success-text', 'show');

            if (emailValue === "") {
                showError("Email address cannot be empty.");
            } else if (!emailRegex.test(emailValue)) {
                showError("Please enter a valid email address.");
            } else {
                window.location.href='404page.html'
                
                // Clear input after success
                emailInput.value = ""; 
            }
        });

        function showError(message) {
            inputGroup.classList.add('error-border');
            messageBox.textContent = message;
            messageBox.className = "form-message error-text show";
        }

        function showSuccess(message) {
            inputGroup.classList.add('success-border');
            messageBox.textContent = message;
            messageBox.className = "form-message success-text show";
        }
    }

});