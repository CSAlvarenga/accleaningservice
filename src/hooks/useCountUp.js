import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

export function useCountUp(end, duration = 2200) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return
    let startTime = null
    let frame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isInView, end, duration])

  return { count, ref }
}
