import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import AnnouncementBar from "@modules/home/components/announcement-bar"
import CategoryGrid from "@modules/home/components/category-grid"
import PromoBanner from "@modules/home/components/promo-banner"
import WhyCharmProject from "@modules/home/components/why-charm-project"
import ShopByStyle from "@modules/home/components/shop-by-style"
import Newsletter from "@modules/home/components/newsletter"
import CustomerFavorites from "@modules/home/components/customer-favorites"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Charm Project | Charm Your Way",
  description:
    "Discover beautifully crafted sterling silver charms, hand-enameled designs, and Murano-style glass beads. Curated collection compatible with all European-style bracelets. 50% off everything!",
}

export default async function Home({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <AnnouncementBar />
      <Hero />
      <CategoryGrid />
      <PromoBanner />
      <div className="py-12 sm:py-16" style={{ backgroundColor: "#FFFAF5" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: "#8B6914" }}
            >
              Curated for You
            </p>
            <h2
              className="text-3xl sm:text-4xl mb-4"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#6B5B3E",
                fontWeight: 400,
              }}
            >
              Featured Collections
            </h2>
            <div
              className="w-16 h-[1px] mx-auto"
              style={{ backgroundColor: "#8B6914" }}
            />
          </div>
        </div>
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
      <WhyCharmProject />
      <ShopByStyle />
      <CustomerFavorites />
      <Newsletter />
    </>
  )
}
