'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Category } from '@/types'

interface ProductFiltersProps {
  categories: Category[]
  selectedCategory: string
  priceRange: [number, number]
  onCategoryChange: (id: string) => void
  onPriceChange: (range: [number, number]) => void
  onReset: () => void
}

const PRICE_RANGES: { label: string; range: [number, number] }[] = [
  { label: 'Under $30',     range: [0, 30] },
  { label: '$30 – $80',     range: [30, 80] },
  { label: '$80 – $150',    range: [80, 150] },
  { label: '$150 – $300',   range: [150, 300] },
  { label: 'Over $300',     range: [300, 9999] },
]

const ProductFilters = ({
  categories,
  selectedCategory,
  priceRange,
  onCategoryChange,
  onPriceChange,
  onReset,
}: ProductFiltersProps) => {
  return (
    <aside className="flex flex-col gap-6">

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-900">Filters</p>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
        >
          <X className="size-3" /> Reset
        </button>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
          Category
        </p>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onCategoryChange('')}
            className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              selectedCategory === ''
                ? 'bg-zinc-900 text-white font-medium'
                : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-zinc-900 text-white font-medium'
                  : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-400">
          Price Range
        </p>
        <div className="flex flex-col gap-1">
          {PRICE_RANGES.map(({ label, range }) => {
            const isActive =
              priceRange[0] === range[0] && priceRange[1] === range[1]
            return (
              <Button
                key={label}
                variant={"ghost"}
                onClick={() => onPriceChange(range)}
                className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  isActive
                    ? 'bg-amber-50 text-amber-700 font-medium border border-amber-200'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                {label}
              </Button>
            )
          })}
        </div>
      </div>

    </aside>
  )
}

export default ProductFilters