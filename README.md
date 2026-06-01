# Wonder ABC Universe

Live demo: `https://your-vercel-app.vercel.app`

Wonder ABC Universe là mini app giáo dục tĩnh dành cho trẻ em, giúp bé học chữ cái tiếng Anh A-Z và số đếm 1-100 bằng hình ảnh emoji, câu tiếng Việt đơn giản, phát âm bằng trình duyệt và giao diện nhiều màu sắc.

## Features

- Học 26 chữ cái tiếng Anh từ A đến Z.
- Học số đếm 1-100 với minh họa số lượng được tạo tự động.
- Phát âm chữ cái, từ tiếng Anh và câu tiếng Việt bằng Web Speech API.
- Hiển thị điểm, chế độ học, bài hiện tại, tổng số bài và phần trăm hoàn thành.
- Thanh tiến độ trực quan và thông báo chúc mừng khi hoàn thành lộ trình.
- Lưu điểm, chế độ học, bài hiện tại và tiến độ bằng `localStorage`.
- Giao diện responsive cho thiết bị di động.
- Hỗ trợ `aria-live`, focus state rõ ràng, keyboard navigation và `prefers-reduced-motion`.
- PWA-ready với manifest, icon SVG và service worker hook tối giản.

## Screenshots

Thêm ảnh chụp màn hình sau khi deploy:

- `screenshots/home.png`
- `screenshots/letters.png`
- `screenshots/numbers.png`

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript ES Modules
- Web Speech API
- Local Storage
- Vite
- Vercel Static Hosting

## Architecture

```text
index.html               App shell, SEO metadata, PWA manifest link
style.css                Visual system, responsive layout, states, reduced motion
src/app.js               App state, navigation, event orchestration
src/data/letters.js      Letter lesson data
src/data/numbers.js      Generated number lessons
src/core/storage.js      localStorage helpers
src/core/speech.js       Speech synthesis helpers
src/core/dom.js          DOM rendering and event binding
src/core/progress.js     Progress calculations
src/core/animations.js   Reduced-motion-aware animation helpers
public/sw.js             Minimal service worker readiness hook copied to dist/sw.js
manifest.json            PWA metadata and icon declaration
```

Xem thêm [docs/architecture.md](./docs/architecture.md) để biết cách tái sử dụng cấu trúc này cho các mini app khác.

Ứng dụng không dùng backend, React hoặc Next.js. Toàn bộ logic chạy trên trình duyệt và được Vite bundle thành static assets.

## Local Setup

```bash
npm install
npm run dev
```

Mở địa chỉ Vite hiển thị trong terminal, thường là:

```bash
http://localhost:5173
```

## Build

```bash
npm run build
```

Output production nằm trong thư mục `dist/`.

## Deployment

Triển khai trên Vercel:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- `vercel.json` giữ cấu hình tối thiểu với `cleanUrls`

Sau khi deploy, thay placeholder live demo trong README bằng URL thật.

## Roadmap

- Thêm screenshot chính thức cho README.
- Thêm icon PNG nhiều kích thước cho PWA.
- Thêm chế độ quiz nhận diện chữ/số.
- Thêm tùy chọn bật/tắt âm thanh và hiệu ứng.
- Thêm bộ từ vựng theo chủ đề: động vật, trái cây, gia đình, màu sắc.
- Cải thiện offline cache trong service worker khi cần phát hành như PWA đầy đủ.
