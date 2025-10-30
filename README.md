# YouTube 검색 앱

AI 요약 기능이 포함된 YouTube 검색 애플리케이션입니다.

## 주요 기능

- YouTube 영상 검색
- 날짜 필터링 (1주일, 1개월, 1년, 전체)
- 정렬 기능 (관련도, 최신순, 조회수, 좋아요, 구독자수)
- 영상 통계 정보 (조회수, 좋아요, 구독자 수)
- AI 기반 영상 요약 (Google Gemini)

## 기술 스택

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Firebase Cloud Functions
- **APIs**: YouTube Data API v3, Google Gemini API
- **Hosting**: Firebase Hosting

## 빠른 시작

자세한 설치 및 실행 가이드는 [QUICKSTART.md](QUICKSTART.md)를 참조하세요.

### 1. 의존성 설치

```bash
npm install
cd functions && npm install && cd ..
```

### 2. Firebase 설정

```bash
firebase login
firebase use --add
```

### 3. 환경 변수 설정

`.env` 파일을 생성하고 Firebase 설정을 입력하세요:

```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
# ... 나머지 설정
```

Firebase Functions 환경 변수:

```bash
firebase functions:config:set youtube.key="YOUR_YOUTUBE_API_KEY"
firebase functions:config:set gemini.key="YOUR_GEMINI_API_KEY"
```

### 4. 실행

```bash
# Functions 배포 (최초 1회)
firebase deploy --only functions

# 개발 서버 실행
npm run dev
```

## 프로젝트 구조

```
youtube-search-app/
├── src/
│   ├── components/        # React 컴포넌트
│   ├── services/          # Firebase 서비스
│   ├── utils/             # 유틸리티 함수
│   └── App.jsx            # 메인 앱
├── functions/             # Firebase Functions
│   ├── index.js           # Functions 엔트리
│   ├── youtube.js         # YouTube API 로직
│   └── gemini.js          # Gemini API 로직
└── public/                # 정적 파일
```

## 문서

- [QUICKSTART.md](QUICKSTART.md) - 빠른 시작 가이드
- [SETUP.md](SETUP.md) - 상세 설치 가이드
- [ARCHITECTURE.md](ARCHITECTURE.md) - 아키텍처 설명

## 라이선스

MIT
