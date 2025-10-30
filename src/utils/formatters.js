// 숫자 포맷팅 (조회수, 좋아요 등)
export function formatNumber(num) {
  if (num === undefined || num === null) return '0'

  const number = Number(num)

  if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1) + 'B'
  }
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M'
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K'
  }
  return number.toString()
}

// 날짜 포맷팅
export function formatDate(dateString) {
  if (!dateString) return ''

  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return '오늘'
  } else if (diffDays === 1) {
    return '어제'
  } else if (diffDays < 7) {
    return `${diffDays}일 전`
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return `${weeks}주 전`
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30)
    return `${months}개월 전`
  } else {
    const years = Math.floor(diffDays / 365)
    return `${years}년 전`
  }
}

// 지속 시간 포맷팅 (PT1H2M3S -> 1:02:03)
export function formatDuration(duration) {
  if (!duration) return ''

  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  if (!match) return ''

  const hours = (match[1] || '').replace('H', '')
  const minutes = (match[2] || '').replace('M', '')
  const seconds = (match[3] || '').replace('S', '')

  const parts = []
  if (hours) parts.push(hours)
  parts.push(minutes.padStart(2, '0') || '00')
  parts.push(seconds.padStart(2, '0') || '00')

  return parts.join(':')
}
