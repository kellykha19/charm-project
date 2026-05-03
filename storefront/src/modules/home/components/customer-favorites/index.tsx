const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "Absolutely gorgeous charms! The quality is incredible for the price. My Pandora-loving friends can't tell the difference.",
    item: "Glass & Murano Bead",
  },
  {
    name: "Jessica L.",
    rating: 5,
    text: "I'm obsessed with the rose gold collection. Every piece is so delicate and beautiful. Already placed my third order!",
    item: "Rose Gold Heart Clip",
  },
  {
    name: "Emily R.",
    rating: 5,
    text: "Fast shipping and the charms arrived in a lovely box. The enamel detailing is so much better than I expected.",
    item: "Enamel Butterfly Charm",
  },
  {
    name: "Amanda K.",
    rating: 5,
    text: "Best charm shop I've found online! Great prices, and the sterling silver quality is top notch. Highly recommend.",
    item: "Celestial Star Dangle",
  },
]

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5" style={{ color: "#8B6914" }}>
    {Array.from({ length: count }).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
          clipRule="evenodd"
        />
      </svg>
    ))}
  </div>
)

const CustomerFavorites = () => {
  return (
    <section className="w-full py-16 sm:py-20 px-4" style={{ backgroundColor: "#FFFAF5" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "#8B6914" }}
          >
            Loved by Thousands
          </p>
          <h2
            className="text-3xl sm:text-4xl mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#6B5B3E",
              fontWeight: 400,
            }}
          >
            What Our Customers Say
          </h2>
          <div
            className="w-16 h-[1px] mx-auto mb-6"
            style={{ backgroundColor: "#8B6914" }}
          />
          <div className="flex items-center justify-center gap-2 mb-2">
            <Stars count={5} />
            <span
              className="text-sm font-medium ml-1"
              style={{ color: "#6B5B3E" }}
            >
              4.9 / 5
            </span>
          </div>
          <p className="text-xs" style={{ color: "#8B7355" }}>
            Based on 2,400+ reviews
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="rounded-lg p-6 transition-all duration-300 hover:shadow-md"
              style={{ backgroundColor: "#F5E6D0" }}
            >
              <Stars count={r.rating} />
              <p
                className="text-sm mt-4 mb-4 leading-relaxed"
                style={{ color: "#6B5B3E" }}
              >
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="border-t pt-3" style={{ borderColor: "#E8D5B7" }}>
                <p
                  className="text-xs font-medium"
                  style={{ color: "#6B5B3E" }}
                >
                  {r.name}
                </p>
                <p className="text-xs" style={{ color: "#8B7355" }}>
                  Purchased: {r.item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CustomerFavorites
