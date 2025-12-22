/**
 * Game Developer Portfolio - Epic 3D Experience
 * Author: Prateek Kumar
 * Version: 3.0.0 - Three.js Enhanced Edition
 * 
 * Features:
 * - Three.js 3D scene with rotating model
 * - Scroll-triggered animations
 * - Particle effects
 * - Smooth navigation
 */

(function () {
  'use strict';

  // ============================================
  // THREE.JS 3D SCENE
  // ============================================

  const Scene3D = {
    scene: null,
    camera: null,
    renderer: null,
    model: null,
    particles: null,
    rings: [],
    mouse: { x: 0, y: 0 },
    scrollProgress: 0,
    isInitialized: false,

    init() {
      if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded');
        return;
      }

      this.createScene();
      this.createCamera();
      this.createRenderer();
      this.createLights();
      this.createGeometry();
      this.createParticles();
      this.bindEvents();
      this.animate();
      this.isInitialized = true;
    },

    createScene() {
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.Fog(0x0a0a0f, 5, 30);
    },

    createCamera() {
      const aspect = window.innerWidth / window.innerHeight;
      this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
      this.camera.position.z = 8;
    },

    createRenderer() {
      const container = document.getElementById('canvas-container');
      if (!container) return;

      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x000000, 0);
      container.appendChild(this.renderer.domElement);
    },

    createLights() {
      // Ambient light
      const ambient = new THREE.AmbientLight(0x404040, 0.5);
      this.scene.add(ambient);

      // Cyan point light
      const cyanLight = new THREE.PointLight(0x00f0ff, 2, 20);
      cyanLight.position.set(5, 5, 5);
      this.scene.add(cyanLight);

      // Magenta point light
      const magentaLight = new THREE.PointLight(0xff00ff, 2, 20);
      magentaLight.position.set(-5, -5, 5);
      this.scene.add(magentaLight);

      // Green point light
      const greenLight = new THREE.PointLight(0x00ff88, 1, 15);
      greenLight.position.set(0, 5, -5);
      this.scene.add(greenLight);
    },

    createGeometry() {
      // Main geometric shape - Icosahedron
      const geometry = new THREE.IcosahedronGeometry(2, 1);
      const material = new THREE.MeshPhongMaterial({
        color: 0x0a0a0f,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.1,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      });
      this.model = new THREE.Mesh(geometry, material);
      this.scene.add(this.model);

      // Inner solid core
      const coreGeometry = new THREE.IcosahedronGeometry(1.5, 0);
      const coreMaterial = new THREE.MeshPhongMaterial({
        color: 0x1a1a2e,
        emissive: 0xff00ff,
        emissiveIntensity: 0.05,
        transparent: true,
        opacity: 0.6
      });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      this.model.add(core);

      // Orbiting rings
      for (let i = 0; i < 3; i++) {
        const ringGeometry = new THREE.TorusGeometry(2.5 + i * 0.5, 0.02, 16, 100);
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: i === 0 ? 0x00f0ff : i === 1 ? 0xff00ff : 0x00ff88,
          transparent: true,
          opacity: 0.6
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2 + (i * 0.3);
        ring.rotation.y = i * 0.5;
        this.rings.push(ring);
        this.scene.add(ring);
      }
    },

    createParticles() {
      const particleCount = 500;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const colorPalette = [
        new THREE.Color(0x00f0ff),
        new THREE.Color(0xff00ff),
        new THREE.Color(0x00ff88)
      ];

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 30;
        positions[i3 + 1] = (Math.random() - 0.5) * 30;
        positions[i3 + 2] = (Math.random() - 0.5) * 30;

        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
      });

      this.particles = new THREE.Points(geometry, material);
      this.scene.add(this.particles);
    },

    bindEvents() {
      window.addEventListener('resize', () => this.onResize());
      window.addEventListener('mousemove', (e) => this.onMouseMove(e));
      window.addEventListener('scroll', () => this.onScroll());
    },

    onResize() {
      if (!this.camera || !this.renderer) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    },

    onMouseMove(event) {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    },

    onScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = window.scrollY / scrollHeight;
    },

    animate() {
      requestAnimationFrame(() => this.animate());

      if (!this.model || !this.renderer) return;

      const time = Date.now() * 0.001;

      // Rotate main model based on scroll and mouse
      this.model.rotation.x = this.scrollProgress * Math.PI * 2 + this.mouse.y * 0.3;
      this.model.rotation.y = time * 0.2 + this.mouse.x * 0.3;
      this.model.rotation.z = Math.sin(time * 0.5) * 0.1;

      // Floating effect
      this.model.position.y = Math.sin(time) * 0.2;

      // Rotate rings
      this.rings.forEach((ring, index) => {
        ring.rotation.z = time * (0.2 + index * 0.1) * (index % 2 === 0 ? 1 : -1);
        ring.rotation.x = Math.PI / 2 + (index * 0.3) + Math.sin(time * 0.5) * 0.1;
      });

      // Rotate particles
      if (this.particles) {
        this.particles.rotation.y = time * 0.02;
        this.particles.rotation.x = time * 0.01;
      }

      // Move camera based on scroll
      this.camera.position.z = 8 + this.scrollProgress * 3;
      this.camera.position.y = this.scrollProgress * 2;

      this.renderer.render(this.scene, this.camera);
    }
  };

  // ============================================
  // LOADING SCREEN
  // ============================================

  const Loader = {
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

  // ============================================
  // NAVIGATION
  // ============================================

  const Navigation = {
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

  // ============================================
  // SCROLL ANIMATIONS
  // ============================================

  const ScrollAnimations = {
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

  // ============================================
  // SCROLL TO TOP
  // ============================================

  const ScrollTop = {
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

  // ============================================
  // SMOOTH SCROLL
  // ============================================

  const SmoothScroll = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          if (href === '#') return;

          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  };

  // ============================================
  // CONTACT FORM
  // ============================================

  const ContactForm = {
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

  // ============================================
  // TEXT TYPING EFFECT
  // ============================================

  const TypeWriter = {
    element: null,
    words: ['Game Developer', 'Unity Expert', 'Web Creator', 'App Builder'],
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

  // ============================================
  // CURSOR GLOW EFFECT
  // ============================================

  const CursorGlow = {
    glow: null,

    init() {
      // Only on desktop
      if (window.matchMedia('(hover: none)').matches) return;

      this.createGlow();
      this.bindEvents();
    },

    createGlow() {
      this.glow = document.createElement('div');
      this.glow.className = 'cursor-glow';
      this.glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(0, 240, 255, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: -1;
        transition: opacity 0.3s;
      `;
      document.body.appendChild(this.glow);
    },

    bindEvents() {
      document.addEventListener('mousemove', (e) => {
        if (this.glow) {
          this.glow.style.left = e.clientX + 'px';
          this.glow.style.top = e.clientY + 'px';
        }
      });
    }
  };

  // ============================================
  // STATS COUNTER
  // ============================================

  const StatsCounter = {
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

  // ============================================
  // INITIALIZATION
  // ============================================

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
})();
