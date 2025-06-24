import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

export default class PlayerControls {
    constructor(camera, domElement, scene) {
        this.camera = camera;
        this.domElement = domElement;
        this.scene = scene;
        this.room = null; 
        this.controls = new PointerLockControls(this.camera, this.domElement);
        
        // Movement states
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.isPaused = false;

        // Movement properties
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.speed = 5.0;
        this.mouseSensitivity = 0.8;
        
        // Smooth movement
        this.acceleration = 25.0;
        this.friction = 12.0;
        this.maxSpeed = 7.0;
        
        // Collision detection
        this.collidableObjects = [];
        this.artifactObjects = [];
        this.playerRadius = 1.0;
        this.raycastDistance = 1.5;
        
        // 🔧 SỬA LỖI: Mouse movement với xoay 360° ngang
        this.mouseDelta = new THREE.Vector2();
        this.mouseSpeed = 0.002; // Tăng độ nhạy trở lại
        
        // 🎯 CHỈ GIỚI HẠN GÓC PITCH (lên/xuống)
        this.pitchLimit = Math.PI / 3; // 60 độ lên/xuống
        this.currentPitch = 0;
        this.minPitch = -this.pitchLimit;
        this.maxPitch = this.pitchLimit;
        
        // 🌟 CHO PHÉP XOAY 360° NGANG (YAW)
        this.allowFullYawRotation = true; // Cho phép xoay toàn phần trái/phải
        this.yawSpeed = 1.0; // Tốc độ xoay ngang
        
        this.setupEventListeners();
        this.setupMouseMovement();
    }

    setCollidableObjects(objects) {
        this.collidableObjects = objects;
    }
    
    setArtifactObjects(artifacts) {
        this.artifactObjects = artifacts;
    }
    
    setSpeed(speed) {
        this.speed = speed;
        this.maxSpeed = speed * 1.4;
    }
    
    setSensitivity(sensitivity) {
        this.mouseSensitivity = sensitivity;
        this.mouseSpeed = 0.002 * sensitivity;
        this.yawSpeed = 1.0 * sensitivity;
    }
    setRoom(room) {
        this.room = room;
    }
    pauseMovement(pause) {
        this.isPaused = pause;
        if (pause) {
            this.velocity.set(0, 0, 0);
            this.moveForward = this.moveBackward = this.moveLeft = this.moveRight = false;
        }
    }

    isLocked() {
        return this.controls.isLocked;
    }

    setupEventListeners() {
        this.domElement.addEventListener('click', () => {
            if (!this.isPaused) this.controls.lock();
        });

        this.controls.addEventListener('lock', () => {
            console.log('🎮 Controls locked');
            this.domElement.style.cursor = 'none';
        });
        
        this.controls.addEventListener('unlock', () => {
            console.log('🎮 Controls unlocked');
            this.domElement.style.cursor = 'default';
            this.moveForward = this.moveBackward = this.moveLeft = this.moveRight = false;
            this.velocity.set(0, 0, 0);
        });

        document.addEventListener('keydown', (event) => this.onKeyDown(event));
        document.addEventListener('keyup', (event) => this.onKeyUp(event));
        
        this.domElement.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });
    }
    
    // 🌟 SỬA LỖI: Cho phép xoay 360° ngang, chỉ giới hạn pitch
    setupMouseMovement() {
        document.addEventListener('mousemove', (event) => {
            if (!this.controls.isLocked || this.isPaused) return;
            
            const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
            
            // 🌟 HORIZONTAL ROTATION (YAW) - CHO PHÉP XOAY TOÀN PHẦN
            const deltaX = movementX * this.mouseSpeed * this.yawSpeed;
            this.camera.rotation.y -= deltaX; // Không giới hạn góc Y
            
            // 🎯 VERTICAL ROTATION (PITCH) - CHỈ GIỚI HẠN PITCH
            const deltaY = movementY * this.mouseSpeed;
            this.currentPitch -= deltaY;
            
            // Chỉ giới hạn pitch (góc lên/xuống)
            this.currentPitch = Math.max(this.minPitch, Math.min(this.maxPitch, this.currentPitch));
            this.camera.rotation.x = this.currentPitch;
            
            // 🔒 Đảm bảo không xoay trục Z
            this.camera.rotation.z = 0;
        });
    }

    // 🔧 SỬA LỖI: Đổi ngược hướng A/D
    onKeyDown(event) {
        if (this.isPaused) return;
        
        switch (event.code) {
            case 'KeyW': // W = tiến lên
            case 'ArrowUp':
                this.moveForward = true;
                break;
            case 'KeyA': // 🔧 SỬA: A = sang PHẢI (đổi ngược)
            case 'ArrowLeft':
                this.moveRight = true; // Đổi thành moveRight
                break;
            case 'KeyS': // S = lùi về
            case 'ArrowDown':
                this.moveBackward = true;
                break;
            case 'KeyD': // 🔧 SỬA: D = sang TRÁI (đổi ngược)
            case 'ArrowRight':
                this.moveLeft = true; // Đổi thành moveLeft
                break;
            case 'KeyE': // 🚪 Phím E để đi qua cửa
                this.activateDoor();
                break;
    
            case 'ShiftLeft':
            case 'ShiftRight':
                this.maxSpeed = this.speed * 2.0; // Sprint
                break;
        }
        
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
            event.preventDefault();
        }
    }
    // 🚪 Kích hoạt cửa
    activateDoor() {
        if (this.room) {
            this.room.activateNearestDoor(this.camera);
        }
    }
    // 🔧 SỬA LỖI: Đổi ngược hướng A/D cho keyUp
    onKeyUp(event) {
        if (this.isPaused) return;
        
        switch (event.code) {
            case 'KeyW':
            case 'ArrowUp':
                this.moveForward = false;
                break;
            case 'KeyA': // 🔧 SỬA: A = moveRight (đổi ngược)
            case 'ArrowLeft':
                this.moveRight = false; // Đổi thành moveRight
                break;
            case 'KeyS':
            case 'ArrowDown':
                this.moveBackward = false;
                break;
            case 'KeyD': // 🔧 SỬA: D = moveLeft (đổi ngược)
            case 'ArrowRight':
                this.moveLeft = false; // Đổi thành moveLeft
                break;
            case 'ShiftLeft':
            case 'ShiftRight':
                this.maxSpeed = this.speed * 1.4; // End sprint
                break;
        }
    }
    
    // Cải thiện collision detection
    checkCollisionWithObjects(position, direction, distance, objects) {
        const raycaster = new THREE.Raycaster();
        
        // Kiểm tra từ nhiều điểm xung quanh player
        const checkPoints = [
            position.clone(), // Trung tâm
            position.clone().add(new THREE.Vector3(this.playerRadius * 0.8, 0, 0)), // Phải
            position.clone().add(new THREE.Vector3(-this.playerRadius * 0.8, 0, 0)), // Trái
            position.clone().add(new THREE.Vector3(0, 0, this.playerRadius * 0.8)), // Trước
            position.clone().add(new THREE.Vector3(0, 0, -this.playerRadius * 0.8)), // Sau
            // Thêm các góc
            position.clone().add(new THREE.Vector3(this.playerRadius * 0.6, 0, this.playerRadius * 0.6)),
            position.clone().add(new THREE.Vector3(-this.playerRadius * 0.6, 0, this.playerRadius * 0.6)),
            position.clone().add(new THREE.Vector3(this.playerRadius * 0.6, 0, -this.playerRadius * 0.6)),
            position.clone().add(new THREE.Vector3(-this.playerRadius * 0.6, 0, -this.playerRadius * 0.6)),
        ];
        
        for (let point of checkPoints) {
            raycaster.set(point, direction.normalize());
            const intersects = raycaster.intersectObjects(objects, true);
            
            if (intersects.length > 0 && intersects[0].distance < distance) {
                return true;
            }
        }
        
        return false;
    }
    
    checkWallCollision(newPosition) {
        // Room bounds
        const roomBounds = {
            minX: -19,
            maxX: 19,
            minZ: -29,
            maxZ: 29
        };
        
        const buffer = this.playerRadius;
        
        return (newPosition.x < roomBounds.minX + buffer || 
                newPosition.x > roomBounds.maxX - buffer ||
                newPosition.z < roomBounds.minZ + buffer || 
                newPosition.z > roomBounds.maxZ - buffer);
    }
    
    checkArtifactCollision(newPosition, direction) {
        if (this.artifactObjects.length === 0) return false;
        
        return this.checkCollisionWithObjects(
            newPosition, 
            direction, 
            this.raycastDistance, 
            this.artifactObjects
        );
    }

    update(delta) {
        if (!this.controls.isLocked || this.isPaused) {
            return;
        }
        if (this.room) {
            this.room.checkDoorsInteraction(this.camera.position);
        }
        // 🔧 SỬA LỖI: Tính toán hướng di chuyển ĐÚNG với A/D đã đổi
        this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
        this.direction.x = Number(this.moveRight) - Number(this.moveLeft); // Đã đổi ngược
        this.direction.normalize();

        // Apply acceleration/deceleration
        const targetVelocity = new THREE.Vector3();
        
        if (this.direction.length() > 0) {
            // Get camera direction vectors
            const forward = new THREE.Vector3();
            this.camera.getWorldDirection(forward);
            forward.y = 0;
            forward.normalize();
            
            const right = new THREE.Vector3();
            right.crossVectors(this.camera.up, forward).normalize();
            
            // 🎯 ĐÚNG HƯỚNG: Calculate target velocity
            targetVelocity.addScaledVector(forward, this.direction.z);  // W/S
            targetVelocity.addScaledVector(right, this.direction.x);    // A/D (đã đổi)
            targetVelocity.normalize();
            targetVelocity.multiplyScalar(this.speed);
        }
        
        // Smooth movement
        const accelerationFactor = this.direction.length() > 0 ? this.acceleration : this.friction;
        this.velocity.lerp(targetVelocity, accelerationFactor * delta);
        
        // Clamp speed
        if (this.velocity.length() > this.maxSpeed) {
            this.velocity.normalize().multiplyScalar(this.maxSpeed);
        }
        
        // Calculate movement delta
        const deltaMovement = this.velocity.clone().multiplyScalar(delta);
        
        // Kiểm tra collision cho từng trục riêng biệt
        let canMoveX = true;
        let canMoveZ = true;
        
        // Test X movement
        const testPositionX = this.camera.position.clone();
        testPositionX.x += deltaMovement.x;
        
        const xDirection = new THREE.Vector3(Math.sign(deltaMovement.x), 0, 0);
        
        if (this.checkWallCollision(testPositionX) || 
            this.checkCollisionWithObjects(this.camera.position, xDirection, this.raycastDistance, this.collidableObjects) ||
            this.checkArtifactCollision(testPositionX, xDirection)) {
            canMoveX = false;
            this.velocity.x = 0;
        }
        
        // Test Z movement
        const testPositionZ = this.camera.position.clone();
        testPositionZ.z += deltaMovement.z;
        
        const zDirection = new THREE.Vector3(0, 0, Math.sign(deltaMovement.z));
        
        if (this.checkWallCollision(testPositionZ) || 
            this.checkCollisionWithObjects(this.camera.position, zDirection, this.raycastDistance, this.collidableObjects) ||
            this.checkArtifactCollision(testPositionZ, zDirection)) {
            canMoveZ = false;
            this.velocity.z = 0;
        }
        
        // Apply movement
        if (canMoveX) {
            this.camera.position.x = testPositionX.x;
        }
        if (canMoveZ) {
            this.camera.position.z = testPositionZ.z;
        }
        
        // 🔒 Luôn giữ camera ở độ cao cố định
        this.camera.position.y = 1.7;
        
        // 🎯 CHỈ CONSTRAIN PITCH, KHÔNG CONSTRAIN YAW
        this.constrainRotation();
    }
    
    // 🔧 Reset góc nhìn về phía trước
    resetRotation() {
        this.camera.rotation.set(0, 0, 0);
        this.currentPitch = 0;
    }
    
    // 🔧 CHỈ giới hạn pitch, cho phép yaw xoay tự do
    constrainRotation() {
        // CHỈ giới hạn pitch (góc lên/xuống)
        this.currentPitch = Math.max(this.minPitch, Math.min(this.maxPitch, this.currentPitch));
        this.camera.rotation.x = this.currentPitch;
        
        // KHÔNG giới hạn Y rotation (cho phép xoay 360°)
        // this.camera.rotation.y có thể là bất kỳ giá trị nào
        
        // Luôn giữ Z rotation = 0
        this.camera.rotation.z = 0;
    }
    
    // 🌟 Thêm method để get góc yaw hiện tại
    getCurrentYaw() {
        return this.camera.rotation.y;
    }
    
    // 🌟 Thêm method để get góc pitch hiện tại
    getCurrentPitch() {
        return this.currentPitch;
    }
    
    // 🌟 Thêm method để set góc yaw
    setYaw(yaw) {
        this.camera.rotation.y = yaw;
    }
    
    // 🌟 Thêm method để set góc pitch
    setPitch(pitch) {
        this.currentPitch = Math.max(this.minPitch, Math.min(this.maxPitch, pitch));
        this.camera.rotation.x = this.currentPitch;
    }
    
    getCurrentSpeed() {
        return this.velocity.length();
    }
    
    getPosition() {
        return this.camera.position.clone();
    }
    
    setPosition(x, y, z) {
        this.camera.position.set(x, y, z);
        this.velocity.set(0, 0, 0);
    }
    
    lookAt(target) {
        // Tính toán góc yaw và pitch để nhìn về target
        const direction = new THREE.Vector3();
        direction.subVectors(target, this.camera.position).normalize();
        
        // Tính yaw (xoay trái/phải)
        const yaw = Math.atan2(direction.x, direction.z);
        this.camera.rotation.y = yaw;
        
        // Tính pitch (xoay lên/xuống) với giới hạn
        const distance = Math.sqrt(direction.x * direction.x + direction.z * direction.z);
        const pitch = Math.atan2(-direction.y, distance);
        this.currentPitch = Math.max(this.minPitch, Math.min(this.maxPitch, pitch));
        this.camera.rotation.x = this.currentPitch;
        
        // Đảm bảo Z rotation = 0
        this.camera.rotation.z = 0;
    }
}