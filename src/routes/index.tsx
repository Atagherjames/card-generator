import { createFileRoute, Link, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { UnsplashImage } from '../types/app'
import Loading from '../components/Loading'

export const Route = createFileRoute('/')({
  // initial loader just loads random photos
  loader: async () => {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?count=8&client_id=${
        import.meta.env.VITE_UNSPLASH_ACCESS_KEY
      }`
    )
    if (!res.ok) throw new Error('Failed to fetch Unsplash images')
    return res.json() as Promise<UnsplashImage[]>
  },
  component: HomePage,
  pendingComponent: () => (
    <Loading message={'Fetching images... 😊'} fullScreen />
  ),
})

function HomePage() {
  const initialImages = Route.useLoaderData()
  const { q } = useSearch({ from: '/' }) 
  const [images, setImages] = useState<UnsplashImage[]>(initialImages)
  const [searchTerm, setSearchTerm] = useState(q || '')
  const [loading, setLoading] = useState(false)

  // Automatically search when navbar query changes
  useEffect(() => {
    if (q) handleSearchFromQuery(q)
  }, [q])

  const handleSearchFromQuery = async (query: string) => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=8&client_id=${
          import.meta.env.VITE_UNSPLASH_ACCESS_KEY
        }`
      )
      const data = await res.json()
      setImages(data.results || [])
    } finally {
      setLoading(false)
    }
  }

  // Search form submit handler
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return
    handleSearchFromQuery(searchTerm)
  }

  if (loading) {
    return <Loading message={`Searching for “${searchTerm}”... 🔍`} fullScreen />
  }

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-4 fw-semibold text-primary">
        {q ? `Results for “${q}”` : 'Choose a Background Image'}
      </h2>

      {/* 🔍 Search bar */}
      <form
        className="d-flex justify-content-center mb-4"
        onSubmit={handleSearch}
      >
        <input
          type="search"
          className="form-control w-50 rounded-start-pill border"
          placeholder="Search images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ boxShadow: 'none' }}
        />
        <button
          type="submit"
          className="btn btn-primary rounded-end-pill px-3"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <i className="bi bi-search fs-5"></i>
        </button>
      </form>

      {/* Image Grid */}
      <div className="row g-3">
        {images.length > 0 ? (
          images.map((img: UnsplashImage) => (
            <div key={img.id} className="col-md-3 col-6">
              <Link
                to="/card"
                state={{ image: img } as any}
                className="card border-0 shadow-sm text-decoration-none"
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
              >
                <img
                  src={img.urls.regular}
                  alt={img.alt_description || 'Unsplash image'}
                  className="card-img-top rounded"
                  style={{
                    aspectRatio: '4 / 5',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                />
              </Link>
            </div>
          ))
        ) : (
          <p className="text-muted mt-4">No results found 😢</p>
        )}
      </div>
    </div>
  )
}
