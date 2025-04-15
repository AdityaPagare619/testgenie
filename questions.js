// Questions Interface Handler
class QuestionsInterface {
    constructor() {
        this.modal = document.getElementById('paperConfigModal');
        this.paperView = document.getElementById('paperView');
        this.selectedChapters = new Set();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Modal controls
        document.getElementById('closeModalBtn').addEventListener('click', () => this.hideModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.hideModal());
        document.getElementById('generateBtn').addEventListener('click', () => this.generatePaper());
        
        // Paper view controls
        document.getElementById('backBtn').addEventListener('click', () => this.hidePaperView());
        document.getElementById('downloadPdfBtn').addEventListener('click', () => this.downloadPDF());
        document.getElementById('generateAnswerSheetBtn').addEventListener('click', () => this.generateAnswerSheet());
        
        // Question type inputs
        const questionInputs = document.querySelectorAll('.question-type input');
        questionInputs.forEach(input => {
            input.addEventListener('input', (e) => this.validateQuestionInput(e.target));
        });
    }

    showModal(chapters) {
        this.selectedChapters = new Set(chapters);
        document.getElementById('selectedChaptersCount').textContent = chapters.length;
        document.getElementById('chapterName').textContent = `Chapters: ${chapters.join(', ')}`;
        this.modal.style.display = 'flex';
        this.initializeAnimations();
    }

    hideModal() {
        this.modal.style.display = 'none';
    }

    showPaperView() {
        this.paperView.style.display = 'block';
        this.initializePaperAnimations();
    }

    hidePaperView() {
        this.paperView.style.display = 'none';
    }

    validateQuestionInput(input) {
        const value = parseInt(input.value);
        if (isNaN(value) || value < 0) {
            input.value = '0';
        }
    }

    generatePaper() {
        // Collect question counts
        const questionCounts = {
            mcq: parseInt(document.querySelector('.question-type:nth-child(1) input').value) || 0,
            fill: parseInt(document.querySelector('.question-type:nth-child(2) input').value) || 0,
            tf: parseInt(document.querySelector('.question-type:nth-child(3) input').value) || 0,
            short: parseInt(document.querySelector('.question-type:nth-child(4) input').value) || 0,
            long: parseInt(document.querySelector('.question-type:nth-child(5) input').value) || 0
        };

        // Show loading state
        this.showLoading();

        // Simulate paper generation (replace with actual API call)
        setTimeout(() => {
            this.hideLoading();
            this.hideModal();
            this.showPaperView();
            this.populatePaperContent(questionCounts);
        }, 1500);
    }

    showLoading() {
        // Add loading overlay
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Generating your paper...</p>
        `;
        document.body.appendChild(overlay);
    }

    hideLoading() {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            overlay.remove();
        }
    }

    populatePaperContent(questionCounts) {
        // This would be replaced with actual content from your backend
        const paperBody = document.querySelector('.paper-body');
        // Clear existing content
        paperBody.innerHTML = '';
        
        // Add sections based on question counts
        if (questionCounts.mcq > 0) {
            this.addQuestionSection(paperBody, 'MCQs', questionCounts.mcq, 'mcq');
        }
        if (questionCounts.fill > 0) {
            this.addQuestionSection(paperBody, 'Fill in the Blanks', questionCounts.fill, 'fill');
        }
        if (questionCounts.tf > 0) {
            this.addQuestionSection(paperBody, 'True/False', questionCounts.tf, 'tf');
        }
        if (questionCounts.short > 0) {
            this.addQuestionSection(paperBody, 'Short Questions', questionCounts.short, 'short');
        }
        if (questionCounts.long > 0) {
            this.addQuestionSection(paperBody, 'Long Questions', questionCounts.long, 'long');
        }
    }

    addQuestionSection(container, title, count, type) {
        const section = document.createElement('div');
        section.className = 'paper-section';
        section.innerHTML = `
            <h3 class="section-title">${title}</h3>
            <div class="question-section">
                ${Array(count).fill(0).map((_, i) => this.createQuestionHTML(i + 1, type)).join('')}
            </div>
        `;
        container.appendChild(section);
    }

    createQuestionHTML(number, type) {
        switch(type) {
            case 'mcq':
                return `
                    <div class="question">
                        <p class="question-text">${number}. [Question text will be populated]</p>
                        <div class="options">
                            <p class="option">a) [Option A]</p>
                            <p class="option">b) [Option B]</p>
                            <p class="option">c) [Option C]</p>
                            <p class="option">d) [Option D]</p>
                        </div>
                    </div>
                `;
            case 'fill':
                return `
                    <div class="question">
                        <p class="question-text">${number}. [Fill in the blank question text]</p>
                    </div>
                `;
            case 'tf':
                return `
                    <div class="question">
                        <p class="question-text">${number}. [True/False statement]</p>
                    </div>
                `;
            case 'short':
                return `
                    <div class="question">
                        <p class="question-text">${number}. [Short answer question]</p>
                    </div>
                `;
            case 'long':
                return `
                    <div class="question">
                        <p class="question-text">${number}. [Long answer question]</p>
                    </div>
                `;
        }
    }

    downloadPDF() {
        // Implement PDF download functionality
        console.log('Downloading PDF...');
    }

    generateAnswerSheet() {
        // Implement answer sheet generation
        console.log('Generating answer sheet...');
    }

    initializeAnimations() {
        // Add entrance animations for modal elements
        const elements = this.modal.querySelectorAll('.question-type, .modal-header, .modal-footer');
        elements.forEach((el, index) => {
            el.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        });
    }

    initializePaperAnimations() {
        // Add entrance animations for paper sections
        const sections = this.paperView.querySelectorAll('.paper-section');
        sections.forEach((section, index) => {
            section.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.2}s`;
        });
    }
}

// Initialize the questions interface when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    window.questionsInterface = new QuestionsInterface();
}); 