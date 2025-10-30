import { Eye, ThumbsUp, Users, Calendar, FileText, ExternalLink } from 'lucide-react'
import { formatNumber, formatDate } from '../utils/formatters'

export default function ResultsTable({ results, onSummaryClick }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                영상 정보
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                채널
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                통계
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((video) => (
              <tr key={video.id} className="hover:bg-gray-50 transition-colors animate-fadeIn">
                <td className="px-6 py-4">
                  <div className="flex gap-4">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-32 h-20 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-900 hover:text-red-600 line-clamp-2 flex items-start gap-1 group"
                      >
                        {video.title}
                        <ExternalLink className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                      <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {formatDate(video.publishedAt)}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{video.channelTitle}</div>
                    <div className="flex items-center gap-1 text-gray-500 mt-1">
                      <Users className="w-4 h-4" />
                      {formatNumber(video.subscriberCount)} 구독자
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Eye className="w-4 h-4" />
                      {formatNumber(video.viewCount)} 조회
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <ThumbsUp className="w-4 h-4" />
                      {formatNumber(video.likeCount)} 좋아요
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onSummaryClick(video)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    <FileText className="w-4 h-4" />
                    요약보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
