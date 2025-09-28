document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - checking for contact form');
})
// Fixed Mobile Menu Functionality
function initializeMobileMenu() {
    const navLinks = document.getElementById("navLinks");
    const hamburger = document.querySelector('.fa-bars');
    
    if (!navLinks || !hamburger) {
        console.log('Mobile menu elements not found');
        return;
    }
    
    console.log('Mobile menu initialized');
    
    // Create close button inside the menu
    let closeBtn = navLinks.querySelector('.fa-times');
    if (!closeBtn) {
        closeBtn = document.createElement('i');
        closeBtn.className = 'fa fa-times';
        closeBtn.setAttribute('onclick', 'hideMenu()');
        navLinks.appendChild(closeBtn);
    }
    
    // Create overlay
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }
    
    function showMenu() {
        console.log('Showing menu');
        navLinks.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function hideMenu() {
        console.log('Hiding menu');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    hamburger.addEventListener('click', showMenu);
    closeBtn.addEventListener('click', hideMenu);
    overlay.addEventListener('click', hideMenu);
    
    // Close menu when clicking on links
    const menuLinks = navLinks.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', hideMenu);
    });
    
    // Make functions global
    window.showMenu = showMenu;
    window.hideMenu = hideMenu;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeMobileMenu);

// Back to Top Button functionality

    // Show/hide back to top button when scrolled past header
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    
    // progress bar
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('progressBar').style.width = scrollPercent + '%';
});

// Back to top click handler
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize EmailJS
    emailjs.init("gBg7lQuzwO1UFs1Dp");

// Mobile-Optimized Newsletter Popup Functionality
const popup = document.getElementById('newsletter-popup');
const form = document.getElementById('newsletter-form');
const closeBtn = document.getElementById('close-popup');
const message = document.getElementById('form-message');

function closePopup() {
    if (popup) {
        popup.style.display = 'none';
        document.body.classList.remove('popup-open');
    }
}

// Show pop-up after 5 seconds, but only if not subscribed already
if (popup && !localStorage.getItem('newsletterSubscribed')) {
    setTimeout(() => {
        popup.style.display = 'block';
        document.body.classList.add('popup-open');
        
        // Close on background tap for mobile
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup();
            }
        });
    }, 5000);
}

if (closeBtn) {
    closeBtn.addEventListener('click', closePopup);
}

// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup && popup.style.display === 'block') {
        closePopup();
    }
});

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Subscribing...';

        const name = form.name.value.trim();
        const email = form.email.value.trim();

        if (!name || !email) {
            alert('Please fill in all fields.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Subscribe';
            return;
        }

        try {
            await emailjs.send('service_gmrch39', 'template_btr4daj', {
                from_name: name,
                reply_to: email,
                user_email: email
            });

            // Success
            form.style.display = 'none';
            message.style.display = 'block';
            localStorage.setItem('newsletterSubscribed', 'true');
            
            setTimeout(() => {
                closePopup();
                form.style.display = 'flex';
                message.style.display = 'none';
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Subscribe';
            }, 4000);

        } catch (error) {
            console.error('EmailJS Error:', error);
            
            // Fallback success
            alert('Thank you for subscribing! You should receive a welcome email shortly.');
            
            form.style.display = 'none';
            message.style.display = 'block';
            localStorage.setItem('newsletterSubscribed', 'true');
            
            setTimeout(() => {
                closePopup();
                form.style.display = 'flex';
                message.style.display = 'none';
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Subscribe';
            }, 4000);
        }
    });

    // Prevent zoom on input focus (iOS)
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"]');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (window.innerWidth <= 768) {
                input.style.fontSize = '16px';
            }
        });
    });
}

// Reset button functionality
const resetBtn = document.getElementById('reset-subscription');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        localStorage.removeItem('newsletterSubscribed');
        alert('Subscription flag reset! Popup will show again on next reload.');
    });
}

// CONTACT FORM - DEBUG VERSION
const contactForm = document.getElementById('contact-form');
console.log('Contact form found:', !!contactForm);

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        console.log('=== FORM SUBMIT STARTED ===');
        e.preventDefault();
        e.stopPropagation();
        console.log('1. Default prevention successful');
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const messageDiv = document.getElementById('contact-form-message');
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        console.log('2. Button state updated');

        // Get form data
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const subject = contactForm.subject.value.trim();
        const message = contactForm.message.value.trim();
        
        console.log('3. Form values:', { name, email, subject, message });

        // Validate
        if (!name || !email || !subject || !message) {
            console.log('4. Validation failed - empty fields');
            alert('Please fill in all fields.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            return;
        }
        console.log('4. Validation passed');

        // Check if EmailJS is available
        if (typeof emailjs === 'undefined') {
            console.log('5. EmailJS is undefined');
            alert('Email service not available. Please try again later.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            return;
        }
        console.log('5. EmailJS is available');

        // Check if emailjs.send function exists
        if (typeof emailjs.send !== 'function') {
            console.log('6. emailjs.send is not a function');
            alert('Email service error. Please try again later.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            return;
        }
        console.log('6. emailjs.send is available');

        try {
            console.log('7. Attempting to send email...');
            
            const result = await emailjs.send('service_gmrch39', 'template_qwgy3u7', {
                name: name,
                reply_to: email,
                email: email,
                subject: subject,
                message: message
            });
            
            console.log('8. Email sent successfully:', result);
            
            contactForm.reset();
            console.log('9. Form reset');

            if (messageDiv) {
                messageDiv.textContent = 'Thank you! Your message has been sent.';
                messageDiv.style.display = 'block';
                messageDiv.style.background = '#d4edda';
                messageDiv.style.color = '#155724';
                console.log('10. Success message shown');
            }

        } catch (error) {
            console.error('11. Email failed with error:', error);
            console.log('Error details:', {
                status: error.status,
                text: error.text,
                fullError: error
            });
            
            alert('❌ Failed to send message. Please email us directly at info@rescuemark.co.za');
            
            if (messageDiv) {
                messageDiv.textContent = 'Error sending message. Please try again.';
                messageDiv.style.display = 'block';
                messageDiv.style.background = '#f8d7da';
                messageDiv.style.color = '#721c24';
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            console.log('12. Button state reset');
        }
        
        console.log('=== FORM SUBMIT COMPLETED ===');
    });
    
    console.log('Event listener added to contact form');
} else {
    console.log('No contact form found on this page');
}
// Fallback: if DOMContentLoaded already fired, run immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Code above will run
    });
} else {
    // DOM already ready, run now
    var navLinks = document.getElementById("navLinks");
    if (navLinks) {
        window.showMenu = function() { navLinks.style.right = "0"; }
        window.hideMenu = function() { navLinks.style.right = "-200px"; }
    }
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.onsubmit = function(e) {
            e.preventDefault();
            alert('Form would submit here');
            return false;
        };
    }
}
//----------------donate page initiatives-------------------
// Simple initiative functions - guaranteed to work
function openInitiative(id) {
    console.log('Opening initiative:', id);
    // Hide all initiatives first
    document.querySelectorAll('.initiative-expanded').forEach(el => {
        el.classList.remove('active');
    });
    // Show the selected one
    const expanded = document.getElementById('expanded-' + id);
    if (expanded) {
        expanded.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeInitiative(id) {
    console.log('Closing initiative:', id);
    const expanded = document.getElementById('expanded-' + id);
    if (expanded) {
        expanded.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close when clicking outside content
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('initiative-expanded')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close with escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.initiative-expanded').forEach(el => {
            el.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

// Also add click events to read more buttons
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const initiativeBox = this.closest('.initiative-box');
            if (initiativeBox && initiativeBox.onclick) {
                initiativeBox.onclick();
            }
        });
    });
});

// Contact Us button functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactBtn = document.querySelector('.big-donate-btn');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            // For desktop, ensure mail client opens
            const email = 'kryspats@gmail.com';
            const subject = 'Large Donation Inquiry';
            const body = 'Hello RescueMark team,\n\nI\'m interested in making a larger contribution and would like to discuss partnership opportunities.';
            
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Try to open mail client
            window.location.href = mailtoLink;
            
            // Fallback - show email address
            setTimeout(function() {
                if (!document.hidden) {
                    alert('Please email us at: ' + email);
                }
            }, 1000);
        });
    }
});