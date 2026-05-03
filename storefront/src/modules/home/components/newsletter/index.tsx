"use client"

import { useState } from "react"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section
      className="w-full py-16 sm:py-20 px-4"
      style={{
        background:
          "linear-gradient(135deg, #FFFAF5 0%, #F5E6D0 50%, #E8D5B7 100%)",
      }}
    >
      <div className="max-w-xl mx-auto text-center">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-3"
          style={{ color: "#8B6914" }}
        >
          Stay Connected
        </p>
        <h2
          className="text-3xl sm:text-4xl mb-4"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#6B5B3E",
            fontWeight: 400,
          }}
        >
          Join the Charm Circle
        </h2>
        <p className="text-sm sm:text-base mb-8" style={{ color: "#8B7355" }}>
          Be the first to know about new arrivals, exclusive offers, and charm
          styling tips. Plus, get 10% off your first order.
        </p>

        {submitted ? (
          <div
            className="py-4 px-6 rounded-md"
            style={{ backgroundColor: "#F5E6D0" }}
          >
            <p
              className="text-sm tracking-wide"
              style={{ color: "#6B5B3E" }}
            >
              Welcome to the Charm Circle! Check your inbox for your 10% off
              code.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 text-sm rounded-sm border outline-none transition-colors duration-300 focus:border-[#8B6914]"
              style={{
                borderColor: "#E8D5B7",
                backgroundColor: "#FFFAF5",
                color: "#6B5B3E",
              }}
            />
            <button
              type="submit"
              className="px-8 py-3 text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:opacity-90 rounded-sm shrink-0"
              style={{
                backgroundColor: "#8B6914",
                color: "#FFFAF5",
              }}
            >
              Subscribe
            </button>
          </form>
        )}

        <p
          className="text-xs mt-4"
          style={{ color: "#8B7355", opacity: 0.7 }}
        >
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}

export default Newsletter
