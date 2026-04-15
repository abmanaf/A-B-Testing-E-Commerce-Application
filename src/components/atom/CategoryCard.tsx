import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CategoryCardProps {
  icon: LucideIcon
  label: string
  href: string
  count: string
  bg: string
  iconColor: string
}

const CategoryCard = ({ icon: Icon, label, href, count, bg, iconColor }: CategoryCardProps) => {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-3 rounded-2xl border border-zinc-100 bg-white p-6 transition-all hover:border-zinc-200 hover:shadow-sm"
    >
      <div className={cn("flex size-12 items-center justify-center rounded-xl", bg)}>
        <Icon className={cn("size-5", iconColor)} />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-zinc-800 group-hover:text-zinc-900">{label}</p>
        <p className="mt-0.5 text-xs text-zinc-400">{count} items</p>
      </div>
    </Link>
  )
}

export default CategoryCard