"use client"

import { Text, clx } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

const FILTER_GROUPS = [
  {
    key: "style",
    title: "Style",
    options: [
      { value: "charm", label: "Charm" },
      { value: "dangle", label: "Dangle" },
      { value: "clip", label: "Clip" },
      { value: "spacer", label: "Spacer" },
      { value: "murano_bead", label: "Murano Bead" },
      { value: "openwork", label: "Openwork" },
      { value: "pave", label: "Pavé" },
      { value: "safety_chain", label: "Safety Chain" },
    ],
  },
  {
    key: "color",
    title: "Color",
    options: [
      { value: "silver", label: "Silver" },
      { value: "gold", label: "Gold" },
      { value: "rose_gold", label: "Rose Gold" },
      { value: "two_tone", label: "Two-Tone" },
      { value: "blue", label: "Blue" },
      { value: "pink", label: "Pink" },
      { value: "red", label: "Red" },
      { value: "green", label: "Green" },
      { value: "purple", label: "Purple" },
      { value: "turquoise", label: "Turquoise" },
      { value: "black", label: "Black" },
      { value: "multicolor", label: "Multicolor" },
    ],
  },
  {
    key: "themes",
    title: "Theme",
    options: [
      { value: "love", label: "Love & Romance" },
      { value: "animals", label: "Animals" },
      { value: "nature", label: "Nature & Garden" },
      { value: "fantasy", label: "Fantasy" },
      { value: "family", label: "Family" },
      { value: "travel", label: "Travel" },
      { value: "fashion", label: "Fashion" },
      { value: "spiritual", label: "Spiritual" },
      { value: "food", label: "Food & Drink" },
      { value: "holiday", label: "Holiday" },
      { value: "nautical", label: "Nautical" },
      { value: "lucky", label: "Lucky Charms" },
    ],
  },
  {
    key: "franchise",
    title: "Franchise",
    options: [
      { value: "disney", label: "Disney" },
      { value: "star_wars", label: "Star Wars" },
      { value: "harry_potter", label: "Harry Potter" },
      { value: "marvel", label: "Marvel" },
      { value: "nintendo", label: "Nintendo" },
    ],
  },
  {
    key: "has_stones",
    title: "Features",
    options: [
      { value: "yes", label: "With Stones" },
    ],
  },
  {
    key: "enamel",
    title: "",
    options: [
      { value: "yes", label: "With Enamel" },
    ],
  },
]

export default function FilterProducts() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    style: true,
  })

  const getActiveValues = (key: string): string[] => {
    const val = searchParams.get(key)
    return val ? val.split(",").filter(Boolean) : []
  }

  const toggleFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      const current = params.get(key)?.split(",").filter(Boolean) || []

      const idx = current.indexOf(value)
      if (idx > -1) {
        current.splice(idx, 1)
      } else {
        current.push(value)
      }

      if (current.length > 0) {
        params.set(key, current.join(","))
      } else {
        params.delete(key)
      }

      params.delete("page")
      router.push(`${pathname}?${params.toString()}`)
    },
    [searchParams, pathname, router]
  )

  const clearAll = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    for (const g of FILTER_GROUPS) {
      params.delete(g.key)
    }
    params.delete("page")
    router.push(`${pathname}?${params.toString()}`)
  }, [searchParams, pathname, router])

  const totalActive = FILTER_GROUPS.reduce(
    (sum, g) => sum + getActiveValues(g.key).length,
    0
  )

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const mergedGroups = FILTER_GROUPS.reduce<
    { key: string; title: string; options: { value: string; label: string }[] }[]
  >((acc, g) => {
    if (!g.title && acc.length > 0) {
      acc[acc.length - 1].options.push(
        ...g.options.map((o) => ({ ...o, _key: g.key }))
      )
      return acc
    }
    return [...acc, { ...g, options: g.options.map((o) => ({ ...o, _key: g.key })) }]
  }, [])

  return (
    <div className="flex flex-col gap-y-4">
      {totalActive > 0 && (
        <button
          onClick={clearAll}
          className="text-xs text-ui-fg-interactive hover:text-ui-fg-interactive-hover underline text-left"
        >
          Clear all filters ({totalActive})
        </button>
      )}

      {FILTER_GROUPS.map((group) => {
        if (!group.title) return null
        const active = getActiveValues(group.key)

        const nextGroup = FILTER_GROUPS[FILTER_GROUPS.indexOf(group) + 1]
        const extraOptions =
          nextGroup && !nextGroup.title ? nextGroup.options : []

        const isOpen = openGroups[group.key] ?? false

        return (
          <div key={group.key} className="border-b border-ui-border-base pb-3">
            <button
              onClick={() => toggleGroup(group.key)}
              className="flex items-center justify-between w-full py-1"
            >
              <Text className="txt-compact-small-plus text-ui-fg-muted">
                {group.title}
                {active.length > 0 && (
                  <span className="ml-1 text-ui-fg-interactive">
                    ({active.length})
                  </span>
                )}
              </Text>
              <svg
                className={clx(
                  "w-4 h-4 text-ui-fg-muted transition-transform",
                  isOpen && "rotate-180"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="flex flex-col gap-y-1.5 mt-2">
                {group.options.map((opt) => {
                  const checked = active.includes(opt.value)
                  return (
                    <label
                      key={`${group.key}-${opt.value}`}
                      className="flex items-center gap-x-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleFilter(group.key, opt.value)}
                        className="rounded border-ui-border-base text-ui-fg-interactive focus:ring-ui-fg-interactive h-3.5 w-3.5"
                      />
                      <span
                        className={clx(
                          "txt-compact-small text-ui-fg-subtle group-hover:text-ui-fg-base",
                          checked && "text-ui-fg-base font-medium"
                        )}
                      >
                        {opt.label}
                      </span>
                    </label>
                  )
                })}
                {extraOptions.map((opt) => {
                  const extraKey = (opt as any)._key || group.key
                  const extraActive = getActiveValues(extraKey)
                  const checked = extraActive.includes(opt.value)
                  return (
                    <label
                      key={`${extraKey}-${opt.value}`}
                      className="flex items-center gap-x-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleFilter(extraKey, opt.value)}
                        className="rounded border-ui-border-base text-ui-fg-interactive focus:ring-ui-fg-interactive h-3.5 w-3.5"
                      />
                      <span
                        className={clx(
                          "txt-compact-small text-ui-fg-subtle group-hover:text-ui-fg-base",
                          checked && "text-ui-fg-base font-medium"
                        )}
                      >
                        {opt.label}
                      </span>
                    </label>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
