/* ============================================================
   RAMA DEVI — PROFESSIONAL PORTFOLIO
   Interactive Features & Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========== MOBILE NAVIGATION ==========
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    function openMenu() {
        navMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (navToggle) navToggle.addEventListener('click', openMenu);
    if (navClose) navClose.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('open') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeMenu();
        }
    });


    // ========== HEADER SCROLL EFFECT ==========
    const header = document.getElementById('header');

    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();


    // ========== ACTIVE NAV LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink, { passive: true });


    // ========== TYPEWRITER EFFECT ==========
    const typewriterEl = document.getElementById('typewriter');
    const roles = [
        'Cybersecurity Strategist',
        'R&D Lead',
        'Training Architect'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeWriter() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 400;
        }

        setTimeout(typeWriter, typingSpeed);
    }

    if (typewriterEl) {
        typeWriter();
    }


    // ========== COUNTER ANIMATION ==========
    const statNumbers = document.querySelectorAll('.hero__stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        statNumbers.forEach(stat => {
            const countStr = stat.getAttribute('data-count');
            const target = parseFloat(countStr);
            const isFloat = countStr.includes('.');
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
                }
            }, 16);
        });

        countersAnimated = true;
    }

    // Trigger counters when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.3 });

    const heroSection = document.getElementById('home');
    if (heroSection) heroObserver.observe(heroSection);


    // ========== SCROLL REVEAL ANIMATIONS ==========
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ========== PROJECTS FILTERS ==========
    const filterBtns = document.querySelectorAll('.portfolio__filter');
    const portfolioCards = document.querySelectorAll('.portfolio__card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });


    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btnText = submitBtn.querySelector('.btn__text');
            const btnLoading = submitBtn.querySelector('.btn__loading');

            // Show loading state
            if (btnText) btnText.style.display = 'none';
            if (btnLoading) btnLoading.style.display = 'inline-flex';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            formData.append("access_key", "34c69a20-fbfb-4909-8a8d-4c161533edcb");

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Success! Your message has been sent.");
                    contactForm.reset();

                    if (formStatus) {
                        formStatus.className = 'form__status success';
                        formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
                        formStatus.style.display = 'block';
                    }
                } else {
                    alert("Error: " + data.message);
                    if (formStatus) {
                        formStatus.className = 'form__status error';
                        formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error: ' + data.message;
                        formStatus.style.display = 'block';
                    }
                }
            } catch (error) {
                alert("Something went wrong. Please try again.");
                if (formStatus) {
                    formStatus.className = 'form__status error';
                    formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again.';
                    formStatus.style.display = 'block';
                }
            } finally {
                if (btnText) btnText.style.display = 'inline-flex';
                if (btnLoading) btnLoading.style.display = 'none';
                submitBtn.disabled = false;

                // Hide status message after 5 seconds
                if (formStatus) {
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                }
            }
        });
    }


    // ========== BACK TO TOP BUTTON ==========
    const backToTop = document.getElementById('back-to-top');

    function handleBackToTop() {
        if (window.scrollY > 400) {
            if (backToTop) backToTop.classList.add('visible');
        } else {
            if (backToTop) backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleBackToTop, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // ========== FLOATING PARTICLES (Hero) ==========
    const particlesContainer = document.getElementById('particles');

    function createParticles() {
        if (!particlesContainer) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: ${Math.random() > 0.5 ? 'rgba(0, 255, 163, 0.3)' : 'rgba(16, 185, 129, 0.3)'};
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 4}s;
                pointer-events: none;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    if (particlesContainer) createParticles();


    // ========== EXPERIENCE CARD MOUSE TRACKING ==========
    const experienceCards = document.querySelectorAll('.experience-card');

    experienceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });


    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 72;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
