export default class LoadingScreen {
    constructor(screenElement) {
        this.screen = screenElement;
        this.progressBar = screenElement.querySelector('#loading-bar');
        this.progressText = screenElement.querySelector('#loading-text');
        this.isVisible = true;
    }
    
    show() {
        this.screen.style.display = 'flex';
        this.isVisible = true;
    }
    
    hide() {
        this.screen.style.transition = 'opacity 0.5s ease';
        this.screen.style.opacity = '0';
        
        setTimeout(() => {
            this.screen.style.display = 'none';
            this.isVisible = false;
        }, 500);
    }
    
    updateProgress(percentage, message) {
        if (this.progressBar) {
            this.progressBar.style.width = `${percentage}%`;
        }
        
        if (this.progressText && message) {
            this.progressText.textContent = message;
        }
    }
    
    setMessage(message) {
        if (this.progressText) {
            this.progressText.textContent = message;
        }
    }
    
    isShowing() {
        return this.isVisible;
    }
}