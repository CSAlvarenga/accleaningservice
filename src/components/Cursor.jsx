import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export default function Cursor() {
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const springX = useSpring(mouseX, { stiffness: 100, damping: 18, mass: 0.4 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 18, mass: 0.4 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [visible])

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: clicking ? 28 : 38,
        height: clicking ? 28 : 38,
        backgroundColor: 'rgba(23, 168, 168, 0.1)',
        border: '1.5px solid rgba(23, 168, 168, 0.55)',
        boxShadow: clicking
          ? '0 0 10px rgba(23,168,168,0.3)'
          : '0 0 20px rgba(23,168,168,0.2), 0 0 40px rgba(23,168,168,0.08)',
        opacity: visible ? 1 : 0,
        transition: 'width 0.15s ease, height 0.15s ease, opacity 0.3s ease, box-shadow 0.15s ease',
      }}
    />
  )
}
