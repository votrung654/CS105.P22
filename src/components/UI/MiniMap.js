import * as THREE from 'three';

export default class MiniMap {
    constructor(container, scene, camera, roomBounds) {
        this.container = container;
        this.scene = scene;
        this.camera = camera;
        this.roomBounds = roomBounds;
        
        // Canvas setup
        this.canvas = document.getElementById('mini-map-canvas');
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'mini-map-canvas';
            this.container.appendChild(this.canvas);
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.width = 180;
        this.height = 180;
        
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        
        // Map properties
        this.scale = 3.5;
        this.artifacts = [];
        this.isVisible = true;
        
        // 🎯 Dynamic viewport properties
        this.dynamicBounds = {
            minX: -20, maxX: 20,
            minZ: -30, maxZ: 30,
            centerX: 0, centerZ: 0,
            width: 40, height: 60
        };
        
        // Colors - Chỉ cho player và artifacts
        this.colors = {
            background: '#1a1a1a',
            player: '#00ff00',      // Xanh lá cho player
            artifact: '#ff4444',    // Đỏ cho artifacts
            border: '#666666'
        };
        
        this.update();
    }

    addArtifact(position, name) {
        this.artifacts.push({
            position: position.clone(),
            name: name,
            visible: true
        });
        
        // Tự động tính lại bounds khi thêm artifact
        this.calculateOptimalBounds();
    }
    
    removeArtifact(name) {
        this.artifacts = this.artifacts.filter(artifact => artifact.name !== name);
        this.calculateOptimalBounds();
    }
    
    // 🎯 Tính toán bounds tối ưu dựa trên vị trí artifacts và player
    calculateOptimalBounds() {
        if (this.artifacts.length === 0) {
            // Nếu không có artifacts, focus vào player
            if (this.camera) {
                const playerPos = this.camera.position;
                this.dynamicBounds = {
                    minX: playerPos.x - 15, maxX: playerPos.x + 15,
                    minZ: playerPos.z - 15, maxZ: playerPos.z + 15,
                    centerX: playerPos.x, centerZ: playerPos.z,
                    width: 30, height: 30
                };
            } else {
                this.dynamicBounds = {
                    minX: -15, maxX: 15,
                    minZ: -15, maxZ: 15,
                    centerX: 0, centerZ: 0,
                    width: 30, height: 30
                };
            }
            this.scale = Math.min(this.width * 0.8 / 30, this.height * 0.8 / 30);
            return;
        }
        
        // Tìm boundaries của tất cả artifacts
        let minX = Infinity, maxX = -Infinity;
        let minZ = Infinity, maxZ = -Infinity;
        
        this.artifacts.forEach(artifact => {
            const pos = artifact.position;
            minX = Math.min(minX, pos.x);
            maxX = Math.max(maxX, pos.x);
            minZ = Math.min(minZ, pos.z);
            maxZ = Math.max(maxZ, pos.z);
        });
        
        // Thêm player position vào tính toán
        if (this.camera) {
            minX = Math.min(minX, this.camera.position.x);
            maxX = Math.max(maxX, this.camera.position.x);
            minZ = Math.min(minZ, this.camera.position.z);
            maxZ = Math.max(maxZ, this.camera.position.z);
        }
        
        // Thêm padding
        const padding = 5;
        minX -= padding;
        maxX += padding;
        minZ -= padding;
        maxZ += padding;
        
        // Đảm bảo kích thước tối thiểu
        const minSize = 15;
        
        if (maxX - minX < minSize) {
            const center = (maxX + minX) / 2;
            minX = center - minSize / 2;
            maxX = center + minSize / 2;
        }
        
        if (maxZ - minZ < minSize) {
            const center = (maxZ + minZ) / 2;
            minZ = center - minSize / 2;
            maxZ = center + minSize / 2;
        }
        
        // Cập nhật dynamic bounds
        this.dynamicBounds = {
            minX: minX,
            maxX: maxX,
            minZ: minZ,
            maxZ: maxZ,
            centerX: (minX + maxX) / 2,
            centerZ: (minZ + maxZ) / 2,
            width: maxX - minX,
            height: maxZ - minZ
        };
        
        // Tính toán scale động
        const scaleX = this.width * 0.8 / this.dynamicBounds.width;
        const scaleZ = this.height * 0.8 / this.dynamicBounds.height;
        this.scale = Math.min(scaleX, scaleZ);
    }
    
    worldToMap(worldPos) {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        const normalizedX = (worldPos.x - this.dynamicBounds.centerX) * this.scale;
        const normalizedZ = (worldPos.z - this.dynamicBounds.centerZ) * this.scale;
        
        return { 
            x: centerX + normalizedX, 
            y: centerY + normalizedZ 
        };
    }
    
    drawRoom() {
        // Vẽ nền đen
        this.ctx.fillStyle = this.colors.background;
        this.ctx.fillRect(0, 0, this.width, this.height);
        
        // Vẽ viền bản đồ
        this.ctx.strokeStyle = this.colors.border;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(1, 1, this.width - 2, this.height - 2);
    }
    
    drawPlayer() {
        if (!this.camera) return;
        
        const playerPos = this.worldToMap(this.camera.position);
        
        // Kiểm tra player có trong tầm nhìn không
        if (playerPos.x < 0 || playerPos.x > this.width || 
            playerPos.y < 0 || playerPos.y > this.height) {
            // Vẽ arrow chỉ hướng player nếu ngoài tầm nhìn
            this.drawOffScreenIndicator(playerPos, 'player');
            return;
        }
        
        // Vẽ pulse effect
        const time = Date.now() * 0.005;
        const pulseRadius = 6 + Math.sin(time) * 2;
        this.ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
        this.ctx.beginPath();
        this.ctx.arc(playerPos.x, playerPos.y, pulseRadius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Vẽ hình tròn cho player
        this.ctx.fillStyle = this.colors.player;
        this.ctx.beginPath();
        this.ctx.arc(playerPos.x, playerPos.y, 6, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Vẽ hướng nhìn
        const direction = new THREE.Vector3();
        this.camera.getWorldDirection(direction);
        
        const lineLength = 15;
        const endX = playerPos.x + (direction.x * lineLength);
        const endY = playerPos.y + (direction.z * lineLength);
        
        this.ctx.strokeStyle = this.colors.player;
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(playerPos.x, playerPos.y);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        
        // Vẽ viền trắng cho player
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(playerPos.x, playerPos.y, 6, 0, Math.PI * 2);
        this.ctx.stroke();
    }
    
    // 🧭 Vẽ indicator cho objects ngoài màn hình
    drawOffScreenIndicator(worldPos, type) {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        // Tính góc từ center đến object
        const angle = Math.atan2(worldPos.y - centerY, worldPos.x - centerX);
        
        // Vị trí arrow ở edge của canvas
        const margin = 15;
        const edgeX = centerX + Math.cos(angle) * (this.width / 2 - margin);
        const edgeY = centerY + Math.sin(angle) * (this.height / 2 - margin);
        
        // Vẽ arrow
        this.ctx.fillStyle = type === 'player' ? this.colors.player : this.colors.artifact;
        this.ctx.save();
        this.ctx.translate(edgeX, edgeY);
        this.ctx.rotate(angle);
        
        // Arrow shape
        this.ctx.beginPath();
        this.ctx.moveTo(8, 0);
        this.ctx.lineTo(-4, -4);
        this.ctx.lineTo(-4, 4);
        this.ctx.closePath();
        this.ctx.fill();
        
        this.ctx.restore();
    }
    
    drawArtifacts() {
        this.artifacts.forEach((artifact, index) => {
            if (!artifact.visible) return;
            
            const artifactPos = this.worldToMap(artifact.position);
            
            // Kiểm tra xem có trong phạm vi hiển thị không
            if (artifactPos.x < -10 || artifactPos.x > this.width + 10 || 
                artifactPos.y < -10 || artifactPos.y > this.height + 10) {
                // Vẽ off-screen indicator
                this.drawOffScreenIndicator(artifactPos, 'artifact');
                return;
            }
            
            // Tính kích thước artifact
            const size = 8;
            const halfSize = size / 2;
            
            // Vẽ glow effect
            this.ctx.fillStyle = 'rgba(255, 68, 68, 0.4)';
            this.ctx.beginPath();
            this.ctx.arc(artifactPos.x, artifactPos.y, size + 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Vẽ hình vuông cho artifacts
            this.ctx.fillStyle = this.colors.artifact;
            this.ctx.fillRect(artifactPos.x - halfSize, artifactPos.y - halfSize, size, size);
            
            // Vẽ viền trắng
            this.ctx.strokeStyle = '#ffffff';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(artifactPos.x - halfSize, artifactPos.y - halfSize, size, size);
            
            // Vẽ số thứ tự
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = 'bold 10px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.strokeStyle = '#000000';
            this.ctx.lineWidth = 3;
            this.ctx.strokeText((index + 1).toString(), artifactPos.x, artifactPos.y + 3);
            this.ctx.fillText((index + 1).toString(), artifactPos.x, artifactPos.y + 3);
        });
    }
    
    drawLegend() {
        // Vẽ legend đơn giản chỉ với player và artifacts
        const legendY = this.height - 35;
        
        // Background cho legend
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, legendY, this.width, 35);
        
        // Player legend
        this.ctx.fillStyle = this.colors.player;
        this.ctx.beginPath();
        this.ctx.arc(10, legendY + 12, 4, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '10px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('Bạn', 20, legendY + 16);
        
        // Artifact legend
        this.ctx.fillStyle = this.colors.artifact;
        this.ctx.fillRect(7, legendY + 22, 6, 6);
        
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(`Hiện vật (${this.artifacts.length})`, 20, legendY + 28);
        
        // Zoom info bên phải
        this.ctx.fillStyle = '#CCCCCC';
        this.ctx.font = '8px Arial';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(`Zoom: ${this.scale.toFixed(1)}x`, this.width - 5, legendY + 12);
    }

    update() {
        if (!this.isVisible) return;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw components - CHỈ vẽ cần thiết
        this.drawRoom();        // Nền đen + viền
        this.drawArtifacts();   // Hiện vật
        this.drawPlayer();      // Nhân vật
        this.drawLegend();      // Legend đơn giản
    }
    
    setVisible(visible) {
        this.isVisible = visible;
        this.container.style.display = visible ? 'block' : 'none';
        if (visible) {
            this.update();
        }
    }
    
    toggle() {
        this.setVisible(!this.isVisible);
    }
    
    // Cập nhật tỷ lệ zoom thủ công
    setScale(scale) {
        this.scale = Math.max(1, Math.min(20, scale));
        this.update();
    }
    
    // 🎯 Reset về auto-zoom (focus trên artifacts)
    resetToOptimalView() {
        this.calculateOptimalBounds();
        this.update();
    }
    
    // Thêm method để cập nhật artifacts từ scene
    updateArtifacts(artifactMeshes) {
        this.artifacts = [];
        artifactMeshes.forEach(({ mesh, data }) => {
            if (mesh && mesh.position && data) {
                this.addArtifact(mesh.position, data.name || 'Unknown');
            }
        });
        // Auto-zoom sau khi cập nhật
        this.calculateOptimalBounds();
    }
    
    // 🔍 Methods zoom thủ công
    zoomIn() {
        this.setScale(this.scale * 1.2);
    }
    
    zoomOut() {
        this.setScale(this.scale * 0.8);
    }
    
    dispose() {
        this.artifacts = [];
    }
}