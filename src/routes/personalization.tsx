import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import Loading from '../components/Loading'

export const Route = createFileRoute('/personalization')({
  component: PersonalizationPage,
})

function PersonalizationPage() {
  const [savedCards, setSavedCards] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCard, setSelectedCard] = useState<any>(null)

  //  Load cards from localStorage
  useEffect(() => {
    setTimeout(() => {
      const cards = JSON.parse(localStorage.getItem('revivarCards') || '[]')
      setSavedCards(cards)
      setLoading(false)
    }, 500)
  }, [])

  const handleDownload = (imageData: string, name: string) => {
    const link = document.createElement('a')
    link.href = imageData
    link.download = `${name || 'revivar-card'}.png`
    link.click()
  }

  const handleDelete = (id: string) => {
    const updated = savedCards.filter((c) => c.id !== id)
    setSavedCards(updated)
    localStorage.setItem('revivarCards', JSON.stringify(updated))
  }

  if (loading) {
    return <Loading message="Loading your saved cards... 😊" fullScreen />
  }

  if (savedCards.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h4 className="text-secondary">No saved cards yet 😢</h4>
        <p>Create and download a card to see it here.</p>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h2 className="fw-semibold text-primary text-center mb-4">Your Saved Cards</h2>

      <div className="row g-4">
        {savedCards.map((card) => {
          const trimmedName = card.name ? card.name.trim() : ''
          const displayName = trimmedName !== '' ? trimmedName : 'Anonymous'
          return (
            <div key={card.id} className="col-md-3 col-6">
              <div
                className="card shadow-sm border-0 position-relative overflow-hidden pb-5"
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
              >
                {/* Card Visual - Only overlay show name */}
                <div
                  className="position-relative mx-auto rounded overflow-hidden"
                  style={{
                    width: '100%',
                    aspectRatio: '4 / 5',
                    backgroundImage: `url(${card.imageData})`,
                    backgroundSize: 'contain',
backgroundPosition: 'center',
backgroundRepeat: 'no-repeat',

                    color: card.fontColor,
                    fontFamily: card.fontFamily,
                    borderRadius: '10px',
                    height: 0,
                    paddingBottom: '125%',
                  }}
                  onClick={() => setSelectedCard(card)}
                >
                </div>

                {/* Show only fontFamily below card */}
                <div className="card-body text-center py-3">
                  <small className="text-muted">{card.fontFamily}</small>
                </div>

                {/* Action Buttons (larger spacing) */}
                <div
                  className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex"
                  style={{ gap: '28px' }} // larger gap for clear separation
                >
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleDownload(card.imageData, displayName)}
                  >
                    <i className="bi bi-download"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(card.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Preview Modal */}
      {selectedCard && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(5px)',
          }}
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="d-flex align-items-center justify-content-center vh-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="card shadow-lg border-0 position-relative"
              style={{
                maxWidth: '90vw',
                borderRadius: '12px',
                width: '320px',
                aspectRatio: '4 / 5',
                backgroundImage: `url(${selectedCard.imageData})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: selectedCard.fontColor,
                fontFamily: selectedCard.fontFamily,
              }}
            >
             

              <h5
                className="position-absolute bottom-0 start-50 translate-middle-x mb-3"
                style={{ fontWeight: 600, userSelect: 'none' }}
              >
                {selectedCard.name && selectedCard.name.trim() !== '' ? selectedCard.name.trim() : 'Anonymous'}
              </h5>
              <div
                className="card-body text-center px-3 pb-3"
                style={{
                  position: 'absolute',
                  width: '100%',
                  bottom: '-20px',
                  background: 'transparent',
                }}
              >
                <div className="d-flex justify-content-center" style={{ gap: '20px' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleDownload(
                        selectedCard.imageData,
                        selectedCard.name && selectedCard.name.trim() !== '' ? selectedCard.name.trim() : 'Anonymous'
                      )
                    }
                  >
                    <i className="bi bi-download me-1"></i> Download
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setSelectedCard(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
