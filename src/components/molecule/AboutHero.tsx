import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/config/routes';

const AboutHero = () => {
  return (
    <section className="bg-zinc-900 px-6 py-24 text-center">
      <div className="mx-auto max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-4 py-1 text-xs font-medium text-amber-400 mb-6">
          <ShoppingBag className="size-3" />
          Our Story
        </span>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-tight">
          We're building the{' '}
          <span className="text-amber-400">future of shopping</span>
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-zinc-400 max-w-xl mx-auto">
          e-buy was founded with a simple mission make great products accessible
          to everyone, at prices that don't require a second thought.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href={ROUTES.PRODUCTS}>
            <Button
              size="lg"
              className="gap-2 px-8 bg-amber-500 text-zinc-900 font-bold hover:bg-amber-400"
            >
              Shop Now
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link href={ROUTES.CONTACT}>
            <Button
              variant="outline"
              size="lg"
              className="px-8 border-zinc-700 text-black hover:bg-zinc-800 hover:text-white"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
