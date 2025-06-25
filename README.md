# Bảo Tàng 3D Tương Tác trên Nền Tảng Web - 3D Museum

## 📋 Giới Thiệu Dự Án

**3D Museum** là một dự án xây dựng bảo tàng nghệ thuật ảo 3D tương tác, cho phép người dùng khám phá các không gian triển lãm và tương tác với các hiện vật nghệ thuật một cách sống động ngay trên trình duyệt web. Dự án này nhằm mục đích mang lại trải nghiệm tham quan bảo tàng trực quan, hấp dẫn và giàu thông tin, vượt qua những giới hạn về địa lý và thời gian.

## 🚀 HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY DỰ ÁN

### ⚠️ Yêu Cầu Hệ Thống
- **Node.js** phiên bản 16.0+ (khuyến nghị 18.0+)
- **npm** phiên bản 8.0+ hoặc **yarn** phiên bản 1.22+
- **Git** để clone repository
- Trình duyệt web hiện đại hỗ trợ WebGL 2.0:
  - Chrome 56+
  - Firefox 51+
  - Safari 15+
  - Edge 79+

### 📥 Bước 1: Clone Repository (Bỏ qua bước này nếu đã tải source code của project)
```bash
git clone https://github.com/votrung654/CS105.P22.git
cd CS105.P22
```

### 📦 Bước 2: Cài Đặt Dependencies
```bash
# Sử dụng npm
npm install

# Hoặc sử dụng yarn
yarn install
```

**Dependencies chính được cài đặt:**
- `three@^0.160.0` - Thư viện 3D engine
- `vite@^5.0.0` - Build tool và dev server
- `@types/three` - TypeScript definitions cho Three.js

### 🎨 Bước 3: Tải Assets (QUAN TRỌNG)

#### 3.1 Tải Hình Ảnh Bảo Tàng
Tải folder **3DArtMuseum** từ Google Drive và đặt vào thư mục gốc của project:

**Link tải:** [3DArtMuseum Assets](https://drive.google.com/drive/folders/1iztZPD85eT5wLD-Q34Ui4oDCwLzt0KTH?usp=drive_link)

**Cấu trúc thư mục sau khi tải:**
```
CS105.P22/
├── 3DArtMuseum/
│   ├── Art_01.jpg
│   ├── Art_02.jpg
│   ├── Art_03.jpg  
│   ├── .... 
│   └── Art_09.jpg
├── public/
├── src/
├── index.html
├── package-lock.json
├── package.json
├── painting-gallery.html
└── sculpture-gallery.html
```

#### 3.2 Tải Mô Hình 3D (.glb files)
Tải các file mô hình 3D và đặt vào thư mục `public/models/artifacts/`:

**Link tải:** [GLB Models](https://drive.google.com/drive/folders/1xgacdMwwdj3d26k_OkrDG3VzUGXaHpkX?usp=drive_link)

**Cấu trúc thư mục models:**
```
public/
└── models/
    └── artifacts/
        ├── seated_ganesha_carnegie_museum_of_art.glb
        ├── tomb_of_tu_duc.glb
        ├── ...
        └── stone_buddha_statue.glb
```

**Lưu ý:** 
- Đảm bảo file tải về lưu đúng tên gốc và vị trí như cấu trúc thư mục của folder project như trên.
- Có tổng 9 ảnh .jpg và 8 file .glb.
- Truy cập https://github.com/votrung654/CS105.P22 để tải các file tương ứng nếu link drive lỗi

### ▶️ Bước 4: Chạy Dự Án

```bash
# Chạy dev server
npm run dev

# Hoặc với yarn
yarn dev
```

**Kết quả:** 
- Server sẽ chạy trên `http://localhost:5173`
- Hỗ trợ Hot Module Replacement (HMR)
- DevTools tự động mở để debug


### 🎮 Bước 5: Hướng Dẫn Sử Dụng

#### Điều Khiển Cơ Bản:
- **W, A, S, D** - Di chuyển
- **Chuột** - Xoay camera
- **Click chuột trái** - Tương tác với hiện vật
- **ESC** - Thoát khỏi mode Pointer Lock
- **F** - Fullscreen (nếu hỗ trợ)

#### Tính Năng:
- **Mini-map** ở góc phải màn hình
- **Info Panel** xuất hiện khi click vào hiện vật
- **Audio Description** tự động phát khi xem chi tiết hiện vật


## 🌟 Tính Năng Cốt Lõi

### 🏛️ Không Gian Bảo Tàng
1.  **Di Chuyển Tự Do:** Người dùng có thể di chuyển trong không gian 3D của bảo tàng sử dụng bàn phím (WASD) và chuột (PointerLockControls).
2.  **Mini-map:** Hiển thị bản đồ thu nhỏ của bảo tàng, vị trí người dùng và các hiện vật chính (sử dụng Canvas 2D API).
3.  **Ánh Sáng và Bóng Đổ Chân Thực:**
    *   Sử dụng kết hợp các loại đèn: AmbientLight, DirectionalLight, PointLight, SpotLight để tạo không khí và làm nổi bật hiện vật.
    *   Kỹ thuật Shadow Mapping để tạo bóng đổ.
4.  **Nhiều Phòng Trưng Bày (Mở rộng):** Khả năng thiết kế và chuyển đổi giữa các phòng trưng bày với chủ đề khác nhau.

### 🖼️ Tương Tác Hiện Vật
1.  **Xem Chi Tiết Hiện Vật:**
    *   Cho phép người dùng xoay (OrbitControls) và phóng to/thu nhỏ hiện vật 3D (hoặc tranh ảnh).
    *   Hiển thị thông tin chi tiết về hiện vật (văn bản, mô tả) khi người dùng click hoặc tương tác.
2.  **Mô Tả Bằng Âm Thanh:** Tích hợp SpeechSynthesis API để đọc thông tin mô tả hiện vật.
3.  **Hiện Vật Động (Mở rộng):** Khả năng điều khiển hoạt ảnh cho các hiện vật có thể chuyển động (sử dụng `AnimationMixer`).

### 🎨 Giao Diện và Trải Nghiệm Người Dùng (UI/UX)
1.  **Hướng Dẫn Sử Dụng:** Thông báo hướng dẫn điều khiển khi bắt đầu.
2.  **Bảng Thông Tin Hiện Vật:** Hiển thị khi người dùng tương tác với hiện vật.
3.  **Giao Diện Trực Quan:** Thiết kế đơn giản, tập trung vào trải nghiệm khám phá.

## 🛠️ Công Nghệ Sử Dụng

### 🚀 Frontend & 3D Engine
*   **HTML5, CSS3, JavaScript (ES6+):** Nền tảng web cơ bản.
*   **Three.js (r160+):** Thư viện JavaScript 3D mã nguồn mở, mạnh mẽ để tạo và hiển thị đồ họa 3D động trong trình duyệt web. Three.js hoạt động dựa trên WebGL.
*   **WebGL (Web Graphics Library):** API JavaScript để render đồ họa 2D và 3D tương tác trong bất kỳ trình duyệt web tương thích nào mà không cần plugin.
*   **Vite (hoặc Create React App nếu dùng React):** Công cụ build và phát triển hiện đại. (Khuyến nghị Vite cho tốc độ).

### 📦 Model & Asset Loaders
*   **`GLTFLoader` (Three.js):** Để tải các mô hình 3D định dạng glTF (GL Transmission Format) và GLB (phiên bản nhị phân của glTF). Đây là định dạng được khuyến nghị cho web.
*   **`DRACOLoader` (Three.js):** Giải nén các mô hình được nén bằng Draco, giúp giảm kích thước file và thời gian tải.
*   **`TextureLoader` (Three.js):** Tải các file hình ảnh (JPEG, PNG) làm textures.
*   **`AudioLoader` (Three.js):** Tải file âm thanh (MP3, WAV) cho âm thanh không gian hoặc mô tả.

### 🎥 Điều Khiển Camera
*   **`PointerLockControls` (Three.js):** Cho phép điều khiển camera kiểu FPS (First-Person Shooter), khóa con trỏ chuột và di chuyển camera dựa trên chuyển động chuột.
*   **`OrbitControls` (Three.js):** Cho phép xoay camera quanh một đối tượng mục tiêu, phóng to/thu nhỏ.

### ✨ Ánh Sáng & Vật Liệu
*   **Lights:** `AmbientLight`, `DirectionalLight`, `PointLight`, `SpotLight`.
*   **Materials:** `MeshStandardMaterial` (PBR), `MeshBasicMaterial`, `MeshLambertMaterial`, `MeshPhongMaterial` để định nghĩa bề mặt của đối tượng và cách chúng phản ứng với ánh sáng.
*   **Shadows:** Cấu hình `castShadow` và `receiveShadow` trên các đối tượng và đèn.

### 🎬 Hoạt Ảnh
*   **`AnimationMixer` (Three.js):** Điều khiển và phát các hoạt ảnh được nhúng trong mô hình 3D (thường là từ file GLTF/GLB).

### ⚙️ APIs Trình Duyệt Hỗ Trợ
*   **Canvas 2D API:** Vẽ mini-map, hiển thị thông tin 2D overlay.
*   **Web Audio API:** Phát và điều khiển âm thanh (có thể dùng `PositionalAudio` của Three.js).
*   **SpeechSynthesis API:** Chuyển văn bản thành giọng nói cho mô tả hiện vật.
*   **Fullscreen API:** Cho phép trải nghiệm toàn màn hình.
*   **Pointer Lock API:** Cần thiết cho `PointerLockControls`.

## 🧱 Mô Hình 3D và Assets

*   **Định dạng mô hình:** Ưu tiên GLTF (.gltf, .glb) vì tối ưu cho web.
*   **Tạo mô hình:** Sử dụng Blender, Maya, 3ds Max hoặc các công cụ tạo mô hình 3D khác.
*   **Tối ưu hóa mô hình:**
    *   Giảm số lượng polygon (Low-poly).
    *   Sử dụng texture atlases.
    *   Nén Draco.
    *   Baking textures (ví dụ: lightmaps).
*   **Nguồn assets:**
    *   Tự tạo.
    *   Các kho tài nguyên 3D miễn phí hoặc trả phí (ví dụ: Sketchfab, TurboSquid, CGTrader) với giấy phép phù hợp.

## 📐 Thuật Toán và Khái Niệm Đồ Họa Cốt Lõi

1.  **Rendering Pipeline (Quy trình hiển thị đồ họa):**
    *   **Modeling Transformations:** Đặt các đối tượng vào không gian cục bộ của chúng.
    *   **World Transformations:** Chuyển đối tượng từ không gian cục bộ sang không gian thế giới.
    *   **View Transformation:** Chuyển đổi từ không gian thế giới sang không gian camera (hệ tọa độ quan sát).
    *   **Projection Transformation:** Chiếu cảnh 3D lên một mặt phẳng 2D (Perspective hoặc Orthographic).
        *   Sử dụng `PerspectiveCamera` của Three.js.
    *   **Clipping:** Loại bỏ các phần của cảnh nằm ngoài khối lượng xem (view frustum).
    *   **Rasterization:** Chuyển đổi hình học 2D thành các pixel trên màn hình.
2.  **Lighting Models:**
    *   **Ambient:** Ánh sáng môi trường đồng đều.
    *   **Diffuse (Lambertian):** Phản xạ khuếch tán, độ sáng phụ thuộc vào góc giữa pháp tuyến bề mặt và hướng sáng.
    *   **Specular (Phong/Blinn-Phong):** Phản xạ gương, tạo điểm sáng bóng.
3.  **Shading Techniques:**
    *   **Flat Shading:** Mỗi mặt đa giác có một màu đồng nhất.
    *   **Gouraud Shading:** Nội suy màu sắc qua các đỉnh của đa giác.
    *   **Phong Shading:** Nội suy vector pháp tuyến qua các mặt đa giác, tính toán màu sắc cho từng pixel (cho kết quả mượt mà hơn).
4.  **Texturing:**
    *   Áp dụng hình ảnh 2D (textures) lên bề mặt của mô hình 3D (UV mapping).
5.  **Collision Detection (Phát hiện va chạm):**
    *   Sử dụng **Raycasting** từ vị trí người chơi theo hướng di chuyển để phát hiện va chạm với tường hoặc các vật thể trong bảo tàng, ngăn người chơi đi xuyên qua.
    *   Có thể sử dụng bounding boxes (AABB - Axis-Aligned Bounding Box) hoặc bounding spheres đơn giản cho các đối tượng để tối ưu hóa.
6.  **Interaction Detection:**
    *   Sử dụng **Raycasting** từ camera theo hướng con trỏ chuột để xác định đối tượng nào đang được trỏ tới hoặc click vào.
7.  **Camera Transformations:**
    *   Thay đổi ma trận `view` của camera để di chuyển và xoay góc nhìn trong không gian 3D.
    *   `camera.position.set(x, y, z)`
    *   `camera.lookAt(targetVector3)`

## ⚡ Tối Ưu Hóa Hiệu Suất

*   **Level of Detail (LOD):** Hiển thị các phiên bản mô hình có độ chi tiết khác nhau tùy thuộc vào khoảng cách từ camera. Xa thì dùng low-poly, gần thì dùng high-poly. (`THREE.LOD`)
*   **Frustum Culling:** Three.js tự động thực hiện, chỉ render các đối tượng nằm trong tầm nhìn của camera (view frustum).
*   **Occlusion Culling:** Không render các đối tượng bị che khuất hoàn toàn bởi các đối tượng khác. Kỹ thuật này phức tạp hơn và có thể cần các thư viện hoặc thuật toán tùy chỉnh. (Raycasting có thể là một phần của giải pháp đơn giản).
*   **Instanced Rendering (`THREE.InstancedMesh`):** Render nhiều bản sao của cùng một đối tượng với hiệu suất cao (ví dụ: nhiều cột giống nhau, nhiều ghế giống nhau).
*   **Geometry Merging:** Gộp nhiều geometries nhỏ thành một geometry lớn để giảm số lượng draw call.
*   **Texture Compression:** Sử dụng các định dạng nén texture được hỗ trợ bởi WebGL (ví dụ: Basis Universal, ASTC, S3TC, ETC).
*   **Lightmap Baking:** Tính toán trước hiệu ứng ánh sáng phức tạp và "bake" chúng vào textures, giảm tải tính toán ánh sáng động.
*   **Debounce/Throttle Event Handlers:** Cho các sự kiện như di chuyển chuột, thay đổi kích thước cửa sổ để tránh thực thi quá nhiều lần.
*   **Sử dụng `requestAnimationFrame`:** Three.js tự động dùng cho render loop, đảm bảo hoạt ảnh mượt mà và tiết kiệm pin.

## 🚀 Hướng Phát Triển Mở Rộng (Dự kiến)

1.  **Quản lý nội dung cho Admin:**
    *   Giao diện cho phép admin thêm, sửa, xóa hiện vật và thông tin liên quan mà không cần can thiệp code.
    *   Lưu trữ dữ liệu hiện vật trong cơ sở dữ liệu (ví dụ: Firebase, Supabase, hoặc backend tùy chỉnh).
2.  **Trải nghiệm Đa người dùng (Multi-user):**
    *   Cho phép nhiều người dùng cùng tham quan bảo tàng một lúc.
    *   Hiển thị avatar của những người dùng khác.
    *   Tích hợp chat text hoặc voice chat (sử dụng WebSockets, WebRTC).
3.  **Avatar Người Dùng và AI Tour Guide:**
    *   Cho phép người dùng tùy chỉnh avatar.
    *   Phát triển một AI tour guide có thể dẫn đường và thuyết minh về các hiện vật.
4.  **Mở rộng Không Gian Bảo Tàng:**
    *   Thiết kế nhiều phòng trưng bày với các chủ đề khác nhau (ví dụ: nghệ thuật cổ điển, nghệ thuật hiện đại, khoa học, lịch sử tự nhiên).
    *   Tạo hệ thống chuyển đổi hoặc tải động giữa các phòng.
5.  **Tích hợp VR/AR:**
    *   Sử dụng WebXR API để hỗ trợ trải nghiệm thực tế ảo (VR) và thực tế tăng cường (AR).
6.  **Gamification:**
    *   Thêm các yếu tố trò chơi như tìm kiếm ẩn vật, giải đố liên quan đến hiện vật.
7.  **Cải thiện Tương tác Vật lý:**
    *   Sử dụng thư viện vật lý (ví dụ: Rapier, Cannon.js, Ammo.js được tích hợp với Three.js) để cho phép tương tác vật lý thực tế hơn với một số hiện vật.

---

**Nhóm 10 - CS105.P22**
- Võ Đình Trung - 22521571
- Huỳnh Minh Quang - 21522519  
- Trương Nguyên Hạo - 21522051
- Trần Trọng Nhân - 21522924

**Giảng viên hướng dẫn:** ThS. Cáp Phạm Đình Thăng