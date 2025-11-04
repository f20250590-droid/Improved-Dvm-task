// --- 1. Mobile Navigation Logic ---
const navHamburger = document.getElementById('navHamburger');
// Selecting by class as the HTML styles this element as .mobile-menu
const mobileMenu = document.querySelector('.mobile-menu');

navHamburger?.addEventListener('click', () => {
    navHamburger.classList.toggle('active');
    // Ensure the mobile menu exists before toggling its class
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
});

document.addEventListener('click', (e) => {
    // Check if the click is outside the hamburger and the mobile menu
    if (mobileMenu && navHamburger && !navHamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        navHamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

if (mobileMenu) {
    mobileMenu.querySelectorAll('a, button').forEach(link => {
        link.addEventListener('click', () => {
            navHamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}


// --- 2. Dropdown Navigation Logic ---
const navItems = document.querySelectorAll('.nav-item');
const overlay = document.getElementById('dropdownOverlay');

navItems.forEach(item => {
    const toggle = item.querySelector('.nav-dropdown-toggle');
    const dropdownMenu = item.querySelector('.dropdown-menu');
    
    if (toggle && dropdownMenu) {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isActive = item.classList.contains('active');

            // Close all other dropdowns
            navItems.forEach(i => i.classList.remove('active'));

            // Toggle current dropdown
            if (!isActive) {
                item.classList.add('active');
                overlay.classList.add('active');
            } else {
                overlay.classList.remove('active');
            }
        });
    }

    // Keep dropdown open when clicking inside it
    dropdownMenu?.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// Close dropdowns when clicking outside or on overlay
document.addEventListener('click', (e) => {
    if (overlay.contains(e.target)) {
        navItems.forEach(item => item.classList.remove('active'));
        overlay.classList.remove('active');
    }
});


// --- 3. Trello 101 Feature Carousel Logic ---
// Select carousel elements
const track = document.querySelector('.carousel-track');
const slides = track ? Array.from(track.children) : []; 
const featureItems = document.querySelectorAll('.feature-item');
const carouselContainer = document.querySelector('.carousel-container'); // Used for visual effect

// Select the new dots elements
const dotsNav = document.querySelector('.carousel-dots');
const dots = dotsNav ? Array.from(dotsNav.children) : [];

let currentIndex = 0;

function updateCarousel(index = currentIndex) {
    // Safety check
    if (!track || slides.length === 0 || featureItems.length === 0) return;
    
    currentIndex = index;
    
    setTimeout(() => {
        // 2. Update track position
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // 3. Update active feature item
        featureItems.forEach(i => i.classList.remove('active'));
        featureItems[currentIndex].classList.add('active');

        // 4. Update active dot
        if (dots.length > 0) {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        }
        
        if (carouselContainer) {
            carouselContainer.style.opacity = '1';
        }
    }, 150);
}

// Dots navigation handler
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        updateCarousel(index);
    });
});

// Feature item integration handler (links feature list to carousel)
featureItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // This will update the dot, the feature item, and the carousel slide
        updateCarousel(index);
    });
});

// Initialize carousel on page load
if (slides.length > 0) {
    updateCarousel(0);
}


// --- 4. Form Submission Handling ---
function handleFormSubmit(e) {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    
    alert(`Thanks for signing up with ${email}! 🎉`);
    emailInput.value = '';
}

document.getElementById('heroForm')?.addEventListener('submit', handleFormSubmit);
document.getElementById('ctaForm')?.addEventListener('submit', handleFormSubmit);

// --- 5. Smooth Scrolling ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
