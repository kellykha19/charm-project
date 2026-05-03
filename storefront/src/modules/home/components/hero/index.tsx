import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: "85vh" }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #FFFAF5 0%, #F5E6D0 30%, #E8D5B7 60%, #D4B896 85%, #C4A97D 100%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #8B6914 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, #8B6914 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: "#8B6914" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "#D4B896" }}
      />

      <div className="relative z-10 flex flex-col justify-center items-center text-center px-6 sm:px-12 py-24 sm:py-32" style={{ minHeight: "85vh" }}>
        <div
          className="inline-block px-5 py-1.5 rounded-full text-xs tracking-[0.25em] uppercase mb-8"
          style={{
            backgroundColor: "rgba(139, 105, 20, 0.1)",
            color: "#8B6914",
            border: "1px solid rgba(139, 105, 20, 0.2)",
          }}
        >
          ✨ 50% Off Everything — Limited Time
        </div>

        <span
          className="block mb-2"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            letterSpacing: "0.08em",
            color: "#8B6914",
            fontWeight: 400,
            lineHeight: 1.1,
          }}
        >
          Charm Project
        </span>

        <Heading
          level="h2"
          className="text-lg sm:text-xl leading-8 font-normal mt-2 mb-6"
          style={{
            color: "#6B5B3E",
            letterSpacing: "0.15em",
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
        >
          Charm Your Way
        </Heading>

        <div
          className="w-12 h-[1px] mb-6"
          style={{ backgroundColor: "#8B6914" }}
        />

        <p
          className="max-w-lg text-sm sm:text-base leading-relaxed mb-10"
          style={{ color: "#8B7355" }}
        >
          Discover beautifully crafted sterling silver charms, hand-enameled
          designs, and Murano-style glass beads. Each piece tells a story —
          find yours.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <LocalizedClientLink
            href="/store"
            className="inline-block px-10 py-3.5 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            style={{
              backgroundColor: "#8B6914",
              color: "#FFFAF5",
              borderRadius: "2px",
            }}
          >
            Shop All Charms
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/categories/hearts-love"
            className="inline-block px-10 py-3.5 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            style={{
              backgroundColor: "transparent",
              color: "#8B6914",
              borderRadius: "2px",
              border: "1px solid #8B6914",
            }}
          >
            Bestsellers
          </LocalizedClientLink>
        </div>

        <div
          className="flex items-center gap-6 mt-12 text-xs tracking-wide"
          style={{ color: "#8B7355" }}
        >
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4" style={{ color: "#8B6914" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            Free Shipping $75+
          </span>
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4" style={{ color: "#8B6914" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            Secure Checkout
          </span>
          <span className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4" style={{ color: "#8B6914" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
            Premium Quality
          </span>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-6 h-6"
          style={{ color: "#8B6914", opacity: 0.5 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </div>
  )
}

export default Hero
