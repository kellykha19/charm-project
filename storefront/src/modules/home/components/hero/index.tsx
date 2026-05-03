import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <div
      className="h-[75vh] w-full border-b border-ui-border-base relative"
      style={{
        background: "linear-gradient(135deg, #FFFAF5 0%, #F5E6D0 40%, #E8D5B7 70%, #D4B896 100%)",
      }}
    >
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "3.5rem",
            letterSpacing: "0.12em",
            color: "#8B6914",
            fontWeight: 400,
          }}
        >
          Charm Project
        </span>
        <Heading
          level="h2"
          className="text-xl leading-8 font-normal"
          style={{ color: "#6B5B3E", letterSpacing: "0.05em" }}
        >
          Charm Your Way
        </Heading>
        <p
          className="max-w-lg text-base leading-relaxed"
          style={{ color: "#8B7355" }}
        >
          Discover our curated collection of beautifully crafted charms.
          Sterling silver, hand-enameled designs, and Murano-style glass — each
          piece tells a story. Find yours.
        </p>
        <LocalizedClientLink
          href="/store"
          className="mt-4 inline-block px-8 py-3 text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-90"
          style={{
            backgroundColor: "#8B6914",
            color: "#FFFAF5",
            borderRadius: "2px",
            letterSpacing: "0.2em",
          }}
        >
          Shop Now
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Hero
