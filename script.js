document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Close the mobile menu if it's open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Fade-in animation on scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    // Hobbies Dropdown functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const isOpen = content.classList.toggle('open');
            toggle.classList.toggle('active', isOpen);

            if (isOpen) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // Hobbies Image Modal
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeImageModalBtn = document.querySelector('.close-btn');

    document.querySelectorAll('.image-grid img').forEach(img => {
        img.addEventListener('click', () => {
            imageModal.style.display = 'block';
            modalImage.src = img.src;
        });
    });

    closeImageModalBtn.addEventListener('click', () => {
        imageModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });

    // Project Modal (for Human-Following Robot)
    const projectModal = document.getElementById('project-modal');
    const closeProjectModalBtn = document.querySelector('.close-btn-project');

    document.querySelectorAll('.project-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Only show modal for "View Project" button, not for external links
            if (btn.getAttribute('data-project') === 'robot') {
                e.preventDefault();
                projectModal.style.display = 'block';
            }
        });
    });

    closeProjectModalBtn.addEventListener('click', () => {
        projectModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });
});
