import LocalizedClientLink from "@modules/common/components/localized-client-link"

const categories = [
  {
    name: "Hearts & Love",
    handle: "hearts-love",
    emoji: "💕",
    gradient: "linear-gradient(135deg, #FDDEDE 0%, #F5C6C6 100%)",
  },
  {
    name: "Dangle Charms",
    handle: "dangle-charms",
    emoji: "✨",
    gradient: "linear-gradient(135deg, #FFF3CD 0%, #F5E6D0 100%)",
  },
  {
    name: "Glass & Murano Beads",
    handle: "glass-murano",
    emoji: "🔮",
    gradient: "linear-gradient(135deg, #D4E6F1 0%, #C5CAE9 100%)",
  },
  {
    name: "Animals & Nature",
    handle: "animals-nature",
    emoji: "🦋",
    gradient: "linear-gradient(135deg, #D5F5E3 0%, #C8E6C9 100%)",
  },
  {
    name: "Rose Gold Collection",
    handle: "rose-gold",
    emoji: "🌹",
    gradient: "linear-gradient(135deg, #F5E6D0 0%, #E8D5B7 100%)",
  },
  {
    name: "Celestial & Stars",
    handle: "celestial-stars",
    emoji: "🌙",
    gradient: "linear-gradient(135deg, #E8DAEF 0%, #D2B4DE 100%)",
  },
]

const CategoryGrid = () => {
  return (
    <section className="w-full py-16 sm:py-20 px-4" style={{ backgroundColor: "#FFFAF5" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "#8B6914" }}
          >
            Explore Our World
          </p>
          <h2
            className="text-3xl sm:text-4xl mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B5B3E",
              fontWeight: 400,
            }}
          >
            Shop by Category
          </h2>
          <div
            className="w-16 h-[1px] mx-auto"
            style={{ backgroundColor: "#8B6914" }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <LocalizedClientLink
              key={cat.handle}
              href={`/categories/${cat.handle}`}
              className="group block"
            >
              <div
                className="relative rounded-lg overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1"
                style={{ background: cat.gradient }}
              >
                <div className="flex flex-col items-center justify-center py-10 sm:py-14 px-4">
                  <span className="text-4xl sm:text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                    {cat.emoji}
                  </span>
                  <h3
                    className="text-sm sm:text-base tracking-wide text-center"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      color: "#6B5B3E",
                      fontWeight: 500,
                    }}
                  >
                    {cat.name}
                  </h3>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ backgroundColor: "#8B6914" }}
                />
              </div>
            </LocalizedClientLink>
          ))}
        </div>

        <div className="text-center mt-10">
          <LocalizedClientLink
            href="/store"
            className="inline-block text-sm tracking-[0.15em] uppercase border-b-[1px] pb-1 transition-colors duration-300 hover:opacity-80"
            style={{ color: "#8B6914", borderColor: "#8B6914" }}
          >
            View All Categories →
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid
