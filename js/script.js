// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only apply smooth scrolling to in-page anchors (not external links)
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        }
    });
});


// Phase card interaction
document.querySelectorAll('.phase-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't trigger if the link was clicked directly
        if (!e.target.classList.contains('phase-link')) {
            const phaseLink = this.querySelector('.phase-link');
            if (phaseLink) {
                phaseLink.click();
            }
        }
    });
});

// Enhanced animation when elements come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            // Stop observing the element after it's animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe phase cards, overview sections, and other content elements
document.querySelectorAll('.phase-card, .phase-overview, .detail-card, .project-detail, .best-practices').forEach(el => {
    el.classList.add('animate__animated', 'animate__fadeIn');
    observer.observe(el);
});

// Enhanced toggle details/summary elements with animation
document.querySelectorAll('summary').forEach(summary => {
    summary.addEventListener('click', function() {
        const details = this.parentElement;
        // Add a class for styling when open
        if (details.hasAttribute('open')) {
            details.classList.remove('open');
        } else {
            details.classList.add('open');
        }
    });
});

// Back to top button
function createBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.id = 'backToTop';
    backToTopButton.title = 'Back to Top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(to right, #3f51b5, #1a237e);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
    `;

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(backToTopButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
            backToTopButton.style.transform = 'translateY(0)';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
            backToTopButton.style.transform = 'translateY(20px)';
        }
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Anti-AI Developer Roadmap loaded successfully!');

    // Create back to top button
    createBackToTopButton();

    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Add active class to navigation links when scrolling
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});