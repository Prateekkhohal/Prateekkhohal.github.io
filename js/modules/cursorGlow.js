/**
 * Cursor Glow Module
 * Handles cursor glow effect for desktop
 */

export const CursorGlow = {
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
      background: radial-gradient(circle, rgba(201, 169, 98, 0.08) 0%, transparent 70%);
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

export default CursorGlow;
