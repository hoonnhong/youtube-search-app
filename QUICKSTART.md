# 빠른 시작 가이드

YouTube 검색 앱을 빠르게 실행하세요!

## 체크리스트

시작하기 전에 다음을 준비하세요:

- [ ] Node.js 18 이상 설치됨
- [ ] YouTube Data API 키 (무료)
- [ ] Google Gemini API 키 (무료)
- [ ] Firebase 계정

## 실제 소요 시간

- **API 키가 이미 있는 경우**: 5분
- **API 키를 처음 발급하는 경우**: 15-20분
- **Firebase가 처음인 경우**: 20-30분

## 3단계로 시작하기

### 1️⃣ 프로젝트 설정 (3분)

```bash
# 의존성 설치
npm install
cd functions && npm install && cd ..

# Firebase 로그인
firebase login

# Firebase 프로젝트 생성 및 연결
firebase use --add
```

### 2️⃣ 환경 변수 설정 (10-15분)

#### Frontend (.env 파일 생성)

```bash
cp .env.example .env
```

`.env` 파일을 열고 Firebase 설정 입력:

```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
# ... 나머지 설정
```

#### Backend (Firebase Functions)

```bash
firebase functions:config:set youtube.key="YOUR_YOUTUBE_API_KEY"
firebase functions:config:set gemini.key="YOUR_GEMINI_API_KEY"
```

### 3️⃣ 실행 (2-3분)

```bash
# Functions 배포 (최초 1회만)
firebase deploy --only functions

# 개발 서버 실행
npm run dev
```

브라우저에서 자동으로 http://localhost:5173 이 열립니다!

## 첫 검색 해보기

1. 검색창에 "React tutorial" 입력
2. 검색 버튼 클릭
3. 결과 테이블에서 "요약보기" 클릭

## 문제 해결

### "API key not configured" 에러

```bash
# Functions 환경 변수 확인
firebase functions:config:get

# 없으면 다시 설정
firebase functions:config:set youtube.key="YOUR_KEY"
firebase deploy --only functions
```

### 빌드 에러

```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

### Functions 배포 실패

```bash
# Firebase CLI 업데이트
npm install -g firebase-tools@latest
firebase login
```

## 다음 단계

- ✅ 로컬에서 테스트 완료
- 🚀 프로덕션 배포: `npm run deploy`
- 📊 Firebase Console에서 모니터링
- 🔧 커스터마이징 시작

## 팁

- **할당량 관리**: YouTube API는 하루 10,000 쿼터 제한
- **비용 절감**: Firebase 무료 플랜으로 시작 가능
- **성능**: 검색 결과는 최대 20개로 제한 (API 절약)

문제가 있나요? 이슈를 생성해주세요!
