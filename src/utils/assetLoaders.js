import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import Artifact from '../components/Artifacts/Artifact.js';

// Initialize loaders
const gltfLoader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
const audioLoader = new THREE.AudioLoader();

// Setup Draco loader for compressed models
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Create a fallback texture when loading fails or path is null
 */
function createFallbackTexture(color = 0xcccccc, pattern = 'solid') {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    // Base color
    const hexColor = `#${color.toString(16).padStart(6, '0')}`;
    context.fillStyle = hexColor;
    context.fillRect(0, 0, 512, 512);
    
    // Add pattern based on type
    switch (pattern) {
        case 'painting':
            // Add frame-like border
            context.strokeStyle = '#8B4513';
            context.lineWidth = 20;
            context.strokeRect(10, 10, 492, 492);
            
            // Add some artistic brush strokes
            context.strokeStyle = `#${(color * 0.8).toString(16).padStart(6, '0')}`;
            context.lineWidth = 3;
            for (let i = 0; i < 20; i++) {
                context.beginPath();
                context.moveTo(Math.random() * 512, Math.random() * 512);
                context.lineTo(Math.random() * 512, Math.random() * 512);
                context.stroke();
            }
            break;
            
        case 'sculpture':
            // Add marble-like texture
            context.fillStyle = `#${(color + 0x111111).toString(16).padStart(6, '0')}`;
            for (let i = 0; i < 100; i++) {
                context.fillRect(
                    Math.random() * 512, 
                    Math.random() * 512, 
                    Math.random() * 10, 
                    Math.random() * 10
                );
            }
            break;
            
        default:
            // Simple grid pattern
            context.strokeStyle = `#${(color * 0.9).toString(16).padStart(6, '0')}`;
            context.lineWidth = 1;
            for (let i = 0; i < 512; i += 32) {
                context.beginPath();
                context.moveTo(i, 0);
                context.lineTo(i, 512);
                context.moveTo(0, i);
                context.lineTo(512, i);
                context.stroke();
            }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
}

/**
 * Create a simple 3D model fallback
 */
function createFallbackModel(type = 'box', color = 0x888888) {
    let geometry;
    
    switch (type) {
        case 'sphere':
            geometry = new THREE.SphereGeometry(1, 32, 32);
            break;
        case 'cylinder':
            geometry = new THREE.CylinderGeometry(0.8, 0.8, 2, 32);
            break;
        case 'cone':
            geometry = new THREE.ConeGeometry(1, 2, 32);
            break;
        default:
            geometry = new THREE.BoxGeometry(1, 1, 1);
    }
    
    const material = new THREE.MeshStandardMaterial({ 
        color: color,
        roughness: 0.7,
        metalness: 0.1
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    
    return mesh;
}

/**
 * Load GLTF/GLB 3D model (with better error handling)
 */
export async function loadGLTFModel(path) {
    if (!path) {
        throw new Error('No path provided');
    }
    
    return new Promise((resolve, reject) => {
        gltfLoader.load(
            path,
            (gltf) => {
                gltf.scene.traverse(function (child) {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        
                        if (child.material) {
                            child.material.needsUpdate = true;
                        }
                    }
                });
                
                console.log(`✅ Loaded model: ${path}`);
                resolve(gltf.scene);
            },
            (progress) => {
                console.log(`📥 Loading ${path}: ${(progress.loaded / progress.total * 100)}%`);
            },
            (error) => {
                console.log(`⚠️ Could not load model: ${path}`);
                reject(error);
            }
        );
    });
}

/**
 * Load texture image (with better error handling)
 */
export async function loadTexture(path) {
    if (!path) {
        throw new Error('No path provided');
    }
    
    return new Promise((resolve, reject) => {
        textureLoader.load(
            path,
            (texture) => {
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.minFilter = THREE.LinearMipmapLinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.generateMipmaps = true;
                
                console.log(`✅ Loaded texture: ${path}`);
                resolve(texture);
            },
            undefined,
            (error) => {
                console.log(`⚠️ Could not load texture: ${path}`);
                reject(error);
            }
        );
    });
}

/**
 * Load all artifacts from data array with proper fallback handling
 */
export async function loadArtifacts(artifactsData, scene) {
    const loadedArtifacts = [];
    
    console.log(`📦 Loading ${artifactsData.length} artifacts...`);
    
    for (let i = 0; i < artifactsData.length; i++) {
        const data = artifactsData[i];
        
        try {
            let content;
            let artifact;
            
            if (data.type === 'painting') {
                // Try to load texture, use fallback if fails or no path
                if (data.path) {
                    try {
                        content = await loadTexture(data.path);
                    } catch (error) {
                        console.log(`🎨 Using fallback texture for: ${data.name}`);
                        content = createFallbackTexture(data.fallbackColor || 0x8B4513, 'painting');
                    }
                } else {
                    console.log(`🎨 Creating fallback texture for: ${data.name}`);
                    content = createFallbackTexture(data.fallbackColor || 0x8B4513, 'painting');
                }
                
                artifact = new Artifact(data.name, data.description, content, data.size, false);
            } 
            else if (data.type === 'model3d') {
                // Try to load model, use fallback if fails or no path
                if (data.path) {
                    try {
                        content = await loadGLTFModel(data.path);
                        artifact = new Artifact(data.name, data.description, content, data.size, true);
                    } catch (error) {
                        console.log(`🗿 Using fallback model for: ${data.name}`);
                        content = createFallbackModel(
                            data.fallbackType || 'box', 
                            data.fallbackColor || 0x888888
                        );
                        artifact = new Artifact(data.name, data.description, content, data.size, true);
                    }
                } else {
                    console.log(`🗿 Creating fallback model for: ${data.name}`);
                    content = createFallbackModel(
                        data.fallbackType || 'box', 
                        data.fallbackColor || 0x888888
                    );
                    artifact = new Artifact(data.name, data.description, content, data.size, true);
                }
            }
            
            if (artifact && artifact.mesh) {
                // Set position
                artifact.mesh.position.set(data.position.x, data.position.y, data.position.z);
                
                // Set rotation if specified
                if (data.rotation) {
                    artifact.mesh.rotation.set(
                        THREE.MathUtils.degToRad(data.rotation.x || 0),
                        THREE.MathUtils.degToRad(data.rotation.y || 0),
                        THREE.MathUtils.degToRad(data.rotation.z || 0)
                    );
                }
                
                // Set scale if specified
                if (data.scale) {
                    artifact.mesh.scale.set(data.scale.x || 1, data.scale.y || 1, data.scale.z || 1);
                }
                
                // Add to scene
                scene.add(artifact.mesh);
                
                // Store artifact data
                artifact.mesh.userData = {
                    artifactData: data,
                    isArtifact: true
                };
                
                loadedArtifacts.push({ mesh: artifact.mesh, data, artifact });
                console.log(`✅ Added artifact: ${data.name}`);
            }
            
        } catch (error) {
            console.error(`❌ Failed to create artifact: ${data.name}`, error);
        }
    }
    
    console.log(`🎉 Successfully loaded ${loadedArtifacts.length} artifacts`);
    return loadedArtifacts;
}

/**
 * Preload essential textures for room
 */
export async function preloadTextures() {
    const essentialTextures = {
        floor: createFallbackTexture(0x8B4513, 'wood'), // Wood brown
        wall: createFallbackTexture(0xF5F5DC, 'marble')  // Marble beige
    };
    
    console.log('🏠 Created fallback room textures');
    return essentialTextures;
}

/**
 * Load manager for tracking overall progress
 */
export class AssetLoadManager {
    constructor() {
        this.totalAssets = 0;
        this.loadedAssets = 0;
        this.onProgress = null;
        this.onComplete = null;
    }
    
    setTotalAssets(total) {
        this.totalAssets = total;
        this.loadedAssets = 0;
    }
    
    incrementLoaded() {
        this.loadedAssets++;
        const progress = (this.loadedAssets / this.totalAssets) * 100;
        
        if (this.onProgress) {
            this.onProgress(progress, this.loadedAssets, this.totalAssets);
        }
        
        if (this.loadedAssets >= this.totalAssets && this.onComplete) {
            this.onComplete();
        }
    }
    
    getProgress() {
        return this.totalAssets > 0 ? (this.loadedAssets / this.totalAssets) * 100 : 0;
    }
}

export default {
    loadGLTFModel,
    loadTexture,
    loadArtifacts,
    preloadTextures,
    AssetLoadManager
};