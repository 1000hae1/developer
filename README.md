# developer — 천해원 이력서 사이트

신윤복풍 그림과 스크롤 모션으로 만든 한 페이지 이력서입니다.
영상 없이 그림 10장과 코드(GSAP ScrollTrigger)만으로 움직입니다.

## 실행

```bash
npm install
npm run dev      # http://localhost:5173
```

배포용 빌드는 `npm run build` → `dist/` 폴더가 생깁니다.

## 폴더 구조

```
index.html          페이지 구조와 모든 문구
src/style.css       색 · 서체 · 레이아웃 · 모바일 (맨 위 :root 변수로 색 조절)
src/main.js         스크롤 모션 (챕터별로 나뉘어 있음)
public/images/      그림 (WebP)
```

## 그림 파일

| 파일 | 장면 | 쓰이는 곳 |
|---|---|---|
| cut1.webp | 혜원이 그림 그리고 시동이 먹 갈기 | Ch.1 첫 화면 |
| cut1-5.webp | 화첩 속 먹 포도송이 클로즈업 | Ch.1 확대 |
| cut2.webp | 진짜 포도나무 | Ch.1 |
| cut3.webp | 손으로 포도 따기 | Ch.1 |
| bunch.webp | 포도송이 (투명) | Ch.1 낙하, Ch.4 확대 |
| cut6.webp | 한지 위 먹포도 + 작은 혜원 (투명) | Ch.2 |
| cut8.webp | 대청마루 네 혜원 | Ch.3 |
| cut9.webp | 가지 자르기 | Ch.3 |
| chaekgado.webp | 책가도 (투명) | Ch.4, 북두칠성 |
| cut13.webp | 가지 다듬기 + 물 주기 | 마무리 |

그림을 바꾸려면 같은 이름으로 덮어쓰면 됩니다.

## 자주 고칠 값

- **첫 화면 확대 위치**: `src/style.css`의 `.hero__l1 { transform-origin: 48% 70%; }`
  → 화첩 속 포도송이가 있는 지점(가로%, 세로%)
- **첫 화면 스크롤 길이**: `src/main.js`의 `end: '+=380%'` (클수록 천천히)
- **떨어지는 송이 시작 위치/크기**: `.hero__bunch { left: 53%; top: 47%; height: 58vh; }`
- **장면이 바뀌는 타이밍**: `main.js` 각 타임라인의 마지막 숫자(시점)

## 배포 (Cloudflare Pages, 무료)

1. GitHub에 이 폴더를 저장소로 올리기
2. Cloudflare 대시보드 → Workers & Pages → Create → Pages → 저장소 연결
3. Build command: `npm run build` / Output directory: `dist`
4. 배포되면 `○○.pages.dev` 주소가 생깁니다

## 접근성

- 휴대폰에서는 그림·글이 세로로 쌓이고 첫 화면만 간단히 움직입니다.
- 기기에서 "동작 줄이기"를 켜면 움직임 없이 정지 화면으로 보입니다.
