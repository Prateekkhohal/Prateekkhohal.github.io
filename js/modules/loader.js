/**
 * Loader Module - Loading Screen
 * Handles the initial loading animation
 */

export const Loader = {
    loader: null,
    progressBar: null,
    progress: 0,

    init() {
        this.loader = document.querySelector('.loader');
        this.progressBar = document.querySelector('.loader__bar');

        if (!this.loader) return;

        this.simulateLoading();
    },

    simulateLoading() {
        const interval = setInterval(() => {
            this.progress += Math.random() * 15;
            if (this.progress >= 100) {
                this.progress = 100;
                clearInterval(interval);
                setTimeout(() => this.hide(), 300);
            }
            this.updateProgress();
        }, 100);
    },

    updateProgress() {
        if (this.progressBar) {
            this.progressBar.style.width = `${this.progress}%`;
        }
    },

    hide() {
        if (this.loader) {
            this.loader.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }
};

export default Loader;
