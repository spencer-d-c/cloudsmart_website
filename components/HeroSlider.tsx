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
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setIsAnimating(true)
    }, 8000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setIsAnimating(false)
    }, 500)

    return () => clearTimeout(animationTimer)
  }, [currentSlide])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAnimating(true)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <section className="hero-slider">
      <div 
        className="hero-slide"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${currentSlideData.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="hero-content">
          <div className="hero-text">
            <div className={`hero-line ${isAnimating ? 'animate-in' : ''}`}>
              <span className="text-word-1">{currentSlideData.text1}</span>
              <span className="text-word-2">{currentSlideData.text2}</span>
            </div>
            <div className={`hero-line ${isAnimating ? 'animate-in delay-1' : ''}`}>
              <span className="text-word-3">{currentSlideData.text3}</span>
              <span className="text-word-4">{currentSlideData.text4}</span>
            </div>
            {currentSlideData.tagline && (
              <div className={`hero-tagline ${isAnimating ? 'animate-in delay-2' : ''}`}>
                {currentSlideData.tagline}
              </div>
            )}
          </div>
          
          <div className={`hero-button-container ${isAnimating ? 'animate-in delay-3' : ''}`}>
            <Link href={currentSlideData.buttonLink} className="hero-btn">
              {currentSlideData.button}
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