import { useEffect, useRef } from 'react'

const NODE_COUNT = 60
const PROXIMITY_THRESHOLD = 180
const CURSOR_RADIUS = 120
const CURSOR_FORCE = 0.012

const NetworkBackground = () => {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let nodes = []

    function randomBetween(a, b) {
      return a + Math.random() * (b - a)
    }

    function createNode(width, height) {
      return {
        x: randomBetween(20, width - 20),
        y: randomBetween(20, height - 20),
        vx: randomBetween(-0.25, 0.25),
        vy: randomBetween(-0.25, 0.25),
        radius: randomBetween(2, 4),
        hue: Math.random() < 0.5 ? 'orange' : 'amber',
        phase: randomBetween(0, Math.PI * 2),
      }
    }

    function initNodes() {
      nodes = []
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push(createNode(canvas.width, canvas.height))
      }
    }

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initNodes()
    }

    // ── Update ──────────────────────────────────────────────────────────────

    function updateNodes() {
      const { x: mx, y: my } = mouseRef.current

      nodes.forEach(node => {
        // Cursor attraction
        const dx = mx - node.x
        const dy = my - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < CURSOR_RADIUS && dist > 0) {
          const strength = (1 - dist / CURSOR_RADIUS) * CURSOR_FORCE
          node.vx += dx / dist * strength
          node.vy += dy / dist * strength
        }

        // Speed cap — keep drift gentle
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy)
        const maxSpeed = 0.1
        if (speed > maxSpeed) {
          node.vx = (node.vx / speed) * maxSpeed
          node.vy = (node.vy / speed) * maxSpeed
        }

        node.x += node.vx
        node.y += node.vy

        // Soft bounce off edges
        const margin = 30
        if (node.x < margin) { node.vx += 0.05; node.x = Math.max(node.x, 1) }
        if (node.x > canvas.width - margin) { node.vx -= 0.05; node.x = Math.min(node.x, canvas.width - 1) }
        if (node.y < margin) { node.vy += 0.05; node.y = Math.max(node.y, 1) }
        if (node.y > canvas.height - margin) { node.vy -= 0.05; node.y = Math.min(node.y, canvas.height - 1) }
      })
    }

    // ── Draw ────────────────────────────────────────────────────────────────

    function drawEdges() {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < PROXIMITY_THRESHOLD) {
            const t = 1 - dist / PROXIMITY_THRESHOLD
            const opacity = 0.08 + t * 0.24

            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
            grad.addColorStop(0, `rgba(249, 115, 22, ${opacity})`)
            grad.addColorStop(0.5, `rgba(245, 158, 11, ${opacity * 1.3})`)
            grad.addColorStop(1, `rgba(249, 115, 22, ${opacity})`)

            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = grad
            ctx.lineWidth = t * 1.2
            ctx.stroke()
          }
        }
      }
    }

    function drawNodes() {
      const now = Date.now()
      nodes.forEach(node => {
        const breathe = Math.sin(now * 0.001 + node.phase) * 0.5 + 0.5
        const r = node.radius + breathe * 1.2
        const glowR = 18 + breathe * 8

        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR)
        if (node.hue === 'orange') {
          glow.addColorStop(0, `rgba(249, 115, 22, ${0.25 + breathe * 0.1})`)
          glow.addColorStop(0.5, `rgba(249, 115, 22, 0.08)`)
        } else {
          glow.addColorStop(0, `rgba(245, 158, 11, ${0.25 + breathe * 0.1})`)
          glow.addColorStop(0.5, `rgba(245, 158, 11, 0.08)`)
        }
        glow.addColorStop(1, 'rgba(249, 115, 22, 0)')

        ctx.beginPath()
        ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        const core = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r)
        core.addColorStop(0, `rgba(255, 251, 235, ${0.9 + breathe * 0.1})`)
        core.addColorStop(0.5, node.hue === 'orange'
          ? `rgba(249, 115, 22, ${0.8 + breathe * 0.1})`
          : `rgba(245, 158, 11, ${0.8 + breathe * 0.1})`)
        core.addColorStop(1, 'rgba(249, 115, 22, 0.2)')

        ctx.beginPath()
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2)
        ctx.fillStyle = core
        ctx.fill()
      })
    }

    // ── Loop ────────────────────────────────────────────────────────────────

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      updateNodes()
      drawEdges()
      drawNodes()

      animationFrameId = requestAnimationFrame(animate)
    }

    // ── Mouse ───────────────────────────────────────────────────────────────

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    // ── Init ────────────────────────────────────────────────────────────────

    resize()
    animate()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent', willChange: 'transform', opacity: 0.85 }}
    />
  )
}

export default NetworkBackground
