/**
 * FreshBasket Market — fresh.js
 * Phase 1 + Phase 2 interactive features
 * Author: TonyDev
 */

'use strict';

// PHASE 1 — HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});


// PHASE 1 — HEADER SCROLL EFFECT
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});


// PHASE 1 — BACK TO TOP BUTTON
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// PHASE 1 — SCROLL FADE-IN ANIMATIONS
const fadeObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.addEventListener('DOMContentLoaded', () => {
    const animatables = document.querySelectorAll(
        '.card, .category, .product-card, .pricing-card, .faq-item, ' +
        '.trust-item, .hero-content, .hero-image, ' +
        '.partner-logo, .coverage-content, .coverage-visual, ' +
        '.app-content, .app-visual, .newsletter-content, ' +
        '.how-it-works .main-title, .how-it-works .subtitle, ' +
        '.products .main-title, .products .subtitle, ' +
        '.categories .main-title, .categories .subtitle, ' +
        '.pricing .main-title, .pricing .subtitle, ' +
        '.faq .main-title, .faq .subtitle, ' +
        '.coverage .coverage-title, .app-title, .newsletter-title'
    );

    animatables.forEach(el => {
        el.classList.add('fade-up');
        fadeObserver.observe(el);
    });
});


// PHASE 1 — ANIMATED COUNTERS (Trust Bar)
function animateCounter(el, target, duration = 1800) {
    const isDecimal = !Number.isInteger(target);
    let start       = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        if (isDecimal) {
            el.textContent = start.toFixed(1);
        } else if (target >= 1000) {
            el.textContent = Math.floor(start).toLocaleString() + '+';
        } else {
            el.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.trust-number').forEach(num => {
                    animateCounter(num, parseFloat(num.getAttribute('data-target')));
                });
                counterObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.3 }
);

document.addEventListener('DOMContentLoaded', () => {
    const trustBar = document.querySelector('.trust-bar');
    if (trustBar) counterObserver.observe(trustBar);
});


// PHASE 1 — PRODUCT FILTER TABS
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns   = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const match = filter === 'all' || card.getAttribute('data-category') === filter;
                card.classList.toggle('hidden', !match);
                if (match) {
                    card.classList.remove('visible');
                    setTimeout(() => card.classList.add('visible'), 50);
                }
            });
        });
    });
});


// PHASE 1 — ADD TO CART INTERACTION
document.addEventListener('DOMContentLoaded', () => {
    const cartBtns  = document.querySelectorAll('.add-to-cart');
    const cartToast = document.getElementById('cartToast');
    const toastMsg  = document.getElementById('cartToastMsg');
    let toastTimer  = null;

    cartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productName = btn.closest('.product-card').querySelector('.product-name').textContent;

            btn.classList.add('added');
            btn.innerHTML = '<i class="fas fa-check"></i>';

            setTimeout(() => {
                btn.classList.remove('added');
                btn.innerHTML = '<i class="fas fa-plus"></i>';
            }, 1500);

            toastMsg.textContent = `${productName} added to cart!`;
            cartToast.classList.add('show');

            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => cartToast.classList.remove('show'), 2500);
        });
    });
});


// PHASE 1 — FAQ ACCORDION
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer   = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all
            document.querySelectorAll('.faq-item').forEach(other => {
                other.classList.remove('active');
                other.querySelector('.faq-answer').classList.remove('open');
                other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // Toggle current
            if (!isOpen) {
                item.classList.add('active');
                answer.classList.add('open');
                question.setAttribute('aria-expanded', 'true');
            }
        });

        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
});


// PHASE 1 — SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});


// PHASE 2 — COVERAGE CHECKER
// Checks if user's city is in the covered list.
// NOTE: This is a frontend-only simulation.
// In production connect to a geocoding API
// (Google Maps, Mapbox, or your own backend).
document.addEventListener('DOMContentLoaded', () => {
    const coverageInput  = document.getElementById('coverageInput');
    const coverageBtn    = document.getElementById('coverageBtn');
    const coverageResult = document.getElementById('coverageResult');

    if (!coverageInput) return;

    // Areas we cover — lowercase for easy matching
    const coveredAreas = [
        // Lagos
        'lagos', 'lekki', 'ikeja', 'victoria island', 'vi', 'surulere',
        'yaba', 'ikoyi', 'ajah', 'festac', 'maryland', 'oshodi',
        'alimosho', 'kosofe', 'isale eko', 'apapa', 'mushin',
        // Abuja
        'abuja', 'wuse', 'wuse ii', 'maitama', 'garki', 'asokoro',
        'gwarinpa', 'kubwa', 'nyanya', 'karu', 'utako', 'jabi',
        // Port Harcourt
        'port harcourt', 'ph', 'portharcourt', 'rumuola', 'rumuola',
        'eleme', 'obio', 'akpor', 'trans amadi', 'old gra', 'new gra',
        // Ibadan
        'ibadan', 'bodija', 'challenge', 'ring road', 'iyaganku',
        'agodi', 'ui', 'mokola', 'gbagi'
    ];

    // Coming soon areas
    const comingSoonAreas = [
        'kano', 'enugu', 'kaduna', 'benin', 'benin city',
        'onitsha', 'aba', 'uyo', 'calabar', 'jos'
    ];

    function checkCoverage() {
        const query = coverageInput.value.trim().toLowerCase();

        if (!query) {
            showResult('error', 'fa-exclamation-circle', 'Please enter a city or neighborhood to check.');
            return;
        }

        // Simulate a brief loading state
        coverageBtn.textContent = 'Checking...';
        coverageBtn.disabled    = true;

        setTimeout(() => {
            coverageBtn.textContent = 'Check Now';
            coverageBtn.disabled    = false;

            const isCovered     = coveredAreas.some(area => query.includes(area) || area.includes(query));
            const isComingSoon  = comingSoonAreas.some(area => query.includes(area) || area.includes(query));

            if (isCovered) {
                showResult(
                    'available',
                    'fa-check-circle',
                    `Great news! We deliver to <strong>${capitalise(query)}</strong>. Start your first order today.`
                );
            } else if (isComingSoon) {
                showResult(
                    'unavailable',
                    'fa-clock',
                    `We're coming to <strong>${capitalise(query)}</strong> very soon! Leave your email below to be first to know.`
                );
            } else {
                showResult(
                    'unavailable',
                    'fa-info-circle',
                    `We don't cover <strong>${capitalise(query)}</strong> yet, but we're expanding fast. Check back soon!`
                );
            }
        }, 800);
    }

    function showResult(type, icon, message) {
        coverageResult.className = `coverage-result ${type}`;
        coverageResult.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
    }

    function capitalise(str) {
        return str.replace(/\b\w/g, c => c.toUpperCase());
    }

    coverageBtn.addEventListener('click', checkCoverage);

    coverageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkCoverage();
    });

    // Clear result on new input
    coverageInput.addEventListener('input', () => {
        if (coverageResult.className.includes('available') ||
            coverageResult.className.includes('unavailable')) {
            coverageResult.className = 'coverage-result';
        }
    });
});


// PHASE 2 — NEWSLETTER FORM
// Validates email and shows success state.
// NOTE: Replace the setTimeout simulation with
// a real API call (Mailchimp, ConvertKit, etc.)
document.addEventListener('DOMContentLoaded', () => {
    const form             = document.getElementById('newsletterForm');
    const emailInput       = document.getElementById('newsletterEmail');
    const errorEl          = document.getElementById('newsletterError');
    const successEl        = document.getElementById('newsletterSuccess');

    if (!form) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();

        // Clear previous error
        errorEl.style.display = 'none';

        if (!email) {
            showError('Please enter your email address.');
            return;
        }

        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address.');
            return;
        }

        // Simulate API call
        const btn = form.querySelector('.newsletter-btn');
        btn.textContent = 'Sending...';
        btn.disabled    = true;

        setTimeout(() => {
            // Hide form, show success
            form.style.display      = 'none';
            successEl.style.display = 'flex';

            // In production, replace this with:
            // fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
            console.log('Newsletter signup:', email);
        }, 1000);
    });

    function showError(msg) {
        errorEl.textContent    = msg;
        errorEl.style.display  = 'block';
        emailInput.focus();
    }
});


// CONSOLE BRANDING
console.log('%c🛒 FreshBasket Market', 'font-size: 20px; font-weight: bold; color: #086647;');
console.log('%cPhase 1 + Phase 2 complete', 'font-size: 12px; color: #059669;');
console.log('%cBuilt by TonyDev 🚀', 'font-size: 12px; color: #666;');