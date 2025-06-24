import * as THREE from 'three';
import SceneManager from './components/Scene/SceneManager.js';
import PlayerControls from './components/Player/PlayerControls.js';
import MiniMap from './components/UI/MiniMap.js';
import InfoPanel from './components/UI/InfoPanel.js';
import LoadingScreen from './components/UI/LoadingScreen.js';
import TutorialPanel from './components/UI/TutorialPanel.js';
import { loadArtifacts } from './utils/assetLoaders.js';
import artifactsData from './data/artifactsData.js';

/**
 * Museum3D - Professional 3D Museum Application
 * 
 * Features:
 * - Full 3D museum environment with collision detection
 * - Interactive artifact system with audio descriptions
 * - Real-time mini-map with player tracking
 * - Comprehensive settings system with persistence
 * - Tutorial system for new users
 * - Performance monitoring and optimization
 * - Error recovery and graceful degradation
 * 
 * @author CS105.P22_Group10
 * @version 2.0.0
 */
class Museum3D {
    constructor() {
        // Core 3D Components
        this.canvas = null;
        this.sceneManager = null;
        this.playerControls = null;
        this.doorManager = null;
        this.clock = new THREE.Clock();
        
        // UI Management System
        this.loadingScreen = null;
        this.infoPanel = null;
        this.tutorialPanel = null;
        this.miniMap = null;
        
        // Application State Management
        this.isInitialized = false;
        this.isPaused = false;
        this.isDestroyed = false;
        this.artifacts = [];
        this.collidableObjects = [];
        
        // Settings System with Validation
        this.defaultSettings = {
            mouseSensitivity: 0.8,
            movementSpeed: 5.0,
            audioEnabled: true,
            showTutorial: true,
            showMiniMap: true,
            showControls: true,
            qualityLevel: 'medium' // low, medium, high
        };
        this.settings = { ...this.defaultSettings };
        
        // Advanced Interaction System
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hoveredArtifact = null;
        this.selectedArtifact = null;
        this.nearDoor = null;
        this.interactionCooldown = false;
        
        // Performance Monitoring
        this.animationId = null;
        this.lastTime = 0;
        this.frameCount = 0;
        this.fps = 0;
        this.performanceMetrics = {
            averageFps: 60,
            frameTimeMs: 16.67,
            memoryUsage: 0,
            renderCalls: 0
        };
        
        // Event System with Proper Cleanup
        this.eventHandlers = new Map();
        this.setupEventHandlers();
        
        // Audio System
        this.audioContext = null;
        this.currentAudio = null;
        this.speechSynthesis = window.speechSynthesis;
        
        // Initialize Application
        this.initialize();
    }

    /**
     * Setup all event handlers with proper binding
     */
    setupEventHandlers() {
        this.eventHandlers.set('resize', this.handleResize.bind(this));
        this.eventHandlers.set('keydown', this.handleKeyDown.bind(this));
        this.eventHandlers.set('keyup', this.handleKeyUp.bind(this));
        this.eventHandlers.set('mouseclick', this.handleMouseClick.bind(this));
        this.eventHandlers.set('mousemove', this.handleMouseMove.bind(this));
        this.eventHandlers.set('visibilitychange', this.handleVisibilityChange.bind(this));
        this.eventHandlers.set('beforeunload', this.handleBeforeUnload.bind(this));
        this.eventHandlers.set('error', this.handleGlobalError.bind(this));
        this.eventHandlers.set('unhandledrejection', this.handleUnhandledRejection.bind(this));
    }

    /**
     * Main initialization sequence with comprehensive error handling
     */
    async initialize() {
        try {
            console.log('🏛️ Initializing Museum Imaginarium v2.0...');
            
            // Step 1: Setup error handling first
            this.setupGlobalErrorHandling();
            
            // Step 2: Validate environment
            if (!this.validateEnvironment()) {
                throw new Error('Environment validation failed');
            }
            
            // Step 3: Initialize UI components
            this.initializeUIComponents();
            
            // Step 4: Load user settings
            this.loadUserSettings();
            
            // Step 5: Show loading screen
            this.loadingScreen.show();
            
            // Step 6: Initialize core systems
            await this.initializeCoreSystems();
            
            // Step 7: Setup event listeners
            this.setupEventListeners();
            
            // Step 8: Initialize audio system
            this.initializeAudioSystem();
            
            // Step 9: Finalize initialization
            this.finalizeInitialization();
            
        } catch (error) {
            this.handleFatalError(error, 'Failed to initialize Museum3D');
        }
    }

    /**
     * Validate browser environment and requirements
     */
    validateEnvironment() {
        const errors = [];
        
        // Check WebGL support
        if (!window.WebGLRenderingContext) {
            errors.push('WebGL is not supported');
        }
        
        // Check required APIs
        const requiredAPIs = [
            'requestAnimationFrame',
            'localStorage',
            'addEventListener'
        ];
        
        requiredAPIs.forEach(api => {
            if (!window[api]) {
                errors.push(`${api} is not supported`);
            }
        });
        
        // Check required DOM elements
        const requiredElements = [
            'loading-screen',
            'museum-canvas',
            'info-panel',
            'mini-map-container',
            'settings-menu',
            'controls-hint'
        ];
        
        const missingElements = requiredElements.filter(id => !document.getElementById(id));
        if (missingElements.length > 0) {
            errors.push(`Missing DOM elements: ${missingElements.join(', ')}`);
        }
        
        if (errors.length > 0) {
            console.error('Environment validation failed:', errors);
            this.showEnvironmentError(errors);
            return false;
        }
        
        console.log('✅ Environment validation passed');
        return true;
    }

    /**
     * Initialize UI components with error handling
     */
    initializeUIComponents() {
        try {
            // Loading Screen
            const loadingElement = document.getElementById('loading-screen');
            if (!loadingElement) throw new Error('Loading screen element not found');
            this.loadingScreen = new LoadingScreen(loadingElement);
            
            // Info Panel
            const infoPanelElement = document.getElementById('info-panel');
            if (!infoPanelElement) throw new Error('Info panel element not found');
            this.infoPanel = new InfoPanel(infoPanelElement);
            
            // Tutorial Panel
            this.tutorialPanel = new TutorialPanel();
            
            console.log('✅ UI Components initialized');
        } catch (error) {
            throw new Error(`UI Components initialization failed: ${error.message}`);
        }
    }

    /**
     * Initialize core 3D systems with progress tracking
     */
    async initializeCoreSystems() {
        const steps = [
            { progress: 10, message: "Khởi tạo không gian 3D...", fn: () => this.initializeCanvas() },
            { progress: 20, message: "Tạo scene và renderer...", fn: () => this.initializeScene() },
            { progress: 35, message: "Thiết lập điều khiển người dùng...", fn: () => this.initializePlayerControls() },
            { progress: 50, message: "Tải hiện vật nghệ thuật...", fn: () => this.loadMuseumArtifacts() },
            { progress: 70, message: "Khởi tạo hệ thống bản đồ...", fn: () => this.initializeMiniMap() },
            { progress: 85, message: "Thiết lập tương tác...", fn: () => this.setupInteractionSystem() },
            { progress: 95, message: "Khởi động render engine...", fn: () => this.startRenderLoop() }
        ];

        for (const step of steps) {
            this.loadingScreen.updateProgress(step.progress, step.message);
            await this.delay(150); // Smooth loading experience
            
            try {
                await step.fn();
            } catch (error) {
                console.error(`Failed at step: ${step.message}`, error);
                throw error;
            }
        }

        this.loadingScreen.updateProgress(100, "Hoàn tất! Chào mừng đến bảo tàng 3D!");
        await this.delay(800);
    }

    /**
     * Initialize canvas with WebGL context validation
     */
    initializeCanvas() {
        this.canvas = document.getElementById('museum-canvas');
        if (!this.canvas) {
            throw new Error('Canvas element #museum-canvas not found');
        }
        
        // Test WebGL context
        const testContext = this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        if (!testContext) {
            throw new Error('WebGL context could not be created');
        }
        
        // Configure canvas
        this.canvas.style.display = 'block';
        this.canvas.tabIndex = 1; // Make focusable
        this.canvas.focus();
        
        console.log('✅ Canvas initialized with WebGL support');
    }

    /**
     * Initialize 3D scene with quality settings
     */
    initializeScene() {
        try {
            this.sceneManager = new SceneManager(this.canvas, {
                qualityLevel: this.settings.qualityLevel,
                enableShadows: this.settings.qualityLevel !== 'low',
                enableFog: this.settings.qualityLevel === 'high',
                maxLights: this.settings.qualityLevel === 'low' ? 3 : 8
            });
            
            // Store collidable objects for player controls
            this.collidableObjects = this.sceneManager.getCollidableObjects();
            
            console.log('✅ Scene manager initialized');
        } catch (error) {
            throw new Error(`Scene initialization failed: ${error.message}`);
        }
    }

    /**
     * Initialize player controls with collision detection
     */
    initializePlayerControls() {
        try {
            this.playerControls = new PlayerControls(
                this.sceneManager.camera,
                this.canvas,
                this.sceneManager.scene,
                {
                    mouseSensitivity: this.settings.mouseSensitivity,
                    movementSpeed: this.settings.movementSpeed
                }
            );
            // 🚪 Set room reference for door interaction
            if (this.sceneManager.room) {
                this.playerControls.setRoom(this.sceneManager.room);
            }

            // 🗺️ Setup minimap with doors
            if (this.miniMap && this.sceneManager.room) {
                this.miniMap.addDoors(this.sceneManager.room.doors);
            }
            // Apply user settings
            this.playerControls.setSensitivity(this.settings.mouseSensitivity);
            this.playerControls.setSpeed(this.settings.movementSpeed);
            this.playerControls.setCollidableObjects(this.collidableObjects);
            
            console.log('✅ Player controls initialized');
        } catch (error) {
            throw new Error(`Player controls initialization failed: ${error.message}`);
        }
    }

    /**
     * Load museum artifacts with progress feedback
     */
    async loadMuseumArtifacts() {
        try {
            this.artifacts = await loadArtifacts(artifactsData, this.sceneManager.scene);
            
            // Setup artifact meshes for interaction
            const artifactMeshes = [];
            this.artifacts.forEach(({ mesh, data }) => {
                if (mesh && mesh.userData) {
                    mesh.userData.isArtifact = true;
                    mesh.userData.artifactData = data;
                    mesh.userData.interactable = true;
                    mesh.userData.originalEmissive = null;
                    
                    artifactMeshes.push(mesh);
                }
            });
            
            // Update player controls with artifact collision
            if (this.playerControls) {
                this.playerControls.setArtifactObjects(artifactMeshes);
            }
            
            console.log(`✅ Loaded ${this.artifacts.length} artifacts`);
        } catch (error) {
            console.warn('Failed to load some artifacts:', error);
            // Continue with empty artifacts array
            this.artifacts = [];
        }
    }

    /**
     * Initialize mini-map with artifact tracking
     */
    initializeMiniMap() {
        try {
            const miniMapContainer = document.getElementById('mini-map-container');
            if (!miniMapContainer) {
                console.warn('Mini-map container not found');
                return;
            }

            const roomBounds = this.sceneManager.room?.getBounds ? 
                this.sceneManager.room.getBounds() : 
                { width: 40, depth: 60 };
                
            this.miniMap = new MiniMap(
                miniMapContainer,
                this.sceneManager.scene,
                this.sceneManager.camera,
                roomBounds
            );
            
            // Add artifacts to mini-map
            this.artifacts.forEach(({ mesh, data }) => {
                if (mesh && mesh.position && data) {
                    const worldPosition = new THREE.Vector3();
                    mesh.getWorldPosition(worldPosition);
                    this.miniMap.addArtifact(worldPosition, data.name);
                }
            });
            
            console.log('✅ Mini-map initialized');
        } catch (error) {
            console.warn('Mini-map initialization failed:', error);
        }
    }

    /**
     * Setup interaction system with raycasting
     */
    setupInteractionSystem() {
        try {
            this.raycaster.far = 8; // Interaction distance
            this.raycaster.near = 0.1;
            
            // Setup interaction cooldown
            this.interactionCooldown = false;
            
            console.log('✅ Interaction system ready');
        } catch (error) {
            console.warn('Interaction system setup failed:', error);
        }
    }

    /**
     * Initialize audio system
     */
    initializeAudioSystem() {
        try {
            if (this.settings.audioEnabled) {
                // Initialize Web Audio API if available
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) {
                    this.audioContext = new AudioContext();
                }
            }
            
            console.log('✅ Audio system initialized');
        } catch (error) {
            console.warn('Audio system initialization failed:', error);
        }
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        try {
            // Window events
            window.addEventListener('resize', this.eventHandlers.get('resize'));
            window.addEventListener('beforeunload', this.eventHandlers.get('beforeunload'));
            document.addEventListener('visibilitychange', this.eventHandlers.get('visibilitychange'));
            
            // Keyboard events
            document.addEventListener('keydown', this.eventHandlers.get('keydown'));
            document.addEventListener('keyup', this.eventHandlers.get('keyup'));
            
            // Mouse events
            this.canvas.addEventListener('click', this.eventHandlers.get('mouseclick'));
            this.canvas.addEventListener('mousemove', this.eventHandlers.get('mousemove'));
            
            // Setup UI components
            this.setupSettingsMenu();
            this.setupInfoPanelEvents();
            
            console.log('✅ Event listeners setup complete');
        } catch (error) {
            console.warn('Event listeners setup failed:', error);
        }
    }

    /**
     * Finalize initialization and show tutorial
     */
    finalizeInitialization() {
        setTimeout(() => {
            this.loadingScreen.hide();
            this.isInitialized = true;
            
            // Show tutorial for first-time users
            if (this.settings.showTutorial) {
                this.tutorialPanel.showIfFirstTime();
            }
            
            // Show controls hint
            this.showControlsHint();
            
            console.log('🎉 Museum Imaginarium ready!');
            
            // Trigger initialization complete event
            this.dispatchCustomEvent('museum:initialized', {
                artifacts: this.artifacts.length,
                performance: this.getPerformanceMetrics()
            });
            
        }, 1000);
    }

    /**
     * Handle keyboard input with key mapping
     */
    handleKeyDown(event) {
        if (this.isPaused || this.isDestroyed) return;
        
        const keyActions = {
            'Escape': () => this.toggleSettingsMenu(),
            'KeyH': () => this.tutorialPanel?.toggle(),
            'KeyM': () => this.toggleMiniMap(),
            'KeyF': () => this.toggleFullscreen(),
            'KeyC': () => this.toggleControlsHint(),
            'KeyR': () => this.resetPlayerPosition(),
            'KeyP': () => this.togglePause(),
            'Tab': (e) => e.preventDefault()
        };
        
        const action = keyActions[event.code];
        if (action) {
            action(event);
        }
    }

    /**
     * Handle key release
     */
    handleKeyUp(event) {
        // Reserved for future key release handlers
    }

    /**
     * Handle mouse clicks for artifact interaction
     */
    handleMouseClick(event) {
        if (!this.playerControls?.isLocked() || this.interactionCooldown) return;
        if (this.infoPanel?.isShowing()) return;
        
        this.updateMousePosition(event);
        
        // Raycast for artifact interaction
        this.raycaster.setFromCamera(this.mouse, this.sceneManager.camera);
        const intersects = this.raycaster.intersectObjects(this.sceneManager.scene.children, true);
        
        // Find closest interactable artifact
        for (const intersect of intersects) {
            const object = intersect.object;
            if (this.isArtifactInteractable(object)) {
                this.selectArtifact(object);
                this.setInteractionCooldown(500); // Prevent spam clicking
                break;
            }
        }
    }

    /**
     * Handle mouse movement for hover effects
     */
    handleMouseMove(event) {
        if (!this.playerControls?.isLocked()) return;
        if (this.infoPanel?.isShowing()) return;
        
        this.updateMousePosition(event);
        
        // Raycast for hover effects
        this.raycaster.setFromCamera(this.mouse, this.sceneManager.camera);
        const intersects = this.raycaster.intersectObjects(this.sceneManager.scene.children, true);
        
        let newHovered = null;
        for (const intersect of intersects) {
            if (this.isArtifactInteractable(intersect.object)) {
                newHovered = intersect.object;
                break;
            }
        }
        
        this.updateHoverState(newHovered);
    }

    /**
     * Handle window resize with debouncing
     */
    handleResize() {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        
        this.resizeTimeout = setTimeout(() => {
            try {
                if (this.sceneManager?.handleResize) {
                    this.sceneManager.handleResize();
                }
            } catch (error) {
                console.warn('Resize error:', error);
            }
        }, 100);
    }

    /**
     * Handle page visibility change for performance
     */
    handleVisibilityChange() {
        if (document.hidden) {
            this.pauseExperience();
        } else {
            this.resumeExperience();
        }
    }

    /**
     * Handle before page unload
     */
    handleBeforeUnload() {
        this.saveUserSettings();
        this.dispose();
    }

    /**
     * Global error handler
     */
    handleGlobalError(event) {
        console.error('Global error:', event.error);
        this.handleFatalError(event.error, 'Runtime error');
    }

    /**
     * Unhandled promise rejection handler
     */
    handleUnhandledRejection(event) {
        console.error('Unhandled promise rejection:', event.reason);
        this.handleFatalError(event.reason, 'Promise rejection');
    }

    /**
     * Setup comprehensive error handling
     */
    setupGlobalErrorHandling() {
        window.addEventListener('error', this.eventHandlers.get('error'));
        window.addEventListener('unhandledrejection', this.eventHandlers.get('unhandledrejection'));
        
        // Three.js error handling
        THREE.Cache.enabled = true;
    }

    /**
     * Check if object is an interactable artifact
     */
    isArtifactInteractable(object) {
        return object?.userData?.isArtifact && 
               object?.userData?.interactable && 
               object?.userData?.artifactData;
    }

    /**
     * Update mouse position for raycasting
     */
    updateMousePosition(event) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    /**
     * Update hover state with smooth transitions
     */
    updateHoverState(newHovered) {
        if (newHovered !== this.hoveredArtifact) {
            // Remove previous highlight
            if (this.hoveredArtifact) {
                this.unhighlightArtifact(this.hoveredArtifact);
            }
            
            // Apply new highlight
            if (newHovered) {
                this.highlightArtifact(newHovered);
            }
            
            this.hoveredArtifact = newHovered;
            
            // Update cursor
            this.canvas.style.cursor = newHovered ? 'pointer' : 'default';
        }
    }

    /**
     * Select artifact and show information panel
     */
    selectArtifact(mesh) {
        this.selectedArtifact = mesh;
        const artifactData = mesh.userData.artifactData;
        
        if (artifactData && this.infoPanel) {
            // Pause player movement
            this.playerControls?.pauseMovement(true);
            
            // Exit pointer lock
            if (document.pointerLockElement) {
                document.exitPointerLock();
            }
            
            // Show info panel
            this.infoPanel.show(artifactData);
            
            // Play selection sound if audio enabled
            if (this.settings.audioEnabled) {
                this.playInteractionSound();
            }
            
            console.log(`🎨 Selected artifact: ${artifactData.name}`);
            
            // Dispatch custom event
            this.dispatchCustomEvent('artifact:selected', { artifact: artifactData });
        }
    }

    /**
     * Highlight artifact on hover
     */
    highlightArtifact(mesh) {
        if (!mesh.material) return;
        
        // Store original emissive color
        if (!mesh.userData.originalEmissive) {
            mesh.userData.originalEmissive = mesh.material.emissive ? 
                mesh.material.emissive.clone() : 
                new THREE.Color(0x000000);
        }
        
        // Apply highlight effect
        mesh.material.emissive = new THREE.Color(0x444444);
        
        // Add subtle scale animation
        if (!mesh.userData.isScaling) {
            mesh.userData.isScaling = true;
            mesh.userData.originalScale = mesh.scale.clone();
            
            const targetScale = mesh.scale.clone().multiplyScalar(1.02);
            this.animateScale(mesh, targetScale, 200);
        }
    }

    /**
     * Remove highlight from artifact
     */
    unhighlightArtifact(mesh) {
        if (!mesh.material || !mesh.userData.originalEmissive) return;
        
        // Restore original emissive color
        mesh.material.emissive = mesh.userData.originalEmissive;
        
        // Restore original scale
        if (mesh.userData.isScaling && mesh.userData.originalScale) {
            this.animateScale(mesh, mesh.userData.originalScale, 200);
            mesh.userData.isScaling = false;
        }
    }

    /**
     * Animate mesh scale smoothly
     */
    animateScale(mesh, targetScale, duration) {
        const startScale = mesh.scale.clone();
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = this.easeInOutCubic(progress);
            
            mesh.scale.lerpVectors(startScale, targetScale, eased);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    /**
     * Easing function for smooth animations
     */
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    /**
     * Set interaction cooldown to prevent spam
     */
    setInteractionCooldown(ms) {
        this.interactionCooldown = true;
        setTimeout(() => {
            this.interactionCooldown = false;
        }, ms);
    }

    /**
     * Play interaction sound effect
     */
    playInteractionSound() {
        try {
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            
            // Create simple beep sound
            const oscillator = this.audioContext?.createOscillator();
            const gainNode = this.audioContext?.createGain();
            
            if (oscillator && gainNode) {
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
                
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.1);
            }
        } catch (error) {
            console.warn('Failed to play interaction sound:', error);
        }
    }

    /**
     * Setup settings menu with validation
     */
    setupSettingsMenu() {
        const elements = {
            menu: document.getElementById('settings-menu'),
            mouseSensitivity: document.getElementById('mouse-sensitivity'),
            movementSpeed: document.getElementById('movement-speed'),
            audioEnabled: document.getElementById('audio-enabled'),
            closeButton: document.getElementById('close-settings'),
            resetButton: document.getElementById('reset-settings')
        };
        
        // Mouse sensitivity
        if (elements.mouseSensitivity) {
            elements.mouseSensitivity.value = this.settings.mouseSensitivity;
            this.updateSettingDisplay('sensitivity-value', this.settings.mouseSensitivity);
            
            elements.mouseSensitivity.addEventListener('input', (e) => {
                const value = this.clamp(parseFloat(e.target.value), 0.1, 3.0);
                this.settings.mouseSensitivity = value;
                this.updateSettingDisplay('sensitivity-value', value);
                this.playerControls?.setSensitivity(value);
                this.showSettingFeedback('Độ nhạy chuột', value.toFixed(1));
                this.debouncedSave();
            });
        }
        
        // Movement speed
        if (elements.movementSpeed) {
            elements.movementSpeed.value = this.settings.movementSpeed;
            this.updateSettingDisplay('speed-value', this.settings.movementSpeed);
            
            elements.movementSpeed.addEventListener('input', (e) => {
                const value = this.clamp(parseFloat(e.target.value), 1.0, 15.0);
                this.settings.movementSpeed = value;
                this.updateSettingDisplay('speed-value', value);
                this.playerControls?.setSpeed(value);
                this.showSettingFeedback('Tốc độ di chuyển', value.toFixed(1));
                this.debouncedSave();
            });
        }
        
        // Audio toggle
        if (elements.audioEnabled) {
            elements.audioEnabled.checked = this.settings.audioEnabled;
            
            elements.audioEnabled.addEventListener('change', (e) => {
                this.settings.audioEnabled = e.target.checked;
                this.showSettingFeedback('Âm thanh', e.target.checked ? 'Bật' : 'Tắt');
                this.saveUserSettings();
            });
        }
        
        // Close button
        elements.closeButton?.addEventListener('click', () => {
            this.toggleSettingsMenu();
        });
        
        // Reset button
        elements.resetButton?.addEventListener('click', () => {
            this.resetSettings();
        });
        
        this.setupDebouncedSave();
    }

    /**
     * Setup info panel event handlers
     */
    setupInfoPanelEvents() {
        if (!this.infoPanel) return;
        
        const originalHide = this.infoPanel.hide.bind(this.infoPanel);
        this.infoPanel.hide = () => {
            originalHide();
            this.selectedArtifact = null;
            
            // Resume player movement
            this.playerControls?.pauseMovement(false);
            
            // Re-request pointer lock
            setTimeout(() => {
                if (this.canvas && !document.pointerLockElement) {
                    this.canvas.requestPointerLock();
                }
            }, 100);
            
            // Dispatch event
            this.dispatchCustomEvent('artifact:deselected');
        };
    }

    /**
     * Utility function to clamp values
     */
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    /**
     * Show setting feedback with animation
     */
    showSettingFeedback(setting, value) {
        let feedback = document.getElementById('settings-feedback');
        
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.id = 'settings-feedback';
            feedback.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, rgba(0,0,0,0.9), rgba(30,30,30,0.9));
                color: #4ecdc4;
                padding: 15px 25px;
                border-radius: 10px;
                z-index: 1001;
                font-size: 16px;
                font-weight: 600;
                pointer-events: none;
                opacity: 0;
                transition: all 0.3s ease;
                border: 2px solid rgba(78, 205, 196, 0.3);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(10px);
            `;
            document.body.appendChild(feedback);
        }
        
        feedback.textContent = `${setting}: ${value}`;
        feedback.style.opacity = '1';
        feedback.style.transform = 'translate(-50%, -50%) scale(1)';
        
        clearTimeout(this.feedbackTimeout);
        this.feedbackTimeout = setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translate(-50%, -50%) scale(0.9)';
        }, 2000);
    }

    /**
     * Setup debounced save for performance
     */
    setupDebouncedSave() {
        this.debouncedSave = this.debounce(() => {
            this.saveUserSettings();
        }, 500);
    }

    /**
     * Debounce utility function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Update setting display elements
     */
    updateSettingDisplay(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = typeof value === 'number' ? value.toFixed(1) : value;
        }
    }

    /**
     * Reset all settings to defaults
     */
    resetSettings() {
        this.settings = { ...this.defaultSettings };
        
        // Apply to controls
        this.playerControls?.setSensitivity(this.settings.mouseSensitivity);
        this.playerControls?.setSpeed(this.settings.movementSpeed);
        
        // Update UI
        this.updateSettingsUI();
        this.saveUserSettings();
        
        this.showSettingFeedback('Cài đặt', 'Đã khôi phục mặc định');
    }

    /**
     * Update all settings UI elements
     */
    updateSettingsUI() {
        const updates = [
            { id: 'mouse-sensitivity', value: this.settings.mouseSensitivity, display: 'sensitivity-value' },
            { id: 'movement-speed', value: this.settings.movementSpeed, display: 'speed-value' },
            { id: 'audio-enabled', checked: this.settings.audioEnabled }
        ];
        
        updates.forEach(({ id, value, checked, display }) => {
            const element = document.getElementById(id);
            if (element) {
                if (checked !== undefined) {
                    element.checked = checked;
                } else {
                    element.value = value;
                    if (display) {
                        this.updateSettingDisplay(display, value);
                    }
                }
            }
        });
    }

    /**
     * Toggle settings menu with smooth animation
     */
    toggleSettingsMenu() {
        const settingsMenu = document.getElementById('settings-menu');
        if (!settingsMenu) return;
        
        const isVisible = settingsMenu.style.display === 'flex';
        
        if (isVisible) {
            // Hide settings
            settingsMenu.style.opacity = '0';
            setTimeout(() => {
                settingsMenu.style.display = 'none';
            }, 300);
            
            // Resume movement and request pointer lock
            this.playerControls?.pauseMovement(false);
            setTimeout(() => {
                this.canvas?.requestPointerLock();
            }, 100);
        } else {
            // Show settings
            settingsMenu.style.display = 'flex';
            settingsMenu.style.opacity = '0';
            setTimeout(() => {
                settingsMenu.style.opacity = '1';
            }, 10);
            
            // Pause movement and exit pointer lock
            this.playerControls?.pauseMovement(true);
            if (document.pointerLockElement) {
                document.exitPointerLock();
            }
        }
    }

    /**
     * Toggle mini-map visibility
     */
    toggleMiniMap() {
        const miniMapContainer = document.getElementById('mini-map-container');
        if (miniMapContainer) {
            const isVisible = miniMapContainer.style.display !== 'none';
            miniMapContainer.style.display = isVisible ? 'none' : 'block';
            this.settings.showMiniMap = !isVisible;
            this.saveUserSettings();
            
            this.showSettingFeedback('Bản đồ', isVisible ? 'Ẩn' : 'Hiện');
        }
    }

    /**
     * Toggle fullscreen with error handling
     */
    toggleFullscreen() {
        try {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                this.showSettingFeedback('Chế độ', 'Toàn màn hình');
            } else {
                document.exitFullscreen();
                this.showSettingFeedback('Chế độ', 'Cửa sổ');
            }
        } catch (error) {
            console.warn('Fullscreen toggle failed:', error);
            this.showSettingFeedback('Lỗi', 'Không hỗ trợ toàn màn hình');
        }
    }

    /**
     * Toggle controls hint visibility
     */
    toggleControlsHint() {
        const controlsHint = document.getElementById('controls-hint');
        if (controlsHint) {
            const isVisible = controlsHint.style.display !== 'none';
            controlsHint.style.display = isVisible ? 'none' : 'block';
            this.settings.showControls = !isVisible;
            this.saveUserSettings();
        }
    }

    /**
     * Reset player position to spawn point
     */
    resetPlayerPosition() {
        if (this.playerControls) {
            this.playerControls.setPosition(0, 1.7, 25);
            this.showSettingFeedback('Vị trí', 'Đã reset');
        }
    }

    /**
     * Toggle pause state
     */
    togglePause() {
        this.isPaused = !this.isPaused;
        this.showSettingFeedback('Trạng thái', this.isPaused ? 'Tạm dừng' : 'Tiếp tục');
    }

    /**
     * Show controls hint with auto-hide
     */
    showControlsHint() {
        const controlsHint = document.getElementById('controls-hint');
        if (controlsHint && this.settings.showControls) {
            controlsHint.style.opacity = '1';
            
            setTimeout(() => {
                if (controlsHint) {
                    controlsHint.style.opacity = '0.4';
                }
            }, 10000);
        }
    }

    /**
     * Pause the experience
     */
    pauseExperience() {
        this.isPaused = true;
        this.playerControls?.pauseMovement(true);
    }

    /**
     * Resume the experience
     */
    resumeExperience() {
        this.isPaused = false;
        if (!this.infoPanel?.isShowing()) {
            this.playerControls?.pauseMovement(false);
        }
    }

    /**
     * Save user settings to localStorage with validation
     */
    saveUserSettings() {
        try {
            const settingsToSave = {
                ...this.settings,
                version: '2.0.0',
                lastSaved: Date.now()
            };
            localStorage.setItem('museum3d-settings', JSON.stringify(settingsToSave));
        } catch (error) {
            console.warn('Failed to save settings:', error);
        }
    }

    /**
     * Load user settings from localStorage with validation
     */
    loadUserSettings() {
        try {
            const saved = localStorage.getItem('museum3d-settings');
            if (saved) {
                const parsedSettings = JSON.parse(saved);
                
                // Validate and merge settings
                Object.keys(this.defaultSettings).forEach(key => {
                    if (parsedSettings.hasOwnProperty(key)) {
                        this.settings[key] = parsedSettings[key];
                    }
                });
            }
        } catch (error) {
            console.warn('Failed to load settings:', error);
            this.settings = { ...this.defaultSettings };
        }
    }

    /**
     * Start optimized render loop with performance monitoring
     */
    startRenderLoop() {
        let lastFrameTime = performance.now();
        let frameTimesBuffer = [];
        const bufferSize = 60; // Track last 60 frames
        
        const animate = (currentTime) => {
            if (this.isDestroyed) return;
            
            this.animationId = requestAnimationFrame(animate);
            
            if (this.isPaused || !this.isInitialized) {
                return;
            }
            
            // Calculate frame metrics
            const deltaTime = this.clock.getDelta();
            const frameTime = currentTime - lastFrameTime;
            lastFrameTime = currentTime;
            
            // Track performance
            frameTimesBuffer.push(frameTime);
            if (frameTimesBuffer.length > bufferSize) {
                frameTimesBuffer.shift();
            }
            
            this.updatePerformanceMetrics(frameTimesBuffer);
            
            try {
                // Update player controls
                this.playerControls?.update(deltaTime);
                
                // Update scene manager
                this.sceneManager?.update(deltaTime);
                
                // Render scene
                this.sceneManager?.render();
                
                // Update mini-map
                this.miniMap?.update();
                
                // Update artifacts
                this.updateArtifacts(deltaTime);
                
            } catch (error) {
                console.error('Render loop error:', error);
                this.handleRenderError(error);
            }
        };
        
        this.animationId = requestAnimationFrame(animate);
        console.log('🎬 Optimized render loop started');
    }

    /**
     * Update performance metrics
     */
    updatePerformanceMetrics(frameTimesBuffer) {
        if (frameTimesBuffer.length === 0) return;
        
        const avgFrameTime = frameTimesBuffer.reduce((a, b) => a + b, 0) / frameTimesBuffer.length;
        this.performanceMetrics.averageFps = Math.round(1000 / avgFrameTime);
        this.performanceMetrics.frameTimeMs = avgFrameTime;
        
        // Performance warnings
        if (this.performanceMetrics.averageFps < 30) {
            console.warn(`⚠️ Low FPS: ${this.performanceMetrics.averageFps}fps`);
        }
    }

    /**
     * Update artifact animations
     */
    updateArtifacts(deltaTime) {
        this.artifacts.forEach(({ artifact }) => {
            if (artifact?.update) {
                artifact.update(deltaTime);
            }
        });
    }

    /**
     * Handle render loop errors
     */
    handleRenderError(error) {
        console.error('Render error:', error);
        
        // Try to recover
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        setTimeout(() => {
            if (!this.isDestroyed) {
                this.startRenderLoop();
            }
        }, 1000);
    }

    /**
     * Get comprehensive performance metrics
     */
    getPerformanceMetrics() {
        return {
            ...this.performanceMetrics,
            artifactCount: this.artifacts.length,
            sceneObjects: this.sceneManager?.scene?.children?.length || 0,
            rendererInfo: this.sceneManager?.getPerformanceInfo?.() || null,
            memoryUsage: performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) : 0
        };
    }

    /**
     * Show environment error message
     */
    showEnvironmentError(errors) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #1a1a1a;
            color: #ff6b6b;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            font-family: Arial, sans-serif;
        `;
        
        errorDiv.innerHTML = `
            <h1>❌ Trình duyệt không được hỗ trợ</h1>
            <p>Museum Imaginarium cần các tính năng sau:</p>
            <ul style="text-align: left;">
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
            <p>Vui lòng sử dụng trình duyệt hiện đại như Chrome, Firefox, hoặc Edge.</p>
        `;
        
        document.body.appendChild(errorDiv);
    }

    /**
     * Handle fatal errors with user-friendly message
     */
    handleFatalError(error, context = 'Unknown error') {
        console.error(`💥 Fatal error [${context}]:`, error);
        
        this.loadingScreen?.hide();
        
        const errorMessage = document.getElementById('error-message');
        const errorText = document.getElementById('error-text');
        
        if (errorMessage && errorText) {
            errorText.textContent = `${context}: ${error.message || error}`;
            errorMessage.style.display = 'flex';
            
            const retryBtn = document.getElementById('retry-btn');
            if (retryBtn) {
                retryBtn.onclick = () => location.reload();
            }
        }
        
        // Dispatch error event
        this.dispatchCustomEvent('museum:error', { error, context });
    }

    /**
     * Dispatch custom events
     */
    dispatchCustomEvent(eventName, detail = {}) {
        try {
            const event = new CustomEvent(eventName, { detail });
            document.dispatchEvent(event);
        } catch (error) {
            console.warn('Failed to dispatch event:', eventName, error);
        }
    }

    /**
     * Utility delay function
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Comprehensive cleanup and disposal
     */
    dispose() {
        if (this.isDestroyed) return;
        
        console.log('🧹 Disposing Museum3D...');
        this.isDestroyed = true;
        
        // Cancel animation frame
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        // Remove all event listeners
        this.eventHandlers.forEach((handler, event) => {
            if (event === 'resize' || event === 'beforeunload' || event === 'error' || event === 'unhandledrejection') {
                window.removeEventListener(event.replace('handle', '').toLowerCase(), handler);
            } else if (event === 'visibilitychange') {
                document.removeEventListener('visibilitychange', handler);
            } else if (event.includes('key')) {
                document.removeEventListener(event.replace('handle', '').toLowerCase(), handler);
            } else if (event.includes('mouse') && this.canvas) {
                this.canvas.removeEventListener(event.replace('handlemouse', '').toLowerCase(), handler);
            }
        });
        
        // Dispose 3D components
        this.sceneManager?.dispose();
        this.miniMap?.dispose();
        
        // Dispose artifacts
        this.artifacts.forEach(({ artifact }) => {
            if (artifact?.dispose) {
                artifact.dispose();
            }
        });
        
        // Close audio context
        if (this.audioContext && this.audioContext.state !== 'closed') {
            this.audioContext.close();
        }
        
        // Clear timeouts
        if (this.feedbackTimeout) clearTimeout(this.feedbackTimeout);
        if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
        
        // Clear arrays
        this.artifacts = [];
        this.collidableObjects = [];
        this.eventHandlers.clear();
        
        console.log('✅ Museum3D disposed successfully');
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.museum3D = new Museum3D();
        console.log('🏛️ Museum3D attached to window.museum3D');
    } catch (error) {
        console.error('Failed to initialize Museum3D:', error);
    }
});

// Global cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.museum3D) {
        window.museum3D.dispose();
    }
});

export default Museum3D;