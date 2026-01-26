/**
 * Scroll Top Module
 * Handles scroll to top button visibility and functionality
 */

export const ScrollTop = {
    button: null,

    init() {
        this.button = document.querySelector('.scroll-top');
        if (!this.button) return;

        this.bindEvents();
    },

    bindEvents() {
        window.addEventListener('scroll', () => this.toggleVisibility());
        this.button.addEventListener('click', () => this.scrollToTop());
    },

    toggleVisibility() {
        const scrolled = window.scrollY > window.innerHeight * 0.3;
        this.button.classList.toggle('is-visible', scrolled);
    },

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

export default ScrollTop;
