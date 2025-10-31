import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/search')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div className="container py-5">
      <h1 className="text-primary fw-bold text-center mb-4">About Revivar</h1>

      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <p className="lead text-secondary mb-4">
            <strong>Revivar Card Generator</strong> is a creative web app that lets
            you design and personalize thank-you or invitation cards using stunning
            background images from <strong>Unsplash</strong>.
          </p>

          <div className="bg-light p-4 rounded shadow-sm mb-4">
            <h4 className="fw-semibold mb-3">✨ What You Can Do</h4>
            <ul className="list-unstyled text-start mx-auto" style={{ maxWidth: '500px' }}>
              <li className="mb-2">
                🖼️ <strong>Choose a background</strong> — Pick from curated Unsplash images.
              </li>
              <li className="mb-2">
                🧑‍🎨 <strong>Personalize your card</strong> — Add your name, change fonts, and colors.
              </li>
              <li className="mb-2">
                💾 <strong>Download your card</strong> — Save it instantly to your device.
              </li>
              <li className="mb-2">
                📁 <strong>View in Gallery</strong> — Access all your saved designs anytime.
              </li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <h4 className="fw-semibold mb-3">💡 Behind the Scenes</h4>
            <p className="text-muted">
              Revivar is powered by <strong>React</strong> and <strong>TanStack Router</strong> for
              seamless navigation, <strong>Bootstrap</strong> for responsive UI, and the 
              <strong> Unsplash API</strong> for beautiful image sourcing.
            </p>
            <p className="text-muted">
              We also use <strong>HTML2Canvas</strong> for card generation, enabling users to 
              download their personalized cards as images.
            </p>
          </div>

          <p className="mt-4 text-muted">
            Designed and developed with ❤️ by <strong>Atagher James</strong>.
          </p>
        </div>
      </div>
    </div>
  )
}
