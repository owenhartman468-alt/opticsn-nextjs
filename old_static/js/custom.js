// Navbar shadow on scroll
window.addEventListener('scroll', () => {
    document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 40);
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// Taglines reveal
const tagItems = document.querySelectorAll('.tagline-item');
const tagObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 180);
        }
    });
}, { threshold: 0.2 });
tagItems.forEach(el => tagObs.observe(el));

// Animated counters
function animateCount(el, target, suffix) {
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
        start += step;
        if (start >= target) { el.textContent = target + suffix; clearInterval(timer); }
        else { el.textContent = Math.floor(start) + suffix; }
    }, 20);
}

const statObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const nums = e.target.querySelectorAll('.stat-number');
            nums.forEach(n => {
                const txt = n.textContent;
                if (txt.includes('+')) animateCount(n, parseInt(txt), '+');
                else if (txt.includes('%')) animateCount(n, parseInt(txt), '%');
            });
            statObs.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.stats-bar').forEach(el => statObs.observe(el));

// Form submit handler
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target;
    btn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Appointment Request Sent!';
    btn.style.background = 'var(--gold)';
    setTimeout(() => {
        btn.innerHTML = '<i class="bi bi-calendar-check me-2"></i>Confirm My Appointment';
        btn.style.background = '';
    }, 3500);
}