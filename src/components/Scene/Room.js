import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

/**
 * Museum Room với tranh thật và vật thể 3D - Tối ưu texture units
 */
export default class Room {
    constructor(scene, options = {}) {
        this.scene = scene;
        this.width = options.width || 40;
        this.height = options.height || 8;
        this.depth = options.depth || 60;
        this.qualityLevel = options.qualityLevel || 'medium';
        
        // Museum-specific properties
        this.walls = [];
        this.floor = null;
        this.ceiling = null;
        this.paintings = [];
        
        // 🚪 Door System Properties
        this.doors = [];
        this.playerNearDoor = null;
        this.doorHintElement = null;
        
        
        // 🏺 Museum Objects System - 6 vật phẩm GLB
        this.museumObjects = [];
        this.objectBarriers = []; // 🛡️ Thêm array để lưu hàng rào
        this.objectsData = [
            {
                name: "Stone Buddha Statue",
                modelPath: "models/artifacts/stone_buddha_statue.glb",
                position: { x: -12, y: 0, z: 15 },
                scale: { x: 1, y: 1, z: 1 },
                rotation: { x: 0, y: Math.PI / 4, z: 0 },
                description: "Tượng Phật bằng đá - Nghệ thuật Phật giáo cổ đại",
                barrierRadius: 3 // 🛡️ Bán kính hàng rào
            },
            {
                name: "Ancient Sculpture",
                modelPath: "models/artifacts/sculpture.glb", 
                position: { x: 12, y: 0, z: -15 },
                scale: { x: 2, y: 2, z: 2 },
                rotation: { x: 0, y: -Math.PI / 3, z: 0 },
                description: "Tác phẩm điêu khắc cổ điển từ thế kỷ 16",
                barrierRadius: 2.5
            },
            {
                name: "Tomb of Tu Duc",
                modelPath: "models/artifacts/tomb_of_tu_duc.glb",
                position: { x: 0, y: 2, z: -15 },
                scale: { x: 0.15, y: 0.15, z: 0.15 },
                rotation: { x: 0, y: Math.PI / 2, z: 0 },
                description: "Lăng mộ Tự Đức - Di sản văn hóa Việt Nam",
                barrierRadius: 2
            },
            {
                name: "Table Fountain",
                modelPath: "models/artifacts/1924.859_table_fountain.glb",
                position: { x: 12, y: 0, z: 15 },
                scale: { x: 18, y: 18, z: 18 },
                rotation: { x: 0, y: Math.PI, z: 0 },
                description: "Đài phun nước bàn - Nghệ thuật trang trí thế kỷ 20",
                barrierRadius: 2.8
            },
            {
                name: "Laocoon and His Sons",
                modelPath: "models/artifacts/statue.glb",
                position: { x: 8, y: 1.3, z: 5 },
                scale: { x: 0.2, y: 0.2, z: 0.2 },
                rotation: { x: 0, y: Math.PI / 6, z: 0 },
                description: "Tượng Laocoon và các con trai - Kiệt tác điêu khắc Hy Lạp",
                barrierRadius: 2.5
            },
            {
                name: "Ancient Vase Collection", 
                modelPath: "models/artifacts/seated_ganesha_carnegie_museum_of_art.glb",
                position: { x: -8.8, y: 2.2, z: 4 },
                scale: { x: 0.2, y: 0.2, z: 0.2 },
                rotation: { x: 0, y: Math.PI / 4, z: 0 },
                description: "Bộ sưu tập bình cổ - Gốm sứ truyền thống",
                barrierRadius: 2.2
            }
        ];
        
        // Texture Loaders
        this.textureLoader = new THREE.TextureLoader();
        this.gltfLoader = new GLTFLoader();
        this.objLoader = new OBJLoader();
        
        // 🎨 Danh sách ảnh tranh thật
        this.paintingImages = [
            '3DArtMuseum/Art_01.jpg',
            '3DArtMuseum/Art_02.jpg', 
            '3DArtMuseum/Art_03.jpg',
            '3DArtMuseum/Art_04.jpg',
            '3DArtMuseum/Art_05.jpg',
            '3DArtMuseum/Art_06.jpg',
            '3DArtMuseum/Art_07.jpg',
            '3DArtMuseum/Art_08.jpg',
            '3DArtMuseum/Art_09.jpg'
        ];
        
        // 🖼️ Thông tin tranh
        this.paintingData = [
            { title: "Bình Minh Trên Sông", artist: "Nguyễn Văn A", year: "1995" },
            { title: "Phong Cảnh Thiên Nhiên", artist: "Trần Thị B", year: "2001" },
            { title: "Chân Dung Cô Gái", artist: "Lê Văn C", year: "1987" },
            { title: "Thành Phố Về Đêm", artist: "Phạm Thị D", year: "2010" },
            { title: "Hoa Sen Nở", artist: "Hoàng Văn E", year: "1999" },
            { title: "Biển Cả Bao La", artist: "Đỗ Thị F", year: "2005" },
            { title: "Mùa Thu Lá Vàng", artist: "Vũ Văn G", year: "1992" },
            { title: "Làng Quê Yên Bình", artist: "Ngô Thị H", year: "2008" },
            { title: "Trừu Tượng Hiện Đại", artist: "Bùi Văn I", year: "2015" }
        ];
        
        // Shared materials để giảm texture units
        this.sharedMaterials = this.createSharedMaterials();
        
        // Initialize museum room
        this.init();
    }

    async init() {
        this.createMuseumRoom();
        this.addMuseumFeatures();
        this.createDoors();
        await this.createPaintings();
        await this.loadMuseumObjects();
        
        console.log('✅ Museum room with paintings and 6 3D objects with barriers loaded');
    }

    /**
     * 🎨 Tạo shared materials để tối ưu texture units
     */
    createSharedMaterials() {
        return {
            // Basic materials without textures
            wall: new THREE.MeshStandardMaterial({
                color: 0xF8F8FF,
                roughness: 0.8,
                metalness: 0.0
            }),
            
            floor: new THREE.MeshStandardMaterial({
                color: 0xF5F5F5,
                roughness: 0.1,
                metalness: 0.05
            }),
            
            ceiling: new THREE.MeshStandardMaterial({
                color: 0xFFFFF0,
                roughness: 0.9,
                metalness: 0.0
            }),
            
            wood: new THREE.MeshStandardMaterial({
                color: 0x8B4513,
                roughness: 0.8,
                metalness: 0.1
            }),
            
            metal: new THREE.MeshStandardMaterial({
                color: 0x2C2C2C,
                roughness: 0.3,
                metalness: 0.8
            }),
            
            gold: new THREE.MeshStandardMaterial({
                color: 0xFFD700,
                roughness: 0.2,
                metalness: 0.9
            }),
            
            glass: new THREE.MeshPhysicalMaterial({
                color: 0xFFFFFF,
                transparent: true,
                opacity: 0.3,
                roughness: 0.1,
                metalness: 0.0,
                transmission: 0.9
            }),
            
            crystal: new THREE.MeshPhysicalMaterial({
                color: 0x4169E1,
                transparent: true,
                opacity: 0.8,
                roughness: 0.0,
                metalness: 0.0,
                transmission: 0.5
            }),
            
            // Thêm materials cho các vật phẩm mới
            stone: new THREE.MeshStandardMaterial({
                color: 0xD2B48C,
                roughness: 0.9,
                metalness: 0.1
            }),
            
            bronze: new THREE.MeshStandardMaterial({
                color: 0xCD7F32,
                roughness: 0.4,
                metalness: 0.7
            }),
            
            ceramic: new THREE.MeshStandardMaterial({
                color: 0xF5DEB3,
                roughness: 0.6,
                metalness: 0.0
            }),
            
            iron: new THREE.MeshStandardMaterial({
                color: 0x36454F,
                roughness: 0.8,
                metalness: 0.9
            }),
            
            // 🛡️ Material cho hàng rão
            barrier: new THREE.MeshStandardMaterial({
                color: 0x2F4F4F,
                roughness: 0.6,
                metalness: 0.4
            }),
            
            barrierTop: new THREE.MeshStandardMaterial({
                color: 0x708090,
                roughness: 0.3,
                metalness: 0.7
            }),
            
            // 🚩 Material cho biển báo
            signYellow: new THREE.MeshStandardMaterial({
                color: 0xFFD700,
                roughness: 0.3,
                metalness: 0.1
            }),
            
            marble: new THREE.MeshStandardMaterial({
                color: 0xF8F8FF,
                roughness: 0.2,
                metalness: 0.0
            })
        };
    }

    // ==================== 🏺 MUSEUM OBJECTS ====================

    /**
     * 🏺 Load 6 vật phẩm 3D từ file models
     */
    async loadMuseumObjects() {
        console.log('🏺 Loading 6 museum artifacts...');
        
        let loadedCount = 0;
        for (const objectData of this.objectsData) {
            try {
                await this.loadSingleObject(objectData);
                loadedCount++;
                console.log(`✅ Successfully loaded ${objectData.name} (${loadedCount}/${this.objectsData.length})`);
            } catch (error) {
                console.warn(`❌ Failed to load ${objectData.name}:`, error.message);
                // Tạo vật thể thay thế nếu không load được
                this.createFallbackObject(objectData);
            }
        }
        
        console.log(`🎯 Museum artifacts summary: ${loadedCount} loaded successfully, ${this.objectsData.length - loadedCount} fallback objects created`);
    }

    /**
     * 🔄 Load một object và thêm vào scene
     */
    async loadSingleObject(objectData) {
        return new Promise((resolve, reject) => {
            const extension = objectData.modelPath.split('.').pop().toLowerCase();
            
            // Timeout để tránh load quá lâu
            const timeout = setTimeout(() => {
                reject(new Error(`Loading timeout for ${objectData.name}`));
            }, 15000); // 15 giây timeout
            
            if (extension === 'glb' || extension === 'gltf') {
                this.gltfLoader.load(
                    objectData.modelPath,
                    (gltf) => {
                        clearTimeout(timeout);
                        this.setupLoadedObject(gltf.scene, objectData);
                        resolve(gltf.scene);
                    },
                    (progress) => {
                        if (progress.total > 0) {
                            const percentage = Math.round(progress.loaded / progress.total * 100);
                            console.log(`📥 Loading ${objectData.name}: ${percentage}%`);
                        }
                    },
                    (error) => {
                        clearTimeout(timeout);
                        reject(new Error(`GLTF loading error: ${error.message}`));
                    }
                );
            } else if (extension === 'obj') {
                this.objLoader.load(
                    objectData.modelPath,
                    (obj) => {
                        clearTimeout(timeout);
                        this.setupLoadedObject(obj, objectData);
                        resolve(obj);
                    },
                    (progress) => {
                        if (progress.total > 0) {
                            const percentage = Math.round(progress.loaded / progress.total * 100);
                            console.log(`📥 Loading ${objectData.name}: ${percentage}%`);
                        }
                    },
                    (error) => {
                        clearTimeout(timeout);
                        reject(new Error(`OBJ loading error: ${error.message}`));
                    }
                );
            } else {
                clearTimeout(timeout);
                reject(new Error(`Unsupported file format: ${extension}`));
            }
        });
    }

    /**
     * ⚙️ Setup object sau khi load thành công
     */
    setupLoadedObject(object, objectData) {
        // Transform
        object.position.set(objectData.position.x, objectData.position.y, objectData.position.z);
        object.scale.set(objectData.scale.x, objectData.scale.y, objectData.scale.z);
        object.rotation.set(objectData.rotation.x, objectData.rotation.y, objectData.rotation.z);
        
        // Configure meshes
        object.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                
                // Áp dụng material phù hợp dựa trên tên object
                if (child.material) {
                    child.material = this.getMaterialForObject(objectData.name);
                }
                
                // Interactive data
                child.userData = {
                    isMuseumObject: true,
                    objectData: objectData,
                    name: objectData.name,
                    description: objectData.description
                };
            }
        });
        
        // 🛡️ Tạo hàng rào bảo vệ xung quanh object
        this.createObjectBarrier(object, objectData);
        
        this.scene.add(object);
        this.museumObjects.push({ object: object, data: objectData });
        
        console.log(`🎨 Successfully added ${objectData.name} to museum with protective barrier`);
    }

    /**
     * 🛡️ Tạo hàng rào bảo vệ xung quanh mô hình
     */
    createObjectBarrier(object, objectData) {
        const barrierGroup = new THREE.Group();
        const radius = objectData.barrierRadius || 2.5;
        const postHeight = 1.2;
        const postCount = 8;
        const ropeHeight = 0.8;
        
        // Tạo các cột hàng rào
        for (let i = 0; i < postCount; i++) {
            const angle = (i / postCount) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            // Cột chính
            const post = new THREE.Mesh(
                new THREE.CylinderGeometry(0.08, 0.08, postHeight, 8),
                this.sharedMaterials.barrier
            );
            post.position.set(x, postHeight / 2, z);
            post.castShadow = true;
            post.receiveShadow = true;
            barrierGroup.add(post);
            
            // Đầu cột
            const postTop = new THREE.Mesh(
                new THREE.SphereGeometry(0.12, 8, 8),
                this.sharedMaterials.barrierTop
            );
            postTop.position.set(x, postHeight, z);
            postTop.castShadow = true;
            barrierGroup.add(postTop);
            
            // Tạo dây thừng giữa các cột
            if (i < postCount - 1) {
                this.createRopeBetweenPosts(
                    barrierGroup,
                    { x: x, z: z },
                    { 
                        x: Math.cos(((i + 1) / postCount) * Math.PI * 2) * radius,
                        z: Math.sin(((i + 1) / postCount) * Math.PI * 2) * radius
                    },
                    ropeHeight
                );
            } else {
                // Dây cuối cùng nối với cột đầu tiên
                this.createRopeBetweenPosts(
                    barrierGroup,
                    { x: x, z: z },
                    { 
                        x: Math.cos(0) * radius,
                        z: Math.sin(0) * radius
                    },
                    ropeHeight
                );
            }
        }
        
        // Thêm biển cảnh báo
        this.createWarningSign(barrierGroup, radius);
        
        // Đặt hàng rào ở vị trí của object
        barrierGroup.position.copy(object.position);
        barrierGroup.position.y = 0; // Đặt trên mặt đất
        
        this.scene.add(barrierGroup);
        this.objectBarriers.push({ barrier: barrierGroup, objectData: objectData });
        
        console.log(`🛡️ Created protective barrier for ${objectData.name}`);
    }

    /**
     * 🪢 Tạo dây thừng giữa hai cột
     */
    createRopeBetweenPosts(group, pos1, pos2, height) {
        const distance = Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.z - pos1.z, 2));
        const rope = new THREE.Mesh(
            new THREE.CylinderGeometry(0.02, 0.02, distance, 6),
            this.sharedMaterials.wood
        );
        
        // Tính toán vị trí và rotation
        const midX = (pos1.x + pos2.x) / 2;
        const midZ = (pos1.z + pos2.z) / 2;
        rope.position.set(midX, height, midZ);
        
        // Xoay dây thừng để nối hai cột
        const angle = Math.atan2(pos2.z - pos1.z, pos2.x - pos1.x);
        rope.rotation.z = Math.PI / 2;
        rope.rotation.y = angle;
        
        rope.castShadow = true;
        group.add(rope);
    }

    /**
     * ⚠️ Tạo biển cảnh báo
     */
    createWarningSign(group, radius) {
        const signGroup = new THREE.Group();
        
        // Cột biển
        const signPost = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 1.5, 8),
            this.sharedMaterials.metal
        );
        signPost.position.y = 0.75;
        signPost.castShadow = true;
        signGroup.add(signPost);
        
        // Biển cảnh báo
        const sign = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 0.4, 0.05),
            this.sharedMaterials.signYellow
        );
        sign.position.y = 1.3;
        sign.position.z = 0.03;
        sign.castShadow = true;
        signGroup.add(sign);
        
        // Khung biển
        const signFrame = new THREE.Mesh(
            new THREE.BoxGeometry(0.85, 0.45, 0.03),
            this.sharedMaterials.metal
        );
        signFrame.position.y = 1.3;
        signFrame.castShadow = true;
        signGroup.add(signFrame);
        
        // Đặt biển ở phía trước
        signGroup.position.set(0, 0, radius * 0.8);
        group.add(signGroup);
    }

    /**
     * 🎨 Chọn material phù hợp cho từng loại vật phẩm
     */
    getMaterialForObject(objectName) {
        const lowerName = objectName.toLowerCase();
        
        if (lowerName.includes('buddha') || lowerName.includes('statue')) {
            return this.sharedMaterials.stone.clone();
        } else if (lowerName.includes('sculpture') || lowerName.includes('laocoon')) {
            return this.sharedMaterials.marble.clone();
        } else if (lowerName.includes('vase') || lowerName.includes('ceramic')) {
            return this.sharedMaterials.ceramic.clone();
        } else if (lowerName.includes('fountain') || lowerName.includes('table')) {
            return this.sharedMaterials.bronze.clone();
        } else if (lowerName.includes('tomb') || lowerName.includes('duc')) {
            return this.sharedMaterials.wood.clone();
        } else {
            return this.sharedMaterials.stone.clone();
        }
    }

    /**
     * 🔄 Tạo vật thể thay thế khi không load được GLB
     */
    createFallbackObject(objectData) {
        let geometry, material;
        const lowerName = objectData.name.toLowerCase();
        
        // Tạo geometry dựa trên tên
        if (lowerName.includes('statue') || lowerName.includes('buddha')) {
            geometry = new THREE.CylinderGeometry(0.5, 0.8, 3, 8);
            material = this.sharedMaterials.stone;
        } else if (lowerName.includes('sculpture') || lowerName.includes('laocoon')) {
            geometry = new THREE.BoxGeometry(1, 2, 1);
            material = this.sharedMaterials.marble;
        } else if (lowerName.includes('vase')) {
            geometry = new THREE.CylinderGeometry(0.4, 0.6, 1.2, 12);
            material = this.sharedMaterials.ceramic;
        } else if (lowerName.includes('fountain')) {
            geometry = new THREE.CylinderGeometry(0.6, 0.8, 1.5, 16);
            material = this.sharedMaterials.bronze;
        } else if (lowerName.includes('tomb')) {
            geometry = new THREE.BoxGeometry(2, 1, 3);
            material = this.sharedMaterials.wood;
        } else {
            geometry = new THREE.BoxGeometry(1, 1, 1);
            material = this.sharedMaterials.stone;
        }
        
        const mesh = new THREE.Mesh(geometry, material);
        
        // Transform
        mesh.position.set(objectData.position.x, objectData.position.y + 1, objectData.position.z);
        mesh.scale.set(objectData.scale.x, objectData.scale.y, objectData.scale.z);
        mesh.rotation.set(objectData.rotation.x, objectData.rotation.y, objectData.rotation.z);
        
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData = {
            isMuseumObject: true,
            objectData: objectData,
            name: objectData.name + " (Replica)",
            description: objectData.description + " - Mô hình thay thế"
        };
        
        // 🛡️ Tạo hàng rào cho fallback object
        this.createObjectBarrier(mesh, objectData);
        
        this.scene.add(mesh);
        this.museumObjects.push({ object: mesh, data: objectData });
        
        console.log(`🔄 Created fallback object for ${objectData.name} with barrier`);
    }

    // ==================== 🏛️ ROOM CREATION ====================

    createMuseumRoom() {
        this.createMuseumFloor();
        this.createMuseumCeiling();
        this.createMuseumWalls();
    }

    createMuseumFloor() {
        this.floor = new THREE.Mesh(
            new THREE.PlaneGeometry(this.width, this.depth),
            this.sharedMaterials.floor
        );
        this.floor.rotation.x = -Math.PI / 2;
        this.floor.receiveShadow = true;
        this.floor.name = "museumFloor";
        this.scene.add(this.floor);
    }

    createMuseumCeiling() {
        this.ceiling = new THREE.Mesh(
            new THREE.PlaneGeometry(this.width, this.depth),
            this.sharedMaterials.ceiling
        );
        this.ceiling.position.y = this.height;
        this.ceiling.rotation.x = Math.PI / 2;
        this.ceiling.receiveShadow = true;
        this.ceiling.name = "museumCeiling";
        this.scene.add(this.ceiling);
        
        this.createCeilingMolding();
    }

    createCeilingMolding() {
        const moldingMaterial = this.sharedMaterials.wood;
        const moldingHeight = 0.2;
        const moldingDepth = 0.3;
        
        // Create all moldings
        const moldings = [
            { pos: [0, this.height - moldingHeight / 2, -this.depth / 2 + moldingDepth / 2], size: [this.width, moldingHeight, moldingDepth] },
            { pos: [0, this.height - moldingHeight / 2, this.depth / 2 - moldingDepth / 2], size: [this.width, moldingHeight, moldingDepth] },
            { pos: [-this.width / 2 + moldingDepth / 2, this.height - moldingHeight / 2, 0], size: [moldingDepth, moldingHeight, this.depth] },
            { pos: [this.width / 2 - moldingDepth / 2, this.height - moldingHeight / 2, 0], size: [moldingDepth, moldingHeight, this.depth] }
        ];
        
        moldings.forEach(molding => {
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(...molding.size),
                moldingMaterial
            );
            mesh.position.set(...molding.pos);
            this.scene.add(mesh);
        });
    }

    createMuseumWalls() {
        // Front wall
        const frontWall = new THREE.Mesh(
            new THREE.PlaneGeometry(this.width, this.height),
            this.sharedMaterials.wall
        );
        frontWall.position.set(0, this.height / 2, -this.depth / 2);
        frontWall.receiveShadow = true;
        this.scene.add(frontWall);
        this.walls.push(frontWall);
        
        // Back wall
        const backWall = new THREE.Mesh(
            new THREE.PlaneGeometry(this.width, this.height),
            this.sharedMaterials.wall
        );
        backWall.position.set(0, this.height / 2, this.depth / 2);
        backWall.rotation.y = Math.PI;
        backWall.receiveShadow = true;
        this.scene.add(backWall);
        this.walls.push(backWall);
        
        // Left wall với cửa
        const leftWall = this.createWallWithDoor('left');
        leftWall.position.set(-this.width / 2, this.height / 2, 0);
        leftWall.rotation.y = Math.PI / 2;
        this.scene.add(leftWall);
        this.walls.push(leftWall);
        
        // Right wall với cửa
        const rightWall = this.createWallWithDoor('right');
        rightWall.position.set(this.width / 2, this.height / 2, 0);
        rightWall.rotation.y = -Math.PI / 2;
        this.scene.add(rightWall);
        this.walls.push(rightWall);
        
        this.createWainscoting();
    }

    /**
     * 🚪 Tạo tường với cửa đơn giản (không dùng nhiều texture)
     */
    createWallWithDoor(side) {
        const group = new THREE.Group();
        
        const doorWidth = 2.5;
        const doorHeight = 3.0;
        
        // Wall with hole
        const wallShape = new THREE.Shape();
        wallShape.moveTo(-this.depth / 2, -this.height / 2);
        wallShape.lineTo(this.depth / 2, -this.height / 2);
        wallShape.lineTo(this.depth / 2, this.height / 2);
        wallShape.lineTo(-this.depth / 2, this.height / 2);
        wallShape.lineTo(-this.depth / 2, -this.height / 2);
        
        // Door hole
        const doorHole = new THREE.Path();
        const doorY = -this.height / 2 + doorHeight / 2 + 0.1;
        doorHole.moveTo(-doorWidth / 2, doorY - doorHeight / 2);
        doorHole.lineTo(doorWidth / 2, doorY - doorHeight / 2);
        doorHole.lineTo(doorWidth / 2, doorY + doorHeight / 2);
        doorHole.lineTo(-doorWidth / 2, doorY + doorHeight / 2);
        doorHole.lineTo(-doorWidth / 2, doorY - doorHeight / 2);
        wallShape.holes.push(doorHole);
        
        const wall = new THREE.Mesh(
            new THREE.ShapeGeometry(wallShape),
            this.sharedMaterials.wall
        );
        wall.receiveShadow = true;
        group.add(wall);
        
        // Simple door frame
        const frameThickness = 0.15;
        const frameMaterial = this.sharedMaterials.wood;
        
        // Frame pieces
        const frameGeometries = [
            { pos: [-doorWidth / 2 - frameThickness / 2, doorY, 0.1], size: [frameThickness, doorHeight, frameThickness] },
            { pos: [doorWidth / 2 + frameThickness / 2, doorY, 0.1], size: [frameThickness, doorHeight, frameThickness] },
            { pos: [0, doorY + doorHeight / 2 + frameThickness / 2, 0.1], size: [doorWidth + frameThickness * 2, frameThickness, frameThickness] }
        ];
        
        frameGeometries.forEach(frame => {
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(...frame.size),
                frameMaterial
            );
            mesh.position.set(...frame.pos);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            group.add(mesh);
        });
        
        // Simple door panel
        const door = new THREE.Mesh(
            new THREE.PlaneGeometry(doorWidth - 0.1, doorHeight - 0.1),
            this.sharedMaterials.wood
        );
        door.position.set(0, doorY, 0.15);
        door.castShadow = true;
        door.receiveShadow = true;
        group.add(door);
        
        // Door handle
        const handle = new THREE.Mesh(
            new THREE.SphereGeometry(0.08, 8, 8),
            this.sharedMaterials.gold
        );
        handle.position.set(doorWidth * 0.35, doorY, 0.2);
        handle.castShadow = true;
        group.add(handle);
        
        return group;
    }

    createWainscoting() {
        const wainscotHeight = 1.2;
        const wainscotDepth = 0.05;
        const material = this.sharedMaterials.wood;
        
        const wainscots = [
            { pos: [0, wainscotHeight / 2, -this.depth / 2 + wainscotDepth / 2], size: [this.width, wainscotHeight, wainscotDepth] },
            { pos: [0, wainscotHeight / 2, this.depth / 2 - wainscotDepth / 2], size: [this.width, wainscotHeight, wainscotDepth] },
            { pos: [-this.width / 2 + wainscotDepth / 2, wainscotHeight / 2, 0], size: [wainscotDepth, wainscotHeight, this.depth] },
            { pos: [this.width / 2 - wainscotDepth / 2, wainscotHeight / 2, 0], size: [wainscotDepth, wainscotHeight, this.depth] }
        ];
        
        wainscots.forEach(wainscot => {
            const mesh = new THREE.Mesh(
                new THREE.BoxGeometry(...wainscot.size),
                material
            );
            mesh.position.set(...wainscot.pos);
            this.scene.add(mesh);
        });
    }

    // ==================== 🖼️ PAINTINGS ====================

    async createPaintings() {
        const paintingConfigs = [
            { x: 0, y: 3, z: -this.depth / 2 + 0.1, rotation: 0, size: { w: 2.5, h: 2 }, imageIndex: 1 },
            { x: -8, y: 3, z: this.depth / 2 - 0.1, rotation: Math.PI, size: { w: 2, h: 2.5 }, imageIndex: 3 },
            { x: 0, y: 3, z: this.depth / 2 - 0.1, rotation: Math.PI, size: { w: 2.2, h: 2.2 }, imageIndex: 4 },
            { x: 8, y: 3, z: this.depth / 2 - 0.1, rotation: Math.PI, size: { w: 1.8, h: 2.4 }, imageIndex: 5 },
            { x: -this.width / 2 + 0.1, y: 3, z: 10, rotation: Math.PI / 2, size: { w: 2, h: 1.8 }, imageIndex: 7 },
            { x: this.width / 2 - 0.1, y: 3, z: -10, rotation: -Math.PI / 2, size: { w: 2.2, h: 1.8 }, imageIndex: 0 },
            { x: this.width / 2 - 0.1, y: 3, z: 5, rotation: -Math.PI / 2, size: { w: 2, h: 2 }, imageIndex: 2 },
            { x: this.width / 2 - 0.1, y: 3, z: 20, rotation: -Math.PI / 2, size: { w: 1.8, h: 1.5 }, imageIndex: 6 },
            { x: -this.width / 2 + 0.1, y: 3, z: -15, rotation: Math.PI / 2, size: { w: 2.2, h: 1.6 }, imageIndex: 8 }
        ];

        for (let i = 0; i < paintingConfigs.length; i++) {
            await this.createValidatedPainting(paintingConfigs[i], i);
        }

        console.log(`🖼️ Created ${this.paintings.length} paintings`);
    }

    async createValidatedPainting(config, index) {
        try {
            const texture = await this.loadPaintingTexture(config.imageIndex);
            
            const group = new THREE.Group();
            
            // Frame
            const frame = new THREE.Mesh(
                new THREE.BoxGeometry(
                    config.size.w + 0.2,
                    config.size.h + 0.2,
                    0.1
                ),
                this.sharedMaterials.gold
            );
            frame.castShadow = true;
            frame.receiveShadow = true;
            group.add(frame);
            
            // Canvas
            const canvasMaterial = new THREE.MeshStandardMaterial({
                map: texture,
                roughness: 0.8,
                metalness: 0.0
            });
            
            const canvas = new THREE.Mesh(
                new THREE.PlaneGeometry(config.size.w, config.size.h),
                canvasMaterial
            );
            canvas.position.z = 0.06;
            canvas.receiveShadow = true;
            canvas.userData = {
                isPainting: true,
                paintingData: this.paintingData[config.imageIndex],
                imageUrl: this.paintingImages[config.imageIndex]
            };
            group.add(canvas);
            
            // Position
            group.position.set(config.x, config.y, config.z);
            group.rotation.y = config.rotation;
            group.name = `painting_${index}`;
            
            this.scene.add(group);
            this.paintings.push(group);
            
            console.log(`✅ Created painting ${index + 1}: ${this.paintingImages[config.imageIndex]}`);
            
        } catch (error) {
            console.warn(`❌ Skipped painting ${index + 1}: ${error.message}`);
        }
    }

    async loadPaintingTexture(imageIndex) {
        return new Promise((resolve, reject) => {
            const imageUrl = this.paintingImages[imageIndex];
            
            this.textureLoader.load(
                imageUrl,
                (texture) => {
                    texture.wrapS = THREE.ClampToEdgeWrapping;
                    texture.wrapT = THREE.ClampToEdgeWrapping;
                    texture.minFilter = THREE.LinearFilter;
                    texture.magFilter = THREE.LinearFilter;
                    resolve(texture);
                },
                undefined,
                (error) => reject(new Error(`Failed to load ${imageUrl}`))
            );
        });
    }

    // ==================== 🚪 DOOR SYSTEM ====================

    createDoors() {
        const doorConfigs = [
            {
                id: 'door_left',
                position: new THREE.Vector3(-this.width / 2 + 0.2, 1.5, 0),
                url: './sculpture-gallery.html',
                label: 'Phòng Điêu Khắc Cổ Điển',
                description: 'Bộ sưu tập điêu khắc cổ điển',
            },
            {
                id: 'door_right',
                position: new THREE.Vector3(this.width / 2 - 0.2, 1.5, 0),
                url: './painting-gallery.html',
                label: 'Phòng Tranh Sơn Dầu',
                description: 'Các kiệt tác hội họa'
            }
        ];

        doorConfigs.forEach(config => {
            const door = this.createSingleDoor(config);
            this.doors.push(door);
        });

        console.log(`🚪 Created ${this.doors.length} doors`);
    }

    createSingleDoor(config) {
        const door = {
            id: config.id,
            position: config.position.clone(),
            url: config.url,
            label: config.label,
            description: config.description,
            triggerZone: null,
            isNear: false
        };

        // Invisible trigger zone
        const triggerZone = new THREE.Mesh(
            new THREE.BoxGeometry(4, 3, 2),
            new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, visible: false })
        );
        triggerZone.position.copy(door.position);
        triggerZone.userData = { isTrigger: true, doorData: door };
        
        door.triggerZone = triggerZone;
        this.scene.add(triggerZone);
        
        return door;
    }

    checkDoorsInteraction(playerPosition) {
        let nearestDoor = null;
        let minDistance = Infinity;

        this.doors.forEach(door => {
            const distance = door.position.distanceTo(playerPosition);
            door.isNear = distance < 3;

            if (door.isNear && distance < minDistance) {
                minDistance = distance;
                nearestDoor = door;
            }
        });

        if (nearestDoor !== this.playerNearDoor) {
            if (this.playerNearDoor) {
                this.hideDoorHint();
            }
            if (nearestDoor) {
                this.showDoorHint(nearestDoor);
            }
            this.playerNearDoor = nearestDoor;
        }

        return nearestDoor;
    }

    activateNearestDoor() {
        if (this.playerNearDoor) {
            this.navigateToPage(this.playerNearDoor);
            return true;
        }
        return false;
    }

    navigateToPage(door) {
        this.hideDoorHint();
        this.showPageTransition(door);
        
        setTimeout(() => {
            window.location.href = door.url;
        }, 1500);
        
        console.log(`🌐 Navigating to: ${door.url}`);
    }

    showDoorHint(door) {
        this.hideDoorHint();

        this.doorHintElement = document.createElement('div');
        this.doorHintElement.id = 'door-hint';
        this.doorHintElement.style.cssText = `
            position: fixed;
            bottom: 150px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.9);
            color: #FFD700;
            padding: 20px 30px;
            border-radius: 15px;
            font-family: Arial, sans-serif;
            text-align: center;
            z-index: 1000;
            pointer-events: none;
            border: 2px solid rgba(255, 215, 0, 0.5);
            max-width: 400px;
        `;

        this.doorHintElement.innerHTML = `
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">
                🚪 ${door.label}
            </div>
            <div style="font-size: 14px; opacity: 0.9; margin-bottom: 12px;">
                ${door.description}
            </div>
            <div style="font-size: 12px; opacity: 0.8;">
                Nhấn <kbd style="background: rgba(255,215,0,0.3); padding: 3px 8px; border-radius: 4px;">E</kbd> để đi qua cửa
            </div>
        `;

        document.body.appendChild(this.doorHintElement);
    }

    hideDoorHint() {
        if (this.doorHintElement) {
            document.body.removeChild(this.doorHintElement);
            this.doorHintElement = null;
        }
    }

    showPageTransition(door) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(0,0,0,0.95), rgba(40,40,40,0.9));
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 1s ease;
        `;

        overlay.innerHTML = `
            <div style="text-align: center; color: white; font-family: Arial, sans-serif;">
                <div style="font-size: 60px; margin-bottom: 20px;">🚪</div>
                <div style="font-size: 32px; margin-bottom: 15px; font-weight: bold;">${door.label}</div>
                <div style="font-size: 18px; opacity: 0.9; margin-bottom: 30px;">${door.description}</div>
                <div style="font-size: 16px; opacity: 0.7;">Đang chuyển trang...</div>
            </div>
        `;

        document.body.appendChild(overlay);
        setTimeout(() => overlay.style.opacity = '1', 50);
    }

    // ==================== 🪑 MUSEUM FEATURES ====================

    addMuseumFeatures() {
        this.createBenches();
        this.createInfoStands();
    }

    createBenches() {
        const benchPositions = [
            { pos: [0, 0, 0], rot: 0 },
            { pos: [-6, 0, 18], rot: Math.PI / 4 },
            { pos: [6, 0, 18], rot: -Math.PI / 4 },
            { pos: [-6, 0, -18], rot: -Math.PI / 4 },
            { pos: [6, 0, -18], rot: Math.PI / 4 },
            { pos: [8, 0, 0], rot: Math.PI / 2 } // Thêm ghế mới
        ];

        benchPositions.forEach(bench => {
            const benchGroup = this.createBench();
            benchGroup.position.set(...bench.pos);
            benchGroup.rotation.y = bench.rot;
            this.scene.add(benchGroup);
        });
    }

    createBench() {
        const group = new THREE.Group();
        
        // Seat
        const seat = new THREE.Mesh(
            new THREE.BoxGeometry(2.5, 0.15, 0.6),
            this.sharedMaterials.wood
        );
        seat.position.y = 0.4;
        seat.castShadow = true;
        seat.receiveShadow = true;
        group.add(seat);
        
        // Legs
        for (let i = 0; i < 4; i++) {
            const leg = new THREE.Mesh(
                new THREE.BoxGeometry(0.15, 0.4, 0.15),
                this.sharedMaterials.wood
            );
            leg.position.set(
                (i % 2) * 2.2 - 1.1,
                0.2,
                (Math.floor(i / 2)) * 0.3 - 0.15
            );
            leg.castShadow = true;
            leg.receiveShadow = true;
            group.add(leg);
        }
        
        return group;
    }

    /**
     * 📋 Tạo bảng thông tin bổ sung
     */
    createInfoStands() {
        const infoPositions = [
            { pos: [10, 0, 10], text: "Khu vực hiển thị cổ vật" },
            { pos: [-10, 0, 10], text: "Bộ sưu tập điêu khắc" }
        ];

        infoPositions.forEach(info => {
            const stand = this.createInfoStand(info.text);
            stand.position.set(...info.pos);
            this.scene.add(stand);
        });
    }

    createInfoStand(text) {
        const group = new THREE.Group();
        
        // Chân đế
        const base = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.5, 0.1, 8),
            this.sharedMaterials.metal
        );
        base.position.y = 0.05;
        base.castShadow = true;
        group.add(base);
        
        // Cột
        const pole = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 1.2, 8),
            this.sharedMaterials.metal
        );
        pole.position.y = 0.6;
        pole.castShadow = true;
        group.add(pole);
        
        // Bảng thông tin
        const infoBoard = new THREE.Mesh(
            new THREE.BoxGeometry(1.5, 0.8, 0.05),
            this.sharedMaterials.signYellow
        );
        infoBoard.position.y = 1.2;
        infoBoard.castShadow = true;
        group.add(infoBoard);
        
        return group;
    }

    // ==================== 🎬 UPDATE & UTILITIES ====================

    update(deltaTime) {
        // Animate museum objects nếu có
        this.museumObjects.forEach(obj => {
            if (obj.data.animate) {
                obj.data.animate();
            }
        });
    }

    getPaintingMeshes() {
        const paintingMeshes = [];
        this.paintings.forEach(painting => {
            painting.traverse(child => {
                if (child.isMesh && child.userData.isPainting) {
                    paintingMeshes.push(child);
                }
            });
        });
        return paintingMeshes;
    }

    getMuseumObjectMeshes() {
        const objectMeshes = [];
        this.museumObjects.forEach(item => {
            item.object.traverse(child => {
                if (child.isMesh && child.userData.isMuseumObject) {
                    objectMeshes.push(child);
                }
            });
        });
        return objectMeshes;
    }

    getCollidableObjects() {
        const objects = [...this.walls];
        if (this.floor) objects.push(this.floor);
        if (this.ceiling) objects.push(this.ceiling);
        
        // 🛡️ Thêm hàng rào vào collision objects
        this.objectBarriers.forEach(barrierItem => {
            objects.push(barrierItem.barrier);
        });
        
        return objects;
    }

    getDoorMeshes() {
        return this.doors.map(door => door.triggerZone).filter(Boolean);
    }

    getBounds() {
        return {
            width: this.width,
            height: this.height,
            depth: this.depth
        };
    }

    setQualityLevel(level) {
        this.qualityLevel = level;
    }

    dispose() {
        this.hideDoorHint();
        
        // Clean up doors
        this.doors.forEach(door => {
            if (door.triggerZone) {
                this.scene.remove(door.triggerZone);
                door.triggerZone.geometry.dispose();
                door.triggerZone.material.dispose();
            }
        });
        
        // Clean up paintings
        this.paintings.forEach(painting => {
            painting.traverse(child => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (child.material.map) child.material.map.dispose();
                    child.material.dispose();
                }
            });
            this.scene.remove(painting);
        });
        
        // Clean up museum objects
        this.museumObjects.forEach(item => {
            item.object.traverse(child => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) child.material.dispose();
            });
            this.scene.remove(item.object);
        });
        
        // 🛡️ Clean up barriers
        this.objectBarriers.forEach(barrierItem => {
            barrierItem.barrier.traverse(child => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) child.material.dispose();
            });
            this.scene.remove(barrierItem.barrier);
        });
        
        // Clean up walls
        this.walls.forEach(wall => {
            if (wall.isGroup) {
                wall.traverse(child => {
                    if (child.geometry) child.geometry.dispose();
                    if (child.material) child.material.dispose();
                });
            } else {
                if (wall.geometry) wall.geometry.dispose();
                if (wall.material) wall.material.dispose();
            }
            this.scene.remove(wall);
        });
        
        // Clean up floor and ceiling
        if (this.floor) {
            this.floor.geometry.dispose();
            this.floor.material.dispose();
            this.scene.remove(this.floor);
        }
        
        if (this.ceiling) {
            this.ceiling.geometry.dispose();
            this.ceiling.material.dispose();
            this.scene.remove(this.ceiling);
        }
        
        // Dispose shared materials
        Object.values(this.sharedMaterials).forEach(material => {
            material.dispose();
        });
        
        console.log('🧹 Room disposed with 6 artifacts and barriers');
    }
}