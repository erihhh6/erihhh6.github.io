import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// Binary Clock Component
const BinaryClock = () => {
  const [time, setTime] = useState(new Date())
  const [showDecimal, setShowDecimal] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const toBinary = (num) => {
    return num.toString(2).padStart(6, '0')
  }

  const formatTime = () => {
    const hours = time.getHours()
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()

    if (showDecimal) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    return `${toBinary(hours)}:${toBinary(minutes)}:${toBinary(seconds)}`
  }

  return (
    <div 
      className="font-mono text-[11px] text-slate-400 hover:text-orange-400 transition-colors duration-300 cursor-default select-none bg-white/5 rounded px-3 py-2"
      onMouseEnter={() => setShowDecimal(true)}
      onMouseLeave={() => setShowDecimal(false)}
    >
      {/* Fixed width container to prevent navbar resizing */}
      <div className="relative w-[120px] text-center">
        <div className="whitespace-nowrap">
          {formatTime()}
        </div>
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-[9px] text-slate-500 whitespace-nowrap">
          {showDecimal ? 'decimal' : 'binary'}
        </div>
      </div>
    </div>
  )
}

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6">
      <nav className="flex items-center gap-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl shadow-black/10">
        {/* Navigation items */}
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-3 py-1 text-sm font-medium transition-all duration-300 ${
                activeSection === item.id
                  ? 'text-orange-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
        
        {/* Right decorative bar */}
        <div className="w-8 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent ml-4"></div>
        
        {/* Binary Clock integrated in navbar */}
        <div className="ml-6">
          <BinaryClock />
        </div>
      </nav>
    </div>
  )
} 