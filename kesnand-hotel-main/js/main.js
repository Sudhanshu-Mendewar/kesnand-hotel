// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (hamburger) {
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrollTop = document.querySelector('.scroll-top');
    
    if (window.scrollY > 100) {
        if (header) header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        if (header) header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        if (scrollTop) scrollTop.classList.add('active');
    } else {
        if (header) header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        if (header) header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        if (scrollTop) scrollTop.classList.remove('active');
    }
});

// Carousel Functionality
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselDots = document.querySelectorAll('.carousel-dot');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentSlide = 0;
let slideInterval;

// Function to show a specific slide
function showSlide(n) {
    if (carouselSlides.length === 0) return;
    
    // Hide all slides
    carouselSlides.forEach(slide => slide.classList.remove('active'));
    if (carouselDots.length > 0) {
        carouselDots.forEach(dot => dot.classList.remove('active'));
    }
    
    // Calculate the slide index
    currentSlide = (n + carouselSlides.length) % carouselSlides.length;
    
    // Show the current slide
    carouselSlides[currentSlide].classList.add('active');
    if (carouselDots[currentSlide]) {
        carouselDots[currentSlide].classList.add('active');
    }
}

// Function for next slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Function for previous slide
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Auto-slide functionality
function startCarousel() {
    if (carouselSlides.length > 0) {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
}

// Initialize carousel if it exists
if (carouselSlides.length > 0) {
    // Pause carousel on hover
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
        carousel.addEventListener('mouseleave', startCarousel);
    }

    // Event listeners for buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            clearInterval(slideInterval);
            startCarousel();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            clearInterval(slideInterval);
            startCarousel();
        });
    }

    // Event listeners for dots
    if (carouselDots.length > 0) {
        carouselDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                clearInterval(slideInterval);
                startCarousel();
            });
        });
    }

    // Start the carousel
    startCarousel();
}

// Scroll to top functionality
document.querySelector('.scroll-top')?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only handle internal anchor links
        if (href.startsWith('#') && href !== '#') {
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // In a real application, you would send this data to a server
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Always set home as active if on index.html
    if (currentPage === 'index.html' || currentPage === '') {
        const homeLink = document.querySelector('.nav-links a[href="index.html"]');
        if (homeLink) homeLink.classList.add('active');
    }
}

// Call the function when page loads
document.addEventListener('DOMContentLoaded', setActiveNavLink);