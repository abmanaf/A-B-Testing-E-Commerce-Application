import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/config/routes'

const BADGE_DATA = [
  { value: '30-day',  label: 'Free Returns' },
  { value: '24/7',    label: 'Customer Support' },
  { value: '100%',    label: 'Secure Checkout' },
]

const AboutCTA = () => {
  return (
    <section className="bg-zinc-900 px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">

        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
          Join us
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to experience the{' '}
          <span className="text-amber-400">e-buy difference?</span>
        </h2>
        <p className="mt-4 text-zinc-400 leading-relaxed max-w-xl mx-auto">
          Join 50,000+ shoppers who've made e-buy their go-to destination
          for quality products at honest prices.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href={ROUTES.PRODUCTS}>
            <Button
              size="lg"
              className="gap-2 px-8 bg-amber-500 text-zinc-900 font-bold hover:bg-amber-400"
            >
              Start Shopping
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link href={ROUTES.CONTACT}>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 px-8 border-zinc-700 text-black hover:bg-zinc-800 hover:text-white"
            >
              <Mail className="size-4" />
              Get in Touch
            </Button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 border-t border-zinc-800 pt-10">
          {BADGE_DATA.map((badge) => (
            <div key={badge.label} className="text-center">
              <p className="text-lg font-bold text-amber-400">{badge.value}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{badge.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default AboutCTA