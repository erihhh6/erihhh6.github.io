import { useEffect, useRef } from 'react'

const NetworkBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId

    // Skills/Technologies as nodes - elegant sparse network with strategic connections
    const getNodes = (width, height) => [
      { id: 'javascript', label: 'JavaScript', x: width * 0.15, y: height * 0.25, connections: ['react', 'nodejs'] },
      { id: 'react', label: 'React', x: width * 0.35, y: height * 0.20, connections: ['css', 'typescript'] },
      { id: 'python', label: 'Python', x: width * 0.75, y: height * 0.30, connections: ['ai', 'flask'] },
      { id: 'html', label: 'HTML', x: width * 0.10, y: height * 0.50, connections: ['css'] },
      { id: 'css', label: 'CSS', x: width * 0.25, y: height * 0.45, connections: ['tailwind'] },
      { id: 'nodejs', label: 'Node.js', x: width * 0.50, y: height * 0.15, connections: ['mongodb'] },
      { id: 'ai', label: 'AI/ML', x: width * 0.90, y: height * 0.25, connections: ['algorithms'] },
      { id: 'sql', label: 'SQL', x: width * 0.60, y: height * 0.70, connections: [] },
      { id: 'git', label: 'Git', x: width * 0.20, y: height * 0.75, connections: ['linux'] },
      { id: 'linux', label: 'Linux', x: width * 0.40, y: height * 0.80, connections: [] },
      { id: 'tailwind', label: 'Tailwind', x: width * 0.45, y: height * 0.50, connections: [] },
      { id: 'flask', label: 'Flask', x: width * 0.80, y: height * 0.55, connections: [] },
      { id: 'algorithms', label: 'Algorithms', x: width * 0.85, y: height * 0.15, connections: ['cpp'] },
      { id: 'cpp', label: 'C++', x: width * 0.95, y: height * 0.10, connections: [] },
      { id: 'vscode', label: 'VS Code', x: width * 0.70, y: height * 0.85, connections: [] },
      { id: 'mongodb', label: 'MongoDB', x: width * 0.65, y: height * 0.25, connections: [] },
      { id: 'typescript', label: 'TypeScript', x: width * 0.55, y: height * 0.35, connections: [] }
    ]

    let nodes = []
    const particles = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      nodes = getNodes(canvas.width, canvas.height)
    }

    const createParticles = () => {
      nodes.forEach(node => {
        node.connections.forEach(connectionId => {
          const targetNode = nodes.find(n => n.id === connectionId)
          if (targetNode && Math.random() < 0.08) {
            particles.push({
              startNode: node,
              endNode: targetNode,
              progress: Math.random(),
              speed: 0.003 + Math.random() * 0.004,
              opacity: 0.4 + Math.random() * 0.3
            })
          }
        })
      })
    }

    const drawConnections = () => {
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.15)'
      ctx.lineWidth = 1
      ctx.setLineDash([3, 6])

      nodes.forEach(node => {
        node.connections.forEach(connectionId => {
          const targetNode = nodes.find(n => n.id === connectionId)
          if (targetNode) {
            // Create gradient line for more elegant look
            const gradient = ctx.createLinearGradient(node.x, node.y, targetNode.x, targetNode.y)
            gradient.addColorStop(0, 'rgba(249, 115, 22, 0.25)')
            gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.15)')
            gradient.addColorStop(1, 'rgba(249, 115, 22, 0.25)')
            
            ctx.strokeStyle = gradient
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(targetNode.x, targetNode.y)
            ctx.stroke()
          }
        })
      })
      ctx.setLineDash([])
    }

    const drawNodes = () => {
      nodes.forEach(node => {
        // Node circle with breathing effect
        const breathe = Math.sin(Date.now() * 0.0008 + node.x * 0.003) * 0.5 + 0.5
        const baseRadius = 4
        const radius = baseRadius + breathe * 1.5

        // Outer glow - very subtle orange
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 4)
        gradient.addColorStop(0, 'rgba(249, 115, 22, 0.3)') // orange-500
        gradient.addColorStop(0.4, 'rgba(245, 158, 11, 0.15)') // amber-500
        gradient.addColorStop(0.8, 'rgba(249, 115, 22, 0.05)')
        gradient.addColorStop(1, 'rgba(249, 115, 22, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius * 4, 0, Math.PI * 2)
        ctx.fill()

        // Middle ring - thinner with orange
        ctx.strokeStyle = `rgba(249, 115, 22, ${0.3 + breathe * 0.15})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius + 1, 0, Math.PI * 2)
        ctx.stroke()

        // Node core - orange
        ctx.fillStyle = `rgba(245, 158, 11, ${0.6 + breathe * 0.15})` // amber-500
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fill()

        // Inner bright core - warm white/amber
        ctx.fillStyle = `rgba(255, 251, 235, ${0.4 + breathe * 0.2})` // warm white
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius * 0.25, 0, Math.PI * 2)
        ctx.fill()

        // Node label - amber color
        ctx.fillStyle = `rgba(245, 158, 11, ${0.5 + breathe * 0.15})` // amber-500
        ctx.font = '8px monospace'
        ctx.textAlign = 'center'
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.lineWidth = 1.5
        ctx.strokeText(node.label, node.x, node.y - 15)
        ctx.fillText(node.label, node.x, node.y - 15)
      })
    }

    const drawParticles = () => {
      particles.forEach((particle, index) => {
        const { startNode, endNode, progress, opacity } = particle

        // Calculate current position
        const x = startNode.x + (endNode.x - startNode.x) * progress
        const y = startNode.y + (endNode.y - startNode.y) * progress

        // Draw particle with strong orange glow
        const particleGlow = ctx.createRadialGradient(x, y, 0, x, y, 8)
        particleGlow.addColorStop(0, `rgba(249, 115, 22, ${opacity})`) // orange-500
        particleGlow.addColorStop(0.5, `rgba(245, 158, 11, ${opacity * 0.5})`) // amber-500
        particleGlow.addColorStop(1, `rgba(249, 115, 22, 0)`)
        
        ctx.fillStyle = particleGlow
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fill()

        // Particle core - warm amber
        ctx.fillStyle = `rgba(255, 251, 235, ${opacity * 1.2})` // warm white
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()

        // Update particle
        particle.progress += particle.speed
        
        // Remove particle when it reaches the end
        if (particle.progress >= 1) {
          particles.splice(index, 1)
        }
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      drawConnections()
      drawNodes()
      drawParticles()

      // Occasionally add new particles - less frequent for cleaner look
      if (Math.random() < 0.01) {
        createParticles()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Initialize
    resizeCanvas()
    createParticles()
    animate()

    // Handle window resize
    const handleResize = () => {
      resizeCanvas()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ 
        background: 'transparent',
        opacity: 0.9 
      }}
    />
  )
}

export default NetworkBackground 