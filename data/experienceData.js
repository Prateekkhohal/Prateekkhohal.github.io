/**
 * Experience Data - Work History and Education
 * Extracted from hardcoded HTML for easier maintenance
 */

export const experiences = [
    {
        id: 'phygitech',
        type: 'work',
        featured: true,
        isCurrent: true,
        title: 'Unity Developer',
        company: 'Phygitech Learning Solutions',
        icon: 'bx-glasses',
        duration: 'Mar 2025 - Present',
        location: 'Gurugram, India',
        locationType: 'onsite',
        achievements: [
            {
                emoji: '🎮',
                text: 'Developed and deployed <strong>40+ curriculum-aligned VR modules</strong> in Unity, transforming textbook topics into immersive learning experiences for Grades 1–12.'
            },
            {
                emoji: '🍎',
                text: 'Refactored Windows-specific DPVR SDK workflows to support <strong>Unity Editor tooling on macOS</strong>, enabling full-featured cross-platform development.'
            },
            {
                emoji: '🔧',
                text: 'Built a <strong>production-ready multilingual narration system</strong> with automated SO population, dictionary-cached lookups, and comprehensive editor tooling.'
            },
            {
                emoji: '📈',
                text: 'Improved <strong>user retention rate by 60%</strong> through strategic game design and engagement enhancements.'
            }
        ],
        skills: [
            { name: 'Unity 3D', primary: true },
            { name: 'VR Development', primary: true },
            { name: 'C#', primary: false },
            { name: 'DPVR SDK', primary: false },
            { name: 'EditorScripting', primary: false }
        ]
    },
    {
        id: 'wrexa',
        type: 'work',
        featured: false,
        isCurrent: false,
        title: 'Software Developer || Game Development',
        company: 'Wrexa Technologies',
        icon: 'bx-joystick',
        duration: 'May 2024 - Mar 2025 · 11 mos',
        location: 'United States · Remote',
        locationType: 'remote',
        achievements: [
            {
                emoji: '🚀',
                text: 'Designed and developed interactive projects using <strong>Unity, PlayCanvas, and Lens Studio</strong>, implementing scalable code in C#, C++ and JavaScript.'
            },
            {
                emoji: '👥',
                text: 'Led a team of developers and 3D artists to deliver <strong>11 projects</strong> within tight deadlines, enhancing productivity through effective project management.'
            },
            {
                emoji: '📊',
                text: 'Increased <strong>user engagement by 30%</strong> through innovative gameplay mechanics implementation.'
            },
            {
                emoji: '🎯',
                text: 'Improved <strong>click-through rate (CTR) by 25%</strong> through strategic game design and engagement enhancements.'
            }
        ],
        skills: [
            { name: 'Unity', primary: true },
            { name: 'PlayCanvas', primary: true },
            { name: 'Lens Studio', primary: false },
            { name: 'C#', primary: false },
            { name: 'JavaScript', primary: false },
            { name: 'Metaverse', primary: false }
        ]
    },
    {
        id: 'drdo',
        type: 'internship',
        featured: false,
        isCurrent: false,
        compact: true,
        title: 'Research Intern',
        company: 'DRDO - INMAS',
        icon: 'bx-atom',
        duration: '2023 · New Delhi',
        summary: 'Contributed to cutting-edge defense technology research and development projects at prestigious government facility.'
    },
    {
        id: 'rishikirti',
        type: 'internship',
        featured: false,
        isCurrent: false,
        compact: true,
        title: 'ERP Intern',
        company: 'Rishikirti Technologies',
        icon: 'bx-data',
        duration: '2022 · Noida',
        summary: 'Gained experience in JD Edwards ERP software implementation and enterprise solutions.'
    }
];

export const education = [
    {
        id: 'btech',
        title: 'B.Tech Computer Science',
        institution: 'CRSSIET Jhajjar',
        icon: 'bxs-graduation',
        duration: '2020 - 2024 · Jhajjar',
        summary: 'Bachelor of Technology in Computer Science & Engineering with focus on game development and software engineering.'
    }
];
