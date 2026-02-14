// Mobile Nav Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const header = document.getElementById('header');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    themeToggle.textContent = body.dataset.theme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', body.dataset.theme);
});

// Load Theme
const savedTheme = localStorage.getItem('theme') || 'light';
body.dataset.theme = savedTheme;
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

// Form Handling
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! (Demo - integrate with EmailJS/Netlify later)');
    e.target.reset();
});

// Intersection Observer for Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.2s';
        }
    });
});
document.querySelectorAll('section').forEach(el => observer.observe(el));

// Experience item click handler
document.querySelectorAll('.experience-item[data-url]').forEach(item => {
    item.addEventListener('click', function () {
        const url = this.dataset.url;
        if (url) {
            window.open(url, '_blank');
        }
    });
});


// Initialize EmailJS
(function () {
    emailjs.init("cy82hGO3Fril0M_qO");
})();

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Set time for email template
    document.getElementById('time').value =
        new Date().toLocaleString();

    emailjs.sendForm(
        'service_0bw6oyl',
        'template_dnwqcfs',
        this
    ).then(
        function () {
            alert('Message sent successfully!');
            document.getElementById('contact-form').reset();
        },
        function (error) {
            console.error(error);
            alert('Failed to send message');
        }
    );
});
