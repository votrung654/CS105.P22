import * as THREE from 'three';

/**
 * Professional Museum Lighting System
 * 
 * Features:
 * - Museum-standard lighting for artwork preservation
 * - Gallery track lighting system
 * - Accent lighting for featured pieces
 * - Ambient lighting for visitor comfort
 * - Dynamic time-of-day simulation
 * - Energy-efficient LED simulation
 * - Shadow management for realistic atmosphere
 * 
 * @author CS105.P22_Group10
 * @version 2.0.0
 */
export default class Lights {
    constructor(scene, options = {}) {
        this.scene = scene;
        this.isInitialized = false;
        
        // Configuration
        this.config = {
            qualityLevel: options.qualityLevel || 'medium',
            enableShadows: options.enableShadows !== false,
            maxLights: options.maxLights || 12,
            energyEfficient: options.energyEfficient !== false
        };
        
        // Lighting properties
        this.properties = {
            shadowMapSize: this.getShadowMapSize(),
            maxDistance: 25,
            penumbra: 0.3,
            decay: 1.5
        };
        
        // Color temperatures (Kelvin) for realistic museum lighting
        this.colorTemperatures = {
            warmWhite: 0xfff4e6,    // 3000K - Cozy areas
            neutralWhite: 0xffffff,  // 4000K - General lighting
            coolWhite: 0xf0f8ff,    // 5000K - Artwork lighting
            daylight: 0xe6f3ff,     // 6500K - Natural light
            warmAccent: 0xffe4b3,   // 2700K - Accent lighting
            spotlightWhite: 0xfff8dc // 3500K - Spotlights
        };
        
        // Light collections
        this.lights = {
            ambient: null,
            directional: null,
            gallery: [],      // Gallery track lights
            accent: [],       // Accent lights for special pieces
            perimeter: [],    // Perimeter lighting
            emergency: [],    // Emergency/safety lighting
            decorative: []    // Decorative ambient lights
        };
        
        // Performance tracking
        this.performance = {
            totalLights: 0,
            activeShadows: 0,
            renderCalls: 0
        };
        
        // Initialize lighting system
        this.initializeLighting();
    }

    /**
     * Initialize complete museum lighting system
     */
    initializeLighting() {
        console.log('🏛️ Initializing Professional Museum Lighting...');
        
        try {
            // Base lighting layers
            this.addAmbientLighting();
            this.addNaturalLighting();
            
            // Specialized museum lighting
            this.addGalleryTrackLighting();
            this.addArtworkAccentLighting();
            this.addPerimeterLighting();
            this.addArchitecturalLighting();
            
            // Optional decorative elements
            if (this.config.qualityLevel !== 'low') {
                this.addDecorativeLighting();
                this.addEmergencyLighting();
            }
            
            // Performance optimization
            this.optimizeLightingSystem();
            
            this.isInitialized = true;
            console.log(`✅ Museum lighting initialized with ${this.performance.totalLights} lights`);
            
        } catch (error) {
            console.error('Failed to initialize lighting:', error);
            this.addFallbackLighting();
        }
    }

    /**
     * Add base ambient lighting for overall visibility
     */
    addAmbientLighting() {
        // Museum-standard ambient lighting (low intensity for artwork protection)
        const ambientLight = new THREE.AmbientLight(
            this.colorTemperatures.neutralWhite,
            this.getAmbientIntensity()
        );
        
        ambientLight.name = 'museumAmbientLight';
        this.scene.add(ambientLight);
        this.lights.ambient = ambientLight;
        
        console.log('🌟 Added museum ambient lighting');
        this.performance.totalLights++;
    }

    /**
     * Add natural lighting simulation (skylight/windows)
     */
    addNaturalLighting() {
        // Main directional light simulating filtered daylight
        const directionalLight = new THREE.DirectionalLight(
            this.colorTemperatures.daylight,
            this.getDirectionalIntensity()
        );
        
        // Position like skylight from above and side
        directionalLight.position.set(12, 15, 8);
        directionalLight.target.position.set(0, 0, 0);
        
        // Configure shadows for realism
        if (this.config.enableShadows) {
            directionalLight.castShadow = true;
            this.configureShadowCamera(directionalLight, {
                mapSize: this.properties.shadowMapSize,
                near: 0.5,
                far: 60,
                left: -25,
                right: 25,
                top: 25,
                bottom: -25
            });
        }
        
        directionalLight.name = 'naturalSkylight';
        this.scene.add(directionalLight);
        this.scene.add(directionalLight.target);
        this.lights.directional = directionalLight;
        
        if (this.config.enableShadows) this.performance.activeShadows++;
        this.performance.totalLights++;
        
        console.log('☀️ Added natural skylight simulation');
    }

    /**
     * Add gallery track lighting system
     */
    addGalleryTrackLighting() {
        const trackLights = [];
        
        // Track lighting configurations for different gallery sections
        const trackConfigurations = [
            // Main wall track lights (front wall)
            {
                positions: [
                    { x: -12, y: 6, z: -27 },
                    { x: -6, y: 6, z: -27 },
                    { x: 0, y: 6, z: -27 },
                    { x: 6, y: 6, z: -27 },
                    { x: 12, y: 6, z: -27 }
                ],
                targets: [
                    { x: -12, y: 2, z: -29 },
                    { x: -6, y: 2, z: -29 },
                    { x: 0, y: 2, z: -29 },
                    { x: 6, y: 2, z: -29 },
                    { x: 12, y: 2, z: -29 }
                ],
                color: this.colorTemperatures.coolWhite,
                intensity: 0.8,
                angle: Math.PI / 5,
                name: 'frontTrack'
            },
            // Side wall track lights (left wall)
            {
                positions: [
                    { x: -18, y: 6, z: -15 },
                    { x: -18, y: 6, z: -5 },
                    { x: -18, y: 6, z: 5 },
                    { x: -18, y: 6, z: 15 }
                ],
                targets: [
                    { x: -19, y: 2, z: -15 },
                    { x: -19, y: 2, z: -5 },
                    { x: -19, y: 2, z: 5 },
                    { x: -19, y: 2, z: 15 }
                ],
                color: this.colorTemperatures.coolWhite,
                intensity: 0.7,
                angle: Math.PI / 5,
                name: 'leftTrack'
            },
            // Side wall track lights (right wall)
            {
                positions: [
                    { x: 18, y: 6, z: -15 },
                    { x: 18, y: 6, z: -5 },
                    { x: 18, y: 6, z: 5 },
                    { x: 18, y: 6, z: 15 }
                ],
                targets: [
                    { x: 19, y: 2, z: -15 },
                    { x: 19, y: 2, z: -5 },
                    { x: 19, y: 2, z: 5 },
                    { x: 19, y: 2, z: 15 }
                ],
                color: this.colorTemperatures.coolWhite,
                intensity: 0.7,
                angle: Math.PI / 5,
                name: 'rightTrack'
            }
        ];
        
        trackConfigurations.forEach((track, trackIndex) => {
            track.positions.forEach((pos, lightIndex) => {
                const spotLight = new THREE.SpotLight(
                    track.color,
                    track.intensity,
                    12, // distance
                    track.angle,
                    this.properties.penumbra,
                    this.properties.decay
                );
                
                spotLight.position.set(pos.x, pos.y, pos.z);
                spotLight.target.position.set(
                    track.targets[lightIndex].x,
                    track.targets[lightIndex].y,
                    track.targets[lightIndex].z
                );
                
                // Enable shadows for key track lights
                if (this.config.enableShadows && lightIndex % 2 === 0) {
                    spotLight.castShadow = true;
                    this.configureShadowCamera(spotLight, {
                        mapSize: 1024,
                        near: 0.5,
                        far: 12,
                        fov: 35
                    });
                    this.performance.activeShadows++;
                }
                
                spotLight.name = `${track.name}_${lightIndex}`;
                this.scene.add(spotLight);
                this.scene.add(spotLight.target);
                trackLights.push(spotLight);
                this.performance.totalLights++;
            });
        });
        
        this.lights.gallery = trackLights;
        console.log(`🎯 Added ${trackLights.length} gallery track lights`);
    }

    /**
     * Add accent lighting for featured artworks
     */
    addArtworkAccentLighting() {
        const accentLights = [];
        
        // Featured artwork accent positions
        const accentConfigurations = [
            // Center masterpiece
            {
                position: { x: 0, y: 5.5, z: -25 },
                target: { x: 0, y: 2.5, z: -29 },
                color: this.colorTemperatures.spotlightWhite,
                intensity: 1.2,
                angle: Math.PI / 8,
                name: 'centerpieceAccent'
            },
            // Corner highlights
            {
                position: { x: -15, y: 5, z: -25 },
                target: { x: -15, y: 2, z: -29 },
                color: this.colorTemperatures.warmAccent,
                intensity: 0.9,
                angle: Math.PI / 7,
                name: 'cornerAccent1'
            },
            {
                position: { x: 15, y: 5, z: -25 },
                target: { x: 15, y: 2, z: -29 },
                color: this.colorTemperatures.warmAccent,
                intensity: 0.9,
                angle: Math.PI / 7,
                name: 'cornerAccent2'
            },
            // Side wall features
            {
                position: { x: -15, y: 5.5, z: 0 },
                target: { x: -19, y: 2.5, z: 0 },
                color: this.colorTemperatures.coolWhite,
                intensity: 1.0,
                angle: Math.PI / 6,
                name: 'sideFeature1'
            },
            {
                position: { x: 15, y: 5.5, z: 0 },
                target: { x: 19, y: 2.5, z: 0 },
                color: this.colorTemperatures.coolWhite,
                intensity: 1.0,
                angle: Math.PI / 6,
                name: 'sideFeature2'
            }
        ];
        
        accentConfigurations.forEach(config => {
            const spotLight = new THREE.SpotLight(
                config.color,
                config.intensity,
                10, // distance
                config.angle,
                0.1, // Sharp focus for artwork
                2.0  // decay
            );
            
            spotLight.position.set(config.position.x, config.position.y, config.position.z);
            spotLight.target.position.set(config.target.x, config.target.y, config.target.z);
            
            // High-quality shadows for accent lights
            if (this.config.enableShadows && this.config.qualityLevel !== 'low') {
                spotLight.castShadow = true;
                this.configureShadowCamera(spotLight, {
                    mapSize: 2048,
                    near: 0.5,
                    far: 10,
                    fov: 30
                });
                this.performance.activeShadows++;
            }
            
            spotLight.name = config.name;
            this.scene.add(spotLight);
            this.scene.add(spotLight.target);
            accentLights.push(spotLight);
            this.performance.totalLights++;
        });
        
        this.lights.accent = accentLights;
        console.log(`✨ Added ${accentLights.length} artwork accent lights`);
    }

    /**
     * Add perimeter lighting for visitor safety and ambiance
     */
    addPerimeterLighting() {
        const perimeterLights = [];
        
        // Perimeter lighting configurations
        const perimeterConfigurations = [
            // Floor-level safety lighting
            {
                position: { x: -18, y: 0.5, z: 25 },
                color: this.colorTemperatures.warmWhite,
                intensity: 0.2,
                distance: 8,
                name: 'perimeterSafety1'
            },
            {
                position: { x: 18, y: 0.5, z: 25 },
                color: this.colorTemperatures.warmWhite,
                intensity: 0.2,
                distance: 8,
                name: 'perimeterSafety2'
            },
            {
                position: { x: -18, y: 0.5, z: -25 },
                color: this.colorTemperatures.warmWhite,
                intensity: 0.2,
                distance: 8,
                name: 'perimeterSafety3'
            },
            {
                position: { x: 18, y: 0.5, z: -25 },
                color: this.colorTemperatures.warmWhite,
                intensity: 0.2,
                distance: 8,
                name: 'perimeterSafety4'
            },
            // Mid-level ambient lighting
            {
                position: { x: 0, y: 2.5, z: 27 },
                color: this.colorTemperatures.neutralWhite,
                intensity: 0.3,
                distance: 12,
                name: 'entranceAmbient'
            },
            {
                position: { x: -10, y: 3, z: 10 },
                color: this.colorTemperatures.warmAccent,
                intensity: 0.25,
                distance: 10,
                name: 'socialArea1'
            },
            {
                position: { x: 10, y: 3, z: 10 },
                color: this.colorTemperatures.warmAccent,
                intensity: 0.25,
                distance: 10,
                name: 'socialArea2'
            }
        ];
        
        perimeterConfigurations.forEach(config => {
            const pointLight = new THREE.PointLight(
                config.color,
                config.intensity,
                config.distance,
                this.properties.decay
            );
            
            pointLight.position.set(config.position.x, config.position.y, config.position.z);
            pointLight.name = config.name;
            
            this.scene.add(pointLight);
            perimeterLights.push(pointLight);
            this.performance.totalLights++;
        });
        
        this.lights.perimeter = perimeterLights;
        console.log(`🔲 Added ${perimeterLights.length} perimeter lights`);
    }

    /**
     * Add architectural lighting for columns and features
     */
    addArchitecturalLighting() {
        const architecturalLights = [];
        
        // Architectural feature lighting
        const architecturalConfigurations = [
            // Column uplighting
            {
                position: { x: -8, y: 0.2, z: -20 },
                target: { x: -8, y: 8, z: -20 },
                color: this.colorTemperatures.coolWhite,
                intensity: 0.4,
                angle: Math.PI / 3,
                distance: 10,
                name: 'columnUplight1'
            },
            {
                position: { x: 8, y: 0.2, z: -20 },
                target: { x: 8, y: 8, z: -20 },
                color: this.colorTemperatures.coolWhite,
                intensity: 0.4,
                angle: Math.PI / 3,
                distance: 10,
                name: 'columnUplight2'
            },
            // Ceiling wash lighting
            {
                position: { x: 0, y: 6, z: 0 },
                target: { x: 0, y: 8, z: 0 },
                color: this.colorTemperatures.neutralWhite,
                intensity: 0.5,
                angle: Math.PI / 2,
                distance: 8,
                name: 'ceilingWash'
            }
        ];
        
        architecturalConfigurations.forEach(config => {
            const spotLight = new THREE.SpotLight(
                config.color,
                config.intensity,
                config.distance,
                config.angle,
                0.5, // Soft penumbra for architectural features
                1.0  // Minimal decay
            );
            
            spotLight.position.set(config.position.x, config.position.y, config.position.z);
            spotLight.target.position.set(config.target.x, config.target.y, config.target.z);
            spotLight.name = config.name;
            
            this.scene.add(spotLight);
            this.scene.add(spotLight.target);
            architecturalLights.push(spotLight);
            this.performance.totalLights++;
        });
        
        // Add to gallery collection for now
        this.lights.gallery.push(...architecturalLights);
        console.log(`🏛️ Added ${architecturalLights.length} architectural lights`);
    }

    /**
     * Add decorative atmosphere lighting
     */
    addDecorativeLighting() {
        const decorativeLights = [];
        
        // Subtle decorative lighting for atmosphere
        const decorativeConfigurations = [
            {
                position: { x: -12, y: 1.5, z: 20 },
                color: this.colorTemperatures.warmAccent,
                intensity: 0.15,
                distance: 6,
                name: 'decorative1'
            },
            {
                position: { x: 12, y: 1.5, z: 20 },
                color: this.colorTemperatures.warmAccent,
                intensity: 0.15,
                distance: 6,
                name: 'decorative2'
            },
            {
                position: { x: 0, y: 1.8, z: -10 },
                color: 0xffd700, // Golden accent
                intensity: 0.1,
                distance: 5,
                name: 'decorativeGold'
            }
        ];
        
        decorativeConfigurations.forEach(config => {
            const pointLight = new THREE.PointLight(
                config.color,
                config.intensity,
                config.distance,
                2.0
            );
            
            pointLight.position.set(config.position.x, config.position.y, config.position.z);
            pointLight.name = config.name;
            
            this.scene.add(pointLight);
            decorativeLights.push(pointLight);
            this.performance.totalLights++;
        });
        
        this.lights.decorative = decorativeLights;
        console.log(`💫 Added ${decorativeLights.length} decorative lights`);
    }

    /**
     * Add emergency/safety lighting
     */
    addEmergencyLighting() {
        const emergencyLights = [];
        
        // Emergency exit and safety lighting
        const emergencyConfigurations = [
            {
                position: { x: 0, y: 3, z: 28 },
                color: 0x00ff00, // Green exit light
                intensity: 0.3,
                distance: 8,
                name: 'exitLight'
            },
            {
                position: { x: -15, y: 2, z: 25 },
                color: this.colorTemperatures.coolWhite,
                intensity: 0.2,
                distance: 6,
                name: 'emergencyPath1'
            },
            {
                position: { x: 15, y: 2, z: 25 },
                color: this.colorTemperatures.coolWhite,
                intensity: 0.2,
                distance: 6,
                name: 'emergencyPath2'
            }
        ];
        
        emergencyConfigurations.forEach(config => {
            const pointLight = new THREE.PointLight(
                config.color,
                config.intensity,
                config.distance,
                1.5
            );
            
            pointLight.position.set(config.position.x, config.position.y, config.position.z);
            pointLight.name = config.name;
            
            this.scene.add(pointLight);
            emergencyLights.push(pointLight);
            this.performance.totalLights++;
        });
        
        this.lights.emergency = emergencyLights;
        console.log(`🚨 Added ${emergencyLights.length} emergency lights`);
    }

    /**
     * Add fallback lighting if main system fails
     */
    addFallbackLighting() {
        console.warn('🔄 Using fallback lighting system');
        
        // Basic ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        this.lights.ambient = ambientLight;
        
        // Basic directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        this.scene.add(directionalLight);
        this.lights.directional = directionalLight;
        
        this.performance.totalLights = 2;
    }

    /**
     * Configure shadow camera properties
     */
    configureShadowCamera(light, config) {
        light.shadow.mapSize.width = config.mapSize || 1024;
        light.shadow.mapSize.height = config.mapSize || 1024;
        light.shadow.camera.near = config.near || 0.5;
        light.shadow.camera.far = config.far || 50;
        
        if (light.isDirectionalLight) {
            light.shadow.camera.left = config.left || -10;
            light.shadow.camera.right = config.right || 10;
            light.shadow.camera.top = config.top || 10;
            light.shadow.camera.bottom = config.bottom || -10;
        } else if (light.isSpotLight) {
            light.shadow.camera.fov = config.fov || 50;
        }
        
        // Soft shadows
        light.shadow.radius = 4;
        light.shadow.blurSamples = 8;
    }

    /**
     * Optimize lighting system for performance
     */
    optimizeLightingSystem() {
        // Distance-based optimization
        if (this.performance.totalLights > this.config.maxLights) {
            console.warn(`⚠️ Light count (${this.performance.totalLights}) exceeds maximum (${this.config.maxLights})`);
            this.optimizeLightCount();
        }
        
        // Shadow optimization
        if (this.performance.activeShadows > 4 && this.config.qualityLevel === 'low') {
            this.optimizeShadows();
        }
        
        console.log(`⚡ Lighting optimized: ${this.performance.totalLights} lights, ${this.performance.activeShadows} shadows`);
    }

    /**
     * Optimize light count for performance
     */
    optimizeLightCount() {
        // Reduce decorative lights first
        if (this.lights.decorative.length > 0) {
            const toRemove = this.lights.decorative.splice(2);
            toRemove.forEach(light => {
                this.scene.remove(light);
                this.performance.totalLights--;
            });
        }
        
        // Reduce perimeter lights if still over limit
        if (this.performance.totalLights > this.config.maxLights && this.lights.perimeter.length > 4) {
            const toRemove = this.lights.perimeter.splice(4);
            toRemove.forEach(light => {
                this.scene.remove(light);
                this.performance.totalLights--;
            });
        }
    }

    /**
     * Optimize shadows for performance
     */
    optimizeShadows() {
        let shadowsDisabled = 0;
        
        // Disable shadows on gallery lights
        this.lights.gallery.forEach(light => {
            if (light.castShadow) {
                light.castShadow = false;
                shadowsDisabled++;
                this.performance.activeShadows--;
            }
        });
        
        console.log(`🌓 Disabled ${shadowsDisabled} shadows for performance`);
    }

    /**
     * Update lighting based on time of day or events
     */
    update(timeOfDay = 'day', options = {}) {
        if (!this.isInitialized) return;
        
        switch (timeOfDay) {
            case 'morning':
                this.setMorningLighting();
                break;
            case 'afternoon':
                this.setAfternoonLighting();
                break;
            case 'evening':
                this.setEveningLighting();
                break;
            case 'night':
                this.setNightLighting();
                break;
            case 'golden':
                this.setGoldenHourLighting();
                break;
            default:
                this.setDayLighting();
        }
        
        // Special event lighting
        if (options.special) {
            this.applySpecialLighting(options.special);
        }
    }

    /**
     * Set standard daytime lighting
     */
    setDayLighting() {
        // Natural light intensity
        if (this.lights.ambient) {
            this.lights.ambient.intensity = this.getAmbientIntensity();
        }
        
        if (this.lights.directional) {
            this.lights.directional.intensity = this.getDirectionalIntensity();
            this.lights.directional.color.setHex(this.colorTemperatures.daylight);
        }
        
        // Standard gallery lighting
        this.lights.gallery.forEach(light => {
            light.intensity = light.userData.originalIntensity || light.intensity;
        });
    }

    /**
     * Set morning lighting (softer, warmer)
     */
    setMorningLighting() {
        if (this.lights.ambient) {
            this.lights.ambient.intensity = this.getAmbientIntensity() * 0.8;
        }
        
        if (this.lights.directional) {
            this.lights.directional.intensity = this.getDirectionalIntensity() * 0.7;
            this.lights.directional.color.setHex(this.colorTemperatures.warmWhite);
        }
        
        // Slightly reduce gallery lighting
        this.lights.gallery.forEach(light => {
            light.intensity = (light.userData.originalIntensity || light.intensity) * 0.9;
        });
    }

    /**
     * Set afternoon lighting (bright, clear)
     */
    setAfternoonLighting() {
        if (this.lights.ambient) {
            this.lights.ambient.intensity = this.getAmbientIntensity() * 1.1;
        }
        
        if (this.lights.directional) {
            this.lights.directional.intensity = this.getDirectionalIntensity() * 1.2;
            this.lights.directional.color.setHex(this.colorTemperatures.neutralWhite);
        }
        
        // Boost gallery lighting
        this.lights.gallery.forEach(light => {
            light.intensity = (light.userData.originalIntensity || light.intensity) * 1.1;
        });
    }

    /**
     * Set evening lighting (warmer, cozier)
     */
    setEveningLighting() {
        if (this.lights.ambient) {
            this.lights.ambient.intensity = this.getAmbientIntensity() * 0.6;
        }
        
        if (this.lights.directional) {
            this.lights.directional.intensity = this.getDirectionalIntensity() * 0.4;
            this.lights.directional.color.setHex(this.colorTemperatures.warmAccent);
        }
        
        // Boost artificial lighting
        this.lights.gallery.forEach(light => {
            light.intensity = (light.userData.originalIntensity || light.intensity) * 1.3;
        });
        
        this.lights.perimeter.forEach(light => {
            light.intensity = (light.userData.originalIntensity || light.intensity) * 1.5;
        });
    }

    /**
     * Set night lighting (minimal, atmospheric)
     */
    setNightLighting() {
        if (this.lights.ambient) {
            this.lights.ambient.intensity = this.getAmbientIntensity() * 0.3;
        }
        
        if (this.lights.directional) {
            this.lights.directional.intensity = this.getDirectionalIntensity() * 0.1;
            this.lights.directional.color.setHex(0x4a90e2); // Cool blue moonlight
        }
        
        // Emphasize artificial lighting
        this.lights.gallery.forEach(light => {
            light.intensity = (light.userData.originalIntensity || light.intensity) * 2.0;
        });
        
        this.lights.accent.forEach(light => {
            light.intensity = (light.userData.originalIntensity || light.intensity) * 1.8;
        });
        
        // Boost security lighting
        this.lights.emergency.forEach(light => {
            light.intensity = (light.userData.originalIntensity || light.intensity) * 2.0;
        });
    }

    /**
     * Set golden hour lighting (warm, dramatic)
     */
    setGoldenHourLighting() {
        if (this.lights.ambient) {
            this.lights.ambient.intensity = this.getAmbientIntensity() * 0.5;
        }
        
        if (this.lights.directional) {
            this.lights.directional.intensity = this.getDirectionalIntensity() * 0.8;
            this.lights.directional.color.setHex(0xffa500); // Golden orange
        }
        
        // Warm up all lighting
        [...this.lights.gallery, ...this.lights.accent].forEach(light => {
            light.color.setHex(this.colorTemperatures.warmAccent);
            light.intensity = (light.userData.originalIntensity || light.intensity) * 1.2;
        });
    }

    /**
     * Apply special event lighting
     */
    applySpecialLighting(eventType) {
        switch (eventType) {
            case 'exhibition':
                this.setExhibitionLighting();
                break;
            case 'gala':
                this.setGalaLighting();
                break;
            case 'maintenance':
                this.setMaintenanceLighting();
                break;
        }
    }

    /**
     * Set special exhibition lighting
     */
    setExhibitionLighting() {
        // Boost accent lights for featured pieces
        this.lights.accent.forEach(light => {
            light.intensity = (light.userData.originalIntensity || light.intensity) * 1.5;
            light.color.setHex(this.colorTemperatures.spotlightWhite);
        });
        
        // Add dramatic shadows
        if (this.config.enableShadows) {
            this.lights.gallery.forEach(light => {
                if (!light.castShadow && light.name.includes('frontTrack')) {
                    light.castShadow = true;
                }
            });
        }
    }

    /**
     * Set gala event lighting
     */
    setGalaLighting() {
        // Warm, inviting atmosphere
        [...this.lights.gallery, ...this.lights.perimeter, ...this.lights.decorative].forEach(light => {
            light.color.setHex(this.colorTemperatures.warmAccent);
            light.intensity = (light.userData.originalIntensity || light.intensity) * 1.3;
        });
        
        // Boost decorative lighting
        this.lights.decorative.forEach(light => {
            light.intensity = (light.userData.originalIntensity || light.intensity) * 2.0;
        });
    }

    /**
     * Set maintenance lighting (bright, functional)
     */
    setMaintenanceLighting() {
        // Maximum brightness for maintenance work
        if (this.lights.ambient) {
            this.lights.ambient.intensity = this.getAmbientIntensity() * 2.0;
        }
        
        if (this.lights.directional) {
            this.lights.directional.intensity = this.getDirectionalIntensity() * 1.5;
            this.lights.directional.color.setHex(this.colorTemperatures.coolWhite);
        }
        
        // All lights at maximum
        [...this.lights.gallery, ...this.lights.perimeter].forEach(light => {
            light.intensity = (light.userData.originalIntensity || light.intensity) * 2.0;
            light.color.setHex(this.colorTemperatures.coolWhite);
        });
    }

    /**
     * Get quality-appropriate intensities
     */
    getAmbientIntensity() {
        const baseIntensities = {
            low: 0.3,
            medium: 0.4,
            high: 0.5
        };
        return baseIntensities[this.config.qualityLevel] || baseIntensities.medium;
    }

    getDirectionalIntensity() {
        const baseIntensities = {
            low: 0.6,
            medium: 0.8,
            high: 1.0
        };
        return baseIntensities[this.config.qualityLevel] || baseIntensities.medium;
    }

    getShadowMapSize() {
        const mapSizes = {
            low: 512,
            medium: 1024,
            high: 2048
        };
        return mapSizes[this.config.qualityLevel] || mapSizes.medium;
    }

    /**
     * Add dynamic lighting effects
     */
    addDynamicEffect(type = 'subtle', target = 'decorative') {
        switch (type) {
            case 'flicker':
                this.addFlickerEffect(target);
                break;
            case 'pulse':
                this.addPulseEffect(target);
                break;
            case 'breathing':
                this.addBreathingEffect(target);
                break;
            case 'spotlight':
                this.addSpotlightSweep(target);
                break;
        }
    }

    /**
     * Add subtle flicker effect to lights
     */
    addFlickerEffect(targetGroup = 'decorative') {
        const lights = this.lights[targetGroup] || [];
        if (lights.length === 0) return;
        
        lights.forEach(light => {
            if (!light.userData.originalIntensity) {
                light.userData.originalIntensity = light.intensity;
            }
            
            const flicker = () => {
                const variation = (Math.random() - 0.5) * 0.1;
                light.intensity = light.userData.originalIntensity + variation;
                setTimeout(flicker, 50 + Math.random() * 150);
            };
            
            flicker();
        });
        
        console.log(`✨ Added flicker effect to ${lights.length} ${targetGroup} lights`);
    }

    /**
     * Add breathing pulse effect
     */
    addBreathingEffect(targetGroup = 'accent') {
        const lights = this.lights[targetGroup] || [];
        if (lights.length === 0) return;
        
        lights.forEach((light, index) => {
            if (!light.userData.originalIntensity) {
                light.userData.originalIntensity = light.intensity;
            }
            
            let time = index * 0.5; // Offset for each light
            
            const breathe = () => {
                time += 0.01;
                const factor = 0.8 + 0.2 * Math.sin(time);
                light.intensity = light.userData.originalIntensity * factor;
                requestAnimationFrame(breathe);
            };
            
            breathe();
        });
        
        console.log(`🫁 Added breathing effect to ${lights.length} ${targetGroup} lights`);
    }

    /**
     * Add spotlight sweep effect
     */
    addSpotlightSweep(targetGroup = 'gallery') {
        const spotlights = this.lights[targetGroup].filter(light => light.isSpotLight) || [];
        if (spotlights.length === 0) return;
        
        spotlights.forEach((light, index) => {
            if (!light.userData.originalTarget) {
                light.userData.originalTarget = light.target.position.clone();
            }
            
            let time = index * 2;
            const sweepRadius = 2;
            
            const sweep = () => {
                time += 0.005;
                const offsetX = Math.sin(time) * sweepRadius;
                const offsetZ = Math.cos(time) * sweepRadius;
                
                light.target.position.set(
                    light.userData.originalTarget.x + offsetX,
                    light.userData.originalTarget.y,
                    light.userData.originalTarget.z + offsetZ
                );
                
                requestAnimationFrame(sweep);
            };
            
            sweep();
        });
        
        console.log(`🔦 Added sweep effect to ${spotlights.length} spotlights`);
    }

    /**
     * Toggle shadows system-wide
     */
    toggleShadows(enabled) {
        Object.values(this.lights).forEach(lightGroup => {
            if (Array.isArray(lightGroup)) {
                lightGroup.forEach(light => {
                    if (light.castShadow !== undefined) {
                        light.castShadow = enabled;
                    }
                });
            } else if (lightGroup && lightGroup.castShadow !== undefined) {
                lightGroup.castShadow = enabled;
            }
        });
        
        this.config.enableShadows = enabled;
        console.log(`🌓 Shadows ${enabled ? 'enabled' : 'disabled'} system-wide`);
    }

    /**
     * Set quality level and optimize accordingly
     */
    setQualityLevel(level) {
        if (!['low', 'medium', 'high'].includes(level)) {
            console.warn('Invalid quality level:', level);
            return;
        }
        
        this.config.qualityLevel = level;
        this.properties.shadowMapSize = this.getShadowMapSize();
        
        // Adjust lighting based on quality
        if (level === 'low') {
            this.toggleShadows(false);
            this.optimizeLightCount();
        } else if (level === 'high') {
            this.toggleShadows(true);
            // Potentially add more lights or effects
        }
        
        console.log(`🎨 Quality level set to: ${level}`);
    }

    /**
     * Get lighting performance metrics
     */
    getPerformanceMetrics() {
        return {
            totalLights: this.performance.totalLights,
            activeShadows: this.performance.activeShadows,
            renderCalls: this.performance.renderCalls,
            memoryUsage: this.estimateMemoryUsage(),
            qualityLevel: this.config.qualityLevel,
            lightBreakdown: {
                ambient: this.lights.ambient ? 1 : 0,
                directional: this.lights.directional ? 1 : 0,
                gallery: this.lights.gallery.length,
                accent: this.lights.accent.length,
                perimeter: this.lights.perimeter.length,
                emergency: this.lights.emergency.length,
                decorative: this.lights.decorative.length
            }
        };
    }

    /**
     * Estimate memory usage
     */
    estimateMemoryUsage() {
        const baseMemory = 1024; // Base overhead
        const lightMemory = this.performance.totalLights * 256; // Per light
        const shadowMemory = this.performance.activeShadows * this.properties.shadowMapSize; // Per shadow map
        
        return baseMemory + lightMemory + shadowMemory;
    }

    /**
     * Get light by name
     */
    getLight(name) {
        return this.scene.getObjectByName(name);
    }

    /**
     * Get lights by group
     */
    getLightGroup(groupName) {
        return this.lights[groupName] || [];
    }

    /**
     * Comprehensive cleanup
     */
    dispose() {
        console.log('🧹 Disposing museum lighting system...');
        
        // Remove all lights from scene
        Object.entries(this.lights).forEach(([groupName, lightGroup]) => {
            if (Array.isArray(lightGroup)) {
                lightGroup.forEach(light => {
                    this.scene.remove(light);
                    if (light.target) this.scene.remove(light.target);
                    if (light.dispose) light.dispose();
                });
            } else if (lightGroup) {
                this.scene.remove(lightGroup);
                if (lightGroup.target) this.scene.remove(lightGroup.target);
                if (lightGroup.dispose) lightGroup.dispose();
            }
        });
        
        // Clear references
        this.lights = {
            ambient: null,
            directional: null,
            gallery: [],
            accent: [],
            perimeter: [],
            emergency: [],
            decorative: []
        };
        
        // Reset performance metrics
        this.performance = {
            totalLights: 0,
            activeShadows: 0,
            renderCalls: 0
        };
        
        this.isInitialized = false;
        console.log('✅ Museum lighting system disposed');
    }
}