"use client"

import { useEffect, useState } from "react"

const messages = [
  "✨ 50% OFF ALL CHARMS — Limited Time Only",
  "🚚 FREE SHIPPING on Orders Over $75",
  "💎 New Arrivals Weekly — Shop the Latest",
]

const AnnouncementBar = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className="w-full overflow-hidden relative"
      style={{ backgroundColor: "#8B6914", height: "40px" }}
    >
      <div className="flex items-center justify-center h-full px-4">
        <p
          className="text-xs sm:text-sm tracking-[0.2em] uppercase font-medium text-center transition-opacity duration-500"
          style={{ color: "#FFFAF5" }}
          key={index}
        >
          {messages[index]}
        </p>
      </div>
    </div>
  )
}

export default AnnouncementBar
