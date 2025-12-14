/**
 * Portfolio Website - Main JavaScript
 * Author: Prateek Kumar
 * Version: 2.0.0
 * 
 * Modern, accessible, and maintainable JavaScript
 */

(function () {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================

  const CONFIG = {
    scrollThreshold: 0.2,
    animationDuration: 2500,
    animationDistance: '60px',
    animationDelay: 100,
  };

  // ============================================
  // DOM ELEMENTS
  // ============================================

  const DOM = {
    // Navigation
    nav: document.querySelector('.nav'),
    navMenu: document.querySelector('.nav__menu'),
    navLinks: document.querySelectorAll('.nav__link'),
    hamburger: document.querySelector('.nav__hamburger'),
    themeToggle: document.getElementById('theme-toggle'),
    scrollTopBtn: document.querySelector('.scroll-top'),

    // About Section
    readMoreBtn: document.getElementById('read-more-btn'),
    bioExtended: document.getElementById('bio-extended'),
    bioDots: document.getElementById('bio-dots'),

    // Tabs
    tabButtons: document.querySelectorAll('.tabs__button'),
    tabPanels: document.querySelectorAll('.tabs__panel'),
  };

  // ============================================
  // UTILITIES
  // ============================================

  /**
   * Safely add event listener with null check
   */
  function addEvent(element, event, handler, options) {
    if (element) {
      element.addEventListener(event, handler, options);
    }
  }

  /**
   * Toggle class on element
   */
  function toggleClass(element, className) {
    if (element) {
      element.classList.toggle(className);
    }
  }

  /**
   * Remove class from element
   */
  function removeClass(element, className) {
    if (element) {
      element.classList.remove(className);
    }
  }

  /**
   * Add class to element
   */
  function addClass(element, className) {
    if (element) {
      element.classList.add(className);
    }
  }

  /**
   * Debounce function for performance
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ============================================
  // NAVIGATION MODULE
  // ============================================

  const Navigation = {
    init() {
      this.bindEvents();
    },

    bindEvents() {
      // Hamburger menu toggle
      addEvent(DOM.hamburger, 'click', () => this.toggleMenu());

      // Close menu when clicking nav links
      DOM.navLinks.forEach((link) => {
        addEvent(link, 'click', () => this.closeMenu());
      });

      // Close menu when clicking outside
      addEvent(document, 'click', (e) => {
        if (
          DOM.navMenu &&
          DOM.hamburger &&
          !DOM.navMenu.contains(e.target) &&
          !DOM.hamburger.contains(e.target)
        ) {
          this.closeMenu();
        }
      });

      // Handle escape key
      addEvent(document, 'keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeMenu();
        }
      });
    },

    toggleMenu() {
      toggleClass(DOM.hamburger, 'is-active');
      toggleClass(DOM.navMenu, 'is-open');

      // Toggle aria-expanded for accessibility
      if (DOM.hamburger) {
        const isExpanded = DOM.hamburger.classList.contains('is-active');
        DOM.hamburger.setAttribute('aria-expanded', isExpanded);
      }
    },

    closeMenu() {
      removeClass(DOM.hamburger, 'is-active');
      removeClass(DOM.navMenu, 'is-open');

      if (DOM.hamburger) {
        DOM.hamburger.setAttribute('aria-expanded', 'false');
      }
    },
  };

  // ============================================
  // SCROLL MODULE
  // ============================================

  const Scroll = {
    init() {
      this.bindEvents();
      this.checkScrollPosition();
    },

    bindEvents() {
      // Scroll event with debounce for performance
      addEvent(document, 'scroll', debounce(() => this.checkScrollPosition(), 10));

      // Scroll to top button
      addEvent(DOM.scrollTopBtn, 'click', () => this.scrollToTop());
    },

    checkScrollPosition() {
      const scrollTotal =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollProgress = document.documentElement.scrollTop / scrollTotal;

      if (scrollProgress > CONFIG.scrollThreshold) {
        addClass(DOM.scrollTopBtn, 'is-visible');
      } else {
        removeClass(DOM.scrollTopBtn, 'is-visible');
      }
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  };

  // ============================================
  // THEME MODULE
  // ============================================

  const Theme = {
    storageKey: 'portfolio-theme',

    init() {
      this.loadSavedTheme();
      this.bindEvents();
    },

    bindEvents() {
      addEvent(DOM.themeToggle, 'click', () => this.toggleTheme());
    },

    loadSavedTheme() {
      const savedTheme = localStorage.getItem(this.storageKey);
      
      if (savedTheme) {
        document.body.classList.add(`theme-${savedTheme}`);
        this.updateIcon(savedTheme === 'dark');
      }
    },

    toggleTheme() {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDarkMode = document.body.classList.contains('theme-dark');
      const isLightMode = document.body.classList.contains('theme-light');

      if (prefersDark) {
        // User prefers dark, toggle to light
        toggleClass(document.body, 'theme-light');
        document.body.classList.remove('theme-dark');
        
        const newTheme = document.body.classList.contains('theme-light') ? 'light' : null;
        this.saveTheme(newTheme);
        this.updateIcon(!document.body.classList.contains('theme-light'));
      } else {
        // User prefers light, toggle to dark
        toggleClass(document.body, 'theme-dark');
        document.body.classList.remove('theme-light');
        
        const newTheme = document.body.classList.contains('theme-dark') ? 'dark' : null;
        this.saveTheme(newTheme);
        this.updateIcon(document.body.classList.contains('theme-dark'));
      }
    },

    saveTheme(theme) {
      if (theme) {
        localStorage.setItem(this.storageKey, theme);
      } else {
        localStorage.removeItem(this.storageKey);
      }
    },

    updateIcon(isDark) {
      if (DOM.themeToggle) {
        const icon = DOM.themeToggle.querySelector('i');
        if (icon) {
          if (isDark) {
            icon.classList.remove('bx-moon');
            icon.classList.add('bx-sun');
          } else {
            icon.classList.remove('bx-sun');
            icon.classList.add('bx-moon');
          }
        }
      }
    },
  };

  // ============================================
  // TABS MODULE
  // ============================================

  const Tabs = {
    init() {
      this.bindEvents();
    },

    bindEvents() {
      DOM.tabButtons.forEach((button) => {
        addEvent(button, 'click', (e) => this.switchTab(e));
      });
    },

    switchTab(e) {
      const targetId = e.currentTarget.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);

      if (!targetPanel) return;

      // Remove active state from all buttons
      DOM.tabButtons.forEach((btn) => {
        removeClass(btn, 'is-active');
        btn.setAttribute('aria-selected', 'false');
      });

      // Remove active state from all panels
      DOM.tabPanels.forEach((panel) => {
        removeClass(panel, 'is-active');
        panel.setAttribute('hidden', '');
      });

      // Activate clicked button and corresponding panel
      addClass(e.currentTarget, 'is-active');
      e.currentTarget.setAttribute('aria-selected', 'true');
      addClass(targetPanel, 'is-active');
      targetPanel.removeAttribute('hidden');
    },
  };

  // ============================================
  // READ MORE MODULE
  // ============================================

  const ReadMore = {
    init() {
      this.bindEvents();
    },

    bindEvents() {
      addEvent(DOM.readMoreBtn, 'click', () => this.toggle());
    },

    toggle() {
      if (!DOM.bioExtended || !DOM.bioDots || !DOM.readMoreBtn) return;

      const isExpanded = DOM.bioExtended.classList.contains('is-visible');

      if (isExpanded) {
        removeClass(DOM.bioExtended, 'is-visible');
        removeClass(DOM.bioDots, 'is-hidden');
        DOM.readMoreBtn.textContent = 'Read more';
        DOM.readMoreBtn.setAttribute('aria-expanded', 'false');
      } else {
        addClass(DOM.bioExtended, 'is-visible');
        addClass(DOM.bioDots, 'is-hidden');
        DOM.readMoreBtn.textContent = 'Read less';
        DOM.readMoreBtn.setAttribute('aria-expanded', 'true');
      }
    },
  };

  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================

  const Animations = {
    init() {
      // Check if ScrollReveal is available
      if (typeof ScrollReveal === 'undefined') {
        console.warn('ScrollReveal is not loaded');
        return;
      }

      const sr = ScrollReveal({
        reset: true,
        distance: CONFIG.animationDistance,
        duration: CONFIG.animationDuration,
        delay: CONFIG.animationDelay,
      });

      // Section Headers
      sr.reveal('.section__title', { delay: 200, origin: 'left' });

      // Navigation
      sr.reveal('.nav__logo', { delay: 100, origin: 'top' });

      // Hero Section
      sr.reveal('.hero__greeting', { delay: 100, origin: 'left' });
      sr.reveal('.hero__name', { delay: 200, origin: 'bottom' });
      sr.reveal('.hero__title-wrapper', { delay: 200, origin: 'top' });
      sr.reveal('.hero__description', { delay: 300, origin: 'left' });
      sr.reveal('.hero__buttons', { delay: 400, origin: 'left' });
      sr.reveal('.hero__social', { delay: 500, origin: 'bottom' });

      // About Section
      sr.reveal('.about__profile', { delay: 200, origin: 'left' });
      sr.reveal('.about__info', { delay: 300, origin: 'right' });
      sr.reveal('.tabs', { reset: false, delay: 400, origin: 'bottom' });

      // Services Section
      sr.reveal('.services__intro', { delay: 200, origin: 'bottom' });
      sr.reveal('.service-card', { delay: 200, origin: 'bottom', interval: 150 });

      // Portfolio Section
      sr.reveal('.portfolio-card', { delay: 200, origin: 'bottom', interval: 150 });

      // Contact Section
      sr.reveal('.contact__info', { delay: 200, origin: 'left' });
      sr.reveal('.contact-form', { delay: 300, origin: 'right' });
    },
  };

  // ============================================
  // FORM VALIDATION (Basic)
  // ============================================

  const Form = {
    init() {
      const form = document.querySelector('.contact-form');
      addEvent(form, 'submit', (e) => this.handleSubmit(e));
    },

    handleSubmit(e) {
      const form = e.target;
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');

      let isValid = true;

      if (name && !name.value.trim()) {
        isValid = false;
      }

      if (email && !this.isValidEmail(email.value)) {
        isValid = false;
      }

      if (message && !message.value.trim()) {
        isValid = false;
      }

      if (!isValid) {
        e.preventDefault();
        // Could add visual feedback here
      }
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
  };

  // ============================================
  // INITIALIZATION
  // ============================================

  function init() {
    Navigation.init();
    Scroll.init();
    Theme.init();
    Tabs.init();
    ReadMore.init();
    Animations.init();
    Form.init();
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
