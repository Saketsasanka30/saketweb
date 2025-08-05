document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fade-in effect on scroll
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    // Hobbies Dropdown functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const is_open = content.classList.toggle('open');
            toggle.classList.toggle('active', is_open);

            if (is_open) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // Hobbies Image Modal functionality
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const hobbiesImages = document.querySelectorAll('.hobbies-gallery-container .image-grid img');
    const closeImageModalBtn = document.querySelector('.close-btn');

    hobbiesImages.forEach(img => {
        img.addEventListener('click', function() {
            imageModal.style.display = 'block';
            modalImage.src = this.src;
        });
    });

    // Close the image modal when the close button is clicked
    closeImageModalBtn.addEventListener('click', () => {
        imageModal.style.display = 'none';
    });

    // Close the image modal when the user clicks anywhere outside of the image
    window.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });

    // Project Details Modal functionality
    const projectModal = document.getElementById('project-modal');
    const projectDetailsView = document.getElementById('project-details-view');
    const projectImageView = document.getElementById('project-image-view');
    const projectFullImage = document.getElementById('project-full-image');

    const viewProjectBtn = document.querySelector('.project-btn');
    const closeProjectModalBtn = document.querySelector('.close-btn-project');
    const projectThumbnails = document.querySelectorAll('.project-image-grid img');
    const backBtn = document.getElementById('back-btn');

    viewProjectBtn.addEventListener('click', (e) => {
        e.preventDefault();
        projectModal.style.display = 'block';
    });

    closeProjectModalBtn.addEventListener('click', () => {
        projectModal.style.display = 'none';
        projectDetailsView.classList.remove('hidden');
        projectImageView.classList.add('hidden');
        backBtn.style.display = 'none';
    });

    // Handle clicks on project thumbnails
    projectThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            projectFullImage.src = this.src;
            projectDetailsView.classList.add('hidden');
            projectImageView.classList.remove('hidden');
            backBtn.style.display = 'block';
        });
    });

    // Handle "Back" button click
    backBtn.addEventListener('click', () => {
        projectImageView.classList.add('hidden');
        projectDetailsView.classList.remove('hidden');
        backBtn.style.display = 'none';
    });

    // Close project modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            projectModal.style.display = 'none';
            projectDetailsView.classList.remove('hidden');
            projectImageView.classList.add('hidden');
            backBtn.style.display = 'none';
        }
    });
});