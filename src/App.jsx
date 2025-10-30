import { useState } from 'react'
import { Search } from 'lucide-react'
import SearchBar from './components/SearchBar'
import DateFilter from './components/DateFilter'
import SortFilter from './components/SortFilter'
import ResultsTable from './components/ResultsTable'
import SummaryModal from './components/SummaryModal'
import LoadingSpinner from './components/LoadingSpinner'
import { searchVideos, getSummary } from './services/firebase'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // 날짜 필터
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  // 정렬
  const [sortBy, setSortBy] = useState('relevance')

  // 요약 모달
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [summary, setSummary] = useState('')
  const [summaryLoading, setSummaryLoading] = useState(false)

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('검색어를 입력해주세요.')
      return
    }

    setLoading(true)
    setError(null)
    setResults([])

    try {
      const data = await searchVideos({
        keyword: searchTerm,
        publishedAfter: dateRange.start,
        publishedBefore: dateRange.end,
        maxResults: 20
      })

      setResults(data)

      if (data.length === 0) {
        setError('검색 결과가 없습니다.')
      }
    } catch (err) {
      setError(err.message || '검색 중 오류가 발생했습니다.')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSummaryClick = async (video) => {
    setSelectedVideo(video)
    setSummary('')
    setSummaryLoading(true)

    try {
      const summaryText = await getSummary(video.id)
      setSummary(summaryText)
    } catch (err) {
      setSummary('요약을 가져오는 중 오류가 발생했습니다: ' + err.message)
      console.error('Summary error:', err)
    } finally {
      setSummaryLoading(false)
    }
  }

  const handleCloseSummary = () => {
    setSelectedVideo(null)
    setSummary('')
  }

  // 정렬 적용
  const sortedResults = [...results].sort((a, b) => {
    switch (sortBy) {
      case 'views':
        return (b.viewCount || 0) - (a.viewCount || 0)
      case 'likes':
        return (b.likeCount || 0) - (a.likeCount || 0)
      case 'date':
        return new Date(b.publishedAt) - new Date(a.publishedAt)
      case 'subscribers':
        return (b.subscriberCount || 0) - (a.subscriberCount || 0)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Search className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              YouTube 검색 앱
            </h1>
          </div>
          <p className="mt-2 text-gray-600">
            AI 요약 기능이 포함된 YouTube 검색 도구
          </p>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* 검색 영역 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <SearchBar
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            onSearch={handleSearch}
            loading={loading}
          />

          <div className="mt-4">
            <DateFilter
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* 로딩 */}
        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        )}

        {/* 결과 */}
        {!loading && results.length > 0 && (
          <>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                총 {results.length}개의 결과
              </p>
              <SortFilter sortBy={sortBy} onSortChange={setSortBy} />
            </div>

            <ResultsTable
              results={sortedResults}
              onSummaryClick={handleSummaryClick}
            />
          </>
        )}

        {/* 빈 상태 */}
        {!loading && !error && results.length === 0 && searchTerm && (
          <div className="text-center py-12 text-gray-500">
            검색어를 입력하고 검색 버튼을 눌러주세요.
          </div>
        )}
      </main>

      {/* 요약 모달 */}
      <SummaryModal
        isOpen={selectedVideo !== null}
        onClose={handleCloseSummary}
        video={selectedVideo}
        summary={summary}
        loading={summaryLoading}
      />
    </div>
  )
}

export default App
