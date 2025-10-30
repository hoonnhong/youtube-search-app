const { GoogleGenerativeAI } = require('@google/generative-ai')
const { YoutubeTranscript } = require('youtube-transcript')
const functions = require('firebase-functions')

const GEMINI_API_KEY = functions.config().gemini?.key

/**
 * YouTube 영상 자막을 요약
 */
async function summarizeTranscript(videoId) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API 키가 설정되지 않았습니다.')
  }

  try {
    // 1. 자막 가져오기
    let transcript
    try {
      // 한국어 자막 시도
      transcript = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'ko' })
    } catch {
      try {
        // 영어 자막 시도
        transcript = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'en' })
      } catch {
        // 기본 자막 시도
        transcript = await YoutubeTranscript.fetchTranscript(videoId)
      }
    }

    if (!transcript || transcript.length === 0) {
      throw new Error('자막을 찾을 수 없습니다.')
    }

    // 자막 텍스트 추출
    const transcriptText = transcript.map(item => item.text).join(' ')

    if (transcriptText.length < 100) {
      throw new Error('자막이 너무 짧습니다.')
    }

    // 2. Gemini로 요약 생성
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `다음은 YouTube 영상의 자막입니다. 이 내용을 한국어로 요약해주세요.
요약은 다음 형식으로 작성해주세요:

📌 주요 내용:
- (핵심 포인트 3-5개를 불릿 포인트로)

💡 핵심 요약:
(2-3문장으로 전체 내용 요약)

자막:
${transcriptText.slice(0, 10000)}` // 토큰 제한을 위해 최대 10000자

    const result = await model.generateContent(prompt)
    const response = await result.response
    const summary = response.text()

    return summary
  } catch (error) {
    console.error('Summary error:', error)

    if (error.message.includes('자막')) {
      throw new Error('이 영상은 자막이 없어 요약할 수 없습니다.')
    }

    throw new Error('요약 생성 중 오류가 발생했습니다: ' + error.message)
  }
}

module.exports = {
  summarizeTranscript
}
