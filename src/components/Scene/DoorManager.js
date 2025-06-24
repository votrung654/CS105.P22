import * as THREE from 'three';
import { roomSystem } from '../../data/artifactsData.js';

/**
 * Quản lý hệ thống cửa và teleportation giữa các phòng
 * 
 * @author CS105.P22_Group10
 * @version 1.0.0
 */
export default class DoorManager {
    constructor(scene) {
        this.scene = scene;
        this.doors = [];
        this.doorMeshes = [];
        this.currentRoom = 'main'; // Phòng hiện tại
        
        // Event listeners
        this.onRoomChangeCallbacks = [];
        
        // Materials cho các loại cửa
        this.materials = {
            double: new THREE.MeshStandardMaterial({
                color: 0x8B4513,
                roughness: 0.8,
                metalness: 0.1
            }),
            single: new THREE.MeshStandardMaterial({
                color: 0x654321,
                roughness: 0.7,
                metalness: 0.1
            }),
            arch: new THREE.MeshStandardMaterial({
                color: 0x8B7355,
                roughness: 0.6,
                metalness: 0.0
            })
        };
        
        this.initializeDoors();
    }

    /**
     * Khởi tạo tất cả cửa trong hệ thống
     */
    initializeDoors() {
        roomSystem.doors.forEach(doorData => {
            this.createDoor(doorData);
        });
        
        console.log(`🚪 Initialized ${this.doors.length} doors`);
    }

    /**
     * Tạo một cửa từ data
     */
    createDoor(doorData) {
        const doorGroup = new THREE.Group();
        doorGroup.name = `door_${doorData.id}`;
        
        // Tạo khung cửa
        const frameGeometry = this.createDoorFrameGeometry(doorData);
        const frameMaterial = this.materials[doorData.doorType] || this.materials.single;
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        
        // Tạo cửa (có thể mở được)
        const doorGeometry = this.createDoorPanelGeometry(doorData);
        const doorMaterial = frameMaterial.clone();
        doorMaterial.color.multiplyScalar(0.9); // Slightly darker
        const doorPanel = new THREE.Mesh(doorGeometry, doorMaterial);
        
        // Tạo trigger zone (vùng kích hoạt teleport)
        const triggerGeometry = new THREE.BoxGeometry(
            doorData.size.width + 1,
            doorData.size.height,
            doorData.size.depth + 1
        );
        const triggerMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0.0, // Invisible
            visible: false // Hidden in production
        });
        const trigger = new THREE.Mesh(triggerGeometry, triggerMaterial);
        trigger.name = 'doorTrigger';
        
        // Tạo label/sign
        const label = this.createDoorLabel(doorData);
        
        // Assembly
        doorGroup.add(frame);
        doorGroup.add(doorPanel);
        doorGroup.add(trigger);
        if (label) doorGroup.add(label);
        
        // Position and rotation
        doorGroup.position.set(
            doorData.position.x,
            doorData.position.y,
            doorData.position.z
        );
        
        if (doorData.rotation) {
            doorGroup.rotation.set(
                THREE.MathUtils.degToRad(doorData.rotation.x),
                THREE.MathUtils.degToRad(doorData.rotation.y),
                THREE.MathUtils.degToRad(doorData.rotation.z)
            );
        }
        
        // Metadata
        doorGroup.userData = {
            isDoor: true,
            doorData: doorData,
            trigger: trigger,
            panel: doorPanel,
            isOpen: false
        };
        
        // Add to scene and tracking
        this.scene.add(doorGroup);
        this.doors.push(doorGroup);
        this.doorMeshes.push(trigger); // For raycasting
        
        // Enable shadows
        frame.castShadow = true;
        frame.receiveShadow = true;
        doorPanel.castShadow = true;
        doorPanel.receiveShadow = true;
        
        console.log(`🚪 Created door: ${doorData.id} (${doorData.fromRoom} → ${doorData.toRoom})`);
    }

    /**
     * Tạo geometry cho khung cửa
     */
    createDoorFrameGeometry(doorData) {
        const { width, height, depth } = doorData.size;
        const frameThickness = 0.15;
        
        const shape = new THREE.Shape();
        
        // Outer rectangle
        shape.moveTo(-width/2, 0);
        shape.lineTo(width/2, 0);
        shape.lineTo(width/2, height);
        shape.lineTo(-width/2, height);
        shape.lineTo(-width/2, 0);
        
        // Inner rectangle (door opening)
        const hole = new THREE.Path();
        const innerWidth = width - (frameThickness * 2);
        const innerHeight = height - frameThickness;
        
        hole.moveTo(-innerWidth/2, frameThickness);
        hole.lineTo(innerWidth/2, frameThickness);
        hole.lineTo(innerWidth/2, height);
        hole.lineTo(-innerWidth/2, height);
        hole.lineTo(-innerWidth/2, frameThickness);
        
        shape.holes.push(hole);
        
        const extrudeSettings = {
            depth: depth,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.01
        };
        
        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }

    /**
     * Tạo geometry cho cánh cửa
     */
    createDoorPanelGeometry(doorData) {
        const { width, height, depth } = doorData.size;
        const frameThickness = 0.15;
        
        const panelWidth = width - (frameThickness * 2) - 0.05;
        const panelHeight = height - frameThickness - 0.05;
        const panelDepth = depth * 0.8;
        
        return new THREE.BoxGeometry(panelWidth, panelHeight, panelDepth);
    }

    /**
     * Tạo label cho cửa
     */
    createDoorLabel(doorData) {
        if (!doorData.label) return null;
        
        // Text geometry (simplified - in real project you'd use TextGeometry)
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 128;
        
        // Background
        context.fillStyle = 'rgba(255, 255, 255, 0.9)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Border
        context.strokeStyle = '#333333';
        context.lineWidth = 4;
        context.strokeRect(0, 0, canvas.width, canvas.height);
        
        // Text
        context.fillStyle = '#333333';
        context.font = 'bold 48px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(doorData.label, canvas.width/2, canvas.height/2);
        
        // Create texture and material
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true
        });
        
        // Create plane
        const geometry = new THREE.PlaneGeometry(2, 0.5);
        const label = new THREE.Mesh(geometry, material);
        
        // Position above door
        label.position.set(0, doorData.size.height + 0.5, doorData.size.depth/2 + 0.1);
        
        return label;
    }

    /**
     * Kiểm tra collision với cửa
     */
    checkDoorCollision(playerPosition, raycaster) {
        // Cast ray từ player position
        const intersects = raycaster.intersectObjects(this.doorMeshes, false);
        
        if (intersects.length > 0) {
            const intersectedDoor = intersects[0].object.parent;
            if (intersectedDoor && intersectedDoor.userData.isDoor) {
                const distance = intersects[0].distance;
                if (distance < 2.0) { // Player cần gần cửa
                    return intersectedDoor.userData.doorData;
                }
            }
        }
        
        return null;
    }

    /**
     * Thực hiện teleport qua cửa
     */
    teleportThroughDoor(doorData, player, onComplete) {
        console.log(`🚶 Teleporting from ${doorData.fromRoom} to ${doorData.toRoom}`);
        
        // Animation fade out (optional)
        this.playDoorAnimation(doorData);
        
        // Change position
        player.position.set(
            doorData.teleportTo.x,
            doorData.teleportTo.y,
            doorData.teleportTo.z
        );
        
        // Update current room
        const oldRoom = this.currentRoom;
        this.currentRoom = doorData.toRoom;
        
        // Notify listeners
        this.onRoomChangeCallbacks.forEach(callback => {
            callback(oldRoom, this.currentRoom, doorData);
        });
        
        // Callback completion
        if (onComplete) {
            onComplete(oldRoom, this.currentRoom);
        }
        
        console.log(`✅ Teleported to room: ${this.currentRoom}`);
    }

    /**
     * Animation mở cửa
     */
    playDoorAnimation(doorData) {
        const door = this.doors.find(d => d.userData.doorData.id === doorData.id);
        if (!door) return;
        
        const panel = door.userData.panel;
        const isOpen = door.userData.isOpen;
        
        // Simple rotation animation
        const targetRotation = isOpen ? 0 : Math.PI * 0.7;
        
        // Animate (simplified - in real project use TWEEN.js or similar)
        const animate = () => {
            const step = 0.1;
            const current = panel.rotation.y;
            const diff = targetRotation - current;
            
            if (Math.abs(diff) > 0.01) {
                panel.rotation.y += diff * step;
                requestAnimationFrame(animate);
            } else {
                panel.rotation.y = targetRotation;
                door.userData.isOpen = !isOpen;
            }
        };
        
        animate();
    }

    /**
     * Lấy danh sách cửa cho phòng hiện tại
     */
    getDoorsForCurrentRoom() {
        return this.doors.filter(door => 
            door.userData.doorData.fromRoom === this.currentRoom
        );
    }

    /**
     * Cập nhật visibility của cửa theo phòng hiện tại
     */
    updateDoorVisibility() {
        this.doors.forEach(door => {
            const doorData = door.userData.doorData;
            const shouldBeVisible = doorData.fromRoom === this.currentRoom;
            door.visible = shouldBeVisible;
        });
    }

    /**
     * Lấy thông tin phòng hiện tại
     */
    getCurrentRoom() {
        return roomSystem.getRoomById(this.currentRoom);
    }

    /**
     * Thay đổi phòng hiện tại (không teleport)
     */
    setCurrentRoom(roomId) {
        if (roomSystem.getRoomById(roomId)) {
            const oldRoom = this.currentRoom;
            this.currentRoom = roomId;
            this.updateDoorVisibility();
            
            this.onRoomChangeCallbacks.forEach(callback => {
                callback(oldRoom, this.currentRoom, null);
            });
        }
    }

    /**
     * Đăng ký callback khi đổi phòng
     */
    onRoomChange(callback) {
        this.onRoomChangeCallbacks.push(callback);
    }

    /**
     * Lấy tất cả door meshes để collision detection
     */
    getDoorMeshes() {
        return this.doorMeshes;
    }

    /**
     * Lấy door gần nhất với player
     */
    getNearestDoor(playerPosition) {
        let nearestDoor = null;
        let nearestDistance = Infinity;
        
        this.getDoorsForCurrentRoom().forEach(door => {
            const distance = door.position.distanceTo(playerPosition);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestDoor = door;
            }
        });
        
        return { door: nearestDoor, distance: nearestDistance };
    }

    /**
     * Debug: Hiển thị trigger zones
     */
    showTriggerZones(show = true) {
        this.doors.forEach(door => {
            const trigger = door.userData.trigger;
            if (trigger) {
                trigger.material.visible = show;
                trigger.material.opacity = show ? 0.3 : 0.0;
            }
        });
    }

    /**
     * Cleanup
     */
    dispose() {
        this.doors.forEach(door => {
            this.scene.remove(door);
            
            // Dispose geometries and materials
            door.traverse(child => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(mat => mat.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
            });
        });
        
        // Dispose cached materials
        Object.values(this.materials).forEach(material => {
            material.dispose();
        });
        
        this.doors = [];
        this.doorMeshes = [];
        this.onRoomChangeCallbacks = [];
        
        console.log('🧹 DoorManager disposed');
    }
}