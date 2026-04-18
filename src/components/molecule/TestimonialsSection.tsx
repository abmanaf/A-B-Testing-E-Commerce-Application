import Container from '@/components/shared/Container';
import SectionHeader from '@/components/shared/SectionHeader';
import TestimonialCard from '@/components/atom/Testimonialcard';

const TESTIMONIALS = [
  {
    name: 'Sarah K.',
    role: 'Verified Buyer',
    quote:
      'Amazing quality and super fast delivery. Will definitely shop here again!',
    rating: 5,
    initials: 'SK',
    color: 'bg-blue-500',
  },
  {
    name: 'James M.',
    role: 'Verified Buyer',
    quote:
      'The return process was seamless. Best online shopping experience I have had.',
    rating: 5,
    initials: 'JM',
    color: 'bg-amber-500',
  },
  {
    name: 'Priya R.',
    role: 'Verified Buyer',
    quote:
      'Great prices and the products are exactly as described. Highly recommend!',
    rating: 5,
    initials: 'PR',
    color: 'bg-green-500',
  },
];

const TestimonialsSection = () => {
  return (
    <Container className="bg-zinc-50">
      <SectionHeader eyebrow="What customers say" title="Loved by Thousands" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.name} {...t} />
        ))}
      </div>
    </Container>
  );
};

export default TestimonialsSection;
