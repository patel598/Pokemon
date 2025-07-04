import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-20">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Pokemon Not Found
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          The Pokemon you're looking for doesn't exist or couldn't be found.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Pokemon List
        </Link>
      </div>
    </div>
  )
}