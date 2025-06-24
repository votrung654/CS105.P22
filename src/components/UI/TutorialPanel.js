export default class TutorialPanel {
    constructor() {
        this.isVisible = false;
        this.hasShownTutorial = localStorage.getItem('museum-tutorial-shown') === 'true';
        this.createTutorialPanel();
        this.setupEventListeners();
    }
    
    createTutorialPanel() {
        // Create tutorial overlay
        this.overlay = document.createElement('div');
        this.overlay.id = 'tutorial-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            backdrop-filter: blur(5px);
        `;
        
        // Create tutorial content
        this.panel = document.createElement('div');
        this.panel.className = 'tutorial-content';
        this.panel.style.cssText = `
            background: rgba(20, 20, 20, 0.95);
            border-radius: 15px;
            padding: 30px;
            max-width: 600px;
            margin: 20px;
            border: 1px solid rgba(78, 205, 196, 0.3);
            color: white;
            font-family: 'Segoe UI', sans-serif;
            animation: slideInUp 0.5s ease;
        `;
        
        this.panel.innerHTML = `
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #4ecdc4; margin: 0 0 10px 0; font-size: 2em;">
                    🏛️ Chào mừng đến bảo tàng 3D của chúng tôi
                </h2>
                <p style="color: #a0a0a0; margin: 0; font-size: 1.1em;">
                    Hướng dẫn khám phá bảo tàng 3D
                </p>
            </div>
            
            <div class="tutorial-section" style="margin-bottom: 25px;">
                <h3 style="color: #4ecdc4; margin-bottom: 15px; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">🎮</span>
                    Điều khiển di chuyển
                </h3>
                <div class="controls-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div class="control-item">
                        <kbd style="background: #333; padding: 5px 10px; border-radius: 5px; margin-right: 8px;">W</kbd>
                        <span>Tiến lên phía trước</span>
                    </div>
                    <div class="control-item">
                        <kbd style="background: #333; padding: 5px 10px; border-radius: 5px; margin-right: 8px;">S</kbd>
                        <span>Lùi về phía sau</span>
                    </div>
                    <div class="control-item">
                        <kbd style="background: #333; padding: 5px 10px; border-radius: 5px; margin-right: 8px;">A</kbd>
                        <span>Di chuyển sang trái</span>
                    </div>
                    <div class="control-item">
                        <kbd style="background: #333; padding: 5px 10px; border-radius: 5px; margin-right: 8px;">D</kbd>
                        <span>Di chuyển sang phải</span>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 15px;">
                    <div>
                        <kbd style="background: #333; padding: 5px 10px; border-radius: 5px; margin-right: 8px;">Shift</kbd>
                        <span>Giữ để chạy nhanh</span>
                    </div>
                    <div>
                        <kbd style="background: #333; padding: 5px 10px; border-radius: 5px; margin-right: 8px;">Mouse</kbd>
                        <span>Xoay góc nhìn</span>
                    </div>
                </div>
            </div>
            
            <div class="tutorial-section" style="margin-bottom: 25px;">
                <h3 style="color: #4ecdc4; margin-bottom: 15px; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">🖱️</span>
                    Tương tác với hiện vật
                </h3>
                <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <p style="margin: 0 0 10px 0;"><strong>Click chuột trái</strong> vào tranh hoặc hiện vật để xem thông tin chi tiết</p>
                    <p style="margin: 0; color: #a0a0a0; font-size: 0.9em;">💡 Một panel thông tin sẽ hiện ra với mô tả và tùy chọn nghe audio</p>
                </div>
            </div>
            
            <div class="tutorial-section" style="margin-bottom: 25px;">
                <h3 style="color: #4ecdc4; margin-bottom: 15px; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">⌨️</span>
                    Phím tắt hữu ích
                </h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div><kbd style="background: #333; padding: 3px 8px; border-radius: 4px;">ESC</kbd> Mở cài đặt</div>
                    <div><kbd style="background: #333; padding: 3px 8px; border-radius: 4px;">F</kbd> Toàn màn hình</div>
                    <div><kbd style="background: #333; padding: 3px 8px; border-radius: 4px;">M</kbd> Ẩn/hiện bản đồ</div>
                    <div><kbd style="background: #333; padding: 3px 8px; border-radius: 4px;">H</kbd> Hiện/ẩn hướng dẫn</div>
                </div>
            </div>
            
            <div class="tutorial-section" style="margin-bottom: 25px; background: rgba(78, 205, 196, 0.1); padding: 15px; border-radius: 8px;">
                <h4 style="color: #4ecdc4; margin: 0 0 10px 0;">💡 Mẹo khám phá:</h4>
                <ul style="margin: 0; padding-left: 20px; line-height: 1.6;">
                    <li>Sử dụng bản đồ mini ở góc trên phải để định hướng</li>
                    <li>Điểm xanh trên bản đồ là vị trí của bạn</li>
                    <li>Điểm đỏ là các hiện vật có thể tương tác</li>
                    <li>Điều chỉnh độ nhạy chuột trong cài đặt nếu cần</li>
                </ul>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 25px;">
                <label style="display: flex; align-items: center; color: #a0a0a0; font-size: 0.9em;">
                    <input type="checkbox" id="dont-show-again" style="margin-right: 8px; transform: scale(1.2);">
                    Không hiển thị lại
                </label>
                <div>
                    <button id="tutorial-close" style="
                        background: linear-gradient(45deg, #4ecdc4, #44a08d);
                        border: none;
                        padding: 12px 25px;
                        border-radius: 8px;
                        color: white;
                        font-weight: 600;
                        cursor: pointer;
                        font-size: 1em;
                        transition: all 0.2s ease;
                    ">
                        🚀 Bắt đầu khám phá
                    </button>
                </div>
            </div>
        `;
        
        this.overlay.appendChild(this.panel);
        document.body.appendChild(this.overlay);
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .tutorial-content kbd {
                font-family: monospace;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }
            
            #tutorial-close:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(78, 205, 196, 0.3);
            }
            
            .control-item {
                display: flex;
                align-items: center;
                font-size: 0.95em;
                padding: 5px 0;
            }
        `;
        document.head.appendChild(style);
    }
    
    setupEventListeners() {
        const closeBtn = this.overlay.querySelector('#tutorial-close');
        const dontShowCheckbox = this.overlay.querySelector('#dont-show-again');
        
        closeBtn.addEventListener('click', () => {
            if (dontShowCheckbox.checked) {
                localStorage.setItem('museum-tutorial-shown', 'true');
                this.hasShownTutorial = true;
            }
            this.hide();
        });
        
        // Close on ESC
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Escape' && this.isVisible) {
                this.hide();
            }
        });
        
        // Close on overlay click
        this.overlay.addEventListener('click', (event) => {
            if (event.target === this.overlay) {
                this.hide();
            }
        });
    }
    
    show() {
        this.overlay.style.display = 'flex';
        this.isVisible = true;
        
        // Animate in
        setTimeout(() => {
            this.panel.style.opacity = '1';
            this.panel.style.transform = 'scale(1)';
        }, 10);
    }
    
    hide() {
        this.overlay.style.display = 'none';
        this.isVisible = false;
    }
    
    showIfFirstTime() {
        if (!this.hasShownTutorial) {
            setTimeout(() => {
                this.show();
            }, 1500); // Show after loading screen
        }
    }
    
    // Manual toggle
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
}