import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: Promise<Record<string, string | undefined>>
  params: Promise<{ countryCode: string }>
}

export default async function StorePage({ searchParams, params }: Params) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const { sortBy, page } = resolvedSearchParams

  return (
    <StoreTemplate
      sortBy={sortBy as SortOptions}
      page={page}
      countryCode={resolvedParams.countryCode}
      searchParams={resolvedSearchParams}
    />
  )
}
