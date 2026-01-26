/**
 * Scroll Animations Module
 * Handles Intersection Observer based scroll reveal animations
 */

export const ScrollAnimations = {
    elements: null,
    observer: null,

    init() {
        this.elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .timeline__item');

        if (!this.elements.length) return;

        this.createObserver();
        this.observeElements();
    },

    createObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, options);
    },

    observeElements() {
        this.elements.forEach(el => this.observer.observe(el));
    }
};

export default ScrollAnimations;
