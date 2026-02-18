/**
 * FreshBasket Market — fresh.js
 * Phase 1 + Phase 2 + Auth & Full Button Reactivity
 * Author: TonyDev
 */

'use strict';

// UTILITIES
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showToast(msg, duration = 3000) {
    const toast    = document.getElementById('infoToast');
    const toastMsg = document.getElementById('infoToastMsg');
    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
}

function showFieldError(errId, msg) {
    const el = document.getElementById(errId);
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
}

function clearFieldError(errId) {
    const el = document.getElementById(errId);
    if (!el) return;
    el.textContent = '';
    el.classList.remove('show');
}

function setInputState(inputId, state) {
    const el = document.getElementById(inputId);
    if (!el) return;
    el.classList.remove('error', 'success');
    if (state) el.classList.add(state);
}

function setButtonLoading(btnId, loading) {
    const btn     = document.getElementById(btnId);
    if (!btn) return;
    const text    = btn.querySelector('.btn-text');
    const spinner = btn.querySelector('.btn-spinner');
    btn.disabled          = loading;
    text.style.display    = loading ? 'none'   : 'inline';
    spinner.style.display = loading ? 'inline' : 'none';
}


// AUTH MODAL CONTROLLER
const AuthModal = (() => {

    const overlay     = document.getElementById('authOverlay');
    const closeBtn    = document.getElementById('authClose');
    const tabSignIn   = document.getElementById('tabSignIn');
    const tabSignUp   = document.getElementById('tabSignUp');
    const formSignIn  = document.getElementById('formSignIn');
    const formSignUp  = document.getElementById('formSignUp');
    const authSuccess = document.getElementById('authSuccess');

    function open(tab = 'signin') {
        overlay.classList.add('active');
        document.body.classList.add('modal-open');
        switchTab(tab);
        setTimeout(() => {
            const firstInput = overlay.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 350);
    }

    function close() {
        overlay.classList.remove('active');
        document.body.classList.remove('modal-open');
        setTimeout(() => { resetForms(); showPanel('signin'); }, 300);
    }

    function switchTab(tab) {
        tabSignIn.classList.toggle('active', tab === 'signin');
        tabSignUp.classList.toggle('active', tab === 'signup');
        showPanel(tab);
    }

    function showPanel(panel) {
        formSignIn.style.display  = panel === 'signin'  ? 'block' : 'none';
        formSignUp.style.display  = panel === 'signup'  ? 'block' : 'none';
        authSuccess.style.display = panel === 'success' ? 'block' : 'none';
    }

function showSuccess(name, isNew) {
        document.getElementById('successTitle').textContent =
            isNew ? `Welcome, ${name}!` : `Welcome back, ${name}!`;
        document.getElementById('successMsg').textContent =
            isNew
                ? "Your account is ready. Your \u20a6500 discount has been applied!"
                : "You're signed in to FreshBasket.";
        showPanel('success');
    }

    function resetForms() {
        ['signInForm','signUpForm'].forEach(id => {
            const f = document.getElementById(id);
            if (f) f.reset();
        });
        ['siEmail','siPassword','suName','suEmail','suPassword','suConfirm']
            .forEach(id => setInputState(id, null));
        ['siEmailErr','siPasswordErr','suNameErr','suEmailErr','suPasswordErr','suConfirmErr']
            .forEach(clearFieldError);
        ['signInSubmit','signUpSubmit'].forEach(id => {
            const btn = document.getElementById(id);
            if (!btn) return;
            btn.disabled = false;
            btn.querySelector('.btn-text').style.display    = 'inline';
            btn.querySelector('.btn-spinner').style.display = 'none';
        });
    }

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) close();
    });

    tabSignIn.addEventListener('click', () => switchTab('signin'));
    tabSignUp.addEventListener('click', () => switchTab('signup'));

    document.querySelectorAll('.auth-switch-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.getAttribute('data-switch')));
    });

    document.getElementById('successContinue').addEventListener('click', () => {
        close();
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('forgotBtn').addEventListener('click', () => {
        close();
        showToast('A password reset link will be sent to your email.', 4000);
    });

    return { open, close, showSuccess };
})();

// AUTH STATE MANAGER
const AuthState = (() => {

    const KEY      = 'freshbasket_user';
    const signInBtn = document.getElementById('signInBtn');

    const getUser  = () => { try { const d = sessionStorage.getItem(KEY); return d ? JSON.parse(d) : null; } catch { return null; } };
    const saveUser = (u) => sessionStorage.setItem(KEY, JSON.stringify(u));
    const clearUser = ()  => sessionStorage.removeItem(KEY);
    const initials  = (n) => n.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);

    function updateHeader() {
        const user = getUser();
        if (user) {
            signInBtn.style.display = 'none';
            if (document.getElementById('userMenu')) return;

            const menu = document.createElement('div');
            menu.className = 'user-menu';
            menu.id        = 'userMenu';
            menu.innerHTML = `
                <button class="user-avatar" id="userAvatarBtn" aria-label="Account menu" aria-expanded="false">${initials(user.name)}</button>
                <span class="user-name">${user.name.split(' ')[0]}</span>
                <div class="user-dropdown" id="userDropdown" role="menu">
                    <div class="dropdown-header">
                        <strong>${user.name}</strong>
                        <span>${user.email}</span>
                    </div>
                    <button class="dropdown-item"><i class="fas fa-shopping-bag"></i> My Orders</button>
                    <button class="dropdown-item"><i class="fas fa-heart"></i> Saved Items</button>
                    <button class="dropdown-item"><i class="fas fa-map-marker-alt"></i> My Addresses</button>
                    <button class="dropdown-item"><i class="fas fa-cog"></i> Account Settings</button>
                    <button class="dropdown-item logout" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Sign Out</button>
                </div>`;

            signInBtn.parentNode.insertBefore(menu, signInBtn);

            document.getElementById('userAvatarBtn').addEventListener('click', (e) => {
                e.stopPropagation();
                const dd  = document.getElementById('userDropdown');
                const btn = document.getElementById('userAvatarBtn');
                const open = dd.classList.toggle('open');
                btn.setAttribute('aria-expanded', open);
            });

            document.addEventListener('click', () => {
                const dd  = document.getElementById('userDropdown');
                const btn = document.getElementById('userAvatarBtn');
                if (dd)  dd.classList.remove('open');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });

            document.querySelectorAll('.dropdown-item:not(.logout)').forEach(item => {
                item.addEventListener('click', () => showToast('This feature is coming soon!'));
            });

            document.getElementById('logoutBtn').addEventListener('click', logout);

        } else {
            signInBtn.style.display = '';
            const menu = document.getElementById('userMenu');
            if (menu) menu.remove();
        }
    }

    function login(user) { saveUser(user); updateHeader(); }
    function logout() { clearUser(); const m = document.getElementById('userMenu'); if (m) m.remove(); signInBtn.style.display = ''; showToast("You've been signed out. See you soon!"); }
    function isLoggedIn() { return !!getUser(); }

    updateHeader();
    return { login, logout, isLoggedIn, getUser };
})();

// SIGN IN FORM
document.getElementById('signInForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('siEmail').value.trim();
    const pass  = document.getElementById('siPassword').value;
    let valid   = true;

    ['siEmailErr','siPasswordErr'].forEach(clearFieldError);
    ['siEmail','siPassword'].forEach(id => setInputState(id, null));

    if (!email)              { showFieldError('siEmailErr', 'Email is required.'); setInputState('siEmail','error'); valid = false; }
    else if (!emailRegex.test(email)) { showFieldError('siEmailErr', 'Please enter a valid email.'); setInputState('siEmail','error'); valid = false; }
    if (!pass)               { showFieldError('siPasswordErr', 'Password is required.'); setInputState('siPassword','error'); valid = false; }

    if (!valid) return;

    setButtonLoading('signInSubmit', true);
    await new Promise(r => setTimeout(r, 1200));

    const name = email.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
    setInputState('siEmail','success');
    setInputState('siPassword','success');
    setButtonLoading('signInSubmit', false);
    AuthState.login({ name, email });
    AuthModal.showSuccess(name, false);
});

// CREATE ACCOUNT FORM
document.getElementById('signUpForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name    = document.getElementById('suName').value.trim();
    const email   = document.getElementById('suEmail').value.trim();
    const pass    = document.getElementById('suPassword').value;
    const confirm = document.getElementById('suConfirm').value;
    let valid     = true;

    ['suNameErr','suEmailErr','suPasswordErr','suConfirmErr'].forEach(clearFieldError);
    ['suName','suEmail','suPassword','suConfirm'].forEach(id => setInputState(id, null));

    if (!name || name.length < 2)      { showFieldError('suNameErr','Enter your full name.'); setInputState('suName','error'); valid = false; }
    if (!email)                        { showFieldError('suEmailErr','Email is required.'); setInputState('suEmail','error'); valid = false; }
    else if (!emailRegex.test(email))  { showFieldError('suEmailErr','Enter a valid email.'); setInputState('suEmail','error'); valid = false; }
    if (!pass || pass.length < 8)      { showFieldError('suPasswordErr','Minimum 8 characters.'); setInputState('suPassword','error'); valid = false; }
    if (!confirm)                      { showFieldError('suConfirmErr','Please confirm your password.'); setInputState('suConfirm','error'); valid = false; }
    else if (pass !== confirm)         { showFieldError('suConfirmErr','Passwords do not match.'); setInputState('suConfirm','error'); valid = false; }

    if (!valid) return;

    setButtonLoading('signUpSubmit', true);
    await new Promise(r => setTimeout(r, 1400));

    ['suName','suEmail','suPassword','suConfirm'].forEach(id => setInputState(id,'success'));
    setButtonLoading('signUpSubmit', false);
    AuthState.login({ name, email });
    AuthModal.showSuccess(name, true);
});

// TOGGLE PASSWORD VISIBILITY
document.querySelectorAll('.toggle-pw').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = document.getElementById(btn.getAttribute('data-target'));
        const icon  = btn.querySelector('i');
        if (input.type === 'password') {
            input.type = 'text'; icon.className = 'fas fa-eye-slash'; btn.setAttribute('aria-label','Hide password');
        } else {
            input.type = 'password'; icon.className = 'fas fa-eye'; btn.setAttribute('aria-label','Show password');
        }
    });
});

// BUTTON REACTIVITY MAP
document.addEventListener('DOMContentLoaded', () => {

    // 1. Header Sign In
    document.getElementById('signInBtn').addEventListener('click', () => AuthModal.open('signin'));

    // 2. Hero "Start your first order"
    document.getElementById('heroSignUpBtn').addEventListener('click', () => AuthModal.open('signup'));

    // 3. Hero "View how it works"
    document.getElementById('heroHowBtn').addEventListener('click', () => {
        document.getElementById('how').scrollIntoView({ behavior: 'smooth' });
    });

    // 4. Pricing "Start Shopping" × 3 — auth-aware
    document.querySelectorAll('.shop-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            if (AuthState.isLoggedIn()) {
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            } else {
                AuthModal.open('signin');
            }
        });
    });

    // 5. CTA "Create a free account"
    document.getElementById('ctaSignUpBtn').addEventListener('click', () => AuthModal.open('signup'));

    // 6. App Store / Google Play
    document.querySelectorAll('.app-store-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const isApple = btn.getAttribute('aria-label').includes('App Store');
            showToast(isApple ? 'iOS app coming soon! Subscribe below to be notified.' : 'Android app coming soon! Subscribe below to be notified.', 4000);
        });
    });

    // 7. Logo → scroll to top
    document.querySelector('.logo').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // 8. Footer coming-soon links
    const comingSoon = ['About Us','Careers','Blog','Press','Partner with Us','Contact Us','Track Order','Returns','Delivery Info'];
    document.querySelectorAll('.footer-links a[href="#"]').forEach(link => {
        if (comingSoon.includes(link.textContent.trim())) {
            link.addEventListener('click', (e) => { e.preventDefault(); showToast(`"${link.textContent.trim()}" page coming soon!`); });
        }
    });

    // 9. Clear field errors on typing
    document.querySelectorAll('.auth-form input').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
            clearFieldError(input.id + 'Err');
        });
    });
});

// PHASE 1 — HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => { hamburger.classList.toggle('active'); navLinks.classList.toggle('active'); });
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => { hamburger.classList.remove('active'); navLinks.classList.remove('active'); });
});
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active'); navLinks.classList.remove('active');
    }
});


// PHASE 1 — HEADER SCROLL
const header = document.querySelector('.header');
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 50));


// PHASE 1 — BACK TO TOP
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => backToTop.classList.toggle('show', window.scrollY > 400));
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


// PHASE 1 — SCROLL ANIMATIONS
const fadeObserver = new IntersectionObserver(
    (entries) => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); fadeObserver.unobserve(e.target); } }); },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card,.category,.product-card,.pricing-card,.faq-item,.trust-item,.hero-content,.hero-image,.partner-logo,.coverage-content,.coverage-visual,.app-content,.app-visual,.newsletter-content')
        .forEach(el => { el.classList.add('fade-up'); fadeObserver.observe(el); });
});


// PHASE 1 — ANIMATED COUNTERS
function animateCounter(el, target, duration = 1800) {
    let start = 0;
    const isDecimal = !Number.isInteger(target);
    const inc = target / (duration / 16);
    const timer = setInterval(() => {
        start += inc;
        if (start >= target) { start = target; clearInterval(timer); }
        if (isDecimal)           el.textContent = start.toFixed(1);
        else if (target >= 1000) el.textContent = Math.floor(start).toLocaleString() + '+';
        else                     el.textContent = Math.floor(start) + '+';
    }, 16);
}
const counterObserver = new IntersectionObserver(
    (entries) => { entries.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('.trust-number').forEach(n => animateCounter(n, parseFloat(n.dataset.target))); counterObserver.unobserve(e.target); } }); },
    { threshold: 0.3 }
);
document.addEventListener('DOMContentLoaded', () => { const tb = document.querySelector('.trust-bar'); if (tb) counterObserver.observe(tb); });


// PHASE 1 — PRODUCT FILTERS
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns   = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            productCards.forEach(card => {
                const match = filter === 'all' || card.dataset.category === filter;
                card.classList.toggle('hidden', !match);
                if (match) { card.classList.remove('visible'); setTimeout(() => card.classList.add('visible'), 50); }
            });
        });
    });
});


// PHASE 1 — ADD TO CART (auth-aware)
document.addEventListener('DOMContentLoaded', () => {
    const cartToast = document.getElementById('cartToast');
    const toastMsg  = document.getElementById('cartToastMsg');
    let   toastTimer = null;

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!AuthState.isLoggedIn()) { showToast('Please sign in to add items to your cart!'); return; }
            const name = btn.closest('.product-card').querySelector('.product-name').textContent;
            btn.classList.add('added');
            btn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = '<i class="fas fa-plus"></i>'; }, 1500);
            toastMsg.textContent = `${name} added to cart!`;
            cartToast.classList.add('show');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => cartToast.classList.remove('show'), 2500);
        });
    });
});


// PHASE 1 — FAQ ACCORDION
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.faq-item').forEach(item => {
        const q = item.querySelector('.faq-question');
        const a = item.querySelector('.faq-answer');
        q.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(o => {
                o.classList.remove('active');
                o.querySelector('.faq-answer').classList.remove('open');
                o.querySelector('.faq-question').setAttribute('aria-expanded','false');
            });
            if (!isOpen) { item.classList.add('active'); a.classList.add('open'); q.setAttribute('aria-expanded','true'); }
        });
        q.addEventListener('keydown', (e) => { if (e.key==='Enter'||e.key===' ') { e.preventDefault(); q.click(); } });
    });
});

// PHASE 1 — SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const t = document.querySelector(link.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});


// PHASE 2 — COVERAGE CHECKER
document.addEventListener('DOMContentLoaded', () => {
    const input  = document.getElementById('coverageInput');
    const btn    = document.getElementById('coverageBtn');
    const result = document.getElementById('coverageResult');
    if (!input) return;

    const covered    = ['lagos','lekki','ikeja','victoria island','vi','surulere','yaba','ikoyi','ajah','festac','maryland','oshodi','alimosho','kosofe','apapa','mushin','abuja','wuse','wuse ii','maitama','garki','asokoro','gwarinpa','kubwa','nyanya','karu','utako','jabi','port harcourt','ph','portharcourt','rumuola','eleme','obio','akpor','trans amadi','old gra','new gra','ibadan','bodija','challenge','ring road','iyaganku','agodi','ui','mokola','gbagi'];
    const comingSoon = ['kano','enugu','kaduna','benin','benin city','onitsha','aba','uyo','calabar','jos'];

    function check() {
        const q = input.value.trim().toLowerCase();
        if (!q) { showRes('error','fa-exclamation-circle','Please enter a city or neighborhood.'); return; }
        btn.textContent = 'Checking...'; btn.disabled = true;
        setTimeout(() => {
            btn.textContent = 'Check Now'; btn.disabled = false;
            const d = q.replace(/\b\w/g,c=>c.toUpperCase());
            if (covered.some(a=>q.includes(a)||a.includes(q)))    showRes('available','fa-check-circle',`Great news! We deliver to <strong>${d}</strong>. Start your first order today.`);
            else if (comingSoon.some(a=>q.includes(a)||a.includes(q))) showRes('unavailable','fa-clock',`Coming to <strong>${d}</strong> soon! Subscribe below to be first to know.`);
            else showRes('unavailable','fa-info-circle',`We don't cover <strong>${d}</strong> yet, but we're expanding fast!`);
        }, 800);
    }

    function showRes(type, icon, msg) { result.className = `coverage-result ${type}`; result.innerHTML = `<i class="fas ${icon}"></i><span>${msg}</span>`; }

    btn.addEventListener('click', check);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
    input.addEventListener('input', () => { result.className = 'coverage-result'; });
});


// PHASE 2 — NEWSLETTER FORM
document.addEventListener('DOMContentLoaded', () => {
    const form    = document.getElementById('newsletterForm');
    const emailEl = document.getElementById('newsletterEmail');
    const errEl   = document.getElementById('newsletterError');
    const succEl  = document.getElementById('newsletterSuccess');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailEl.value.trim();
        errEl.style.display = 'none';
        if (!email)               { errEl.textContent='Please enter your email.'; errEl.style.display='block'; emailEl.focus(); return; }
        if (!emailRegex.test(email)) { errEl.textContent='Please enter a valid email.'; errEl.style.display='block'; emailEl.focus(); return; }
        const submitBtn = form.querySelector('.newsletter-btn');
        submitBtn.textContent='Sending...'; submitBtn.disabled=true;
        setTimeout(() => { form.style.display='none'; succEl.style.display='flex'; }, 1000);
    });
});


// CONSOLE BRANDING
console.log('%c\ud83d\uded2 FreshBasket Market', 'font-size:20px;font-weight:bold;color:#086647;');
console.log('%c\u2705 Auth + Full Button Reactivity Active', 'font-size:12px;color:#059669;');
console.log('%c\ud83d\ude80 Built by TonyDev', 'font-size:12px;color:#666;');