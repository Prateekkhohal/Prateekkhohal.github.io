/**
 * Personal Data - Contact Info, Stats, Social Links
 * Extracted from hardcoded HTML for easier maintenance
 */

export const personalInfo = {
    name: 'Prateek Kumar',
    title: 'Game Developer & Creative Technologist',
    tagline: 'I Create Digital Worlds',
    description: 'Hi, I\'m <strong>Prateek Kumar</strong> — a passionate Game Developer & Creative Technologist crafting immersive experiences with Unity, VR, and cutting-edge web technologies.',
    email: 'Prateekkhohal@outlook.com',
    resumePath: './Assets/PDF/Prateek_Kumar_Resume.pdf',
    availability: 'Available for Projects'
};

export const aboutText = [
    'I\'m a <strong>software engineer and game developer</strong> with a deep passion for creating innovative digital experiences. From immersive VR games to responsive web applications, I bring ideas to life with clean code and creative design.',
    'With expertise in <strong>Unity, C#, Python, and modern web technologies</strong>, I specialize in building applications that are not only functional but also visually stunning. I believe in the power of interactive media to tell stories and connect people.'
];

export const stats = [
    { count: 10, suffix: '+', label: 'Projects Completed' },
    { count: 3, suffix: '+', label: 'Years Experience' },
    { count: 10, suffix: '+', label: 'Technologies' }
];

export const contactText = 'I\'m always excited to collaborate on interesting projects. Whether you need a game developer, web expert, or creative technologist — let\'s bring your vision to life!';

export const socialLinks = {
    primary: [
        {
            type: 'email',
            icon: 'bx-envelope',
            label: 'Email',
            value: 'Prateekkhohal@outlook.com',
            href: 'mailto:Prateekkhohal@outlook.com'
        },
        {
            type: 'linkedin',
            icon: 'bxl-linkedin',
            label: 'LinkedIn',
            value: 'prateek-khohal',
            href: 'https://www.linkedin.com/in/prateek-khohal',
            external: true
        },
        {
            type: 'github',
            icon: 'bxl-github',
            label: 'GitHub',
            value: 'Prateekkhohal',
            href: 'https://github.com/Prateekkhohal',
            external: true
        }
    ],
    social: [
        {
            type: 'twitter',
            icon: 'bxl-twitter',
            label: 'Twitter',
            href: 'https://twitter.com/PrateekKhohal'
        },
        {
            type: 'instagram',
            icon: 'bxl-instagram',
            label: 'Instagram',
            href: 'https://www.instagram.com/prateek.khohal_'
        },
        {
            type: 'linktree',
            icon: 'bx-link',
            label: 'Linktree',
            href: 'https://linktr.ee/prateekkhohal'
        }
    ]
};

export const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#portfolio', label: 'Work' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' }
];

export const typewriterWords = ['Game Developer', 'Unity Expert', 'Web Creator', 'App Builder'];
