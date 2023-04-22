{/* 
    SCRIPT PACKAGE 
    <script src="https://unpkg.com/scrollreveal"> </script> */}

ScrollReveal({
    reset: true,
    distance: '60px',
    duration: 2500,
    delay: 100
});

// Section - Headings 
ScrollReveal().reveal('.about h1, .service h1, .portfolio h1, .contact h1 ', { delay: 400, origin: 'left' });

// Navigation Bar - LOGO
ScrollReveal().reveal('.nav .nav-logo', { delay: 100, origin: 'top' });

// HOME - SECTION
ScrollReveal().reveal('.home-content h1', { delay: 100, origin: 'left' });
ScrollReveal().reveal('.animate-character', { delay: 200, origin: 'bottom' });
ScrollReveal().reveal('.Text_Slider', { delay: 200, origin: 'top' });
ScrollReveal().reveal('.home-content p', { delay: 100, origin: 'left', interval: 200 }); ScrollReveal().reveal('.social-icons', { delay: 200, origin: 'bottom' });
ScrollReveal().reveal('.home-btns', { delay: 200, origin: 'left', interval: 200 });

// ABOUT - SECTION
ScrollReveal().reveal('.about-col1', { delay: 200, origin: 'left' });
ScrollReveal().reveal('.about-col2', { delay: 200, origin: 'top' });
ScrollReveal().reveal('.tab-titles', { reset: false,delay: 200, origin: 'left' });

// SERVICE - SECTION
ScrollReveal().reveal('.subtext p', { delay: 200, origin: 'bottom' });
ScrollReveal().reveal('.card-container', { delay: 200, origin: 'top' });

// PORTFOLIO - SECTION
ScrollReveal().reveal('.subtext p', { delay: 200, origin: 'bottom' });
ScrollReveal().reveal('.portfolio p', { delay: 200, origin: 'bottom' });
ScrollReveal().reveal('.portfolio-card', { delay: 200, origin: 'top' });

// CONTACT - SECTION
ScrollReveal().reveal('.contact-column1 p', { delay: 100, origin: 'top' });
ScrollReveal().reveal('.contact-column1 .social-icons', { delay: 200, origin: 'bottom' });
ScrollReveal().reveal('.contact-column1 .home-btns ', { delay: 200, origin: 'bottom' });
ScrollReveal().reveal('.form input[type=submit] ', { delay: 100, origin: 'top' });