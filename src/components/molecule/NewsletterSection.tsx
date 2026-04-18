import Container from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NewsletterSection = () => {
  return (
    <Container
      className="bg-white border-t border-zinc-100"
      innerClassName="max-w-xl text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-amber-500">
        Stay in the loop
      </p>
      <h2 className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
        Get Deals in Your Inbox
      </h2>
      <p className="mt-3 text-sm text-zinc-400">
        Join 50,000+ subscribers and never miss a deal. Unsubscribe anytime.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Enter your email"
          className="flex-1 rounded-lg border border-zinc-200 px-4 py-2.5 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-zinc-400 transition-colors"
        />
        <Button className="bg-zinc-900 text-white hover:bg-zinc-700 px-6">
          Subscribe
        </Button>
      </div>
      <p className="mt-3 text-xs text-zinc-400">
        No spam. Unsubscribe at any time.
      </p>
    </Container>
  );
};

export default NewsletterSection;
