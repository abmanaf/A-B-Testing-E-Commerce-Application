import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TestimonialCardProps {
  name: string
  role: string
  quote: string
  rating: number
  initials: string
  color: string
}

const TestimonialCard = ({ name, role, quote, rating, initials, color }: TestimonialCardProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-zinc-100 bg-white p-6">
      <div className="flex gap-0.5">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>

      <p className="text-sm text-zinc-600 leading-relaxed">"{quote}"</p>

      <div className="flex items-center gap-3 mt-auto">
        <div className={cn("flex size-9 items-center justify-center rounded-full text-xs font-bold text-white", color)}>
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-800">{name}</p>
          <p className="text-xs text-zinc-400">{role}</p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard