import * as THREE from 'three';
import Room from './Room.js';
import Lights from './Lights.js';

export default class SceneManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.screenDimensions = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        this.scene = this.buildScene();
        this.renderer = this.buildRenderer();
        this.camera = this.buildCamera();
        this.room = new Room(this.scene, 40, 8, 60); // Larger room: width, height, depth
        this.lights = new Lights(this.scene);
        this.clock = new THREE.Clock();
        
        this.setupResizeListener();
        this.setupRenderer();
    }

    buildScene() {
        const scene = new THREE.Scene();
        
        // Set background
        scene.background = new THREE.Color(0x2c3e50);
        
        // Add fog for atmosphere
        scene.fog = new THREE.Fog(0x2c3e50, 50, 200);
        
        return scene;
    }

    buildRenderer() {
        const renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas, 
            antialias: true,
            powerPreference: "high-performance"
        });
        
        renderer.setSize(this.screenDimensions.width, this.screenDimensions.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Enable shadows
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Improve color and lighting
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
        
        return renderer;
    }

    buildCamera() {
        const aspectRatio = this.screenDimensions.width / this.screenDimensions.height;
        const fieldOfView = 75;
        const nearPlane = 0.1;
        const farPlane = 1000;
        
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        
        // Position camera at human eye height in the center of the room
        camera.position.set(0, 1.7, 25); // Start near the back of the room
        camera.lookAt(0, 1.7, 0); // Look towards the front
        
        return camera;
    }

    setupRenderer() {
        // Performance optimizations
        this.renderer.info.autoReset = false;
        
        // Frustum culling is automatic in Three.js
        // Set up LOD if needed for complex models
    }

    setupResizeListener() {
        const handleResize = () => {
            this.screenDimensions.width = window.innerWidth;
            this.screenDimensions.height = window.innerHeight;
            
            this.camera.aspect = this.screenDimensions.width / this.screenDimensions.height;
            this.camera.updateProjectionMatrix();
            
            this.renderer.setSize(this.screenDimensions.width, this.screenDimensions.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        
        window.addEventListener('resize', handleResize);
        
        // Handle orientation change on mobile
        window.addEventListener('orientationchange', () => {
            setTimeout(handleResize, 100);
        });
    }
    
    getCollidableObjects() {
        // Return objects that the player can collide with
        const collidableObjects = [];
        
        if (this.room) {
            collidableObjects.push(this.room.floor);
            collidableObjects.push(...this.room.walls);
        }
        
        return collidableObjects;
    }

    addArtifactToScene(artifact) {
        if (artifact && artifact.mesh) {
            this.scene.add(artifact.mesh);
        }
    }

    removeArtifactFromScene(artifact) {
        if (artifact && artifact.mesh) {
            this.scene.remove(artifact.mesh);
        }
    }

    update(delta) {
        // Update any animations or time-based effects
        if (this.lights) {
            this.lights.update(delta);
        }
        
        // Reset renderer info for performance monitoring
        this.renderer.info.reset();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    // Performance monitoring
    getPerformanceInfo() {
        return {
            geometries: this.renderer.info.memory.geometries,
            textures: this.renderer.info.memory.textures,
            calls: this.renderer.info.render.calls,
            triangles: this.renderer.info.render.triangles,
            points: this.renderer.info.render.points,
            lines: this.renderer.info.render.lines
        };
    }

    dispose() {
        // Clean up resources
        this.scene.traverse((object) => {
            if (object.geometry) {
                object.geometry.dispose();
            }
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
        
        this.renderer.dispose();
        window.removeEventListener('resize', this.handleResize);
    }
}