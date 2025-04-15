// Mobile App Navigation and Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const mobileNavLinks = document.querySelectorAll('.mobile-bottom-nav .nav-link');
    const sections = document.querySelectorAll('section');
    let currentSection = 'home';

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            
            // Update active state
            mobileNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Update current section
            currentSection = target;
            
            // Show/hide sections
            sections.forEach(section => {
                if (section.id === target) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });

            // Update header title
            const headerTitle = document.querySelector('.header-title');
            headerTitle.textContent = this.querySelector('span').textContent;
        });
    });

    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
            // Add overlay when sidebar is shown
            if (sidebar.classList.contains('show')) {
                const overlay = document.createElement('div');
                overlay.className = 'sidebar-overlay';
                document.body.appendChild(overlay);
                overlay.addEventListener('click', function() {
                    sidebar.classList.remove('show');
                    overlay.remove();
                });
            } else {
                const overlay = document.querySelector('.sidebar-overlay');
                if (overlay) overlay.remove();
            }
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (sidebar && sidebar.classList.contains('show')) {
            if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
                sidebar.classList.remove('show');
                const overlay = document.querySelector('.sidebar-overlay');
                if (overlay) overlay.remove();
            }
        }
    });

    // Handle form inputs for better mobile experience
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            // Scroll input into view when focused on mobile
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    this.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            }
        });
    });

    // Chapter selection handling
    const chapterCheckboxes = document.querySelectorAll('.chapter-checkbox');
    const generateBtn = document.querySelector('.generate-btn');
    const chaptersSelectedText = document.querySelector('.chapters-selected span');
    let selectedChapters = 0;

    chapterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                selectedChapters++;
            } else {
                selectedChapters--;
            }
            
            // Update UI
            chaptersSelectedText.textContent = `${selectedChapters} chapter${selectedChapters !== 1 ? 's' : ''} selected`;
            generateBtn.disabled = selectedChapters === 0;
            
            // Update progress bar
            const progressBar = document.querySelector('.progress-bar');
            const progress = (selectedChapters / chapterCheckboxes.length) * 100;
            progressBar.style.width = `${progress}%`;
            progressBar.textContent = `${Math.round(progress)}%`;
        });
    });

    // Difficulty range handling
    const difficultyRange = document.getElementById('difficultyRange');
    const difficultyValue = document.getElementById('difficultyValue');
    const difficultyLabels = ['Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard'];

    if (difficultyRange && difficultyValue) {
        difficultyRange.addEventListener('input', function() {
            const value = parseInt(this.value);
            difficultyValue.textContent = difficultyLabels[value - 1];
        });
    }

    // Question count handling
    const questionCount = document.getElementById('questionCount');
    const decreaseCount = document.getElementById('decreaseCount');
    const increaseCount = document.getElementById('increaseCount');

    if (questionCount && decreaseCount && increaseCount) {
        decreaseCount.addEventListener('click', function() {
            const currentValue = parseInt(questionCount.value);
            if (currentValue > 5) {
                questionCount.value = currentValue - 1;
            }
        });

        increaseCount.addEventListener('click', function() {
            const currentValue = parseInt(questionCount.value);
            if (currentValue < 50) {
                questionCount.value = currentValue + 1;
            }
        });
    }

    // Add touch feedback
    const touchElements = document.querySelectorAll('.btn, .nav-link, .chapter-card');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}); 