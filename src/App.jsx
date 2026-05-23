import { useEffect } from 'react'
import Navigation from './components/Navigation'
import About from './components/About'
import ProjectsAndSkills from './components/ProjectsAndSkills'
import Contact from './components/Contact'
import NetworkBackground from './components/NetworkBackground'

function App() {
  useEffect(() => {
    // Create custom cursor as single element with dot inside
    const cursor = document.createElement('div')
    const cursorDot = document.createElement('div')
    
    cursor.className = 'custom-cursor'
    cursorDot.className = 'custom-cursor-dot'
    
    // Make dot a child of cursor for unified movement
    cursor.appendChild(cursorDot)
    document.body.appendChild(cursor)

    // Single element tracking - both move together
    const handleMouseMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      
      // Only move the parent cursor - dot moves with it
      cursor.style.transform = `translate(${x - 10}px, ${y - 10}px)`
    }

    // Mouse down handler
    const handleMouseDown = () => {
      cursor.classList.add('click')
    }

    // Mouse up handler
    const handleMouseUp = () => {
      cursor.classList.remove('click')
    }

    // Hover handlers for interactive elements
    const handleMouseEnter = () => {
      cursor.classList.add('hover')
    }

    const handleMouseLeave = () => {
      cursor.classList.remove('hover')
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    // Function to add hover effects to elements
    const addHoverEffects = () => {
      const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea')
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    }

    // Initial setup and observer for dynamic elements
    addHoverEffects()
    
    const observer = new MutationObserver(() => {
      addHoverEffects()
    })
    
    observer.observe(document.body, { childList: true, subtree: true })

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      
      observer.disconnect()
      
      if (cursor.parentNode) cursor.parentNode.removeChild(cursor)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950/20 to-slate-950 text-slate-100 relative">
      {/* Network Background - behind everything */}
      <NetworkBackground />
      
      {/* Navigation with Binary Clock */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <About />
        <ProjectsAndSkills />
        <Contact />
      </main>
    </div>
  )
}

export default App
