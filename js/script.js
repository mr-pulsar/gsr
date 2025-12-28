// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    }, 3000); // 3 seconds for dramatic effect
});

// Carousel Functions
let currentCarouselIndex = 0;
const carouselSlides = document.querySelectorAll('.carousel-slide');

function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    if (n > slides.length) { currentCarouselIndex = 1; }
    if (n < 1) { currentCarouselIndex = slides.length; }
    
    slides.forEach(slide => slide.classList.remove('active', 'fade'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[currentCarouselIndex - 1]) {
        slides[currentCarouselIndex - 1].classList.add('active', 'fade');
    }
    if (dots[currentCarouselIndex - 1]) {
        dots[currentCarouselIndex - 1].classList.add('active');
    }
}

function changeSlide(n) {
    currentCarouselIndex += n;
    showSlide(currentCarouselIndex);
}

function currentSlide(n) {
    currentCarouselIndex = n;
    showSlide(currentCarouselIndex);
}

// Auto-rotate carousel every 5 seconds
setInterval(() => {
    currentCarouselIndex++;
    showSlide(currentCarouselIndex);
}, 5000);

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('mobile-menu');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('mobile-menu');
        navLinks.classList.remove('active');
    });
});

// Floating Action Button
const fab = document.querySelector('.fab');
if (fab) {
    fab.addEventListener('click', () => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Custom Cursor with Trail
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

const trail = [];
for (let i = 0; i < 10; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.opacity = (10 - i) / 10;
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
}

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX - 8 + 'px';
    cursor.style.top = mouseY - 8 + 'px';
}, { passive: true });

document.addEventListener('mousedown', () => {
    cursor.classList.add('click');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('click');
});

document.querySelectorAll('a, button, .product-card, .feature, .contact-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
}, { passive: true });

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Intersection Observer for fade-in animations with stagger
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('.product-card, .feature, .contact-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Stagger initial load for product cards
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    const features = document.querySelectorAll('.feature');
    features.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(50px)';
        feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        setTimeout(() => {
            feature.style.opacity = '1';
            feature.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

// Advanced graphics: particle effect (simplified)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = 'rgba(255, 215, 0, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    particle.style.animation = `floatUp ${Math.random() * 10 + 5}s linear infinite`;
    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 10000);
}

setInterval(createParticle, 200);

// CSS animation for floating particles
const style = document.createElement('style');
style.textContent = `
@keyframes floatUp {
    to {
        transform: translateY(-${window.innerHeight + 100}px);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Product Filter
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        document.querySelectorAll('.product-item').forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Gallery Filter
document.querySelectorAll('.gallery-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.gallery-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        document.querySelectorAll('.gallery-item').forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');

        // Close other items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem && item.classList.contains('active')) {
                item.classList.remove('active');
            }
        });
    });
});

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you shortly.');
        contactForm.reset();
    });
}

// Product Carousel Functions
let currentProductIndex = 1;

function showProductSlide(n) {
    const slides = document.querySelectorAll('.product-carousel .product-card');
    const dots = document.querySelectorAll('#product-dots .dot');
    
    if (n > slides.length) { currentProductIndex = 1; }
    if (n < 1) { currentProductIndex = slides.length; }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[currentProductIndex - 1]) {
        slides[currentProductIndex - 1].classList.add('active');
    }
    if (dots[currentProductIndex - 1]) {
        dots[currentProductIndex - 1].classList.add('active');
    }
}

function changeProductSlide(n) {
    currentProductIndex += n;
    showProductSlide(currentProductIndex);
}

function currentProductSlide(n) {
    currentProductIndex = n;
    showProductSlide(currentProductIndex);
}

// Initialize product carousel
showProductSlide(currentProductIndex);