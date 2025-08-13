'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const slides = [
  {
    id: 1,
    text1: "Always",
    text2: "Deliver", 
    text3: "more than",
    text4: "Expected",
    button: "BOOK A CALL",
    buttonLink: "/contact-us",
    backgroundImage: "/uploads/hero-bg-1.jpg"
  },
  {
    id: 2,
    text1: "Working",
    text2: "together",
    text3: "is",
    text4: "SUCCESS",
    button: "LEARN MORE",
    buttonLink: "/about",
    backgroundImage: "/uploads/hero-bg-2.jpg"
  },
  {
    id: 3,
    text1: "Delivering",
    text2: "Solutions",
    text3: "for your",
    text4: "Company",
    tagline: "Your business, your success!",
    button: "SERVICES",
    buttonLink: "/what-we-do",
    backgroundImage: "/uploads/hero-bg-3.jpg"
  }
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Set loaded state after component mounts
    setIsLoaded(true)
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <section className="hero-slider">
      <div 
        className="hero-slide"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.3)), url(${currentSlideData.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-text-line-1">
              <span className="hero-word hero-word-light">{currentSlideData.text1}</span>
              <span className="hero-word hero-word-bold">{currentSlideData.text2}</span>
            </div>
            <div className="hero-text-line-2">
              <span className="hero-word hero-word-light">{currentSlideData.text3}</span>
              <span className="hero-word hero-word-bold">{currentSlideData.text4}</span>
            </div>
            {currentSlideData.tagline && (
              <div className="hero-tagline">
                {currentSlideData.tagline}
              </div>
            )}
          </div>
          
          <div className="hero-button-container">
            <Link href={currentSlideData.buttonLink} className="hero-btn">
              {currentSlideData.button}
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="hero-navigation">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}