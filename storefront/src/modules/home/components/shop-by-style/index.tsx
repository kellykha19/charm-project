import LocalizedClientLink from "@modules/common/components/localized-client-link"

const styles = [
  {
    name: "Romantic",
    description: "Hearts, roses & love-inspired charms",
    handle: "hearts-love",
    gradient: "linear-gradient(135deg, #F8E8E8 0%, #F5D0D0 40%, #E8B4B4 100%)",
    emoji: "🌹",
  },
  {
    name: "Playful",
    description: "Colorful enamels & whimsical designs",
    handle: "enamel-charms",
    gradient: "linear-gradient(135deg, #FFF3CD 0%, #FFE8A1 40%, #F5D575 100%)",
    emoji: "🎀",
  },
  {
    name: "Elegant",
    description: "Timeless silver & sophisticated pieces",
    handle: "clips-spacers",
    gradient: "linear-gradient(135deg, #E8E8E8 0%, #D5D5D5 40%, #C0C0C0 100%)",
    emoji: "💎",
  },
]

const ShopByStyle = () => {
  return (
    <section
      className="w-full py-16 sm:py-20 px-4"
      style={{ backgroundColor: "#F5E6D0" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "#8B6914" }}
          >
            Find Your Aesthetic
          </p>
          <h2
            className="text-3xl sm:text-4xl mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B5B3E",
              fontWeight: 400,
            }}
          >
            Shop by Style
          </h2>
          <div
            className="w-16 h-[1px] mx-auto"
            style={{ backgroundColor: "#8B6914" }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {styles.map((s) => (
            <LocalizedClientLink
              key={s.name}
              href={`/categories/${s.handle}`}
              className="group block"
            >
              <div
                className="relative rounded-lg overflow-hidden transition-all duration-500 group-hover:shadow-xl"
                style={{ background: s.gradient }}
              >
                <div className="flex flex-col items-center justify-center py-20 sm:py-28 px-6 text-center">
                  <span className="text-5xl sm:text-6xl mb-5 transition-transform duration-500 group-hover:scale-110">
                    {s.emoji}
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl mb-3"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: "#6B5B3E",
                      fontWeight: 400,
                    }}
                  >
                    {s.name}
                  </h3>
                  <p
                    className="text-sm max-w-[200px]"
                    style={{ color: "#8B7355" }}
                  >
                    {s.description}
                  </p>
                  <span
                    className="mt-5 inline-block text-xs tracking-[0.2em] uppercase border-b pb-0.5 transition-colors duration-300"
                    style={{ color: "#8B6914", borderColor: "#8B6914" }}
                  >
                    Explore →
                  </span>
                </div>
              </div>
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShopByStyle
