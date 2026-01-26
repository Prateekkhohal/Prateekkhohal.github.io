/**
 * Scene3D Module - Three.js 3D Scene
 * Handles the 3D background animation with voxels, particles and rings
 */

export const Scene3D = {
    scene: null,
    camera: null,
    renderer: null,
    model: null,
    particles: null,
    rings: [],
    voxels: [],
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
        // Ambient light - warm
        const ambient = new THREE.AmbientLight(0x2a2a2a, 0.6);
        this.scene.add(ambient);

        // Warm gold main light
        const goldLight = new THREE.PointLight(0xc9a962, 2.5, 25);
        goldLight.position.set(5, 5, 5);
        this.scene.add(goldLight);

        // Champagne accent light
        const champagneLight = new THREE.PointLight(0xf5f0e6, 1.5, 20);
        champagneLight.position.set(-5, -3, 5);
        this.scene.add(champagneLight);

        // Subtle warm rim light
        const rimLight = new THREE.PointLight(0xd4af37, 1, 15);
        rimLight.position.set(0, 5, -5);
        this.scene.add(rimLight);
    },

    createGeometry() {
        // Container for all voxels
        this.model = new THREE.Group();
        this.voxels = [];

        // Gold color palette
        const colors = [
            0xc9a962, // Primary gold
            0xd4af37, // Rich gold
            0xb8956c, // Warm copper
            0xf5f0e6, // Cream
            0x8b7355  // Bronze
        ];

        // Create voxel grid in a spherical pattern
        const gridSize = 3;
        const spacing = 0.8;

        for (let x = -gridSize; x <= gridSize; x++) {
            for (let y = -gridSize; y <= gridSize; y++) {
                for (let z = -gridSize; z <= gridSize; z++) {
                    // Spherical mask - only create voxels within radius
                    const distance = Math.sqrt(x * x + y * y + z * z);
                    if (distance > gridSize * 0.9) continue;

                    // Random chance to skip some voxels for organic look
                    if (Math.random() > 0.6) continue;

                    const size = 0.3 + Math.random() * 0.2;
                    const geometry = new THREE.BoxGeometry(size, size, size);

                    const colorIndex = Math.floor(Math.random() * colors.length);
                    const material = new THREE.MeshPhongMaterial({
                        color: colors[colorIndex],
                        emissive: colors[colorIndex],
                        emissiveIntensity: 0.1,
                        transparent: true,
                        opacity: 0.7 + Math.random() * 0.3,
                        shininess: 100
                    });

                    const voxel = new THREE.Mesh(geometry, material);
                    voxel.position.set(
                        x * spacing + (Math.random() - 0.5) * 0.2,
                        y * spacing + (Math.random() - 0.5) * 0.2,
                        z * spacing + (Math.random() - 0.5) * 0.2
                    );

                    // Store animation data
                    voxel.userData = {
                        originalPos: voxel.position.clone(),
                        floatSpeed: 0.5 + Math.random() * 1.5,
                        floatOffset: Math.random() * Math.PI * 2,
                        rotationSpeed: (Math.random() - 0.5) * 0.02
                    };

                    this.voxels.push(voxel);
                    this.model.add(voxel);
                }
            }
        }

        this.scene.add(this.model);

        // Add elegant outer rings with gold
        this.rings = [];
        for (let i = 0; i < 2; i++) {
            const ringGeometry = new THREE.TorusGeometry(3.5 + i * 0.6, 0.01, 16, 100);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: i === 0 ? 0xc9a962 : 0xf5f0e6,
                transparent: true,
                opacity: 0.4
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2 + (i * 0.4);
            ring.rotation.y = i * 0.3;
            this.rings.push(ring);
            this.scene.add(ring);
        }
    },

    createParticles() {
        const particleCount = 400;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        // Gold particle colors
        const colorPalette = [
            new THREE.Color(0xc9a962),
            new THREE.Color(0xd4af37),
            new THREE.Color(0xf5f0e6),
            new THREE.Color(0xb8956c)
        ];

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 25;
            positions[i3 + 1] = (Math.random() - 0.5) * 25;
            positions[i3 + 2] = (Math.random() - 0.5) * 25;

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.04,
            vertexColors: true,
            transparent: true,
            opacity: 0.6
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

        // Smooth rotation based on scroll and mouse
        this.model.rotation.x = this.scrollProgress * Math.PI * 0.5 + this.mouse.y * 0.2;
        this.model.rotation.y = time * 0.15 + this.mouse.x * 0.2;

        // Gentle floating effect
        this.model.position.y = Math.sin(time * 0.8) * 0.15;

        // Animate individual voxels for breathing effect
        if (this.voxels) {
            this.voxels.forEach(voxel => {
                const data = voxel.userData;
                // Float each voxel individually
                const floatY = Math.sin(time * data.floatSpeed + data.floatOffset) * 0.05;
                voxel.position.y = data.originalPos.y + floatY;
                // Subtle rotation
                voxel.rotation.x += data.rotationSpeed;
                voxel.rotation.y += data.rotationSpeed * 0.7;
            });
        }

        // Rotate rings elegantly
        this.rings.forEach((ring, index) => {
            ring.rotation.z = time * (0.15 + index * 0.05) * (index % 2 === 0 ? 1 : -1);
            ring.rotation.x = Math.PI / 2 + (index * 0.4) + Math.sin(time * 0.3) * 0.05;
        });

        // Rotate particles gently
        if (this.particles) {
            this.particles.rotation.y = time * 0.015;
            this.particles.rotation.x = time * 0.008;
        }

        // Smooth camera movement based on scroll
        this.camera.position.z = 8 + this.scrollProgress * 2;
        this.camera.position.y = this.scrollProgress * 1.5;

        this.renderer.render(this.scene, this.camera);
    }
};

export default Scene3D;
