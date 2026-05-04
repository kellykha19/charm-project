import { getProductsListWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { HttpTypes } from "@medusajs/types"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

type Filters = {
  color?: string
  style?: string
  themes?: string
  franchise?: string
  has_stones?: string
  enamel?: string
}

function matchesFilter(product: HttpTypes.StoreProduct, filters: Filters): boolean {
  const meta = (product as any).metadata as Record<string, string> | null
  if (!meta) return Object.keys(filters).length === 0

  for (const [key, filterValue] of Object.entries(filters)) {
    if (!filterValue) continue
    const filterValues = filterValue.split(",").filter(Boolean)
    if (filterValues.length === 0) continue

    const productValue = meta[key] || ""
    const productValues = productValue.split(",").filter(Boolean)

    const hasMatch = filterValues.some((fv) => productValues.includes(fv))
    if (!hasMatch) return false
  }
  return true
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  filters,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  filters?: Filters
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 100,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const hasFilters = filters && Object.values(filters).some((v) => v)

  const fetchLimit = hasFilters ? 500 : 100

  let {
    response: { products: allProducts },
  } = await getProductsListWithSort({
    page: 1,
    queryParams: { ...queryParams, limit: fetchLimit },
    sortBy,
    countryCode,
  })

  const filtered = hasFilters
    ? allProducts.filter((p) => matchesFilter(p, filters!))
    : allProducts

  const count = filtered.length
  const start = (page - 1) * PRODUCT_LIMIT
  const products = filtered.slice(start, start + PRODUCT_LIMIT)
  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      {hasFilters && (
        <p className="text-sm text-ui-fg-muted mb-4">
          {count} product{count !== 1 ? "s" : ""} found
        </p>
      )}
      <ul
        className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          )
        })}
      </ul>
      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-ui-fg-muted">
          <p className="text-lg">No products match your filters</p>
          <p className="text-sm mt-2">Try adjusting or clearing your filters</p>
        </div>
      )}
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
