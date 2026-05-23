import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// Typing Animation Component
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

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorTimer)
  }, [])

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

export default function About() {
  return (
    <section id="about" className="min-h-screen w-full flex items-center justify-center px-4 pt-24 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Invisible layout structure */}
        <div className="relative">
          {/* Left invisible bar */}
          <div className="absolute left-0 top-0 bottom-0 w-px"></div>
          
          {/* Right invisible bar */}
          <div className="absolute right-0 top-0 bottom-0 w-px"></div>
          
          {/* Content container with proper margins */}
          <div className="mx-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-12 mt-16">
              <TypingAnimation 
                text="Oprea Eric"
                className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent"
                delay={500}
              />
            </h2>

            {/* Glassmorphism container for content */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/10 hover:bg-white/8 hover:backdrop-blur-2xl hover:border-orange-500/20 hover:shadow-orange-500/10 hover:scale-[1.02] transition-all duration-500 group">
              <div className="space-y-8">
                {/* Text content with consistent line length */}
                <div className="max-w-4xl mx-auto space-y-6">
                  <motion.p 
                    className="text-lg leading-relaxed text-slate-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                  >
                    I'm a passionate Computer Science student at CTI, deeply fascinated by the intersection of 
                    technology and human potential. My journey in tech is driven by a genuine curiosity about 
                    artificial intelligence and its capacity to solve complex problems while augmenting human capabilities.
                  </motion.p>
                  
                  <motion.p 
                    className="text-lg leading-relaxed text-slate-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.8 }}
                  >
                    Beyond coding, I'm committed to personal growth through sports, mindfulness, and the pursuit 
                    of mental clarity. I believe that the best solutions emerge from a balanced mind, and I strive 
                    to bring this philosophy into every project I undertake. My goal is continuous learning and 
                    contributing to meaningful projects that make a positive impact.
                  </motion.p>
                </div>

                {/* Skills badges in organized layout */}
                <motion.div 
                  className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.1 }}
                >
                  {['Problem Solving', 'Continuous Learning', 'Team Collaboration', 'Innovation'].map((trait, index) => (
                    <motion.span
                      key={trait}
                      className="px-4 py-2 bg-orange-600/10 text-orange-400 rounded-full text-sm font-medium border border-orange-600/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 2.3 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {trait}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 