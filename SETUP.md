# 설치 및 실행 가이드

## 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn
- Firebase CLI
- Git

## 1. API 키 발급

### YouTube Data API v3

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "API 및 서비스" > "라이브러리" 메뉴로 이동
4. "YouTube Data API v3" 검색 후 활성화
5. "사용자 인증 정보" > "사용자 인증 정보 만들기" > "API 키" 선택
6. API 키 복사 (나중에 사용)

### Google Gemini API

1. [Google AI Studio](https://makersuite.google.com/app/apikey) 접속
2. "Get API Key" 클릭
3. API 키 복사 (나중에 사용)

## 2. Firebase 프로젝트 설정

### Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력
4. Google Analytics 설정 (선택사항)
5. 프로젝트 생성 완료

### Firebase 웹 앱 추가

1. Firebase 프로젝트에서 "웹" 아이콘 클릭
2. 앱 닉네임 입력
3. Firebase Hosting 설정 (체크)
4. 앱 등록
5. Firebase 구성 객체 복사 (나중에 사용)

### Firebase CLI 설치 및 로그인

```bash
npm install -g firebase-tools
firebase login
```

## 3. 프로젝트 클론 및 설정

```bash
# 프로젝트 디렉토리로 이동
cd youtube-search-app

# Frontend 의존성 설치
npm install

# Functions 의존성 설치
cd functions
npm install
cd ..
```

## 4. 환경 변수 설정

### Frontend 환경 변수 (.env)

루트 디렉토리에 `.env` 파일 생성:

```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### Backend 환경 변수 (Firebase Functions)

```bash
firebase functions:config:set youtube.key="YOUR_YOUTUBE_API_KEY"
firebase functions:config:set gemini.key="YOUR_GEMINI_API_KEY"
```

확인:

```bash
firebase functions:config:get
```

## 5. Firebase 프로젝트 연결

```bash
firebase use --add
```

프로젝트 선택 후 별칭 입력 (예: default)

## 6. Firebase Functions 배포

```bash
firebase deploy --only functions
```

배포 완료 후 Functions URL 확인

## 7. 로컬 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:5173 접속

## 8. 프로덕션 배포

### 빌드

```bash
npm run build
```

### Firebase Hosting에 배포

```bash
firebase deploy --only hosting
```

또는 전체 배포:

```bash
npm run deploy
```

## 문제 해결

### Firebase Functions 배포 실패

```bash
# Firebase CLI 업데이트
npm install -g firebase-tools@latest

# 다시 로그인
firebase login --reauth

# 배포 재시도
firebase deploy --only functions
```

### API 키 오류

```bash
# Functions 환경 변수 확인
firebase functions:config:get

# 환경 변수 재설정
firebase functions:config:set youtube.key="YOUR_KEY"
firebase functions:config:set gemini.key="YOUR_KEY"

# Functions 재배포
firebase deploy --only functions
```

### 빌드 오류

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install

# Functions도 동일하게
cd functions
rm -rf node_modules package-lock.json
npm install
cd ..
```

## 추가 설정

### CORS 설정 (필요시)

Firebase Functions는 기본적으로 CORS를 처리하지만, 필요시 `functions/index.js`에서 수정 가능

### 할당량 모니터링

- YouTube API 할당량: [Google Cloud Console](https://console.cloud.google.com/apis/dashboard)
- Firebase 사용량: [Firebase Console](https://console.firebase.google.com/)

## 다음 단계

- 커스텀 도메인 연결
- Google Analytics 연동
- 에러 로깅 설정
- 성능 모니터링

도움이 필요하면 이슈를 생성해주세요!
