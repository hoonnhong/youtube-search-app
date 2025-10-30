import { ArrowUpDown } from 'lucide-react'

export default function SortFilter({ sortBy, onSortChange }) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-gray-600" />
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
      >
        <option value="relevance">관련도순</option>
        <option value="date">최신순</option>
        <option value="views">조회수순</option>
        <option value="likes">좋아요순</option>
        <option value="subscribers">구독자수순</option>
      </select>
    </div>
  )
}
