document.addEventListener('DOMContentLoaded', () => {
    initSkills();
    initNavScroll();
    initRevealElements();
});

function initSkills() {
    const skillSection = document.querySelector('#skills');
    const skillBars = document.querySelectorAll('.skill-fill');

    if (!skillSection || !skillBars.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach((bar, index) => {
                    const parentItem = bar.closest('.skill-item');
                    const valueLabel = parentItem?.querySelector('.skill-head span:last-child');
                    const textValue = valueLabel?.textContent || '';
                    const parsed = parseFloat(bar.dataset.skillLevel ?? textValue.replace(/[^\d.]/g, '')) || 0;
                    const clamped = Math.max(0, Math.min(100, parsed));
                    bar.dataset.skillLevel = clamped;
                    bar.style.setProperty('--skill-level', `${clamped}%`);
                    bar.style.setProperty('--skill-delay', `${0.15 * index}s`);
                    bar.classList.add('is-visible');
                });
                obs.disconnect();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(skillSection);
}

function initNavScroll() {
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    const navList = document.querySelector('.nav-list');
    const toggle = document.querySelector('.nav-toggle');
    if (!navLinks.length) return;

    const sectionEntries = [];

    navLinks.forEach(link => {
        const targetId = link.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) return;
        const section = document.querySelector(targetId);
        if (section) sectionEntries.push({ section, linkTarget: targetId });
    });

    const skills = document.querySelector('#skills');
    if (skills) {
        sectionEntries.push({ section: skills, linkTarget: '#about' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            const targetId = link.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) return;

            const section = document.querySelector(targetId);
            if (!section) return;

            event.preventDefault();
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (navList && toggle && navList.classList.contains('is-open')) {
                navList.classList.remove('is-open');
                toggle.classList.remove('is-open');
            }
        });
    });

    if (toggle && navList) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('is-open');
            navList.classList.toggle('is-open');
            document.querySelector('.nav-surface')?.classList.toggle('is-open');
        });
    }

    const setActiveLink = () => {
        const scrollPosition = window.scrollY + 150;
        let currentTarget = sectionEntries[0]?.linkTarget;

        sectionEntries.forEach(({ section, linkTarget }) => {
            if (!section) return;
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < bottom) {
                currentTarget = linkTarget;
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === currentTarget);
        });
    };

    setActiveLink();
    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(setActiveLink);
    });
}

function initRevealElements() {
    const revealItems = document.querySelectorAll('.animate-on-load');
    if (!revealItems.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(item => observer.observe(item));
}
