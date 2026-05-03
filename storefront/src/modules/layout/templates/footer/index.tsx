import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="border-t border-ui-border-base w-full" style={{ backgroundColor: '#FFFAF5' }}>
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
          <div>
            <LocalizedClientLink
              href="/"
              className="hover:opacity-80 transition-opacity"
            >
              <span style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.25rem',
                letterSpacing: '0.15em',
                color: '#8B6914',
              }}>
                Charm Project
              </span>
            </LocalizedClientLink>
            <p className="mt-3 text-sm max-w-xs" style={{ color: '#8B7355' }}>
              Charm Your Way — beautifully crafted charms for every bracelet and every story.
            </p>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
            {product_categories && product_categories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus" style={{ color: '#6B5B3E' }}>
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {product_categories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 txt-small"
                        key={c.id}
                        style={{ color: '#8B7355' }}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-ui-fg-base",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus" style={{ color: '#6B5B3E' }}>
                  Collections
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                  style={{ color: '#8B7355' }}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus" style={{ color: '#6B5B3E' }}>Help</span>
              <ul className="grid grid-cols-1 gap-y-2 txt-small" style={{ color: '#8B7355' }}>
                <li>
                  <LocalizedClientLink href="/store" className="hover:text-ui-fg-base">
                    Shop All
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="/account" className="hover:text-ui-fg-base">
                    My Account
                  </LocalizedClientLink>
                </li>
                <li>
                  <a href="mailto:hello@charmproject.shop" className="hover:text-ui-fg-base">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full mb-16 justify-between" style={{ color: '#B8A88A' }}>
          <Text className="txt-compact-small">
            &copy; {new Date().getFullYear()} Charm Project. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  )
}
