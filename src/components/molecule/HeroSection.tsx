import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FeatureItem from '@/components/atom/FeatureItem'
import { FEATURES } from '@/config/const'

interface HeroSectionProps {
  ctaLabel: string
  onCTAClick: () => void
  onLearnMore: () => void
}

const HeroSection = ({ ctaLabel, onCTAClick, onLearnMore }: HeroSectionProps) => {
  return (
    <section className="min-h-[calc(100vh-4rem)] bg-zinc-50 flex flex-col items-center justify-center px-6 py-20 text-center">

      <span className="mb-6 inline-block rounded-full border border-zinc-200 bg-white px-4 py-1 text-xs font-medium uppercase tracking-widest text-zinc-400">
        New arrivals every week
      </span>

      <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
        Products you'll love,{' '}
        <span className="text-amber-500">prices you'll love more.</span>
      </h1>

      <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-500">
        Discover thousands of curated products from electronics to fashion.
        All in one place, delivered fast.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button
          onClick={onCTAClick}
          size="lg"
          className="gap-2 px-8 bg-zinc-900 hover:bg-zinc-700"
        >
          {ctaLabel}
          <ArrowRight className="size-4" />
        </Button>

        <Button
          onClick={onLearnMore}
          variant="outline"
          size="lg"
          className="px-8"
        >
          Learn More
        </Button>
      </div>

      <p className="mt-8 text-sm text-zinc-400">
        Trusted by 50,000+ shoppers &bull; Free returns &bull; Secure checkout
      </p>

      <div className="mt-20 grid w-full max-w-2xl grid-cols-3 gap-6 rounded-2xl border border-zinc-100 bg-white p-8">
        {FEATURES.map((feature) => (
          <FeatureItem
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            desc={feature.desc}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection