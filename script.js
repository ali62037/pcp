// =============================================
// PCP - PIE CLASSES PATNA WEBSITE JAVASCRIPT
// Main functionality for all pages
// =============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE NAVIGATION FIX =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    // Debug log
    console.log('Hamburger element:', hamburger);
    console.log('NavMenu element:', navMenu);
    
    if (hamburger && navMenu) {
        // Click event for hamburger menu
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            
            // Toggle active classes
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle body overflow when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                console.log('Menu opened');
            } else {
                document.body.style.overflow = 'auto';
                console.log('Menu closed');
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-list a, .nav-cta');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                console.log('Menu closed via link click');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                console.log('Menu closed via outside click');
            }
        });
        
        // Close menu on escape key press
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
                console.log('Menu closed via Escape key');
            }
        });
    } else {
        console.error('Hamburger or NavMenu element not found!');
    }
    
    // ===== STICKY HEADER ON SCROLL =====
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add scrolled class when page is scrolled
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll direction
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling down - hide header
                header.style.transform = 'translateY(-100%)';
                header.style.transition = 'transform 0.3s ease';
            } else {
                // Scrolling up - show header
                header.style.transform = 'translateY(0)';
                header.style.transition = 'transform 0.3s ease';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // ===== SCROLL ANIMATIONS =====
    const animateElements = document.querySelectorAll('.animate-fade-up, .animate-fade-left, .animate-fade-right, .animate-slide-left, .animate-zoom');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.animationPlayState = 'running';
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // ===== FLOATING ACTION BUTTONS =====
    const callBtn = document.getElementById('callBtn');
    const whatsappBtn = document.getElementById('whatsappBtn');
    let scrollTimeout;
    
    function initFloatingButtons() {
        if (!callBtn || !whatsappBtn) return;
        
        // Initial state - show buttons
        showButtons();
        
        // Hide buttons after 3 seconds if not at top
        setTimeout(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 300) {
                hideButtons();
            }
        }, 3000);
        
        // Scroll event for buttons
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Show buttons when scrolling
            showButtons();
            
            // Clear previous timeout
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            // Hide buttons after scrolling stops
            scrollTimeout = setTimeout(() => {
                if (scrollTop > 300) {
                    hideButtons();
                }
            }, 1500);
        });
        
        // Hover effects
        [callBtn, whatsappBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('mouseenter', showButtons);
                btn.addEventListener('click', function() {
                    // Button click feedback
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                });
            }
        });
    }
    
    function showButtons() {
        if (callBtn) {
            callBtn.style.opacity = '1';
            callBtn.style.transform = 'translateX(0)';
            callBtn.style.pointerEvents = 'auto';
        }
        if (whatsappBtn) {
            whatsappBtn.style.opacity = '1';
            whatsappBtn.style.transform = 'translateX(0)';
            whatsappBtn.style.pointerEvents = 'auto';
        }
    }
    
    function hideButtons() {
        if (callBtn) {
            callBtn.style.opacity = '0';
            callBtn.style.transform = 'translateX(100px)';
            callBtn.style.pointerEvents = 'none';
        }
        if (whatsappBtn) {
            whatsappBtn.style.opacity = '0';
            whatsappBtn.style.transform = 'translateX(100px)';
            whatsappBtn.style.pointerEvents = 'none';
        }
    }
    
    // Initialize floating buttons
    initFloatingButtons();
    
    // ===== SCROLL TO TOP BUTTON =====
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== ACTIVE NAV LINK HIGHLIGHT =====
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-list a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('href');
            
            if (currentPage === linkPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage.includes(linkPage.replace('.html', '')) && linkPage !== 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    setActiveNavLink();
    
    // ===== LAZY LOADING IMAGES =====
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }
    
    // ===== FAQ TOGGLE FUNCTIONALITY =====
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const toggle = this.querySelector('.faq-toggle');
            
            // Close other open FAQs
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== this.parentElement) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = null;
                    item.querySelector('.faq-toggle').textContent = '+';
                }
            });
            
            // Toggle current FAQ
            this.parentElement.classList.toggle('active');
            
            // Toggle answer visibility
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                toggle.textContent = '+';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.textContent = '-';
            }
        });
    });
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process internal anchor links
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== FORM VALIDATION =====
    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateForm(this);
        });
    }
    
    // Admission form validation
    const admissionForm = document.getElementById('admissionFormElement');
    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateForm(this);
        });
    }
    
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        // Reset errors
        form.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                const errorId = field.id + 'Error';
                const errorEl = document.getElementById(errorId);
                if (errorEl) {
                    errorEl.textContent = 'This field is required';
                }
                isValid = false;
                field.style.borderColor = '#ef4444';
            } else {
                field.style.borderColor = '';
                
                // Phone validation
                if (field.type === 'tel') {
                    const phoneRegex = /^[0-9]{10}$/;
                    if (!phoneRegex.test(field.value.trim())) {
                        const errorId = field.id + 'Error';
                        const errorEl = document.getElementById(errorId);
                        if (errorEl) {
                            errorEl.textContent = 'Please enter a valid 10-digit phone number';
                        }
                        isValid = false;
                        field.style.borderColor = '#ef4444';
                    }
                }
            }
        });
        
        if (isValid) {
            alert('Thank you for your submission! We will contact you soon.');
            form.reset();
        }
    }
    
    // ===== PAGE TRANSITION EFFECT =====
    // Add fade-in effect when page loads
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // ===== TEST FUNCTION FOR DEBUGGING =====
    function testMobileMenu() {
        console.log('Testing Mobile Menu...');
        console.log('Window width:', window.innerWidth);
        console.log('Hamburger display:', hamburger ? getComputedStyle(hamburger).display : 'Not found');
        console.log('NavMenu display:', navMenu ? getComputedStyle(navMenu).display : 'Not found');
        
        // Force show menu for testing
        if (hamburger && navMenu && window.innerWidth <= 768) {
            console.log('Test: Opening menu programmatically');
            hamburger.classList.add('active');
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                console.log('Test: Closing menu programmatically');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }, 2000);
        }
    }
    
    // Uncomment to test
    // setTimeout(testMobileMenu, 1000);
});

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}



// ===== FAQ TOGGLE FUNCTIONALITY (COMPLETE FIX) =====
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) {
        console.log('No FAQ items found');
        return;
    }
    
    console.log(`Found ${faqItems.length} FAQ items`);
    
    // Close all FAQ items initially
    faqItems.forEach(item => {
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (answer) {
            answer.style.maxHeight = null;
        }
        if (toggle) {
            toggle.textContent = '+';
        }
        item.classList.remove('active');
    });
    
    // Add click event to each FAQ question
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (!question) {
            console.warn('FAQ question not found in item:', item);
            return;
        }
        
        question.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('FAQ clicked:', this.querySelector('h3')?.textContent);
            
            const answer = this.nextElementSibling;
            const toggle = this.querySelector('.faq-toggle');
            
            // Check if this FAQ is already active
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherToggle = otherItem.querySelector('.faq-toggle');
                    
                    otherItem.classList.remove('active');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                    if (otherToggle) otherToggle.textContent = '+';
                }
            });
            
            // Toggle current FAQ item
            if (!isActive) {
                // Open this FAQ
                item.classList.add('active');
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
                if (toggle) {
                    toggle.textContent = '−'; // Minus sign
                }
            } else {
                // Close this FAQ
                item.classList.remove('active');
                if (answer) {
                    answer.style.maxHeight = null;
                }
                if (toggle) {
                    toggle.textContent = '+';
                }
            }
        });
    });
    
    // Optional: Open first FAQ by default
    // if (faqItems.length > 0) {
    //     const firstItem = faqItems[0];
    //     const firstAnswer = firstItem.querySelector('.faq-answer');
    //     const firstToggle = firstItem.querySelector('.faq-toggle');
    //     
    //     firstItem.classList.add('active');
    //     if (firstAnswer) firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
    //     if (firstToggle) firstToggle.textContent = '−';
    // }
}

// Initialize FAQ when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Initialize FAQ
    initializeFAQ();
    
    // ... existing code ...
});