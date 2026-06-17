/* ===========================
   MAIN JAVASCRIPT FILE
   =========================== */

// ============ Navigation ============

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Handle keyboard navigation for hamburger
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        updateActiveLink(link.getAttribute('href'));
    });
});

// Update active navigation link
function updateActiveLink(hash) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        }
    });
}

// Active navigation link on scroll using IntersectionObserver
const sections = document.querySelectorAll('section');
const navObserverOptions = {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const activeId = entry.target.getAttribute('id');
            updateActiveLink(`#${activeId}`);
        }
    });
}, navObserverOptions);

sections.forEach(section => {
    navObserver.observe(section);
});

// ============ Portfolio Filter ============

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter portfolio items
        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hidden');
                item.classList.add('active'); // Ensure animated state is active when filtered
                item.style.animation = 'fadeIn 0.3s ease';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ============ Contact Form ============

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !subject || !message) {
            alert('Please fill out all fields');
            return;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Show success message
        alert(`Thank you ${name}! Your message has been sent successfully.\n\nWe'll get back to you at ${email} soon.`);

        // Reset form
        contactForm.reset();

        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, subject, message });
    });
}

// ============ Scroll Reveal Animation ============

const revealElements = document.querySelectorAll('.reveal');

const revealObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, revealObserverOptions);

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ============ Scroll to Top Button ============

const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 400) {
                    scrollToTopBtn.classList.add('show');
                } else {
                    scrollToTopBtn.classList.remove('show');
                }
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============ Utility Functions ============

// Log page load completion
window.addEventListener('load', () => {
    console.log('Portfolio website loaded successfully!');
});

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});

// ============ Typewriter Animation ============

const typewriterText = document.getElementById('typewriter');
const phrases = ['Flutter Apps.', 'MERN Stack.', 'Performance.', 'Clean Design.'];
let phraseIndex = 0;
let characterIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriterText.textContent = currentPhrase.substring(0, characterIndex - 1);
        characterIndex--;
        typeSpeed = 50; // faster deletion
    } else {
        typewriterText.textContent = currentPhrase.substring(0, characterIndex + 1);
        characterIndex++;
        typeSpeed = 100; // standard writing speed
    }

    if (!isDeleting && characterIndex === currentPhrase.length) {
        // Pause at the end of the phrase
        typeSpeed = 1500;
        isDeleting = true;
    } else if (isDeleting && characterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // pause before starting next phrase
    }

    setTimeout(type, typeSpeed);
}

if (typewriterText) {
    setTimeout(type, 1000);
}

// ============ Parallax Background Blobs ============

const blob1 = document.getElementById('blob1');
const blob2 = document.getElementById('blob2');
const blob3 = document.getElementById('blob3');

let mouseX = 0;
let mouseY = 0;
let mouseTicking = false;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!mouseTicking) {
        window.requestAnimationFrame(() => {
            const xOffset = (mouseX - window.innerWidth / 2) / 25;
            const yOffset = (mouseY - window.innerHeight / 2) / 25;

            if (blob1) blob1.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
            if (blob2) blob2.style.transform = `translate3d(${-xOffset}px, ${-yOffset}px, 0)`;
            if (blob3) blob3.style.transform = `translate3d(${xOffset * 0.5}px, ${-yOffset * 0.5}px, 0)`;
            mouseTicking = false;
        });
        mouseTicking = true;
    }
}, { passive: true });
