'use client'

import { useState, useEffect } from 'react'
import { Laptop, Shirt, Home, Dumbbell, BookOpen, Headphones, LucideIcon } from 'lucide-react'
import Container from '@/components/shared/Container'
import SectionHeader from '@/components/shared/SectionHeader'
import CategoryCard from '@/components/atom/CategoryCard'
import { ROUTES } from '@/config/routes'

interface Category {
  id: string
  name: string
  description: string | null
  products: any[]
  createdAt: string
  updatedAt: string
}

// Icon map to match DB category names to Lucide icons
const ICON_MAP: Record<string, LucideIcon> = {
  'Electronics':  Laptop,
  'Fashion':      Shirt,
  'Home & Living': Home,
  'Sports':       Dumbbell,
  'Books':        BookOpen,
  'Audio':        Headphones,
}

const BG_MAP: Record<string, { bg: string; iconColor: string }> = {
  'Electronics':   { bg: 'bg-blue-50',   iconColor: 'text-blue-500' },
  'Fashion':       { bg: 'bg-pink-50',   iconColor: 'text-pink-500' },
  'Home & Living': { bg: 'bg-amber-50',  iconColor: 'text-amber-500' },
  'Sports':        { bg: 'bg-green-50',  iconColor: 'text-green-500' },
  'Books':         { bg: 'bg-purple-50', iconColor: 'text-purple-500' },
  'Audio':         { bg: 'bg-orange-50', iconColor: 'text-orange-500' },
}

const CategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <Container className="bg-zinc-50">
      <SectionHeader
        eyebrow="Browse by category"
        title="Shop What You Love"
        viewAllHref={ROUTES.PRODUCTS}
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 rounded-2xl bg-zinc-100 animate-pulse" />
            ))
          : categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                icon={ICON_MAP[cat.name] ?? Laptop}
                label={cat.name}
                href={ROUTES.PRODUCTS}
                count={`${cat.products?.length ?? 0}`}
                bg={BG_MAP[cat.name]?.bg ?? 'bg-zinc-50'}
                iconColor={BG_MAP[cat.name]?.iconColor ?? 'text-zinc-500'}
              />
            ))
        }
      </div>
    </Container>
  )
}

export default CategoriesSection