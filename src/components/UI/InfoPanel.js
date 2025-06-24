export default class InfoPanel {
    constructor(panelElement) {
        this.panel = panelElement;
        this.titleElement = panelElement.querySelector('#artifact-title');
        this.descriptionElement = panelElement.querySelector('#artifact-description');
        this.closeButton = panelElement.querySelector('#close-info-panel');
        this.audioButton = panelElement.querySelector('#play-audio-description');
        this.fullscreenButton = panelElement.querySelector('#fullscreen-artifact');
        
        this.currentAudio = null;
        this.isVisible = false;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.closeButton.addEventListener('click', () => {
            this.hide();
        });
        
        this.audioButton.addEventListener('click', () => {
            this.playAudio();
        });
        
        this.fullscreenButton.addEventListener('click', () => {
            this.toggleFullscreen();
        });
    }
    
    show(artifactData) {
        this.titleElement.textContent = artifactData.name;
        this.descriptionElement.textContent = artifactData.description;
        this.panel.style.display = 'block';
        this.isVisible = true;
        
        // Animate in
        this.panel.style.opacity = '0';
        this.panel.style.transform = 'translateY(20px)';
        setTimeout(() => {
            this.panel.style.transition = 'all 0.3s ease';
            this.panel.style.opacity = '1';
            this.panel.style.transform = 'translateY(0)';
        }, 10);
        
        // Store artifact data for audio
        this.currentArtifactData = artifactData;
    }
    
    hide() {
        this.panel.style.transition = 'all 0.3s ease';
        this.panel.style.opacity = '0';
        this.panel.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            this.panel.style.display = 'none';
            this.isVisible = false;
        }, 300);
        
        // Stop any playing audio
        this.stopAudio();
    }
    
    playAudio() {
        if (!this.currentArtifactData || !this.currentArtifactData.description) return;
        
        // Stop current audio if playing
        this.stopAudio();
        
        // Use Speech Synthesis API
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(this.currentArtifactData.description);
            utterance.lang = 'vi-VN';
            utterance.rate = 0.8;
            utterance.pitch = 1;
            
            utterance.onstart = () => {
                this.audioButton.textContent = '⏸️ Dừng';
                this.audioButton.classList.add('playing');
            };
            
            utterance.onend = () => {
                this.audioButton.textContent = '🔊 Nghe mô tả';
                this.audioButton.classList.remove('playing');
            };
            
            window.speechSynthesis.speak(utterance);
            this.currentAudio = utterance;
        }
    }
    
    stopAudio() {
        if (this.currentAudio && window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            this.audioButton.textContent = '🔊 Nghe mô tả';
            this.audioButton.classList.remove('playing');
        }
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            this.fullscreenButton.textContent = '🗗 Thoát toàn màn hình';
        } else {
            document.exitFullscreen();
            this.fullscreenButton.textContent = '🔍 Xem toàn màn hình';
        }
    }
    
    isShowing() {
        return this.isVisible;
    }
}