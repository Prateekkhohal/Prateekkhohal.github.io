/**
 * Contact Form Module
 * Handles contact form validation
 */

export const ContactForm = {
    form: null,

    init() {
        this.form = document.querySelector('.contact__form');
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    handleSubmit(e) {
        const inputs = this.form.querySelectorAll('[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff3b30';
            } else {
                input.style.borderColor = '';
            }
        });

        if (!isValid) {
            e.preventDefault();
        }
    }
};

export default ContactForm;
