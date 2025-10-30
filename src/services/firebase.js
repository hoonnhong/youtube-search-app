import { initializeApp } from 'firebase/app'
import { getFunctions, httpsCallable } from 'firebase/functions'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Firebase 초기화
const app = initializeApp(firebaseConfig)
const functions = getFunctions(app, 'asia-northeast3')

// YouTube 검색 함수
export async function searchVideos({ keyword, publishedAfter, publishedBefore, maxResults = 20 }) {
  try {
    const searchVideosFunction = httpsCallable(functions, 'searchVideos')
    const result = await searchVideosFunction({
      keyword,
      publishedAfter,
      publishedBefore,
      maxResults
    })
    return result.data
  } catch (error) {
    console.error('Search error:', error)
    throw new Error(error.message || '검색 중 오류가 발생했습니다.')
  }
}

// 영상 요약 함수
export async function getSummary(videoId) {
  try {
    const summarizeVideoFunction = httpsCallable(functions, 'summarizeVideo')
    const result = await summarizeVideoFunction({ videoId })
    return result.data.summary
  } catch (error) {
    console.error('Summary error:', error)
    throw new Error(error.message || '요약을 가져오는 중 오류가 발생했습니다.')
  }
}
