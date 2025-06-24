import * as THREE from 'three';

export default class Artifact {
    constructor(name, description, content, size = { width: 1, height: 1, depth: 0.1 }, is3DModel = false) {
        this.name = name;
        this.description = description;
        this.size = size;
        this.is3DModel = is3DModel;
        this.content = content;
        
        this.mesh = this.createMesh();
        this.setupInteraction();
    }
    
    createMesh() {
        if (this.is3DModel) {
            return this.create3DModel();
        } else {
            return this.createPainting();
        }
    }
    
    create3DModel() {
        let mesh;
        
        if (this.content && this.content.isGroup) {
            // Content is a loaded GLTF scene
            mesh = this.content;
        } else if (this.content && this.content.isMesh) {
            // Content is a single mesh
            mesh = this.content;
        } else {
            // Fallback: create a simple box
            const geometry = new THREE.BoxGeometry(this.size.width, this.size.height, this.size.depth);
            const material = new THREE.MeshStandardMaterial({ 
                color: 0x888888,
                roughness: 0.7,
                metalness: 0.1
            });
            mesh = new THREE.Mesh(geometry, material);
        }
        
        // Scale the model to fit the desired size
        if (mesh.isGroup || mesh.isObject3D) {
            const box = new THREE.Box3().setFromObject(mesh);
            const currentSize = new THREE.Vector3();
            box.getSize(currentSize);
            
            // Calculate scale factor based on the largest dimension
            const maxCurrentSize = Math.max(currentSize.x, currentSize.y, currentSize.z);
            const maxDesiredSize = Math.max(this.size.width, this.size.height, this.size.depth);
            const scaleFactor = maxDesiredSize / maxCurrentSize;
            
            mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);
        }
        
        // Ensure shadows are enabled for all meshes
        mesh.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                
                // Ensure material is properly set up
                if (child.material) {
                    child.material.needsUpdate = true;
                }
            }
        });
        
        mesh.name = this.name;
        return mesh;
    }
    
    createPainting() {
        // Create frame
        const frameGroup = new THREE.Group();
        
        // Main painting geometry
        const paintingGeometry = new THREE.PlaneGeometry(this.size.width, this.size.height);
        
        // Create material with the texture
        let paintingMaterial;
        if (this.content && this.content.isTexture) {
            paintingMaterial = new THREE.MeshStandardMaterial({ 
                map: this.content,
                side: THREE.DoubleSide
            });
        } else {
            // Fallback material
            paintingMaterial = new THREE.MeshStandardMaterial({ 
                color: 0xffffff,
                side: THREE.DoubleSide
            });
        }
        
        const paintingMesh = new THREE.Mesh(paintingGeometry, paintingMaterial);
        paintingMesh.position.z = 0.01; // Slightly in front of frame
        
        // Create frame border
        const frameThickness = 0.05;
        const frameWidth = 0.1;
        
        // Frame material
        const frameMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x8B4513, // Brown color
            roughness: 0.8,
            metalness: 0.1
        });
        
        // Top frame piece
        const topFrameGeometry = new THREE.BoxGeometry(
            this.size.width + frameWidth * 2, 
            frameWidth, 
            frameThickness
        );
        const topFrame = new THREE.Mesh(topFrameGeometry, frameMaterial);
        topFrame.position.set(0, this.size.height / 2 + frameWidth / 2, 0);
        
        // Bottom frame piece
        const bottomFrame = new THREE.Mesh(topFrameGeometry, frameMaterial);
        bottomFrame.position.set(0, -this.size.height / 2 - frameWidth / 2, 0);
        
        // Left frame piece
        const sideFrameGeometry = new THREE.BoxGeometry(
            frameWidth, 
            this.size.height, 
            frameThickness
        );
        const leftFrame = new THREE.Mesh(sideFrameGeometry, frameMaterial);
        leftFrame.position.set(-this.size.width / 2 - frameWidth / 2, 0, 0);
        
        // Right frame piece
        const rightFrame = new THREE.Mesh(sideFrameGeometry, frameMaterial);
        rightFrame.position.set(this.size.width / 2 + frameWidth / 2, 0, 0);
        
        // Back panel
        const backPanelGeometry = new THREE.BoxGeometry(
            this.size.width + frameWidth * 2,
            this.size.height + frameWidth * 2,
            frameThickness / 2
        );
        const backPanelMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x654321 // Darker brown
        });
        const backPanel = new THREE.Mesh(backPanelGeometry, backPanelMaterial);
        backPanel.position.z = -frameThickness / 2;
        
        // Add all pieces to group
        frameGroup.add(paintingMesh);
        frameGroup.add(topFrame);
        frameGroup.add(bottomFrame);
        frameGroup.add(leftFrame);
        frameGroup.add(rightFrame);
        frameGroup.add(backPanel);
        
        // Enable shadows for all frame components
        frameGroup.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        
        frameGroup.name = this.name;
        return frameGroup;
    }
    
    setupInteraction() {
        // Add interaction properties
        this.mesh.userData = {
            isArtifact: true,
            artifactName: this.name,
            artifactDescription: this.description,
            interactable: true
        };
        
        // Add highlight material for hover effects
        this.originalMaterials = [];
        this.highlightMaterial = new THREE.MeshStandardMaterial({
            color: 0x44a08d,
            emissive: 0x222222,
            transparent: true,
            opacity: 0.8
        });
        
        this.mesh.traverse((child) => {
            if (child.isMesh && child.material) {
                this.originalMaterials.push(child.material);
            }
        });
    }
    
    highlight(enable = true) {
        this.mesh.traverse((child) => {
            if (child.isMesh) {
                if (enable) {
                    child.material = this.highlightMaterial;
                } else {
                    // Restore original material
                    const index = this.originalMaterials.findIndex(mat => mat);
                    if (index !== -1) {
                        child.material = this.originalMaterials[index];
                    }
                }
            }
        });
    }
    
    playAnimation(animationName) {
        if (this.mesh.animations && this.mesh.animations.length > 0) {
            // If the mesh has animations, create and play them
            if (!this.mixer) {
                this.mixer = new THREE.AnimationMixer(this.mesh);
            }
            
            const animation = this.mesh.animations.find(anim => 
                anim.name === animationName || animationName === 'default'
            ) || this.mesh.animations[0];
            
            if (animation) {
                const action = this.mixer.clipAction(animation);
                action.play();
                return action;
            }
        }
        return null;
    }
    
    stopAnimation() {
        if (this.mixer) {
            this.mixer.stopAllAction();
        }
    }
    
    update(deltaTime) {
        if (this.mixer) {
            this.mixer.update(deltaTime);
        }
    }
    
    getInfo() {
        return {
            name: this.name,
            description: this.description,
            size: this.size,
            is3DModel: this.is3DModel,
            position: this.mesh.position.clone(),
            rotation: this.mesh.rotation.clone(),
            scale: this.mesh.scale.clone()
        };
    }
    
    setPosition(x, y, z) {
        this.mesh.position.set(x, y, z);
    }
    
    setRotation(x, y, z) {
        this.mesh.rotation.set(x, y, z);
    }
    
    setScale(x, y, z) {
        this.mesh.scale.set(x, y, z);
    }
    
    dispose() {
        // Clean up resources
        this.mesh.traverse((child) => {
            if (child.isMesh) {
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(mat => mat.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
            }
        });
        
        if (this.mixer) {
            this.mixer.stopAllAction();
        }
        
        // Dispose textures
        if (this.content && this.content.isTexture) {
            this.content.dispose();
        }
        
        console.log(`🗑️ Disposed artifact: ${this.name}`);
    }
}