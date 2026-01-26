/**
 * Typewriter Module
 * Handles typewriter text animation effect
 */

import { typewriterWords } from '../../data/personalData.js';

export const TypeWriter = {
    element: null,
    words: typewriterWords,
    wordIndex: 0,
    charIndex: 0,
    isDeleting: false,
    typeSpeed: 100,

    init() {
        this.element = document.querySelector('.hero__typewriter');
        if (!this.element) return;

        this.type();
    },

    type() {
        const currentWord = this.words[this.wordIndex];

        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let speed = this.isDeleting ? 50 : this.typeSpeed;

        if (!this.isDeleting && this.charIndex === currentWord.length) {
            speed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.wordIndex = (this.wordIndex + 1) % this.words.length;
            speed = 500;
        }

        setTimeout(() => this.type(), speed);
    }
};

export default TypeWriter;
