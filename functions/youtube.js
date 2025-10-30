const axios = require('axios')
const functions = require('firebase-functions')

const YOUTUBE_API_KEY = functions.config().youtube?.key

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3'

/**
 * YouTube에서 영상 검색
 */
async function searchYouTubeVideos({ keyword, publishedAfter, publishedBefore, maxResults = 20 }) {
  if (!YOUTUBE_API_KEY) {
    throw new Error('YouTube API 키가 설정되지 않았습니다.')
  }

  try {
    // 1. 영상 검색
    const searchParams = {
      key: YOUTUBE_API_KEY,
      part: 'snippet',
      q: keyword,
      type: 'video',
      maxResults,
      order: 'relevance'
    }

    if (publishedAfter) {
      searchParams.publishedAfter = new Date(publishedAfter).toISOString()
    }
    if (publishedBefore) {
      searchParams.publishedBefore = new Date(publishedBefore).toISOString()
    }

    const searchResponse = await axios.get(`${YOUTUBE_API_BASE}/search`, {
      params: searchParams
    })

    const videoIds = searchResponse.data.items.map(item => item.id.videoId).join(',')
    const channelIds = [...new Set(searchResponse.data.items.map(item => item.snippet.channelId))].join(',')

    if (!videoIds) {
      return []
    }

    // 2. 영상 상세 정보 (조회수, 좋아요 등)
    const videosResponse = await axios.get(`${YOUTUBE_API_BASE}/videos`, {
      params: {
        key: YOUTUBE_API_KEY,
        part: 'statistics,contentDetails',
        id: videoIds
      }
    })

    // 3. 채널 정보 (구독자 수)
    const channelsResponse = await axios.get(`${YOUTUBE_API_BASE}/channels`, {
      params: {
        key: YOUTUBE_API_KEY,
        part: 'statistics',
        id: channelIds
      }
    })

    // 데이터 병합
    const channelMap = {}
    channelsResponse.data.items.forEach(channel => {
      channelMap[channel.id] = {
        subscriberCount: channel.statistics.subscriberCount
      }
    })

    const videoMap = {}
    videosResponse.data.items.forEach(video => {
      videoMap[video.id] = {
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount,
        commentCount: video.statistics.commentCount,
        duration: video.contentDetails.duration
      }
    })

    // 최종 결과 생성
    const results = searchResponse.data.items.map(item => {
      const videoId = item.id.videoId
      const channelId = item.snippet.channelId

      return {
        id: videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
        channelId: channelId,
        publishedAt: item.snippet.publishedAt,
        viewCount: videoMap[videoId]?.viewCount || 0,
        likeCount: videoMap[videoId]?.likeCount || 0,
        commentCount: videoMap[videoId]?.commentCount || 0,
        duration: videoMap[videoId]?.duration || '',
        subscriberCount: channelMap[channelId]?.subscriberCount || 0
      }
    })

    return results
  } catch (error) {
    console.error('YouTube API error:', error.response?.data || error.message)
    throw new Error('YouTube 검색 중 오류가 발생했습니다.')
  }
}

module.exports = {
  searchYouTubeVideos
}
