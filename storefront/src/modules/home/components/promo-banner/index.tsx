import LocalizedClientLink from "@modules/common/components/localized-client-link"

const PromoBanner = () => {
  return (
    <section
      className="w-full relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #6B5B3E 0%, #8B6914 50%, #A67C00 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center py-14 sm:py-20 px-6">
        <p
          className="text-xs sm:text-sm tracking-[0.3em] uppercase mb-4"
          style={{ color: "#F5E6D0" }}
        >
          Limited Time Offer
        </p>
        <h2
          className="text-4xl sm:text-5xl lg:text-6xl mb-4"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#FFFAF5",
            fontWeight: 400,
            lineHeight: 1.1,
          }}
        >
          50% Off Everything
        </h2>
        <p
          className="text-base sm:text-lg mb-8 max-w-xl mx-auto"
          style={{ color: "#E8D5B7", lineHeight: 1.6 }}
        >
          Every charm, every bead, every collection — all at half price. Don't
          miss your chance to build the bracelet of your dreams.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <LocalizedClientLink
            href="/store"
            className="inline-block px-10 py-3.5 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:opacity-90"
            style={{
              backgroundColor: "#FFFAF5",
              color: "#8B6914",
              borderRadius: "2px",
            }}
          >
            Shop the Sale
          </LocalizedClientLink>
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: "#E8D5B7" }}
          >
            Use code: CHARM50
          </span>
        </div>
      </div>
    </section>
  )
}

export default PromoBanner
