import { LucideIcon } from 'lucide-react'

interface ValueCardProps {
  icon: LucideIcon
  title: string
  desc: string
}

const ValueCard = ({ icon: Icon, title, desc }: ValueCardProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-zinc-100 bg-white p-6 transition-all hover:border-zinc-200 hover:shadow-sm">
      <div className="flex size-11 items-center justify-center rounded-xl bg-amber-50">
        <Icon className="size-5 text-amber-500" />
      </div>
      <div>
        <p className="font-semibold text-zinc-900">{title}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">{desc}</p>
      </div>
    </div>
  )
}

export default ValueCard