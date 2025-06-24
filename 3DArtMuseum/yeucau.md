Vấn đề đặt ra cho AI: Nhiệm vụ tạo file readme: Bảo tàng 3D trên nền tảng Web - Slide kế hoạch đồ án.pdf là slide của tôi về môn đồ họa máy tính, cũng là mục tiêu, yêu cầu mà tôi cần hoàn thành chính xác, đầy đủ cho môn này. Còn những video và tài liệu còn lại là chương trình mà tôi đã học. Biết rằng tôi đã tìm được 3 repo về chủ đề này mà tôi cảm thấy khá ổn. Hãy tạo cho tôi 1 nội dung file readme đầy đủ nhất để bao gồm hết tất cả yêu cầu, mục đích, chức năng, công nghệ mà tôi muốn trong slide và có thể nhiều hơn cả thế (công nghệ, kĩ thuật, thuật toán liên quan trong chương trình học), để từ đó các công cụ AI hoặc lập trình viên đều có thể đọc file README này mà hỗ trợ tôi tạo code cho project hoàn thiện và đầy đủ nhất về chủ đề Bảo tàng 3D trên nền tảng Web (tất nhiên trọng tâm nhất vẫn là trong slide của tôi). Đồng thời từ đó, tạo code đầy đủ cho đồ án của tôi, ghi rõ code nào cho file nào, cấu trúc thư mục, hướng dẫn tôi cài đặt, chạy code, dùng code, tải và lưu mô hình,...Nói chung là từ A-Z.
Dưới đây là nội dung README:
# Bảo Tàng 3D Tương Tác trên Nền Tảng Web - Museum Imaginarium

## 📋 Giới Thiệu Dự Án

**Museum Imaginarium** là một dự án xây dựng bảo tàng nghệ thuật ảo 3D tương tác, cho phép người dùng khám phá các không gian triển lãm và tương tác với các hiện vật nghệ thuật một cách sống động ngay trên trình duyệt web. Dự án này nhằm mục đích mang lại trải nghiệm tham quan bảo tàng trực quan, hấp dẫn và giàu thông tin, vượt qua những giới hạn về địa lý và thời gian.

### 🎯 Mục Tiêu Chính

1.  **Xây dựng không gian bảo tàng ảo 3D tương tác:** Hiện thực hóa một hoặc nhiều không gian phòng trưng bày 3D chi tiết, dễ dàng điều hướng.
2.  **Hiển thị hiện vật động:** Cho phép tải và trưng bày các mô hình 3D của hiện vật (hoặc hình ảnh 2D trên khung tranh) với khả năng tương tác.
3.  **Trải nghiệm người dùng nhập vai:** Cung cấp điều khiển camera góc nhìn thứ nhất (FPS-style) và/hoặc Orbit controls để khám phá không gian và xem chi tiết hiện vật.
4.  **Tối ưu hóa hiệu suất:** Đảm bảo trải nghiệm mượt mà trên các trình duyệt web hiện đại bằng cách áp dụng các kỹ thuật tối ưu hóa đồ họa.
5.  **Giao diện người dùng trực quan:** Thiết kế UI/UX thân thiện, dễ sử dụng, bao gồm các tính năng hỗ trợ như mini-map, thông tin hiện vật (text/audio).

### 🧍 Đối Tượng Hướng Đến

*   Học sinh, sinh viên muốn tìm hiểu về nghệ thuật và lịch sử.
*   Khách tham quan bảo tàng từ xa, không có điều kiện đến trực tiếp.
*   Nhà nghiên cứu, giáo viên cần công cụ trực quan để giảng dạy.
*   Người yêu thích nghệ thuật, lịch sử và công nghệ 3D.

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
*   **Cấu trúc thư mục assets (đề xuất):**
    ```
    /public
        /models
            /room/gallery_room.glb
            /artifacts
                /statue_david.glb
                /painting_mona_lisa_frame.glb
        /textures
            /room/wall_texture.jpg
            /room/floor_texture.jpg
            /artifacts/david_marble.jpg
        /audio
            /descriptions/david_description.mp3
            /ambient/museum_ambience.mp3
    ```

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

## 📁 Cấu Trúc Thư Mục Dự Án (Đề xuất)
Use code with caution.
Markdown
/museum-3d-web/
|-- /public/ # Chứa các assets tĩnh được phục vụ trực tiếp
| |-- /models/ # Chứa các file mô hình 3D (GLB, GLTF)
| | |-- room_gallery.glb
| | -- artifact_statue.glb | |-- /textures/ # Chứa các file texture (JPG, PNG) | | |-- wall_marble.jpg | |-- floor_wood.jpg
| |-- /audio/ # Chứa các file âm thanh
| | |-- ambient_sound.mp3
| | -- artifact_description.mp3 |-- favicon.ico
|-- /src/ # Mã nguồn chính của ứng dụng
| |-- /components/ # Các thành phần tái sử dụng (React components nếu dùng React)
| | |-- /Scene/
| | | |-- SceneManager.js # Quản lý scene, camera, renderer
| | | |-- Lights.js # Thiết lập ánh sáng
| | | -- Room.js # Tạo hình học phòng | | |-- /Player/ | | |-- PlayerControls.js # Logic điều khiển người chơi
| | |-- /Artifacts/
| | | -- Artifact.js # Component hiển thị và tương tác hiện vật | |-- /UI/
| | |-- MiniMap.js # Logic mini-map
| | |-- InfoPanel.js # Bảng thông tin hiện vật
| | -- LoadingScreen.js # Màn hình tải | |-- /utils/ # Các hàm tiện ích | | |-- assetLoaders.js # Hàm tải GLTF, Texture, Audio | |-- mathHelpers.js # Hàm tính toán, ví dụ: radians to degrees
| |-- /data/ # Dữ liệu tĩnh (ví dụ: metadata hiện vật)
| | -- artifactsData.js | |-- /styles/ # Files CSS/SCSS | |-- main.css
| |-- main.js # Điểm vào chính của ứng dụng JavaScript
| -- App.js # Component gốc (nếu dùng React) |-- index.html # File HTML chính |-- vite.config.js # Cấu hình Vite (nếu dùng Vite) |-- package.json-- README.md
## 🚀 Cài Đặt và Chạy Dự Án

### Yêu Cầu Cần Thiết
*   Node.js và npm (hoặc yarn) đã được cài đặt.
*   Một trình duyệt web hiện đại hỗ trợ WebGL (Chrome, Firefox, Edge, Safari).

### Các Bước Cài Đặt
1.  **Clone repository (Sau khi bạn tạo nó):**
    ```bash
    git clone <your-repository-url>
    cd museum-3d-web
    ```
2.  **Cài đặt dependencies:**
    ```bash
    npm install
    # hoặc
    yarn install
    ```
    Các dependencies chính cần có trong `package.json`:
    *   `three`: Thư viện Three.js.
    *   `vite`: (Nếu dùng Vite) Công cụ build.
    *   (Các thư viện React nếu bạn quyết định dùng React: `react`, `react-dom`, `@react-three/fiber`, `@react-three/drei`)

### Chạy Dự Án (Development Mode)
*   **Nếu dùng Vite:**
    ```bash
    npm run dev
    # hoặc
    yarn dev
    ```
    Mở trình duyệt và truy cập vào địa chỉ được Vite cung cấp (thường là `http://localhost:5173`).

*   **Nếu không dùng framework/build tool (chỉ HTML, JS thuần):**
    Bạn cần một HTTP server đơn giản để phục vụ các file do các hạn chế về CORS khi tải models/textures từ `file:///` protocol.
    1.  Cài đặt `http-server` global (nếu chưa có):
        ```bash
        npm install -g http-server
        ```
    2.  Chạy server từ thư mục gốc của dự án:
        ```bash
        http-server .
        ```
        Mở trình duyệt và truy cập `http://localhost:8080` (hoặc port mà `http-server` hiển thị).
    3.  Hoặc dùng Python (nếu có Python cài sẵn):
        ```bash
        # Python 3
        python -m http.server
        # Python 2
        python -m SimpleHTTPServer
        ```
        Mở trình duyệt và truy cập `http://localhost:8000`.

### Build Dự Án (Production Mode - nếu dùng Vite)
```bash
npm run build
# hoặc
yarn build
Use code with caution.
Các file build sẽ nằm trong thư mục /dist, sẵn sàng để deploy lên một static web host.
💡 Sử Dụng và Tùy Chỉnh
Thêm Hiện Vật Mới:
Đặt file model .glb hoặc .gltf vào thư mục /public/models/artifacts/.
Nếu có texture, đặt vào /public/textures/artifacts/.
Nếu có audio mô tả, đặt vào /public/audio/descriptions/.
Cập nhật file dữ liệu (ví dụ /src/data/artifactsData.js) với thông tin về hiện vật mới: tên, mô tả, đường dẫn file model/texture/audio, vị trí đặt trong bảo tàng.
Hàm tải và hiển thị hiện vật trong Artifact.js sẽ đọc dữ liệu này.
Thay Đổi Không Gian Bảo Tàng:
Chỉnh sửa file model của phòng trưng bày (ví dụ: /public/models/room/gallery_room.glb) bằng Blender hoặc công cụ tương tự.
Điều chỉnh textures của phòng trong /public/textures/room/.
Cập nhật logic đặt hiện vật nếu layout phòng thay đổi đáng kể.
Điều Chỉnh Ánh Sáng:
Các thông số ánh sáng (vị trí, cường độ, màu sắc) được định nghĩa trong /src/components/Scene/Lights.js.
Tùy Chỉnh Điều Khiển:
Các tùy chọn cho PointerLockControls và OrbitControls (ví dụ: tốc độ di chuyển, độ nhạy chuột) có thể được cấu hình trong /src/components/Player/PlayerControls.js hoặc nơi khởi tạo controls.
🤝 Đóng Góp
Nếu bạn muốn đóng góp vào dự án này (sau khi bạn tạo repo công khai):
Fork repository.
Tạo một nhánh mới cho tính năng của bạn (git checkout -b feature/AmazingFeature).
Commit các thay đổi của bạn (git commit -m 'Add some AmazingFeature').
Push lên nhánh đó (git push origin feature/AmazingFeature).
Mở một Pull Request.
📄 Giấy Phép
Dự án này được cấp phép dưới Giấy phép MIT. Xem file LICENSE để biết chi tiết (Bạn nên tạo file này).
## 💻 Cấu Trúc Code và Code Khởi Đầu (JavaScript thuần + Three.js)

Đây là một cấu trúc rất cơ bản để bạn bắt đầu. Nếu bạn dùng React + R3F, cấu trúc sẽ khác.

**1. `index.html`:**
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bảo Tàng 3D Web</title>
    <link rel="stylesheet" href="src/styles/main.css">
</head>
<body>
    <div id="loading-screen">
        <h1>Đang tải Bảo Tàng...</h1>
        <p>Vui lòng chờ trong giây lát.</p>
    </div>
    <canvas id="museum-canvas"></canvas>
    <div id="info-panel" style="display:none;">
        <h2 id="artifact-title"></h2>
        <p id="artifact-description"></p>
        <button id="close-info-panel">Đóng</button>
        <button id="play-audio-description">Nghe mô tả</button>
    </div>
    <div id="mini-map-container">
        <canvas id="mini-map-canvas"></canvas>
    </div>
    <div id="controls-hint">
        <p>Di chuyển: WASD | Nhìn: Chuột | Tương tác: Click</p>
    </div>
    <!-- Import Three.js -->
    <script type="importmap">
        {
            "imports": {
                "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
                "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
            }
        }
    </script>
    <script type="module" src="src/main.js"></script>
</body>
</html>
Use code with caution.
2. src/styles/main.css:
body, html {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #000;
    color: white;
    font-family: Arial, sans-serif;
}

#museum-canvas {
    display: block; /* Sẽ được quản lý bởi JS */
}

#loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

#info-panel {
    position: fixed;
    bottom: 20px;
    left: 20px;
    background-color: rgba(50, 50, 50, 0.9);
    padding: 15px;
    border-radius: 8px;
    max-width: 300px;
    z-index: 10;
}
#info-panel h2 { margin-top: 0;}

#mini-map-container {
    position: fixed;
    top: 20px;
    right: 20px;
    border: 1px solid #555;
    z-index: 10;
}
#mini-map-canvas {
    width: 150px;
    height: 150px;
}

#controls-hint {
    position: fixed;
    bottom: 10px;
    width: 100%;
    text-align: center;
    font-size: 0.8em;
    color: #ccc;
    z-index: 5;
}
Use code with caution.
Css
3. src/main.js (Điểm vào chính):
import * as THREE from 'three';
import SceneManager from './components/Scene/SceneManager.js';
import PlayerControls from './components/Player/PlayerControls.js';
import { loadArtifacts } from './utils/assetLoaders.js';
import artifactsData from './data/artifactsData.js'; // Bạn sẽ tạo file này

const loadingScreen = document.getElementById('loading-screen');
const canvas = document.getElementById('museum-canvas');
const infoPanel = document.getElementById('info-panel');
const artifactTitle = document.getElementById('artifact-title');
const artifactDescription = document.getElementById('artifact-description');
const closeInfoButton = document.getElementById('close-info-panel');
const playAudioButton = document.getElementById('play-audio-description');

let sceneManager, playerControls;
let currentArtifactAudio = null;
const speechSynth = window.speechSynthesis;

async function init() {
    sceneManager = new SceneManager(canvas);
    playerControls = new PlayerControls(sceneManager.camera, sceneManager.renderer.domElement, sceneManager.scene);
    
    // Tải và thêm hiện vật
    const loadedArtifacts = await loadArtifacts(artifactsData, sceneManager.scene);
    playerControls.setCollidableObjects(sceneManager.getCollidableObjects()); // Cập nhật các đối tượng có thể va chạm

    // Ẩn màn hình tải
    loadingScreen.style.display = 'none';
    canvas.style.display = 'block';

    // Xử lý tương tác
    setupInteraction(loadedArtifacts);
    
    animate();
}

function setupInteraction(artifacts) {
    window.addEventListener('click', (event) => {
        if (!playerControls.isLocked()) return; // Chỉ tương tác khi PointerLock active

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        // Lấy tọa độ chuột chuẩn hóa (-1 đến +1)
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Raycast từ camera
        raycaster.setFromCamera(mouse, sceneManager.camera);
        
        const intersects = raycaster.intersectObjects(artifacts.map(a => a.mesh), false);

        if (intersects.length > 0) {
            const intersectedObject = intersects[0].object;
            const artifactData = artifacts.find(a => a.mesh === intersectedObject || (intersectedObject.parent && a.mesh === intersectedObject.parent));
            
            if (artifactData && artifactData.data) {
                showInfoPanel(artifactData.data);
                playerControls.pauseMovement(true); // Dừng di chuyển khi xem thông tin
            }
        }
    });

    closeInfoButton.addEventListener('click', () => {
        hideInfoPanel();
        playerControls.pauseMovement(false); // Cho phép di chuyển lại
    });

    playAudioButton.addEventListener('click', () => {
        const description = artifactDescription.textContent;
        if (description && speechSynth) {
            if (currentArtifactAudio && speechSynth.speaking) {
                speechSynth.cancel(); // Dừng audio đang phát nếu có
            }
            const utterance = new SpeechSynthesisUtterance(description);
            utterance.lang = 'vi-VN'; // Đặt ngôn ngữ
            speechSynth.speak(utterance);
            currentArtifactAudio = utterance;
        }
    });
}

function showInfoPanel(data) {
    artifactTitle.textContent = data.name;
    artifactDescription.textContent = data.description;
    infoPanel.style.display = 'block';
    // Tạm thời vô hiệu hóa PointerLock để người dùng có thể click nút
    document.exitPointerLock(); 
}

function hideInfoPanel() {
    infoPanel.style.display = 'none';
    if (currentArtifactAudio && speechSynth.speaking) {
        speechSynth.cancel();
    }
    // Yêu cầu lại PointerLock
    sceneManager.renderer.domElement.requestPointerLock();
}


function animate() {
    requestAnimationFrame(animate);
    const delta = sceneManager.clock.getDelta();
    playerControls.update(delta);
    sceneManager.render();
}

init().catch(error => console.error("Initialization failed:", error));
Use code with caution.
JavaScript
4. src/components/Scene/SceneManager.js:
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
        this.renderer = this.buildRenderer(this.screenDimensions);
        this.camera = this.buildCamera(this.screenDimensions);
        this.room = new Room(this.scene, 20, 5, 30); // width, height, depth
        this.lights = new Lights(this.scene);
        this.clock = new THREE.Clock();
        
        this.setupResizeListener();
    }

    buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#2a2a2a");
        // scene.fog = new THREE.Fog(0x2a2a2a, 10, 50); // Tùy chọn: thêm sương mù
        return scene;
    }

    buildRenderer({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Hoặc THREE.VSMShadowMap
        return renderer;
    }

    buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 60;
 древ 0.1;
        const farPlane = 1000;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.set(0, 1.6, 13); // Vị trí ban đầu của người chơi (chiều cao 1.6m, lùi về sau)
        return camera;
    }

    setupResizeListener() {
        window.addEventListener('resize', () => {
            this.screenDimensions.width = window.innerWidth;
            this.screenDimensions.height = window.innerHeight;
            this.camera.aspect = this.screenDimensions.width / this.screenDimensions.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.screenDimensions.width, this.screenDimensions.height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
    }
    
    getCollidableObjects() {
        // Trả về các object mà người chơi có thể va chạm (tường, sàn, hiện vật lớn)
        return [this.room.floor, ...this.room.walls, /*...meshes của các hiện vật lớn*/];
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
Use code with caution.
JavaScript
5. src/components/Scene/Room.js:
import * as THREE from 'three';
import { TextureLoader } from 'three';

export default class Room {
    constructor(scene, width, height, depth) {
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.walls = [];

        this.textureLoader = new TextureLoader();
        this.createRoom();
    }

    createRoom() {
        // Sàn
        const floorGeometry = new THREE.PlaneGeometry(this.width, this.depth);
        const floorTexture = this.textureLoader.load('textures/room/floor_wood.jpg'); // Thay bằng path đúng
        floorTexture.wrapS = THREE.RepeatWrapping;
        floorTexture.wrapT = THREE.RepeatWrapping;
        floorTexture.repeat.set(this.width/2, this.depth/2); // Lặp texture
        const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture, side: THREE.DoubleSide });
        this.floor = new THREE.Mesh(floorGeometry, floorMaterial);
        this.floor.rotation.x = -Math.PI / 2; // Xoay sàn nằm ngang
        this.floor.receiveShadow = true;
        this.floor.name = "floor";
        this.scene.add(this.floor);

        // Trần
        const ceilingGeometry = new THREE.PlaneGeometry(this.width, this.depth);
        const ceilingMaterial = new THREE.MeshStandardMaterial({ color: 0xdddddd, side: THREE.DoubleSide });
        const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
        ceiling.position.y = this.height;
        ceiling.rotation.x = Math.PI / 2;
        ceiling.name = "ceiling";
        this.scene.add(ceiling);

        // Tường
        const wallMaterial = new THREE.MeshStandardMaterial({ 
            map: this.textureLoader.load('textures/room/wall_marble.jpg'), // Thay bằng path đúng
            side: THREE.DoubleSide 
        });
        wallMaterial.map.wrapS = THREE.RepeatWrapping;
        wallMaterial.map.wrapT = THREE.RepeatWrapping;
        wallMaterial.map.repeat.set(this.width/4, this.height/4);


        // Tường trước (phía +Z)
        const frontWall = this.createWall(this.width, this.height, wallMaterial);
        frontWall.position.set(0, this.height / 2, -this.depth / 2);
        frontWall.name = "frontWall";
        this.scene.add(frontWall);
        this.walls.push(frontWall);

        // Tường sau (phía -Z)
        const backWall = this.createWall(this.width, this.height, wallMaterial);
        backWall.position.set(0, this.height / 2, this.depth / 2);
        backWall.rotation.y = Math.PI;
        backWall.name = "backWall";
        this.scene.add(backWall);
        this.walls.push(backWall);

        // Tường trái (phía -X)
        const leftWall = this.createWall(this.depth, this.height, wallMaterial);
        leftWall.position.set(-this.width / 2, this.height / 2, 0);
        leftWall.rotation.y = Math.PI / 2;
        leftWall.name = "leftWall";
        this.scene.add(leftWall);
        this.walls.push(leftWall);

        // Tường phải (phía +X)
        const rightWall = this.createWall(this.depth, this.height, wallMaterial);
        rightWall.position.set(this.width / 2, this.height / 2, 0);
        rightWall.rotation.y = -Math.PI / 2;
        rightWall.name = "rightWall";
        this.scene.add(rightWall);
        this.walls.push(rightWall);
    }

    createWall(width, height, material) {
        const geometry = new THREE.PlaneGeometry(width, height);
        const wall = new THREE.Mesh(geometry, material.clone()); // Clone material để có thể set repeat khác nhau nếu cần
        wall.receiveShadow = true;
        wall.castShadow = true; // Tường cũng có thể đổ bóng nếu có vật thể khác chiếu sáng vào
        return wall;
    }
}
Use code with caution.
JavaScript
6. src/components/Scene/Lights.js:
import * as THREE from 'three';

export default class Lights {
    constructor(scene) {
        this.scene = scene;
        this.addLights();
    }

    addLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Màu trắng, cường độ 0.5
        this.scene.add(ambientLight);

        // Directional light (giống mặt trời)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 7.5);
        directionalLight.castShadow = true;
        // Cấu hình shadow map cho directional light
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -15;
        directionalLight.shadow.camera.right = 15;
        directionalLight.shadow.camera.top = 15;
        directionalLight.shadow.camera.bottom = -15;
        this.scene.add(directionalLight);
        // const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
        // this.scene.add( helper );


        // Có thể thêm PointLights hoặc SpotLights để làm nổi bật các hiện vật
        // const spotLight = new THREE.SpotLight(0xffffff, 0.7, 10, Math.PI / 8, 0.5, 2);
        // spotLight.position.set(0, 4, 0);
        // spotLight.target.position.set(0, 0, 0); // Hướng spotlight vào gốc tọa độ
        // spotLight.castShadow = true;
        // this.scene.add(spotLight);
        // this.scene.add(spotLight.target);
        // const spotLightHelper = new THREE.SpotLightHelper( spotLight );
        // this.scene.add( spotLightHelper );
    }
}
Use code with caution.
JavaScript
7. src/components/Player/PlayerControls.js:
import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

export default class PlayerControls {
    constructor(camera, domElement, scene) {
        this.camera = camera;
        this.domElement = domElement;
        this.scene = scene; // Cần scene để lấy các đối tượng có thể va chạm
        
        this.controls = new PointerLockControls(this.camera, this.domElement);
        
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.canJump = false; // Sẽ không dùng jump trong bảo tàng
        this.isPaused = false;

        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.speed = 5.0; // Tốc độ di chuyển

        this.collidableObjects = []; // Danh sách các đối tượng để kiểm tra va chạm

        this.setupEventListeners();
    }

    setCollidableObjects(objects) {
        this.collidableObjects = objects;
    }
    
    pauseMovement(pause) {
        this.isPaused = pause;
        if (pause) {
            this.velocity.set(0,0,0); // Dừng ngay lập tức
            this.moveForward = this.moveBackward = this.moveLeft = this.moveRight = false;
        }
    }


    setupEventListeners() {
        this.domElement.addEventListener('click', () => {
            if (!this.isPaused) this.controls.lock();
        });

        this.controls.addEventListener('lock', () => console.log('Pointer locked'));
        this.controls.addEventListener('unlock', () => {
            console.log('Pointer unlocked');
            // Khi unlock, reset trạng thái di chuyển để không bị kẹt phím
            this.moveForward = this.moveBackward = this.moveLeft = this.moveRight = false;
        });

        document.addEventListener('keydown', (event) => this.onKeyDown(event));
        document.addEventListener('keyup', (event) => this.onKeyUp(event));
    }

    onKeyDown(event) {
        if (this.isPaused) return;
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                this.moveForward = true;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                this.moveLeft = true;
                break;
            case 'ArrowDown':
            case 'KeyS':
                this.moveBackward = true;
                break;
            case 'ArrowRight':
            case 'KeyD':
                this.moveRight = true;
                break;
        }
    }

    onKeyUp(event) {
        if (this.isPaused) return;
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                this.moveForward = false;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                this.moveLeft = false;
                break;
            case 'ArrowDown':
            case 'KeyS':
                this.moveBackward = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                this.moveRight = false;
                break;
        }
    }
    
    checkCollision(moveDirection) {
        const playerPosition = this.camera.position.clone();
        const raycaster = new THREE.Raycaster(playerPosition, moveDirection.clone().normalize());
        const intersects = raycaster.intersectObjects(this.collidableObjects, true); // true for recursive

        if (intersects.length > 0 && intersects[0].distance < 0.5) { // 0.5 là khoảng cách an toàn
            return true; // Có va chạm
        }
        return false; // Không va chạm
    }


    update(delta) {
        if (!this.controls.isLocked || this.isPaused) {
            return;
        }

        this.velocity.x -= this.velocity.x * 10.0 * delta; // Ma sát theo X
        this.velocity.z -= this.velocity.z * 10.0 * delta; // Ma sát theo Z
        // Không có trọng lực trong bảo tàng, giữ y cố định
        // this.velocity.y -= 9.8 * 100.0 * delta; // Trọng lực (nếu cần)

        this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
        this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
        this.direction.normalize(); // Đảm bảo tốc độ ổn định khi di chuyển chéo

        const intendedMove = new THREE.Vector3();
        if (this.moveForward || this.moveBackward) {
            intendedMove.z = this.direction.z * this.speed * delta;
        }
        if (this.moveLeft || this.moveRight) {
            intendedMove.x = this.direction.x * this.speed * delta;
        }
        
        // Kiểm tra va chạm trước khi di chuyển
        const worldDirection = new THREE.Vector3();
        this.camera.getWorldDirection(worldDirection);
        worldDirection.y = 0; // Chỉ di chuyển trên mặt phẳng XZ
        worldDirection.normalize();

        const rightDirection = new THREE.Vector3().crossVectors(this.camera.up, worldDirection).normalize();

        let actualMoveX = 0;
        let actualMoveZ = 0;

        if (this.moveForward || this.moveBackward) {
            const moveStepZ = worldDirection.clone().multiplyScalar(this.direction.z * this.speed * delta);
            if (!this.checkCollision(worldDirection.clone().multiplyScalar(this.direction.z))) {
                 actualMoveZ = moveStepZ.z;
                 // Giữ X không đổi từ hướng này để tránh cộng dồn không mong muốn
                 actualMoveX += moveStepZ.x; 
            }
        }
        if (this.moveLeft || this.moveRight) {
            const moveStepX = rightDirection.clone().multiplyScalar(this.direction.x * this.speed * delta);
             if (!this.checkCollision(rightDirection.clone().multiplyScalar(this.direction.x))) {
                 actualMoveX += moveStepX.x;
                 // Giữ Z không đổi từ hướng này
                 actualMoveZ += moveStepX.z;
            }
        }
        
        this.controls.moveRight(actualMoveX);
        this.controls.moveForward(actualMoveZ);

        // Giữ camera ở độ cao cố định (ví dụ: chiều cao mắt người)
        this.camera.position.y = 1.6; 
    }
}
Use code with caution.
JavaScript
8. src/utils/assetLoaders.js:
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Artifact from '../components/Artifacts/Artifact.js';

const gltfLoader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();

export async function loadGLTFModel(path) {
    return new Promise((resolve, reject) => {
        gltfLoader.load(path, (gltf) => {
            // Bật shadow cho tất cả mesh trong model
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true; 
                }
            });
            resolve(gltf.scene);
        }, undefined, reject);
    });
}

export async function loadTexture(path) {
    return new Promise((resolve, reject) => {
        textureLoader.load(path, resolve, undefined, reject);
    });
}

export async function loadArtifacts(artifactsData, scene) {
    const loadedArtifacts = [];
    for (const data of artifactsData) {
        let mesh;
        if (data.type === 'painting') {
            const texture = await loadTexture(data.path);
            mesh = new Artifact(data.name, data.description, texture, data.size, data.is3DModel).mesh;
        } else if (data.type === 'model3d') {
            const modelScene = await loadGLTFModel(data.path);
            mesh = new Artifact(data.name, data.description, modelScene, data.size, data.is3DModel).mesh;
        }
        
        if (mesh) {
            mesh.position.set(data.position.x, data.position.y, data.position.z);
            if (data.rotation) {
                mesh.rotation.set(
                    THREE.MathUtils.degToRad(data.rotation.x),
                    THREE.MathUtils.degToRad(data.rotation.y),
                    THREE.MathUtils.degToRad(data.rotation.z)
                );
            }
            if (data.scale) {
                mesh.scale.set(data.scale.x, data.scale.y, data.scale.z);
            }
            scene.add(mesh);
            loadedArtifacts.push({ mesh, data });
        }
    }
    return loadedArtifacts;
}
Use code with caution.
JavaScript
9. src/components/Artifacts/Artifact.js:
import * as THREE from 'three';

export default class Artifact {
    constructor(name, description, content, size = { width: 1, height: 1, depth: 0.1 }, is3DModel = false) {
        this.name = name;
        this.description = description; // Sẽ dùng cho info panel

        if (is3DModel) { // content là một THREE.Group (loaded model)
            this.mesh = content;
            // Có thể cần scale model cho phù hợp
            const box = new THREE.Box3().setFromObject(this.mesh);
            const modelSize = new THREE.Vector3();
            box.getSize(modelSize);
            
            const scaleFactor = Math.min(size.width / modelSize.x, size.height / modelSize.y, size.depth / modelSize.z) || 1;
            this.mesh.scale.set(scaleFactor, scaleFactor, scaleFactor);

        } else { // content là một THREE.Texture (for paintings)
            const geometry = new THREE.BoxGeometry(size.width, size.height, size.depth); // Hộp mỏng cho tranh
            const material = new THREE.MeshStandardMaterial({ map: content });
            this.mesh = new THREE.Mesh(geometry, material);
        }
        
        this.mesh.name = name; // Để dễ nhận diện khi raycast
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
    }
}
Use code with caution.
JavaScript
10. src/data/artifactsData.js (Ví dụ):
// Đây là nơi bạn định nghĩa thông tin về các hiện vật
// Paths là tương đối từ thư mục /public/
const artifactsData = [
    {
        name: "Bức tranh Đêm Đầy Sao",
        description: "Đêm Đầy Sao là một bức tranh sơn dầu của họa sĩ post-impressionist người Hà Lan Vincent van Gogh...",
        type: "painting", // 'painting' hoặc 'model3d'
        path: "textures/artifacts/starry_night.jpg", // Path đến texture nếu là painting, hoặc model nếu là model3d
        size: { width: 2, height: 1.5, depth: 0.05 }, // Kích thước cho tranh hoặc bounding box cho model
        position: { x: -5, y: 2, z: -14.5 }, // Gần tường trước, bên trái
        rotation: { x:0, y:0, z:0 }, // Rotation theo độ
        is3DModel: false
    },
    {
        name: "Tượng David",
        description: "David là một tác phẩm điêu khắc bằng đá cẩm thạch của Michelangelo, một trong những tác phẩm nổi tiếng nhất của Phục Hưng Ý.",
        type: "model3d",
        path: "models/artifacts/statue_david.glb", // Ví dụ path
        size: { width: 1, height: 2.5, depth: 1 }, // Kích thước mong muốn để scale model
        position: { x: 0, y: 0, z: 0 }, // Đặt ở giữa phòng, trên sàn
        is3DModel: true
    },
    // ... thêm các hiện vật khác
];

export default artifactsData;
Use code with caution.
JavaScript
Lưu ý quan trọng:
Paths: Tất cả các đường dẫn đến models, textures, audio trong artifactsData.js phải là tương đối từ thư mục /public. Ví dụ, nếu model nằm ở /public/models/my_model.glb, path sẽ là "models/my_model.glb".
Models: Bạn cần tải hoặc tạo các mô hình 3D (ví dụ: gallery_room.glb, statue_david.glb) và textures (ví dụ: wall_marble.jpg) và đặt chúng vào thư mục /public/models và /public/textures tương ứng.
Kích thước và Vị trí: Cẩn thận điều chỉnh size, position, rotation trong artifactsData.js để các hiện vật hiển thị đúng trong phòng.
Collision: Logic va chạm trong PlayerControls.js hiện tại còn đơn giản. Bạn có thể cần cải thiện nó, ví dụ bằng cách sử dụng AABB (Axis-Aligned Bounding Boxes) cho từng đối tượng thay vì chỉ raycast.
Framework: Code trên là JavaScript thuần với Three.js. Nếu bạn dùng React, cấu trúc và cách viết component sẽ khác (sử dụng JSX và hooks của @react-three/fiber).
Performance: Đối với một bảo tàng lớn có nhiều hiện vật, bạn sẽ cần áp dụng các kỹ thuật tối ưu hóa đã liệt kê trong README (LOD, Instancing, etc.).
Đây là một bộ khung khởi đầu. Bạn sẽ cần phát triển thêm nhiều logic chi tiết cho từng tính năng, đặc biệt là phần UI, mini-map, và các tương tác phức tạp hơn. Chúc bạn thành công với đồ án!
