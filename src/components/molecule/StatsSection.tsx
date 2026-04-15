import Container from '@/components/shared/Container';
import StatItem from '@/components/atom/StatItem';

const STATS = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '10K+', label: 'Products Listed' },
  { value: '99%', label: 'Satisfaction Rate' },
  { value: '4.9★', label: 'Average Rating' },
];

const StatsSection = () => {
  return (
    <Container
      className="border-y border-zinc-100 bg-white py-14"
      innerClassName="max-w-4xl"
    >
      <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
        {STATS.map((stat) => (
          <StatItem key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </Container>
  );
};

export default StatsSection;
