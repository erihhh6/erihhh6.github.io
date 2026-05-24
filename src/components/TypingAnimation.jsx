import { useState, useEffect } from 'react'

const TypingAnimation = ({ text, className, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }
    }, delay + currentIndex * 10)

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay])

  // Task 3.5 — Stop cursor blinking after text finishes typing
  useEffect(() => {
    if (currentIndex >= text.length) {
      setShowCursor(false)
      return
    }
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorTimer)
  }, [currentIndex, text.length])

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
          |
        </span>
      )}
    </span>
  )
}

export default TypingAnimation
