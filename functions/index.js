const functions = require('firebase-functions')
const { searchYouTubeVideos } = require('./youtube')
const { summarizeTranscript } = require('./gemini')

// YouTube 검색 함수
exports.searchVideos = functions
  .region('asia-northeast3')
  .https.onCall(async (data, context) => {
    try {
      const { keyword, publishedAfter, publishedBefore, maxResults = 20 } = data

      if (!keyword) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          '검색어를 입력해주세요.'
        )
      }

      const results = await searchYouTubeVideos({
        keyword,
        publishedAfter,
        publishedBefore,
        maxResults
      })

      return results
    } catch (error) {
      console.error('Search error:', error)
      throw new functions.https.HttpsError(
        'internal',
        error.message || '검색 중 오류가 발생했습니다.'
      )
    }
  })

// 영상 요약 함수
exports.summarizeVideo = functions
  .region('asia-northeast3')
  .runWith({ timeoutSeconds: 60, memory: '512MB' })
  .https.onCall(async (data, context) => {
    try {
      const { videoId } = data

      if (!videoId) {
        throw new functions.https.HttpsError(
          'invalid-argument',
          '비디오 ID가 필요합니다.'
        )
      }

      const summary = await summarizeTranscript(videoId)

      return { summary }
    } catch (error) {
      console.error('Summary error:', error)
      throw new functions.https.HttpsError(
        'internal',
        error.message || '요약 생성 중 오류가 발생했습니다.'
      )
    }
  })
