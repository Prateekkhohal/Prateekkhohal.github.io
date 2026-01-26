/**
 * Game Developer Portfolio - Main Entry Point
 * Author: Prateek Kumar
 * Version: 4.0.0 - Modular Edition
 * 
 * This is the main entry point that imports and initializes all modules.
 */

// Import modules
import { Scene3D } from './modules/scene3d.js';
import { Loader } from './modules/loader.js';
import { Navigation } from './modules/navigation.js';
import { ScrollAnimations } from './modules/scrollAnimations.js';
import { ScrollTop } from './modules/scrollTop.js';
import { SmoothScroll } from './modules/smoothScroll.js';
import { ContactForm } from './modules/contactForm.js';
import { TypeWriter } from './modules/typewriter.js';
import { CursorGlow } from './modules/cursorGlow.js';
import { StatsCounter } from './modules/statsCounter.js';

/**
 * Initialize all modules
 */
function init() {
    // Hide overflow during loading
    document.body.style.overflow = 'hidden';

    // Initialize modules
    Loader.init();
    Navigation.init();
    ScrollAnimations.init();
    ScrollTop.init();
    SmoothScroll.init();
    ContactForm.init();
    TypeWriter.init();
    CursorGlow.init();
    StatsCounter.init();

    // Initialize Three.js after a short delay
    setTimeout(() => {
        Scene3D.init();
    }, 100);

    // Update copyright year
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
