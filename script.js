// Modern Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.setAttribute('data-theme', 
        body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    );
    themeToggle.querySelector('i').classList.toggle('bi-moon-stars');
    themeToggle.querySelector('i').classList.toggle('bi-sun');
});

// Modern Chapter Selection
const chapterCards = document.querySelectorAll('.chapter-card');
const progressBar = document.querySelector('.progress-bar');
const chaptersSelected = document.querySelector('.chapters-selected');
let selectedCount = 0;

chapterCards.forEach(card => {
    const checkbox = card.querySelector('.chapter-checkbox');
    const checkmark = card.querySelector('.checkmark');
    
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            selectedCount++;
            card.classList.add('selected');
            checkmark.classList.add('checked');
        } else {
            selectedCount--;
            card.classList.remove('selected');
            checkmark.classList.remove('checked');
        }
        
        // Update progress
        const progress = (selectedCount / 12) * 100;
        progressBar.style.width = `${progress}%`;
        chaptersSelected.textContent = `${selectedCount} of 12 chapters selected`;
        
        // Enable/disable generate button
        const generateBtn = document.querySelector('.generate-btn');
        generateBtn.disabled = selectedCount === 0;
    });
});

// Modern Form Controls
const difficultyRange = document.getElementById('difficultyRange');
const difficultyMarks = document.querySelectorAll('.difficulty-mark');

difficultyRange.addEventListener('input', (e) => {
    const value = e.target.value;
    difficultyMarks.forEach((mark, index) => {
        if (index + 1 === parseInt(value)) {
            mark.classList.add('active');
        } else {
            mark.classList.remove('active');
        }
    });
});

// Modern Loading States
function showLoading(message = 'Generating your test paper...') {
    const loading = document.createElement('div');
    loading.className = 'loading-overlay';
    loading.innerHTML = `
        <div class="loading-content glass-card">
            <div class="loading-spinner"></div>
            <p class="loading-text">${message}</p>
        </div>
    `;
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.querySelector('.loading-overlay');
    if (loading) {
        loading.remove();
    }
}

// Modern Toast Notifications
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast glass-card toast-${type}`;
    toast.innerHTML = `
        <div class="toast-header">
            <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
            <strong class="me-auto">${type.charAt(0).toUpperCase() + type.slice(1)}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;
    
    const container = document.querySelector('.toast-container') || createToastContainer();
    container.appendChild(toast);
    
    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
    
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(container);
    return container;
}

// Generate Test Paper
const generateBtn = document.querySelector('.generate-btn');
generateBtn.addEventListener('click', async () => {
    const selectedChapters = Array.from(document.querySelectorAll('.chapter-checkbox:checked'))
        .map(checkbox => checkbox.closest('.chapter-card').querySelector('.chapter-title').textContent);
    
    if (selectedChapters.length === 0) {
        showToast('Please select at least one chapter', 'error');
        return;
    }
    
    showLoading();
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showToast('Test paper generated successfully!');
        
        // TODO: Handle the generated test paper
    } catch (error) {
        showToast('Failed to generate test paper. Please try again.', 'error');
    } finally {
        hideLoading();
    }
});

// Modern Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.glass-card, .chapter-card, .hero-section > *').forEach(el => {
    el.classList.add('animate-ready');
    observer.observe(el);
});

// Modern UI Interactions and Animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Handle difficulty range input
    const difficultyRange = document.getElementById('difficultyRange');
    const difficultyValue = document.getElementById('difficultyValue');
    const difficultyLabels = ['Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard'];

    difficultyRange.addEventListener('input', function() {
        const value = this.value;
        difficultyValue.textContent = difficultyLabels[value - 1];
        difficultyValue.style.color = getDifficultyColor(value);
    });

    // Handle question count buttons
    const questionCount = document.getElementById('questionCount');
    const decreaseCount = document.getElementById('decreaseCount');
    const increaseCount = document.getElementById('increaseCount');

    decreaseCount.addEventListener('click', () => {
        if (questionCount.value > parseInt(questionCount.min)) {
            questionCount.value = parseInt(questionCount.value) - 1;
            updateGenerateButton();
        }
    });

    increaseCount.addEventListener('click', () => {
        if (questionCount.value < parseInt(questionCount.max)) {
            questionCount.value = parseInt(questionCount.value) + 1;
            updateGenerateButton();
        }
    });

    // Chapter selection handling
    const chapterCheckboxes = document.querySelectorAll('.chapter-checkbox');
    const generateBtn = document.querySelector('.generate-btn');
    const progressBar = document.querySelector('.progress-bar');
    const chaptersSelected = document.querySelector('.chapters-selected');

    chapterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const card = this.closest('.chapter-card');
            if (this.checked) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
            updateProgress();
            updateGenerateButton();
        });
    });

    function updateProgress() {
        const total = chapterCheckboxes.length;
        const selected = document.querySelectorAll('.chapter-checkbox:checked').length;
        const percentage = (selected / total) * 100;
        
        progressBar.style.width = `${percentage}%`;
        progressBar.setAttribute('aria-valuenow', percentage);
        progressBar.textContent = `${Math.round(percentage)}%`;
        
        chaptersSelected.innerHTML = `
            <i class="fas fa-check-circle text-success me-2"></i>
            <span>${selected} chapter${selected !== 1 ? 's' : ''} selected</span>
        `;
    }

    function updateGenerateButton() {
        const hasSelectedChapters = document.querySelectorAll('.chapter-checkbox:checked').length > 0;
        generateBtn.disabled = !hasSelectedChapters;
        
        if (hasSelectedChapters) {
            generateBtn.classList.add('pulse-animation');
        } else {
            generateBtn.classList.remove('pulse-animation');
        }
    }

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation to generate button
    generateBtn.addEventListener('click', function() {
        this.classList.add('loading');
        this.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Generating...
        `;
        
        // Simulate generation process (replace with actual API call)
        setTimeout(() => {
            this.classList.remove('loading');
            this.innerHTML = '<i class="fas fa-magic me-2"></i>Generate Paper';
            showSuccessMessage('Paper generated successfully!');
        }, 2000);
    });

    // Helper function for difficulty colors
    function getDifficultyColor(value) {
        const colors = [
            '#10B981', // Very Easy - Green
            '#34D399', // Easy - Light Green
            '#F59E0B', // Medium - Amber
            '#F97316', // Hard - Orange
            '#EF4444'  // Very Hard - Red
        ];
        return colors[value - 1];
    }

    // Toast notification system
    function showSuccessMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'toast align-items-center text-white bg-success border-0';
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas fa-check-circle me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        
        const container = document.createElement('div');
        container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        container.appendChild(toast);
        document.body.appendChild(container);
        
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        toast.addEventListener('hidden.bs.toast', () => {
            container.remove();
        });
    }

    // Initialize animations
    initializeAnimations();
    
    // Handle chapter card selection
    const chapterCards = document.querySelectorAll('.chapter-card');
    chapterCards.forEach(card => {
        card.addEventListener('click', function() {
            const checkbox = this.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            
            if (checkbox.checked) {
                this.classList.add('selected');
                this.classList.add('select-animate');
            } else {
                this.classList.remove('selected');
                this.classList.add('deselect-animate');
            }
            
            updateGenerateButton();
        });
    });
    
    // Handle difficulty slider
    const difficultySlider = document.getElementById('difficulty');
    const difficultyText = document.querySelector('.difficulty-text');
    difficultySlider.addEventListener('input', function() {
        const value = this.value;
        let text = 'Medium';
        if (value <= 2) text = 'Easy';
        if (value >= 4) text = 'Hard';
        difficultyText.textContent = text;
    });
    
    // Handle question count slider
    const questionCountSlider = document.getElementById('questionCount');
    const questionCountText = document.querySelector('.question-count');
    questionCountSlider.addEventListener('input', function() {
        questionCountText.textContent = `${this.value} Questions`;
    });
    
    // Handle generate button click
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.addEventListener('click', function() {
        showLoadingOverlay();
        // Simulate paper generation
        setTimeout(() => {
            hideLoadingOverlay();
            showPaperModal();
        }, 2000);
    });
    
    // Handle download button click
    const downloadBtn = document.querySelector('.download-animate');
    downloadBtn.addEventListener('click', function() {
        this.classList.add('download-animate');
        // Add actual download logic here
    });
});

function initializeAnimations() {
    // Add floating animation to illustrations
    const illustrations = document.querySelectorAll('.illustration');
    illustrations.forEach((illustration, index) => {
        illustration.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Initialize fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

function updateGenerateButton() {
    const selectedChapters = document.querySelectorAll('.chapter-card.selected').length;
    const generateBtn = document.getElementById('generateBtn');
    generateBtn.disabled = selectedChapters === 0;
}

function showLoadingOverlay() {
    const overlay = document.querySelector('.loading-overlay');
    overlay.style.display = 'flex';
    overlay.classList.add('fade-in');
}

function hideLoadingOverlay() {
    const overlay = document.querySelector('.loading-overlay');
    overlay.classList.remove('fade-in');
    overlay.style.display = 'none';
}

function showPaperModal() {
    const modal = new bootstrap.Modal(document.getElementById('paperModal'));
    modal.show();
}

// Add ripple effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        e.target.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .pulse-animation {
        animation: pulse 2s infinite;
    }
    
    .loading {
        pointer-events: none;
        opacity: 0.8;
    }
    
    .toast-container {
        z-index: 1050;
    }
    
    .toast {
        background: var(--glass-bg) !important;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid var(--glass-border) !important;
    }
`;
document.head.appendChild(style);

// TestGenie - Modern UI Redesign
// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const chapterCheckboxes = document.querySelectorAll('.chapter-checkbox');
    const generateBtn = document.querySelector('.generate-btn');
    const progressBar = document.querySelector('.progress-bar');
    const chaptersSelectedText = document.querySelector('.chapters-selected span');
    const difficultyRange = document.getElementById('difficultyRange');
    const difficultyValue = document.getElementById('difficultyValue');
    const questionCount = document.getElementById('questionCount');
    const decreaseCount = document.getElementById('decreaseCount');
    const increaseCount = document.getElementById('increaseCount');
    
    // Track selected chapters
    let selectedChapters = [];
    
    // Update difficulty text
    function updateDifficultyText() {
        const value = parseInt(difficultyRange.value);
        let text = 'Medium';
        
        if (value <= 1) text = 'Very Easy';
        else if (value === 2) text = 'Easy';
        else if (value === 3) text = 'Medium';
        else if (value === 4) text = 'Hard';
        else if (value === 5) text = 'Very Hard';
        
        difficultyValue.textContent = text;
    }
    
    // Update question count
    function updateQuestionCount(delta) {
        const currentValue = parseInt(questionCount.value);
        const newValue = Math.max(5, Math.min(50, currentValue + delta));
        questionCount.value = newValue;
    }
    
    // Update progress bar and generate button
    function updateProgress() {
        const totalChapters = chapterCheckboxes.length;
        const selectedCount = selectedChapters.length;
        const progressPercentage = (selectedCount / totalChapters) * 100;
        
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.setAttribute('aria-valuenow', progressPercentage);
        progressBar.textContent = `${Math.round(progressPercentage)}%`;
        
        chaptersSelectedText.textContent = `${selectedCount} chapter${selectedCount !== 1 ? 's' : ''} selected`;
        
        // Enable/disable generate button
        generateBtn.disabled = selectedCount === 0;
    }
    
    // Handle chapter selection
    chapterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const chapterCard = this.closest('.chapter-card');
            const chapterValue = this.value;
            
            if (this.checked) {
                selectedChapters.push(chapterValue);
                chapterCard.classList.add('selected');
            } else {
                const index = selectedChapters.indexOf(chapterValue);
                if (index > -1) {
                    selectedChapters.splice(index, 1);
                }
                chapterCard.classList.remove('selected');
            }
            
            updateProgress();
        });
    });
    
    // Handle difficulty range change
    difficultyRange.addEventListener('input', updateDifficultyText);
    
    // Handle question count buttons
    decreaseCount.addEventListener('click', () => updateQuestionCount(-5));
    increaseCount.addEventListener('click', () => updateQuestionCount(5));
    
    // Handle paper generation
    generateBtn.addEventListener('click', function() {
        if (selectedChapters.length === 0) return;
        
        // Show loading state
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Generating...';
        
        // Get selected question types
        const questionTypes = {
            mcq: document.getElementById('mcqCheck').checked,
            shortAnswer: document.getElementById('shortAnswerCheck').checked,
            fillBlanks: document.getElementById('fillBlanksCheck').checked,
            trueFalse: document.getElementById('trueFalseCheck').checked
        };
        
        // Get paper settings
        const settings = {
            difficulty: parseInt(difficultyRange.value),
            questionCount: parseInt(questionCount.value),
            questionTypes: questionTypes
        };
        
        // Simulate API call to generate paper
        setTimeout(() => {
            // In a real implementation, this would be an API call
            // For now, we'll simulate a response
            
            // Create a modal to display the generated paper
            const modal = document.createElement('div');
            modal.className = 'modal fade';
            modal.id = 'paperPreviewModal';
            modal.setAttribute('tabindex', '-1');
            modal.setAttribute('aria-labelledby', 'paperPreviewModalLabel');
            modal.setAttribute('aria-hidden', 'true');
            
            // Generate sample questions based on selected chapters
            const questions = generateSampleQuestions(selectedChapters, settings);
            
            // Create modal content
            modal.innerHTML = `
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content glass-card">
                        <div class="modal-header">
                            <h5 class="modal-title" id="paperPreviewModalLabel">Generated Question Paper</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="paper-header">
                                <h4>SN English Reader-5</h4>
                                <p>Time: 1 Hour | Total Marks: ${settings.questionCount * 2}</p>
                            </div>
                            <div class="paper-instructions">
                                <h6><i class="fas fa-info-circle instruction-icon me-2"></i>Instructions</h6>
                                <p>1. All questions are compulsory.</p>
                                <p>2. Read each question carefully before answering.</p>
                                <p>3. Write your answers neatly and clearly.</p>
                            </div>
                            <div class="paper-content">
                                ${questions}
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-light" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="downloadPaperBtn">
                                <i class="fas fa-download me-2"></i>Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            // Add modal to the document
            document.body.appendChild(modal);
            
            // Initialize Bootstrap modal
            const paperModal = new bootstrap.Modal(modal);
            paperModal.show();
            
            // Handle modal close
            modal.addEventListener('hidden.bs.modal', function() {
                document.body.removeChild(modal);
            });
            
            // Handle download button
            document.getElementById('downloadPaperBtn').addEventListener('click', function() {
                alert('PDF download functionality would be implemented here.');
            });
            
            // Reset generate button
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<i class="fas fa-magic me-2"></i>Generate Paper';
        }, 1500); // Simulate network delay
    });
    
    // Function to generate sample questions
    function generateSampleQuestions(chapters, settings) {
        let questionsHTML = '';
        let questionNumber = 1;
        
        // Generate MCQ questions
        if (settings.questionTypes.mcq) {
            questionsHTML += `
                <div class="paper-section">
                    <h5><span class="question-type-label">Multiple Choice Questions</span></h5>
                    <div class="question-item">
                        <p class="question-text">${questionNumber}. Which of the following is the correct answer?</p>
                        <div class="options">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="q${questionNumber}" id="q${questionNumber}a">
                                <label class="form-check-label" for="q${questionNumber}a">Option A</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="q${questionNumber}" id="q${questionNumber}b">
                                <label class="form-check-label" for="q${questionNumber}b">Option B</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="q${questionNumber}" id="q${questionNumber}c">
                                <label class="form-check-label" for="q${questionNumber}c">Option C</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="q${questionNumber}" id="q${questionNumber}d">
                                <label class="form-check-label" for="q${questionNumber}d">Option D</label>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            questionNumber++;
        }
        
        // Generate Short Answer questions
        if (settings.questionTypes.shortAnswer) {
            questionsHTML += `
                <div class="paper-section">
                    <h5><span class="question-type-label">Short Answer Questions</span></h5>
                    <div class="question-item">
                        <p class="question-text">${questionNumber}. Answer the following question in 2-3 sentences.</p>
                        <div class="answer-space" style="height: 100px; border-bottom: 1px dashed rgba(255,255,255,0.2);"></div>
                    </div>
                </div>
            `;
            questionNumber++;
        }
        
        // Generate Fill in the Blanks
        if (settings.questionTypes.fillBlanks) {
            questionsHTML += `
                <div class="paper-section">
                    <h5><span class="question-type-label">Fill in the Blanks</span></h5>
                    <div class="question-item">
                        <p class="question-text">${questionNumber}. Complete the following sentence: "The quick brown fox jumps over the _____ dog."</p>
                        <div class="answer-space" style="height: 40px; border-bottom: 1px dashed rgba(255,255,255,0.2);"></div>
                    </div>
                </div>
            `;
            questionNumber++;
        }
        
        // Generate True/False questions
        if (settings.questionTypes.trueFalse) {
            questionsHTML += `
                <div class="paper-section">
                    <h5><span class="question-type-label">True/False Questions</span></h5>
                    <div class="question-item">
                        <p class="question-text">${questionNumber}. State whether the following statement is True or False: "The Earth is flat."</p>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${questionNumber}" id="q${questionNumber}true">
                            <label class="form-check-label" for="q${questionNumber}true">True</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="q${questionNumber}" id="q${questionNumber}false">
                            <label class="form-check-label" for="q${questionNumber}false">False</label>
                        </div>
                    </div>
                </div>
            `;
        }
        
        return questionsHTML;
    }
    
    // Initialize
    updateDifficultyText();
    updateProgress();
});