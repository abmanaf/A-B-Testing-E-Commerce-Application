import { Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Container from '@/components/shared/Container';

interface PromoBannerSectionProps {
  ctaLabel: string;
  onCTAClick: () => void;
}

const PromoBannerSection = ({
  ctaLabel,
  onCTAClick,
}: PromoBannerSectionProps) => {
  return (
    <Container className="bg-zinc-900" innerClassName="max-w-3xl text-center">
      <div className="mb-4 flex justify-center">
        <span className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-4 py-1 text-xs font-medium text-amber-400">
          <Zap className="size-3" />
          Limited time offer
        </span>
      </div>

      <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Get 20% off your <span className="text-amber-400">first order</span>
      </h2>

      <p className="mt-4 text-lg text-zinc-400">
        Sign up today and use code{' '}
        <span className="font-mono font-bold text-white">WELCOME20</span> at
        checkout.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button
          onClick={onCTAClick}
          size="lg"
          className="gap-2 px-8 bg-amber-500 text-zinc-900 font-bold hover:bg-amber-400"
        >
          {ctaLabel}
          <ArrowRight className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="px-8 border-zinc-700 text-zinc-800 hover:bg-zinc-800 hover:text-white"
        >
          Learn More
        </Button>
      </div>
    </Container>
  );
};

export default PromoBannerSection;
