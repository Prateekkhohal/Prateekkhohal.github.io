/**
 * Navigation Module
 * Handles navigation menu, hamburger toggle, and scroll effects
 */

export const Navigation = {
    nav: null,
    menu: null,
    hamburger: null,
    links: null,
    lastScroll: 0,

    init() {
        this.nav = document.querySelector('.nav');
        this.menu = document.querySelector('.nav__menu');
        this.hamburger = document.querySelector('.nav__hamburger');
        this.links = document.querySelectorAll('.nav__link');

        if (!this.nav) return;

        this.bindEvents();
        this.setActiveLink();
    },

    bindEvents() {
        // Hamburger toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
        }

        // Close menu on link click
        this.links.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Scroll effects
        window.addEventListener('scroll', () => {
            this.onScroll();
            this.setActiveLink();
        });

        // Escape key closes menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeMenu();
        });
    },

    toggleMenu() {
        this.hamburger.classList.toggle('is-active');
        this.menu.classList.toggle('is-open');

        const isOpen = this.menu.classList.contains('is-open');
        this.hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    },

    closeMenu() {
        this.hamburger?.classList.remove('is-active');
        this.menu?.classList.remove('is-open');
        this.hamburger?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    },

    onScroll() {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }

        this.lastScroll = currentScroll;
    },

    setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const link = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                this.links.forEach(l => l.classList.remove('active'));
                link?.classList.add('active');
            }
        });
    }
};

export default Navigation;
