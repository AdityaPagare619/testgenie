// Enhanced JavaScript functionality for TestGenie
// Additional interactive features and animations

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add floating effect to particles
    enhanceParticleAnimations();
    
    // Add hover effects to chapter cards
    enhanceChapterCards();
    
    // Add smooth transitions between sections
    addSmoothTransitions();
    
    // Add keyboard navigation
    addKeyboardNavigation();
    
    // Add mobile-specific touch interactions
    addMobileInteractions();
    
    // Add paper generation animation
    enhancePaperGeneration();
});

// Function to enhance particle animations
function enhanceParticleAnimations() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        // Add random scale animation
        const scale = 0.8 + Math.random() * 0.4; // Scale between 0.8 and 1.2
        const duration = 15 + Math.random() * 10; // Duration between 15s and 25s
        const delay = Math.random() * 5; // Delay between 0s and 5s
        
        particle.style.animation = `float ${duration}s infinite ease-in-out ${delay}s, 
                                   pulse ${duration/2}s infinite ease-in-out ${delay}s`;
        particle.style.transform = `scale(${scale})`;
    });
    
    // Add pulse animation style if not already present
    if (!document.getElementById('pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation';
        style.textContent = `
            @keyframes pulse {
                0%, 100% {
                    opacity: 0.3;
                }
                50% {
                    opacity: 0.5;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Function to enhance chapter cards with additional effects
function enhanceChapterCards() {
    const chapterCards = document.querySelectorAll('.chapter-card');
    
    chapterCards.forEach(card => {
        // Add tilt effect on hover
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth >= 992) { // Only on desktop
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top; // y position within the element
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX * 5; // Max 5 degrees
                const deltaY = (y - centerY) / centerY * 5; // Max 5 degrees
                
                this.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) translateY(-5px)`;
            }
        });
        
        // Reset transform on mouse leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Add focus styles for accessibility
        card.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        card.addEventListener('blur', function() {
            this.classList.remove('focused');
        });
    });
    
    // Add focus style if not already present
    if (!document.getElementById('focus-style')) {
        const style = document.createElement('style');
        style.id = 'focus-style';
        style.textContent = `
            .chapter-card.focused {
                outline: 2px solid var(--primary-color);
                box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.3);
            }
        `;
        document.head.appendChild(style);
    }
}

// Function to add smooth transitions between sections
function addSmoothTransitions() {
    // Add transition class to main elements if not already present
    const transitionElements = [
        '.chapter-selection-header',
        '.chapters-grid',
        '.sidebar',
        '.main-content'
    ];
    
    transitionElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if (!element.classList.contains('transition-element')) {
                element.classList.add('transition-element');
            }
        });
    });
    
    // Add transition style if not already present
    if (!document.getElementById('transition-style')) {
        const style = document.createElement('style');
        style.id = 'transition-style';
        style.textContent = `
            .transition-element {
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            
            .fade-in {
                animation: fadeIn 0.5s ease forwards;
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add fade-in class to elements as they enter the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.transition-element').forEach(element => {
        observer.observe(element);
    });
}

// Function to add keyboard navigation
function addKeyboardNavigation() {
    // Add tabindex to elements that should be focusable
    const focusableElements = document.querySelectorAll('.chapter-card, .generate-btn, .form-check-input');
    focusableElements.forEach((element, index) => {
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
    });
    
    // Add keyboard event listeners
    document.addEventListener('keydown', function(e) {
        // Space or Enter to select focused chapter card
        if ((e.key === ' ' || e.key === 'Enter') && document.activeElement.classList.contains('chapter-card')) {
            const checkbox = document.activeElement.querySelector('.chapter-checkbox');
            if (checkbox) {
                checkbox.checked = !checkbox.checked;
                checkbox.dispatchEvent(new Event('change'));
                e.preventDefault();
            }
        }
        
        // Escape to close modal
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                const modalInstance = bootstrap.Modal.getInstance(openModal);
                if (modalInstance) {
                    modalInstance.hide();
                    e.preventDefault();
                }
            }
        }
    });
}

// Function to add mobile-specific touch interactions
function addMobileInteractions() {
    if ('ontouchstart' in window) {
        // Add swipe to select for chapter cards on mobile
        const chapterCards = document.querySelectorAll('.chapter-card');
        let touchStartX = 0;
        let touchStartY = 0;
        
        chapterCards.forEach(card => {
            card.addEventListener('touchstart', function(e) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }, { passive: true });
            
            card.addEventListener('touchend', function(e) {
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;
                
                const deltaX = touchEndX - touchStartX;
                const deltaY = touchEndY - touchStartY;
                
                // If it's a swipe right (and not a significant vertical swipe)
                if (deltaX > 50 && Math.abs(deltaY) < 30) {
                    const checkbox = this.querySelector('.chapter-checkbox');
                    if (checkbox) {
                        checkbox.checked = true;
                        checkbox.dispatchEvent(new Event('change'));
                    }
                }
                
                // If it's a swipe left (and not a significant vertical swipe)
                if (deltaX < -50 && Math.abs(deltaY) < 30) {
                    const checkbox = this.querySelector('.chapter-checkbox');
                    if (checkbox) {
                        checkbox.checked = false;
                        checkbox.dispatchEvent(new Event('change'));
                    }
                }
            }, { passive: true });
        });
        
        // Add double-tap to select
        chapterCards.forEach(card => {
            let lastTap = 0;
            
            card.addEventListener('touchend', function(e) {
                const currentTime = new Date().getTime();
                const tapLength = currentTime - lastTap;
                
                if (tapLength < 300 && tapLength > 0) {
                    // Double tap detected
                    const checkbox = this.querySelector('.chapter-checkbox');
                    if (checkbox) {
                        checkbox.checked = !checkbox.checked;
                        checkbox.dispatchEvent(new Event('change'));
                        e.preventDefault();
                    }
                }
                
                lastTap = currentTime;
            });
        });
    }
}

// Function to enhance paper generation with animations
function enhancePaperGeneration() {
    const generateBtn = document.querySelector('.generate-btn');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            // Add loading animation to button
            this.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Generating...';
            this.disabled = true;
            
            // Simulate paper generation (in a real app, this would be an API call)
            setTimeout(() => {
                // Reset button
                this.innerHTML = 'Generate Paper';
                this.disabled = false;
                
                // Show the modal
                const paperPreviewModal = new bootstrap.Modal(document.getElementById('paperPreviewModal'));
                paperPreviewModal.show();
                
                // Add entrance animation to modal content
                const modalContent = document.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.classList.add('modal-animation');
                }
            }, 1500);
        });
        
        // Add modal animation style if not already present
        if (!document.getElementById('modal-animation-style')) {
            const style = document.createElement('style');
            style.id = 'modal-animation-style';
            style.textContent = `
                .modal-animation {
                    animation: modalEnter 0.3s ease-out forwards;
                }
                
                @keyframes modalEnter {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}
