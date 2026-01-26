/**
 * Stats Counter Module
 * Handles animated counter for statistics
 */

export const StatsCounter = {
    stats: null,
    animated: false,

    init() {
        this.stats = document.querySelectorAll('.about__stat-number[data-count]');
        if (!this.stats.length) return;

        this.createObserver();
    },

    createObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animated = true;
                    this.animateStats();
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.about__stats');
        if (statsSection) observer.observe(statsSection);
    },

    animateStats() {
        this.stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'), 10);
            const duration = 2000;
            const start = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);

                stat.textContent = Math.floor(target * eased) + (stat.dataset.suffix || '');

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        });
    }
};

export default StatsCounter;
