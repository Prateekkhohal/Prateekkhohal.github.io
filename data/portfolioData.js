/**
 * Portfolio Data - Projects and Skills
 * Extracted from hardcoded HTML for easier maintenance
 */

export const projects = [
    {
        id: 'merry-snowball-vr',
        title: 'Merry Snowball VR',
        category: 'VR Game',
        description: 'An immersive VR winter experience where players throw snowballs in a whimsical virtual wonderland. Built with Unity XR toolkit.',
        technologies: ['Unity', 'VR', 'C#'],
        image: './Assets/IMAGES/Merry_Snowball_Game.webp',
        imageAlt: 'Merry Snowball VR Game - Winter themed VR experience',
        link: 'https://github.com/Prateekkhohal/Merry_Snowball_VR_Game'
    },
    {
        id: 'mario-2d',
        title: 'Mario 2D Remake',
        category: '2D Game',
        description: 'A loving tribute to the classic platformer with revamped gameplay mechanics, hidden secrets, and nostalgic retro aesthetics.',
        technologies: ['Unity', '2D', 'C#'],
        image: './Assets/IMAGES/Mario_2D.webp',
        imageAlt: 'Mario 2D - Classic platformer reimagined',
        link: 'https://github.com/Prateekkhohal/Mario_2D'
    },
    {
        id: 'color-switch',
        title: 'Color Switch',
        category: 'Arcade',
        description: 'Navigate a bouncing ball through vibrant colored obstacles in this addictively minimalist arcade experience.',
        technologies: ['Unity', 'Mobile', 'Casual'],
        image: './Assets/IMAGES/Color_Switch.webp',
        imageAlt: 'Color Switch - Minimalist arcade game',
        link: 'https://github.com/Prateekkhohal/Color_Switch'
    },
    {
        id: 'speed-racer',
        title: 'Speed Racer',
        category: 'Racing',
        description: 'Experience adrenaline-pumping high-speed racing with realistic physics, dynamic tracks, and competitive gameplay.',
        technologies: ['Unity', '3D', 'Physics'],
        image: './Assets/IMAGES/Car_Racing_Game.webp',
        imageAlt: 'Car Racing Game - High-speed racing action',
        link: 'https://github.com/Prateekkhohal/Car_Racing_Game'
    },
    {
        id: 'appetizers',
        title: 'Appetizers',
        category: 'iOS App',
        description: 'A feature-rich iOS food delivery application with smooth animations, cart functionality, and elegant SwiftUI design.',
        technologies: ['SwiftUI', 'iOS', 'Mobile'],
        image: './Assets/IMAGES/Appetizers.webp',
        imageAlt: 'Appetizers - Food delivery mobile app',
        link: 'https://github.com/Prateekkhohal/appetizers'
    },
    {
        id: 'weather-app',
        title: 'Weather App',
        category: 'iOS App',
        description: 'Beautiful iOS weather application replicating Apple\'s design language with real-time data and smooth animations.',
        technologies: ['SwiftUI', 'API', 'iOS'],
        image: './Assets/IMAGES/ios-weather.webp',
        imageAlt: 'Weather App - iOS weather application',
        link: 'https://github.com/Prateekkhohal/weather--app'
    }
];

export const skills = [
    {
        id: 'game-dev',
        icon: 'bx-joystick',
        title: 'Game Development',
        description: 'Creating immersive gaming experiences using Unity Engine with focus on gameplay mechanics, physics systems, and engaging player experiences.',
        tags: ['Unity', 'C#', '2D/3D']
    },
    {
        id: 'vr-ar',
        icon: 'bx-glasses',
        title: 'VR/AR Development',
        description: 'Building virtual and augmented reality experiences that push the boundaries of interactive technology and immersive storytelling.',
        tags: ['VR', 'AR', 'XR']
    },
    {
        id: 'web-dev',
        icon: 'bx-code-alt',
        title: 'Web Development',
        description: 'Crafting responsive, high-performance websites and web applications with modern frameworks and cutting-edge technologies.',
        tags: ['HTML/CSS', 'JavaScript', 'Three.js']
    },
    {
        id: 'app-dev',
        icon: 'bx-mobile-alt',
        title: 'App Development',
        description: 'Developing native and cross-platform mobile applications for iOS and Android with intuitive user interfaces and smooth performance.',
        tags: ['iOS', 'SwiftUI', 'Android', 'Mobile']
    },
    {
        id: 'ai-automation',
        icon: 'bx-bot',
        title: 'AI & Automation',
        description: 'Implementing AI-driven solutions, automation tools, and machine learning integrations to enhance application intelligence.',
        tags: ['Python', 'Agentic AI', 'RAG', 'LangChain', 'RAAS', 'AI', 'ML', 'Automation']
    },
    {
        id: 'ui-ux',
        icon: 'bx-palette',
        title: 'UI/UX Design',
        description: 'Designing user-centered interfaces that combine aesthetics with functionality, ensuring seamless and delightful user experiences.',
        tags: ['Figma', 'Canva', 'UI', 'UX']
    }
];
