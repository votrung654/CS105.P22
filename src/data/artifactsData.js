// Museum artifacts data - Bố trí bám sát tường và sát đất

const artifactsData = [

    // ========== TƯỜNG CHÍNH (Front Wall) - Tranh bám sát tường ==========
    // {
    //     id: 1,
    //     name: "Đêm Đầy Sao",
    //     description: "Đêm Đầy Sao (The Starry Night) là kiệt tác của Vincent van Gogh, được vẽ vào năm 1889. Tác phẩm thể hiện phong cách post-impressionist độc đáo với những đường xoáy ấn tượng trên bầu trời đêm.",
    //     type: "painting",
    //     path: null,
    //     audioPath: null,
    //     size: { width: 2.5, height: 2.0, depth: 0.15 },
    //     position: { x: 0, y: 2.5, z: -29.85 }, // 🔧 Bám sát tường: z từ -29.7 → -29.85
    //     rotation: { x: 0, y: 0, z: 0 },
    //     is3DModel: false,
    //     artist: "Vincent van Gogh",
    //     year: 1889,
    //     category: "Post-Impressionism",
    //     materials: "Sơn dầu trên canvas",
    //     dimensions: "73.7 cm × 92.1 cm",
    //     fallbackColor: 0x1E3A8A,
    //     lighting: { 
    //         enabled: true,
    //         spotLight: { intensity: 0.8, angle: Math.PI / 6 }
    //     },
    //     frame: {
    //         enabled: true,
    //         width: 0.15,
    //         depth: 0.1,
    //         material: "gold"
    //     }
    // },

    {
        id: 2,
        name: "Mona Lisa",
        description: "Mona Lisa là bức chân dung nổi tiếng nhất thế giới của Leonardo da Vinci, được hoàn thành vào khoảng 1503-1519. Nụ cười bí ẩn và kỹ thuật sfumato đã làm nên tên tuổi tác phẩm.",
        type: "painting",
        path: null,
        audioPath: null,
        size: { width: 2.0, height: 1.5, depth: 0.15 },
        position: { x: -6, y: 2.3, z: -29.85 }, // 🔧 Bám sát tường
        rotation: { x: 0, y: 0, z: 0 },
        is3DModel: false,
        artist: "Leonardo da Vinci",
        year: "1503-1519",
        category: "Renaissance",
        materials: "Sơn dầu trên gỗ dương",
        dimensions: "77 cm × 53 cm",
        fallbackColor: 0x8B4513,
        lighting: { 
            enabled: true,
            spotLight: { intensity: 0.7, angle: Math.PI / 8 }
        },
        frame: {
            enabled: true,
            width: 0.12,
            depth: 0.08,
            material: "darkwood"
        }
    },

    {
        id: 3,
        name: "Guernica",
        description: "Guernica là tác phẩm phản chiến nổi tiếng của Pablo Picasso, được hoàn thành vào năm 1937. Bức tranh thể hiện nỗi đau của chiến tranh qua phong cách lập thể độc đáo.",
        type: "painting",
        path: null,
        audioPath: null,
        size: { width: 3.5, height: 1.8, depth: 0.15 },
        position: { x: 6, y: 2.5, z: -29.85 }, // 🔧 Bám sát tường
        rotation: { x: 0, y: 0, z: 0 },
        is3DModel: false,
        artist: "Pablo Picasso",
        year: 1937,
        category: "Cubism",
        materials: "Sơn dầu trên canvas",
        dimensions: "349.3 cm × 776.6 cm",
        fallbackColor: 0x2C2C2C,
        lighting: { 
            enabled: true,
            spotLight: { intensity: 0.9, angle: Math.PI / 5 }
        },
        frame: {
            enabled: true,
            width: 0.18,
            depth: 0.12,
            material: "modernsilver"
        }
    },

    // ========== KHUÔN VIÊN TRUNG TÂM - Bệ sát đất ==========
    {
        id: 4,
        name: "Lăng Tự Đức – Huế, Việt Nam",
        description: "Một trong những lăng tẩm đẹp nhất của vua chúa triều Nguyễn, được bao quanh bởi hồ sen, đình tạ và cây cổ thụ. Là nơi vua Tự Đức sống, làm thơ và nghỉ ngơi trước khi qua đời.",
        type: "model3d",
        path: null,
        audioPath: null,
        size: { width: 1.5, height: 0.8, depth: 1.5 },
        position: { x: 0, y: 0.4, z: -15 }, // 🔧 Sát đất: Y = height/2 = 0.4
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        is3DModel: true,
        fallbackType: "cylinder",
        artist: "Contemporary Design",
        year: "2020",
        category: "Modern Sculpture Base",
        materials: "Đá cẩm thạch trắng",
        dimensions: "80 cm cao",
        fallbackColor: 0xF5F5DC,
        pedestal: {
            enabled: false
        },
        lighting: { 
            enabled: true,
            circularLights: true,
            intensity: 0.6
        }
    },

    // ========== TƯỜNG TRÁI (Left Wall) - Bệ sát tường và tranh bám tường ==========
    {
        id: 5,
        name: "Bệ Trưng Bày Trái",
        description: "Bệ trưng bày hình trụ nhỏ gọn, thể hiện sự tối giản trong thiết kế hiện đại.",
        type: "model3d",
        path: null,
        audioPath: null,
        size: { width: 1.0, height: 0.6, depth: 1.0 },
        position: { x: -19.5, y: 0.3, z: -15 }, // 🔧 Sát tường trái: x từ -18 → -19.5, sát đất
        rotation: { x: 0, y: 90, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        is3DModel: true,
        fallbackType: "cylinder",
        artist: "Modern Design",
        year: "2020",
        category: "Display Platform",
        materials: "Đá cẩm thạch xám",
        dimensions: "60 cm cao",
        fallbackColor: 0xE5E5E5,
        pedestal: {
            enabled: false
        }
    },

    {
        id: 1,
        name: "Bức Chân Dung Cổ Điển",
        description: "Chân dung quý tộc thế kỷ 18, thể hiện kỹ thuật hội họa tinh xảo và phong cách thời trang thời kỳ Baroque.",
        type: "painting",
        path: null,
        audioPath: null,
        size: { width: 1.8, height: 2.2, depth: 0.12 },
        position: { x: -19.85, y: 2.5, z: -8 }, // 🔧 Bám sát tường trái: x từ -18.7 → -19.85
        rotation: { x: 0, y: 90, z: 0 },
        is3DModel: false,
        artist: "School of Rembrandt",
        year: "1650-1680",
        category: "Baroque Portrait",
        materials: "Sơn dầu trên canvas",
        dimensions: "120 cm × 90 cm",
        fallbackColor: 0x8B4513,
        frame: {
            enabled: true,
            width: 0.12,
            depth: 0.08,
            material: "ornategold"
        }
    },

    {
        id: 7,
        name: "Phong Cảnh Ấn Tượng",
        description: "Bức tranh phong cảnh mang đậm phong cách ấn tượng, thể hiện ánh sáng tự nhiên và màu sắc rực rỡ của thiên nhiên.",
        type: "painting",
        path: null,
        audioPath: null,
        size: { width: 2.0, height: 1.5, depth: 0.12 },
        position: { x: -19.85, y: 2.3, z: -22 }, // 🔧 Bám sát tường trái
        rotation: { x: 0, y: 90, z: 0 },
        is3DModel: false,
        artist: "Claude Monet",
        year: "1872-1878",
        category: "Impressionism",
        materials: "Sơn dầu trên canvas",
        dimensions: "100 cm × 75 cm",
        fallbackColor: 0x059669,
        frame: {
            enabled: true,
            width: 0.10,
            depth: 0.06,
            material: "lightwood"
        }
    },

    // ========== TƯỜNG PHẢI (Right Wall) - Bệ sát tường và tranh bám tường ==========
    {
        id: 8,
        name: "Bệ Trưng Bày Phải",
        description: "Bệ trưng bày hình trụ với thiết kế kim loại hiện đại, phù hợp với không gian gallery đương đại.",
        type: "model3d",
        path: null,
        audioPath: null,
        size: { width: 1.2, height: 0.7, depth: 1.2 },
        position: { x: 19.4, y: 0.35, z: -8 }, // 🔧 Sát tường phải: x từ 18 → 19.4, sát đất
        rotation: { x: 0, y: -90, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        is3DModel: true,
        fallbackType: "cylinder",
        artist: "Industrial Design",
        year: "2020",
        category: "Modern Display",
        materials: "Thép và kính",
        dimensions: "70 cm cao",
        fallbackColor: 0x708090,
        pedestal: {
            enabled: false
        }
    },

    // {
    //     id: 9,
    //     name: "Nghệ Thuật Trừu Tượng",
    //     description: "Tác phẩm trừu tượng đầy màu sắc thể hiện cảm xúc và ý tưởng thông qua hình thức, màu sắc không mô phỏng thực tế.",
    //     type: "painting",
    //     path: null,
    //     audioPath: null,
    //     size: { width: 2.2, height: 1.8, depth: 0.12 },
    //     position: { x: 19.85, y: 2.4, z: -15 }, // 🔧 Bám sát tường phải: x từ 18.7 → 19.85
    //     rotation: { x: 0, y: -90, z: 0 },
    //     is3DModel: false,
    //     artist: "Wassily Kandinsky",
    //     year: "1910-1920",
    //     category: "Abstract Art",
    //     materials: "Sơn dầu trên canvas",
    //     dimensions: "140 cm × 110 cm",
    //     fallbackColor: 0xDC2626,
    //     frame: {
    //         enabled: true,
    //         width: 0.15,
    //         depth: 0.10,
    //         material: "modernblack"
    //     }
    // },

    // {
    //     id: 10,
    //     name: "Pop Art",
    //     description: "Tác phẩm Pop Art thể hiện văn hóa đại chúng với màu sắc sặc sỡ và hình ảnh biểu tượng của thời đại công nghiệp.",
    //     type: "painting",
    //     path: null,
    //     audioPath: null,
    //     size: { width: 1.8, height: 1.8, depth: 0.12 },
    //     position: { x: 19.85, y: 2.4, z: -22 }, // 🔧 Bám sát tường phải
    //     rotation: { x: 0, y: -90, z: 0 },
    //     is3DModel: false,
    //     artist: "Andy Warhol",
    //     year: "1960-1970",
    //     category: "Pop Art",
    //     materials: "Silk-screen trên canvas",
    //     dimensions: "120 cm × 120 cm",
    //     fallbackColor: 0xFF6B9D,
    //     frame: {
    //         enabled: true,
    //         width: 0.08,
    //         depth: 0.05,
    //         material: "colorfulplastic"
    //     }
    // },

    // // ========== TƯỜNG SAU (Back Wall) - Tranh bám sát tường ==========
    // {
    //     id: 11,
    //     name: "Bức Họa Lớn Tường Sau",
    //     description: "Bức tranh panorama quy mô lớn thể hiện cảnh quan lịch sử hoặc thần thoại, là điểm nhấn chính của không gian triển lãm.",
    //     type: "painting",
    //     path: null,
    //     audioPath: null,
    //     size: { width: 6.0, height: 3.0, depth: 0.15 },
    //     position: { x: 0, y: 3.0, z: 29.85 }, // 🔧 Bám sát tường sau: z từ 29.7 → 29.85
    //     rotation: { x: 0, y: 180, z: 0 },
    //     is3DModel: false,
    //     artist: "Jacques-Louis David",
    //     year: "1800-1820",
    //     category: "Neoclassical",
    //     materials: "Sơn dầu trên canvas",
    //     dimensions: "400 cm × 250 cm",
    //     fallbackColor: 0x7C3AED,
    //     lighting: { 
    //         enabled: true,
    //         floodLight: true,
    //         intensity: 0.6
    //     },
    //     frame: {
    //         enabled: true,
    //         width: 0.25,
    //         depth: 0.15,
    //         material: "grandiose"
    //     }
    // },

    // ========== KHU VỰC GÓC - Bệ sát góc tường ==========
    {
        id: 12,
        name: "Bệ Gốm Cổ",
        description: "Bệ trưng bày hình trụ nhỏ gọn dành cho hiện vật gốm sứ cổ điển với thiết kế tối giản.",
        type: "model3d",
        path: null,
        audioPath: null,
        size: { width: 0.8, height: 0.5, depth: 0.8 },
        position: { x: -19, y: 0.25, z: 29 }, // 🔧 Sát góc tường trái-sau: x từ -15 → -19, z từ 25 → 29
        rotation: { x: 0, y: 45, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        is3DModel: true,
        fallbackType: "cylinder",
        artist: "Museum Design",
        year: "2020",
        category: "Display Stand",
        materials: "Gỗ tự nhiên",
        dimensions: "50 cm cao",
        fallbackColor: 0xD2691E,
        pedestal: {
            enabled: false
        }
    },

    {
        id: 13,
        name: "Lăng Tự Đức – Huế, Việt Nam",
        description: "Một trong những lăng tẩm đẹp nhất của vua chúa triều Nguyễn, được bao quanh bởi hồ sen, đình tạ và cây cổ thụ. Là nơi vua Tự Đức sống, làm thơ và nghỉ ngơi trước khi qua đời.",
        type: "model3d",
        path: null,
        audioPath: null,
        size: { width: 0.6, height: 0.4, depth: 0.6 },
        position: { x: 19, y: 0.2, z: 29 }, // 🔧 Sát góc tường phải-sau: x từ 15 → 19, z từ 25 → 29
        rotation: { x: 0, y: -45, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        is3DModel: true,
        fallbackType: "cylinder",
        artist: "Minimalist Design",
        year: "2020",
        category: "Small Display",
        materials: "Đá marble trắng",
        dimensions: "40 cm cao",
        fallbackColor: 0xF5F5F0,
        pedestal: {
            enabled: false
        }
    },

    // ========== KHUÔN VIÊN PHỤ - Bệ sát đất ở trung tâm ==========
    {
        id: 14,
        name: "Tượng Ganesha ngồi",
        description: "Tượng thần Ganesha – vị thần đầu voi trong Ấn Độ giáo – đang ngồi thiền, biểu tượng cho trí tuệ, sự vượt qua chướng ngại và thành công. Tượng hiện đang được lưu giữ tại Bảo tàng Nghệ thuật Carnegie (Mỹ).",
        type: "model3d",
        path: null,
        audioPath: null,
        size: { width: 1.0, height: 0.6, depth: 1.0 },
        position: { x: -8, y: 0.3, z: 5 }, // 🔧 Giữ nguyên - đã sát đất
        rotation: { x: 0, y: 30, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        is3DModel: true,
        fallbackType: "cylinder",
        artist: "Contemporary Design",
        year: "2020",
        category: "Medium Display",
        materials: "Đá sa thạch",
        dimensions: "60 cm cao",
        fallbackColor: 0x696969,
        pedestal: {
            enabled: false
        }
    },

    {
        id: 15,
        name: "Tượng Rắn Thủy Ngân – Biểu tượng sức mạnh uẩn tàng",
        description: "Tượng mô tả một con rắn trong tư thế uốn lượn, biểu tượng cho trí tuệ, sự sống và tái sinh. Có thể dùng trong bối cảnh trang trí huyền bí hoặc tôn giáo.",
        type: "model3d",
        path: null,
        audioPath: null,
        size: { width: 1.1, height: 0.7, depth: 1.1 },
        position: { x: 8, y: 0.35, z: 5 }, // 🔧 Giữ nguyên - đã sát đất
        rotation: { x: 0, y: -30, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        is3DModel: true,
        fallbackType: "cylinder",
        artist: "Modern Studio",
        year: "2020",
        category: "Contemporary Display",
        materials: "Thép không gỉ polished",
        dimensions: "70 cm cao",
        fallbackColor: 0xC0C0C0,
        pedestal: {
            enabled: false
        }
    }
];

// ========== THÔNG TIN BẢO TÀNG ==========
export const museumLayout = {
    room: {
        width: 40,
        height: 8,
        depth: 60
    },
    floorLevel: 0, // Mức sàn nhà
    wallThickness: 0.3, // 🔧 Độ dày tường để tính toán vị trí bám sát
    walkingPaths: [
        { start: { x: 0, z: 25 }, end: { x: 0, z: -25 } }, // Lối đi chính
        { start: { x: -15, z: 20 }, end: { x: 15, z: 20 } }, // Lối đi ngang sau
        { start: { x: -15, z: 0 }, end: { x: 15, z: 0 } }, // Lối đi ngang giữa
        { start: { x: -15, z: -20 }, end: { x: 15, z: -20 } } // Lối đi ngang trước
    ],
    // 🔧 Vùng tường để bám sát
    wallBounds: {
        front: { z: -30, thickness: 0.3 },   // Tường trước: z = -29.85
        back: { z: 30, thickness: 0.3 },     // Tường sau: z = 29.85  
        left: { x: -20, thickness: 0.3 },    // Tường trái: x = -19.85
        right: { x: 20, thickness: 0.3 }     // Tường phải: x = 19.85
    },
    lightingZones: [
        { name: "centerpiece", area: { x: 0, z: -15, radius: 4 } },
        { name: "frontWall", area: { x: 0, z: -29, width: 12, height: 4 } },
        { name: "leftWall", area: { x: -19, z: 0, width: 2, height: 4 } }, // 🔧 Điều chỉnh theo vị trí mới
        { name: "rightWall", area: { x: 19, z: 0, width: 2, height: 4 } }, // 🔧 Điều chỉnh theo vị trí mới
        { name: "backWall", area: { x: 0, z: 29, width: 8, height: 4 } },
        { name: "displayStands", area: { x: 0, z: 0, radius: 20 } }
    ],
    frameMaterials: {
        gold: { color: 0xFFD700, roughness: 0.1, metalness: 0.9 },
        darkwood: { color: 0x3C2414, roughness: 0.8, metalness: 0.0 },
        lightwood: { color: 0xDEB887, roughness: 0.7, metalness: 0.0 },
        modernsilver: { color: 0xC0C0C0, roughness: 0.2, metalness: 0.8 },
        modernblack: { color: 0x1C1C1C, roughness: 0.1, metalness: 0.3 },
        ornategold: { color: 0xB8860B, roughness: 0.2, metalness: 0.7 },
        colorfulplastic: { color: 0xFF69B4, roughness: 0.9, metalness: 0.0 },
        grandiose: { color: 0x8B7355, roughness: 0.3, metalness: 0.1 }
    }
};

export const museumInfo = {
    name: "Gallery Wall-Mounted",
    description: "Phòng trưng bày với tất cả vật thể bám sát tường hoặc sát đất, không có vật thể lơ lửng",
    totalArtifacts: artifactsData.length,
    categories: [...new Set(artifactsData.map(item => item.category))],
    artists: [...new Set(artifactsData.map(item => item.artist))],
    timeRange: {
        earliest: "1503-1519",
        latest: "2020"
    },
    layout: "Wall-Mounted & Floor-Based Layout",
    features: [
        "Tất cả tranh bám sát tường",
        "Bệ trưng bày sát đất và sát tường",
        "Không có vật thể lơ lửng",
        "Layout chắc chắn và ổn định",
        "Tối ưu cho VR và navigation"
    ]
};

// ========== HELPER FUNCTIONS ==========
export const getArtifactById = (id) => {
    return artifactsData.find(artifact => artifact.id === id);
};

export const getArtifactsByCategory = (category) => {
    return artifactsData.filter(artifact => artifact.category === category);
};

export const getArtifactsByLocation = (wall) => {
    const locations = {
        front: artifactsData.filter(a => a.position.z < -25),
        back: artifactsData.filter(a => a.position.z > 25),
        left: artifactsData.filter(a => a.position.x < -15),
        right: artifactsData.filter(a => a.position.x > 15),
        center: artifactsData.filter(a => Math.abs(a.position.x) <= 15 && Math.abs(a.position.z) <= 25)
    };
    return locations[wall] || [];
};

export const getPaintings = () => {
    return artifactsData.filter(artifact => artifact.type === "painting");
};

export const getDisplayStands = () => {
    return artifactsData.filter(artifact => 
        artifact.type === "model3d" && 
        artifact.fallbackType === "cylinder"
    );
};

export const getWallMountedItems = () => {
    return artifactsData.filter(artifact => 
        artifact.type === "painting" || 
        Math.abs(artifact.position.x) > 19 || 
        Math.abs(artifact.position.z) > 29
    );
};

export const getFloorBasedItems = () => {
    return artifactsData.filter(artifact => 
        artifact.type === "model3d" && 
        artifact.position.y <= 1.0 // Các vật thể gần sàn
    );
};

export default artifactsData;

// ...existing code...

// ...existing code...

// ========== HỆ THỐNG PHÒNG VÀ CỬA ==========
export const roomSystem = {
    // Định nghĩa các phòng
    rooms: {
        main: {
            id: 'main',
            name: 'Phòng Chính - Nghệ Thuật Cổ Điển',
            dimensions: { width: 40, height: 8, depth: 60 },
            position: { x: 0, y: 0, z: 0 },
            wallColor: 0xF8F8FF,
            floorColor: 0xF5F5F5,
            theme: 'classical'
        },
        modern: {
            id: 'modern',
            name: 'Phòng Hiện Đại - Contemporary Art',
            dimensions: { width: 35, height: 8, depth: 50 },
            position: { x: 80, y: 0, z: 0 },
            wallColor: 0xF0F0F0,
            floorColor: 0xE8E8E8,
            theme: 'modern'
        },
        sculpture: {
            id: 'sculpture',
            name: 'Phòng Điêu Khắc - Sculpture Gallery',
            dimensions: { width: 50, height: 10, depth: 40 },
            position: { x: 0, y: 0, z: 100 },
            wallColor: 0xFAF0E6,
            floorColor: 0xF5F5DC,
            theme: 'sculpture'
        },
        temporary: {
            id: 'temporary',
            name: 'Phòng Triển Lãm Tạm Thời',
            dimensions: { width: 30, height: 8, depth: 30 },
            position: { x: -60, y: 0, z: 0 },
            wallColor: 0xFFF8DC,
            floorColor: 0xFFFAF0,
            theme: 'temporary'
        }
    },

    // Định nghĩa các cửa kết nối giữa phòng
    doors: [
        // Cửa từ main đi modern (tường phải main)
        {
            id: 'main_to_modern',
            fromRoom: 'main',
            toRoom: 'modern',
            position: { x: 19.5, y: 1.0, z: 0 }, // Tường phải của main room
            size: { width: 2.5, height: 3.0, depth: 0.6 },
            rotation: { x: 0, y: 90, z: 0 },
            doorType: 'double',
            color: 0x8B4513,
            teleportTo: { x: -16, y: 1.6, z: 0 }, // Vị trí spawn trong modern room
            label: 'Nghệ Thuật Hiện Đại →'
        },
        // Cửa từ modern về main (tường trái modern)
        {
            id: 'modern_to_main',
            fromRoom: 'modern',
            toRoom: 'main',
            position: { x: 62.5, y: 1.0, z: 0 }, // Tường trái của modern room (x = 80 - 17.5)
            size: { width: 2.5, height: 3.0, depth: 0.6 },
            rotation: { x: 0, y: -90, z: 0 },
            doorType: 'double',
            color: 0x8B4513,
            teleportTo: { x: 16, y: 1.6, z: 0 }, // Vị trí spawn trong main room
            label: '← Phòng Chính'
        },
        // Cửa từ main đi sculpture (tường sau main)
        {
            id: 'main_to_sculpture',
            fromRoom: 'main',
            toRoom: 'sculpture',
            position: { x: 0, y: 1.0, z: 29.5 }, // Tường sau của main room
            size: { width: 2.5, height: 3.0, depth: 0.6 },
            rotation: { x: 0, y: 0, z: 0 },
            doorType: 'single',
            color: 0x654321,
            teleportTo: { x: 0, y: 1.6, z: 80 }, // Vị trí spawn trong sculpture room
            label: 'Phòng Điêu Khắc ↑'
        },
        // Cửa từ sculpture về main (tường trước sculpture)
        {
            id: 'sculpture_to_main',
            fromRoom: 'sculpture',
            toRoom: 'main',
            position: { x: 0, y: 1.0, z: 79.5 }, // Tường trước của sculpture room
            size: { width: 2.5, height: 3.0, depth: 0.6 },
            rotation: { x: 0, y: 180, z: 0 },
            doorType: 'single',
            color: 0x654321,
            teleportTo: { x: 0, y: 1.6, z: 26 }, // Vị trí spawn trong main room
            label: '↓ Phòng Chính'
        },
        // Cửa từ main đi temporary (tường trái main)
        {
            id: 'main_to_temporary',
            fromRoom: 'main',
            toRoom: 'temporary',
            position: { x: -19.5, y: 1.0, z: 0 }, // Tường trái của main room
            size: { width: 2.5, height: 3.0, depth: 0.6 },
            rotation: { x: 0, y: -90, z: 0 },
            doorType: 'arch',
            color: 0x8B7355,
            teleportTo: { x: -45, y: 1.6, z: 0 }, // Vị trí spawn trong temporary room
            label: '← Triển Lãm Tạm Thời'
        },
        // Cửa từ temporary về main (tường phải temporary)
        {
            id: 'temporary_to_main',
            fromRoom: 'temporary',
            toRoom: 'main',
            position: { x: -45.5, y: 1.0, z: 0 }, // Tường phải của temporary room
            size: { width: 2.5, height: 3.0, depth: 0.6 },
            rotation: { x: 0, y: 90, z: 0 },
            doorType: 'arch',
            color: 0x8B7355,
            teleportTo: { x: -16, y: 1.6, z: 0 }, // Vị trí spawn trong main room
            label: 'Phòng Chính →'
        }
    ],

    // Hàm helper để lấy doors của một phòng
    getDoorsForRoom: function(roomId) {
        return this.doors.filter(door => door.fromRoom === roomId);
    },

    // Hàm helper để lấy thông tin door
    getDoorById: function(doorId) {
        return this.doors.find(door => door.id === doorId);
    },

    // Hàm helper để lấy thông tin room
    getRoomById: function(roomId) {
        return this.rooms[roomId];
    }
};

// ...existing code...