import { createFileRoute, useRouterState } from '@tanstack/react-router'
import { useState } from 'react'
import html2canvas from 'html2canvas'
import { fonts } from '../constants/fonts'
import Loading from '../components/Loading'

function DesignCardPage() {
  const routerState = useRouterState()
  const image = (routerState.location.state as any)?.image
  const [name, setName] = useState('')
  const [fontColor, setFontColor] = useState('#ffffff')
  const [fontFamily, setFontFamily] = useState('Poppins')
  const [isDownloading, setIsDownloading] = useState(false)
  const [, setError] = useState<string | null>(null)

  // Download handler
  const handleDownload = async () => {
    setIsDownloading(true) // Show loader
    try {
      const card = document.getElementById('card-preview')
      if (!card) return

      await new Promise((r) => setTimeout(r, 300))

      const canvas = await html2canvas(card, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
      })

      const dataUrl = canvas.toDataURL('image/png')

      const link = document.createElement('a')
      link.download = `revivar-card-${Date.now()}.png`
      link.href = dataUrl
      link.click()

      const savedCards = JSON.parse(localStorage.getItem('revivarCards') || '[]')

      const newCard = {
        id: Date.now(),
        name: name || 'Anonymous',
        fontColor,
        fontFamily,
        imageData: dataUrl,
        createdAt: new Date().toISOString(),
      }

      savedCards.push(newCard)
      localStorage.setItem('revivarCards', JSON.stringify(savedCards))
    } catch (err) {
      setError('Failed to download the card. Please try again.')
    } finally {
      setIsDownloading(false) 
    }
  }

  if (!image) {
    return (
      <div className="container py-5 text-center">
        <p className="text-danger">
          No image selected 😢 — please go back to the Home page.
        </p>
      </div>
    )
  }

  return (
    <div className="container py-5 text-center">
      {isDownloading && <Loading message={`Downloading for “${name}”... `} fullScreen />}

      <h2 className="fw-semibold text-primary mb-4">Personalize Your Card</h2>

      {/* 🖊️ Input for name */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control w-50 mx-auto text-center"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Font & Color selectors */}
      <div className="d-flex justify-content-center gap-3 mb-4">
        <select
          className="form-select w-auto"
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
        >
          {fonts.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>

        <input
          type="color"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
          title="Pick text color"
        />
      </div>

      {/* Card Preview */}
      <div
        id="card-preview"
        className="position-relative mx-auto shadow rounded overflow-hidden"
        style={{
          width: '320px',
          aspectRatio: '3 / 4.2',
          backgroundImage: `url(${image.urls.regular})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: fontColor,
          fontFamily,
          borderRadius: '12px',
        }}
      >
        <h4
          className="position-absolute top-0 start-50 translate-middle-x mt-3 fw-semibold"
          style={{ letterSpacing: '1px' }}
        >
          Thank You
        </h4>

        <h5
          className="position-absolute bottom-0 start-50 translate-middle-x mb-3"
          style={{ fontWeight: '600' }}
        >
          {name || 'Your Name'}
        </h5>
      </div>

      {/* Download Button */}
      <button className="btn btn-primary mt-4 px-4" onClick={handleDownload}>
        <i className="bi bi-download me-2"></i> Download Card
      </button>
    </div>
  )
}

export const Route = createFileRoute('/card')({
  component: DesignCardPage,
})
